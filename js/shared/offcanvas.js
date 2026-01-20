// Shared Offcanvas helper (project-specific, non-Bootstrap offcanvas)
// Provides a consistent API across pages without depending on dashboard.js.
(() => {
  function show(id) {
    const offcanvas = document.getElementById(id);
    if (!offcanvas) return;

    offcanvas.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Close on backdrop click (only once)
    if (!offcanvas.dataset.backdropListenerAttached) {
      offcanvas.addEventListener('click', (e) => {
        if (e.target === offcanvas) hide(id);
      });
      offcanvas.dataset.backdropListenerAttached = 'true';
    }
  }

  function hide(id) {
    const offcanvas = document.getElementById(id);
    if (!offcanvas) return;
    offcanvas.classList.remove('show');
    document.body.style.overflow = '';
  }

  window.uiOffcanvas = Object.freeze({ show, hide });
})();

