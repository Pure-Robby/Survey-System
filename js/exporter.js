// /js/exporter.js
// No bundler required.
// Dependencies (must be loaded BEFORE this file):
//   <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/pptxgenjs@3.11.0/dist/pptxgen.bundle.js"></script>
//
// Usage in HTML:
//   <button class="no-export" onclick="exportDashboardToPpt()">Export to PPT</button>
//
// Manual slide breaks in HTML:
//   <div data-export-break></div>

(() => {
  "use strict";

  // ====== CONFIG ======
  const EXPORT_FILENAME_DEFAULT = "Dashboard-Export.pptx";

  // PPT slide size (16:9 widescreen)
  const SLIDE_W_IN = 13.33;
  const SLIDE_H_IN = 7.5;

  // Capture resolution multiplier
  const CAPTURE_SCALE = 2;

  // Wait for animated charts to finish (ms)
  const ANIMATION_WAIT_MS = 700;

  // Header + footer selectors
  const HEADER_SELECTOR = ".page-header";
  const FOOTER_SELECTOR = ".page-footer";

  // SVG charts you previously had to fix centering/clipping for
  const SVG_CONTAINER_IDS = ["responseProgress", "sentimentDonut"];

  const EXPORT_VIEWPORT_WIDTH = 1920; // fixed export width
  const EXPORT_BG = "#f2f4f6";

  // ====== HELPERS ======

  function applyExportModeToClone(clonedDoc) {
    // 1) Enable export CSS
    clonedDoc.documentElement.classList.add("export-mode-root");
  
    // 2) Lock export width
    clonedDoc.documentElement.style.width = "1920px";
    clonedDoc.body.style.width = "1920px";
    clonedDoc.documentElement.style.maxWidth = "none";
    clonedDoc.body.style.maxWidth = "none";
  
    // 3) Fix reveal/fade-in ONLY where needed
    const all = clonedDoc.querySelectorAll("*");
    for (const el of all) {
      const cs = clonedDoc.defaultView.getComputedStyle(el);
  
      // never touch donut center transforms
      if (
        el.classList.contains("circular-progress-text") ||
        el.classList.contains("enps-center-text") ||
        el.classList.contains("donut-center-text")
      ) {
        continue;
      }
  
      const op = parseFloat(cs.opacity);
      const hasAnim =
        (cs.animationName && cs.animationName !== "none") ||
        (cs.transitionDuration && cs.transitionDuration !== "0s");
  
      if (!Number.isNaN(op) && op < 1 && hasAnim) {
        el.style.opacity = "1";
      }
  
      if (
        !Number.isNaN(op) &&
        op < 1 &&
        hasAnim &&
        cs.transform &&
        cs.transform !== "none"
      ) {
        el.style.transform = "none";
      }
    }
  }
  
  

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function ensureDeps() {
    if (typeof window.html2canvas !== "function") {
      throw new Error(
        "html2canvas is not loaded. Include html2canvas.min.js before exporter.js"
      );
    }
    if (typeof window.PptxGenJS !== "function") {
      throw new Error(
        "PptxGenJS is not loaded. Include pptxgen.bundle.js before exporter.js"
      );
    }
  }

  function cropCanvas(srcCanvas, yPx, hPx) {
    const out = document.createElement("canvas");
    out.width = srcCanvas.width;
    out.height = hPx;

    const ctx = out.getContext("2d");
    ctx.drawImage(srcCanvas, 0, yPx, srcCanvas.width, hPx, 0, 0, out.width, out.height);
    return out;
  }

  function fitImageToBox(imgWpx, imgHpx, boxWIn, boxHIn) {
    // Letterbox-fit (preserve aspect, no cropping)
    const imgAspect = imgWpx / imgHpx;
    const boxAspect = boxWIn / boxHIn;

    let x = 0,
      y = 0,
      w = boxWIn,
      h = boxHIn;

    if (imgAspect > boxAspect) {
      // image wider -> fit width
      w = boxWIn;
      h = boxWIn / imgAspect;
      y = (boxHIn - h) / 2;
    } else {
      // image taller -> fit height
      h = boxHIn;
      w = boxHIn * imgAspect;
      x = (boxWIn - w) / 2;
    }

    return { x, y, w, h };
  }

  function hideNoExportInClone(clonedDoc) {
    clonedDoc.querySelectorAll(".no-export").forEach((el) => {
      el.style.display = "none";
      el.style.visibility = "hidden";
    });
  }
  
  function hideHeaderFooterInClone(clonedDoc) {
    const header = clonedDoc.querySelector(HEADER_SELECTOR);
    const footer = clonedDoc.querySelector(FOOTER_SELECTOR);
    
    if (header) {
      header.style.display = "none";
      header.style.visibility = "hidden";
    }
    if (footer) {
      footer.style.display = "none";
      footer.style.visibility = "hidden";
    }
  }

  function neutralizeFixedStickyInClone(clonedDoc) {
    const all = clonedDoc.querySelectorAll("*");
    for (const el of all) {
      const s = clonedDoc.defaultView.getComputedStyle(el);
      if (s.position === "fixed" || s.position === "sticky") {
        el.style.position = "static";
      }
    }
  }

  function fixSvgClippingInClone(clonedDoc) {
    for (const id of SVG_CONTAINER_IDS) {
      const el = clonedDoc.getElementById(id);
      if (!el) continue;

      const container = el.tagName === "SVG" ? el.parentElement : el;
      if (!container) continue;

      container.style.overflow = "visible";
      container.style.left = "0";
      container.style.right = "0";
      container.style.transform = "none";
      container.style.marginLeft = "auto";
      container.style.marginRight = "auto";
      container.style.display = "block";

      const svg = container.querySelector("svg") || (el.tagName === "SVG" ? el : null);
      if (!svg) continue;

      svg.style.overflow = "visible";
      svg.style.left = "0";
      svg.style.right = "0";
      svg.style.transform = "none";
      svg.style.marginLeft = "auto";
      svg.style.marginRight = "auto";
      svg.style.display = "block";
      svg.style.position = "relative";
    }
  }

  function getBreakYsFromClone(clonedDoc) {
    const markers = Array.from(clonedDoc.querySelectorAll("[data-export-break]"))
      .map((el) => Math.max(0, Math.round(el.getBoundingClientRect().top)))
      .sort((a, b) => a - b);

    // Always start at 0
    return [0, ...markers];
  }

  function buildSlicesFromBreaks({ breakYsCssPx, totalCssHeight, scale }) {
    const slices = [];
    for (let i = 0; i < breakYsCssPx.length; i++) {
      const startCss = breakYsCssPx[i];
      const endCss = breakYsCssPx[i + 1] != null ? breakYsCssPx[i + 1] : totalCssHeight;

      const start = Math.round(startCss * scale);
      const end = Math.round(endCss * scale);
      const h = Math.max(1, end - start);

      slices.push({ y: start, h });
    }
    if (slices.length === 0) {
      slices.push({ y: 0, h: Math.round(totalCssHeight * scale) });
    }
    return slices;
  }

  function pxToSlideInches(px, pageWidthCssPx, slideWIn) {
    // Page width (CSS px) maps to slideWIn inches -> convert proportionally
    return (px / pageWidthCssPx) * slideWIn;
  }

  async function captureElementAsImage(el, scale, applyExportMode = false, forceWidth = null) {
    if (!el) return null;
  
    const options = {
      scale,
      backgroundColor: "#FFFFFF",
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        if (applyExportMode) {
          applyExportModeToClone(clonedDoc);
        }
        hideNoExportInClone(clonedDoc);
        neutralizeFixedStickyInClone(clonedDoc);
      },
    };
    
    // Force viewport width if specified (to match full page capture)
    if (forceWidth) {
      options.windowWidth = forceWidth;
    }
    
    const c = await html2canvas(el, options);
  
    // The canvas dimensions reflect the ACTUAL rendered size after all CSS transformations
    // So divide by scale to get the true CSS pixel dimensions
    return {
      dataUrl: c.toDataURL("image/png"),
      cssWidth: c.width / scale,
      cssHeight: c.height / scale,
      imgPxW: c.width,
      imgPxH: c.height,
    };
  }
  
  function populateFiltersPage(reportTitle) {
    const filtersContainer = document.getElementById('exportFiltersGrid');
    
    if (!filtersContainer) return;
    
    const filterDisplayNames = window.reportFilters?.filterDisplayNames || {};
    const filterOptions = window.reportFilters?.filterOptions || {};
    const selectedFilters = window.reportFilters?.selectedFilters || {};
    
    filtersContainer.innerHTML = '';
    
    // Loop through ALL filters
    Object.keys(filterDisplayNames).forEach(key => {
      const row = document.createElement('div');
      row.className = 'filter-summary-row';
      
      const label = document.createElement('div');
      label.className = 'filter-label';
      label.textContent = filterDisplayNames[key] + ':';
      row.appendChild(label);
      
      const value = document.createElement('div');
      value.className = 'filter-value';
      
      const selections = selectedFilters[key] || [];
      const options = filterOptions[key] || [];
      
      // Check if this is "All" (no selection, just 'all', or all options selected)
      const isAllSelected = selections.length === 0 || 
                           (selections.length === 1 && selections[0] === 'all') ||
                           (selections.length === options.length);
      
      if (isAllSelected) {
        // Show "All" when no meaningful filter is applied
        value.textContent = 'All';
      } else {
        // Show selected values separated by commas
        const labels = selections.map(val => {
          const option = options.find(opt => opt.value === val);
          return option ? option.label : val;
        });
        value.textContent = labels.join(', ');
      }
      
      row.appendChild(value);
      filtersContainer.appendChild(row);
    });
  }

  // ====== CORE EXPORT ======
  async function exportDashboardToPptInternal({
    filename = EXPORT_FILENAME_DEFAULT,
    scale = CAPTURE_SCALE,
    slideWIn = SLIDE_W_IN,
    slideHIn = SLIDE_H_IN,
    animationWaitMs = ANIMATION_WAIT_MS,
  } = {}) {
    ensureDeps();

    // Capture from the top for consistency
    window.scrollTo(0, 0);

    // Fonts ready prevents reflow differences
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    // Wait for animated charts to finish before capturing
    await sleep(animationWaitMs);

    // Measure breakpoints with clone rules applied (so hiding .no-export doesn't shift unexpectedly)
    let breakYsCssPx = [0];
    const docEl = document.documentElement;
    
    await window.html2canvas(docEl, {
      scale: 1,
      backgroundColor: "#f2f4f6",
      useCORS: true,
      logging: false,
      width: EXPORT_VIEWPORT_WIDTH,
      height: docEl.scrollHeight,
      windowWidth: EXPORT_VIEWPORT_WIDTH,
      windowHeight: docEl.clientHeight,
      onclone: (clonedDoc) => {
        applyExportModeToClone(clonedDoc);
        hideNoExportInClone(clonedDoc);
        hideHeaderFooterInClone(clonedDoc); // Hide header/footer to match full capture
        neutralizeFixedStickyInClone(clonedDoc);
        fixSvgClippingInClone(clonedDoc);
        breakYsCssPx = getBreakYsFromClone(clonedDoc);
      },
    });

    // Capture header/footer as images once (to stamp onto every PPT slide)
    const headerEl = document.querySelector(HEADER_SELECTOR);
    const footerEl = document.querySelector(FOOTER_SELECTOR);

    // Force same viewport width as full page capture for consistency
    const headerImg = await captureElementAsImage(headerEl, scale, true, EXPORT_VIEWPORT_WIDTH);
    const footerImg = await captureElementAsImage(footerEl, scale, true, EXPORT_VIEWPORT_WIDTH);

    // Convert their heights to slide inches based on page width
    // Use EXPORT_VIEWPORT_WIDTH since that's what the clone is forced to
    const pageWidthCssPx = EXPORT_VIEWPORT_WIDTH;

    const headerHIn = headerImg ? (slideWIn * (headerImg.imgPxH / headerImg.imgPxW)) : 0;
const footerHIn = footerImg ? (slideWIn * (footerImg.imgPxH / footerImg.imgPxW)) : 0;


    const contentTopIn = headerHIn;
    const contentHIn = Math.max(0.1, slideHIn - headerHIn - footerHIn);

    // Set the cover page title from filename
    const coverTitleEl = document.querySelector('.cover-report-title');
    if (coverTitleEl) {
      const reportName = filename.replace('.pptx', '');
      coverTitleEl.textContent = reportName;
    }

    // Populate filters page with current filter state
    populateFiltersPage(filename);

    // Get references to special pages (kept hidden in main DOM to avoid flash)
    const coverPage = document.querySelector('.export-cover-page');
    const filtersPage = document.querySelector('.export-filters-page');

    // Capture cover page (full screen, no header/footer)
    // Elements stay hidden in main DOM - only visible in clone
    let coverCanvas = null;
    if (coverPage) {
      coverCanvas = await html2canvas(coverPage, {
        scale,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        width: 1920,
        height: 1080,
        windowWidth: 1920,
        windowHeight: 1080,
        onclone: (clonedDoc) => {
          const clonedCover = clonedDoc.querySelector('.export-cover-page');
          if (clonedCover) clonedCover.style.display = 'block';
        }
      });
    }

    // Capture filters page
    // Elements stay hidden in main DOM - only visible in clone
    let filtersCanvas = null;
    if (filtersPage) {
      filtersCanvas = await html2canvas(filtersPage, {
        scale,
        backgroundColor: EXPORT_BG,
        useCORS: true,
        logging: false,
        width: 1920,
        windowWidth: 1920,
        onclone: (clonedDoc) => {
          applyExportModeToClone(clonedDoc);
          const clonedFilters = clonedDoc.querySelector('.export-filters-page');
          if (clonedFilters) clonedFilters.style.display = 'block';
        }
      });
    }

    // Capture full page at high-res (keep built-in canvases; no overlay hacks)
    const fullCanvas = await html2canvas(docEl, {
      scale,
      backgroundColor: EXPORT_BG,
      useCORS: true,
      logging: false,

      x: 0,
      y: 0,
      width: EXPORT_VIEWPORT_WIDTH,
      height: docEl.scrollHeight,

      // ✅ force the “virtual viewport” to 1920 for responsive CSS
      windowWidth: EXPORT_VIEWPORT_WIDTH,
      windowHeight: docEl.clientHeight,

      onclone: (clonedDoc) => {
        applyExportModeToClone(clonedDoc);

        hideNoExportInClone(clonedDoc);
        hideHeaderFooterInClone(clonedDoc);
        neutralizeFixedStickyInClone(clonedDoc);
        fixSvgClippingInClone(clonedDoc);
      },
    });


    // Build slices (in captured pixels)
    const totalCssHeight = document.documentElement.scrollHeight;
    const slices = buildSlicesFromBreaks({ breakYsCssPx, totalCssHeight, scale });

    // Compute header/footer pixel heights (ONLY needed to remove the “natural” header/footer from the page capture)
    const headerPx = headerImg ? Math.round(headerImg.cssHeight * scale) : 0;
    const footerPx = footerImg ? Math.round(footerImg.cssHeight * scale) : 0;

    // Create PPT
    const pptx = new window.PptxGenJS();
    pptx.defineLayout({ name: "DASH16x9", width: slideWIn, height: slideHIn });
    pptx.layout = "DASH16x9";

    // Slide 1: Cover Page (full screen, no header/footer)
    if (coverCanvas) {
      const coverSlide = pptx.addSlide();
      coverSlide.background = { fill: "#000000" };
      
      const coverFit = fitImageToBox(coverCanvas.width, coverCanvas.height, slideWIn, slideHIn);
      coverSlide.addImage({
        data: coverCanvas.toDataURL("image/png"),
        x: coverFit.x,
        y: coverFit.y,
        w: coverFit.w,
        h: coverFit.h,
      });
    }

    // Slide 2: Filters Page (with header/footer)
    if (filtersCanvas) {
      const filtersSlide = pptx.addSlide();
      filtersSlide.background = { fill: EXPORT_BG };
      
      // Stamp header
      if (headerImg) {
        filtersSlide.addImage({
          data: headerImg.dataUrl,
          x: 0,
          y: 0,
          w: slideWIn,
          h: headerHIn,
        });
      }
      
      // Stamp footer
      if (footerImg) {
        filtersSlide.addImage({
          data: footerImg.dataUrl,
          x: 0,
          y: slideHIn - footerHIn,
          w: slideWIn,
          h: footerHIn,
        });
      }
      
      // Place filters content in content area
      const filtersFit = fitImageToBox(filtersCanvas.width, filtersCanvas.height, slideWIn, contentHIn);
      filtersSlide.addImage({
        data: filtersCanvas.toDataURL("image/png"),
        x: filtersFit.x,
        y: contentTopIn + filtersFit.y,
        w: filtersFit.w,
        h: filtersFit.h,
      });
    }

    // Content slides (slides 3+)
    for (let i = 0; i < slices.length; i++) {
      const s = slices[i];

      // No trimming needed - header/footer are hidden in the capture
      const cropY = s.y;
      const cropH = s.h;

      const cropped = cropCanvas(fullCanvas, cropY, cropH);

      const slide = pptx.addSlide();

      // Set slide background colour
slide.background = { fill: "#f2f4f6" }; // or "#ffffff"

      // Stamp header on every slide
      if (headerImg) {
        slide.addImage({
          data: headerImg.dataUrl,
          x: 0,
          y: 0,
          w: slideWIn,
          h: headerHIn,
        });
      }

      // Stamp footer on every slide
      if (footerImg) {
        slide.addImage({
          data: footerImg.dataUrl,
          x: 0,
          y: slideHIn - footerHIn,
          w: slideWIn,
          h: footerHIn,
        });
      }

      // Place the cropped page content in the remaining content area
      const fit = fitImageToBox(cropped.width, cropped.height, slideWIn, contentHIn);
      slide.addImage({
        data: cropped.toDataURL("image/png"),
        x: fit.x,
        y: contentTopIn + fit.y,
        w: fit.w,
        h: fit.h,
      });
    }

    await pptx.writeFile({ fileName: filename });
  }

  // ====== PUBLIC GLOBAL API ======
  // Expose the internal function so it can be called with custom parameters
  window.exportDashboardToPptInternal = exportDashboardToPptInternal;
  
  // Convenience wrapper with defaults
  window.exportDashboardToPpt = function () {
    return exportDashboardToPptInternal({
      filename: EXPORT_FILENAME_DEFAULT,
      scale: CAPTURE_SCALE,
      slideWIn: SLIDE_W_IN,
      slideHIn: SLIDE_H_IN,
      animationWaitMs: ANIMATION_WAIT_MS,
    });
  };

  // Optional alias for older buttons
  window.exportWholePageToPpt = window.exportDashboardToPpt;
})();
