// Shared Report Filters (POC)
// - Reuses the Reports page "modern-report-form" pattern (button opens checkbox modal)
// - Does NOT update data; only updates the page title indicator per POC rules.
(() => {
  const filterOptions = {
    organisationalLevel1: [
      { value: 'all', label: 'All' },
      { value: 'sanlam', label: 'Sanlam' }
      // { value: 'management', label: 'Management' },
      // { value: 'staff', label: 'Staff' }
    ],
    organisationalLevel2: [
      { value: 'all', label: 'All Business Units' },
      { value: 'sa-retail-affluent', label: 'SA Retail Affluent' },
      { value: 'sanlam-corporate', label: 'Sanlam Corporate' },
      { value: 'sanlam-group-office', label: 'Sanlam Group Office' },
      { value: 'sanlam-group-technology', label: 'Sanlam Group Technology' },
      { value: 'sanlam-investment-group', label: 'Sanlam Investment Group' },
      { value: 'sanlam-namibia', label: 'Sanlam Namibia' },
      { value: 'santam', label: 'Santam' },
      { value: 'sem-sa', label: 'SEM SA' },
      { value: 'not-specified', label: 'Not Specified' }
    ],

    organisationalLevel3: [
      { value: 'all', label: 'All' },
      { value: 'finance', label: 'Finance' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'technology', label: 'Technology' },
      { value: 'operations', label: 'Operations' },
      { value: 'human-resources', label: 'Human Resources' },
      { value: 'sales', label: 'Sales' }
    ],
    organisationalLevel4: [
      { value: 'all', label: 'All' },
      { value: 'division-1', label: 'Division 1' },
      { value: 'division-2', label: 'Division 2' },
      { value: 'division-3', label: 'Division 3' },
      { value: 'division-4', label: 'Division 4' },
      { value: 'division-5', label: 'Division 5' }
    ],
    organisationalLevel5: [
      { value: 'all', label: 'All' },
      { value: 'customer-service', label: 'Customer Service' },
      { value: 'product-development', label: 'Product Development' },
      { value: 'quality-assurance', label: 'Quality Assurance' },
      { value: 'business-analysis', label: 'Business Analysis' },
      { value: 'project-management', label: 'Project Management' },
      { value: 'data-analytics', label: 'Data Analytics' },
      { value: 'risk-management', label: 'Risk Management' },
      { value: 'operations-support', label: 'Operations Support' }
    ],
    organisationalLevel6: [
      { value: 'all', label: 'All' },
      { value: 'team-alpha', label: 'Team Alpha' },
      { value: 'team-beta', label: 'Team Beta' },
      { value: 'team-gamma', label: 'Team Gamma' },
      { value: 'team-delta', label: 'Team Delta' },
      { value: 'team-epsilon', label: 'Team Epsilon' }
    ],
    organisationalLevel7: [
      { value: 'all', label: 'All' },
      { value: 'administration', label: 'Administration' },
      { value: 'customer-service', label: 'Customer Service' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'finance', label: 'Finance' },
      { value: 'human-resources', label: 'Human Resources' },
      { value: 'information-technology', label: 'Information Technology' },
      { value: 'legal', label: 'Legal' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'operations', label: 'Operations' },
      { value: 'sales', label: 'Sales' }
    ],
    organisationalLevel8: [
      { value: 'all', label: 'All' },
      { value: 'manager-1', label: 'Manager 1' },
      { value: 'manager-2', label: 'Manager 2' },
      { value: 'manager-3', label: 'Manager 3' },
      { value: 'manager-4', label: 'Manager 4' },
      { value: 'manager-5', label: 'Manager 5' },
      { value: 'manager-6', label: 'Manager 6' }
    ],
    organisationalLevel9: [
      { value: 'all', label: 'All' },
      { value: 'south-africa', label: 'South Africa' },
      { value: 'southern-africa', label: 'Southern Africa' },
      { value: 'east-africa', label: 'East Africa' },
      { value: 'west-africa', label: 'West Africa' }
    ],
    lineManager: [
      { value: 'all', label: 'All' },
      { value: 'manager-1', label: 'Manager 1' },
      { value: 'manager-2', label: 'Manager 2' },
      { value: 'manager-3', label: 'Manager 3' },
      { value: 'manager-4', label: 'Manager 4' },
      { value: 'manager-5', label: 'Manager 5' },
      { value: 'manager-6', label: 'Manager 6' }
    ],
    gender: [
      { value: 'all', label: 'All' },
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
      { value: 'prefer-not', label: 'Prefer not to say' }
    ],
    ageBand: [
      { value: 'all', label: 'All' },
      { value: '18-35', label: '18 - 35' },
      { value: '36-50', label: '36 - 50' },
      { value: '50+', label: '50+' },
      { value: 'unknown', label: 'Unknown' }
    ],
    ethnicity: [
      { value: 'all', label: 'All' },
      { value: 'asian', label: 'Asian' },
      { value: 'black', label: 'Black' },
      { value: 'coloured', label: 'Coloured' },
      { value: 'white', label: 'White' },
      { value: 'other', label: 'Other' },
      { value: 'prefer-not', label: 'Prefer not to say' }
    ],
    tenure: [
      { value: 'all', label: 'All' },
      { value: 'high-performer', label: 'High Performer' },
      { value: 'medium-performer', label: 'Medium Performer' },
      { value: 'low-performer', label: 'Low Performer' }
    ],
    jobLevel: [
      { value: 'all', label: 'All' },
      { value: 'executive', label: 'Executive' },
      { value: 'senior-management', label: 'Senior Management' },
      { value: 'middle-management', label: 'Middle Management' },
      { value: 'supervisor', label: 'Supervisor' },
      { value: 'individual-contributor', label: 'Individual Contributor' },
      { value: 'entry-level', label: 'Entry Level' }
    ]    
  };

  const filterDisplayNames = {
    organisationalLevel1: 'Organisational Level 1',
    organisationalLevel2: 'Organisational Level 2',
    organisationalLevel3: 'Organisational Level 3',
    organisationalLevel4: 'Organisational Level 4',
    organisationalLevel5: 'Organisational Level 5',
    organisationalLevel6: 'Organisational Level 6',
    organisationalLevel7: 'Organisational Level 7',
    organisationalLevel8: 'Organisational Level 8',
    organisationalLevel9: 'Organisational Level 9',
    lineManager: 'Line Manager',
    gender: 'Gender',
    ageBand: 'Age',
    ethnicity: 'Ethnicity',
    tenure: 'Tenure',
    jobLevel: 'Job Level'
  };

  const summaryIdMap = {
    organisationalLevel1: 'organisationalLevel1SelectedSummary',
    organisationalLevel2: 'organisationalLevel2SelectedSummary',
    organisationalLevel3: 'organisationalLevel3SelectedSummary',
    organisationalLevel4: 'organisationalLevel4SelectedSummary',
    organisationalLevel5: 'organisationalLevel5SelectedSummary',
    organisationalLevel6: 'organisationalLevel6SelectedSummary',
    organisationalLevel7: 'organisationalLevel7SelectedSummary',
    organisationalLevel8: 'organisationalLevel8SelectedSummary',
    organisationalLevel9: 'organisationalLevel9SelectedSummary',
    lineManager: 'lineManagerSelectedSummary',
    gender: 'genderSelectedSummary',
    ageBand: 'ageBandSelectedSummary',
    ethnicity: 'ethnicitySelectedSummary',
    tenure: 'tenureSelectedSummary',
    jobLevel: 'jobLevelSelectedSummary'
  };

  const buttonConfig = {
    openOrganisationalLevel1Modal: { key: 'organisationalLevel1', title: 'Select Organisational Level 1' },
    openOrganisationalLevel2Modal: { key: 'organisationalLevel2', title: 'Select Organisational Level 2' },
    openOrganisationalLevel3Modal: { key: 'organisationalLevel3', title: 'Select Organisational Level 3' },
    openOrganisationalLevel4Modal: { key: 'organisationalLevel4', title: 'Select Organisational Level 4' },
    openOrganisationalLevel5Modal: { key: 'organisationalLevel5', title: 'Select Organisational Level 5' },
    openOrganisationalLevel6Modal: { key: 'organisationalLevel6', title: 'Select Organisational Level 6' },
    openOrganisationalLevel7Modal: { key: 'organisationalLevel7', title: 'Select Organisational Level 7' },
    openOrganisationalLevel8Modal: { key: 'organisationalLevel8', title: 'Select Organisational Level 8' },
    openOrganisationalLevel9Modal: { key: 'organisationalLevel9', title: 'Select Organisational Level 9' },
    openLineManagerModal: { key: 'lineManager', title: 'Select Line Manager' },
    openGenderModal: { key: 'gender', title: 'Select Gender' },
    openAgeBandModal: { key: 'ageBand', title: 'Select Age' },
    openEthnicityModal: { key: 'ethnicity', title: 'Select Ethnicity' },
    openTenureModal: { key: 'tenure', title: 'Select Tenure' },
    openJobLevelModal: { key: 'jobLevel', title: 'Select Job Level' }
  };

  let currentFilterKey = null;
  let tempSelected = [];
  let onApplyHook = null;
  const selectedFilters = {};

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function ensureFilterModal() {
    if (document.getElementById('filterModal')) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div id="filterModal" class="filter-modal">
        <div class="filter-modal-overlay"></div>
        <div class="filter-modal-content">
          <div class="filter-modal-header">
            <h3 id="filterModalTitle">Select Options</h3>
          </div>
          <div class="filter-modal-body" id="filterModalBody"></div>
          <div class="filter-modal-footer">
            <button type="button" id="applyFilterModal" class="btn-custom btn-primary">Apply Selected</button>
            <button type="button" id="cancelFilterModal" class="btn-custom btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    `.trim();

    document.body.appendChild(wrapper.firstElementChild);
  }

  function getModalEls() {
    return {
      filterModal: document.getElementById('filterModal'),
      filterModalTitle: document.getElementById('filterModalTitle'),
      filterModalBody: document.getElementById('filterModalBody'),
      applyFilterModal: document.getElementById('applyFilterModal'),
      cancelFilterModal: document.getElementById('cancelFilterModal')
    };
  }

  function openFilterModal(filterKey, title, selected) {
    const { filterModal, filterModalTitle, filterModalBody } = getModalEls();
    if (!filterModal || !filterModalTitle || !filterModalBody) return;

    currentFilterKey = filterKey;
    tempSelected = Array.isArray(selected) ? [...selected] : [];

    filterModalTitle.textContent = title;
    filterModalBody.innerHTML = '';

    const options = filterOptions[filterKey] || [];

    options.forEach((opt) => {
      const label = document.createElement('label');
      if (opt.value === 'all') label.classList.add('all-option');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = opt.value;
      checkbox.checked = tempSelected.includes(opt.value);

      checkbox.addEventListener('change', (e) => {
        const checked = Boolean(e.target.checked);
        if (opt.value === 'all') {
          tempSelected = checked ? options.map((o) => o.value) : [];
          filterModalBody
            .querySelectorAll('input[type="checkbox"]')
            .forEach((cb) => (cb.checked = checked));
          return;
        }

        if (checked) {
          if (!tempSelected.includes(opt.value)) tempSelected.push(opt.value);
        } else {
          tempSelected = tempSelected.filter((v) => v !== opt.value && v !== 'all');
        }

        const allExceptAll = options.filter((o) => o.value !== 'all').map((o) => o.value);
        const allChecked = allExceptAll.length > 0 && allExceptAll.every((v) => tempSelected.includes(v));
        const allCheckbox = filterModalBody.querySelector('input[value="all"]');
        if (allCheckbox) allCheckbox.checked = allChecked;

        if (allChecked) {
          if (!tempSelected.includes('all')) tempSelected.push('all');
        } else {
          tempSelected = tempSelected.filter((v) => v !== 'all');
        }
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(opt.label));
      filterModalBody.appendChild(label);

      if (opt.value === 'all') {
        const divider = document.createElement('hr');
        divider.className = 'all-divider';
        filterModalBody.appendChild(divider);
      }
    });

    filterModal.classList.add('active');
  }

  function updateFilterSummary(filterKey, selected) {
    const summaryId = summaryIdMap[filterKey];
    if (!summaryId) return;

    const summary = document.getElementById(summaryId);
    if (!summary) return;

    const options = filterOptions[filterKey];
    if (!options) return;

    const isAll = selected.includes('all') || selected.length === options.length;
    if (isAll) {
      summary.textContent = 'All';
      summary.className = 'selected-summary';
      return;
    }

    if (selected.length === 0) {
      summary.textContent = 'None';
      summary.className = 'selected-summary';
      return;
    }

    summary.innerHTML = '';
    summary.className = 'selected-summary multiple';
    const selectedOptions = options.filter((opt) => selected.includes(opt.value) && opt.value !== 'all');
    selectedOptions.forEach((opt) => {
      const tag = document.createElement('span');
      tag.className = 'summary-tag';
      tag.textContent = opt.label;
      summary.appendChild(tag);
    });
  }

  function computeAppliedSelections() {
    const perFilter = {};
    let totalCount = 0;

    Object.keys(filterOptions).forEach((key) => {
      const selected = selectedFilters[key] || [];
      const options = filterOptions[key] || [];

      const isAll = selected.includes('all') || (options.length > 0 && selected.length === options.length);
      if (isAll) return;

      const labels = options
        .filter((opt) => opt.value !== 'all' && selected.includes(opt.value))
        .map((opt) => opt.label);

      if (labels.length === 0) return;

      perFilter[key] = labels;
      totalCount += labels.length;
    });

    return { totalCount, perFilter };
  }

  function getPrimaryPageH2() {
    // Prefer main content headings (avoid the H1 in the header)
    return (
      document.querySelector('.container-fluid h2') ||
      document.querySelector('.container h2') ||
      document.querySelector('main h2') ||
      document.querySelector('h2')
    );
  }

  function ensureTitleIndicatorContainer(h2) {
    if (!h2) return null;
    let el = h2.querySelector('.filter-title-indicator');
    if (!el) {
      el = document.createElement('span');
      el.className = 'filter-title-indicator ms-2 fw-semibold';
      h2.appendChild(el);
    }
    return el;
  }

  function destroyBootstrapTooltips(container) {
    if (!container) return;
    container.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((node) => {
      try {
        const instance = bootstrap.Tooltip.getInstance(node);
        if (instance) instance.dispose();
      } catch {
        // ignore
      }
    });
  }

  function updateTitleIndicator() {
    const h2 = getPrimaryPageH2();
    if (!h2) return;

    const indicator = ensureTitleIndicatorContainer(h2);
    if (!indicator) return;

    // Reset previous tooltip instances/content
    destroyBootstrapTooltips(indicator);
    indicator.innerHTML = '';

    const { totalCount, perFilter } = computeAppliedSelections();
    if (totalCount === 0) {
      indicator.textContent = '';
      return;
    }

    // Exactly 1 selection across all filters: show the single value next to title
    if (totalCount === 1) {
      const [singleKey, singleValues] = Object.entries(perFilter)[0];
      const singleLabel = singleValues[0];
      const singleFilterName = filterDisplayNames[singleKey] || singleKey;
      indicator.textContent = `- ${singleFilterName}: ${singleLabel}`;
      return;
    }

    // 2+ selections: show "Filters Applied" with tooltip listing selections grouped by filter
    const labelSpan = document.createElement('span');
    labelSpan.textContent = '- Filters Applied';
    indicator.appendChild(labelSpan);

    const tooltipLines = Object.keys(perFilter)
      .sort((a, b) => (filterDisplayNames[a] || a).localeCompare(filterDisplayNames[b] || b))
      .map((key) => {
        const title = filterDisplayNames[key] || key;
        const values = perFilter[key].join(', ');
        return `<div><strong>${escapeHtml(title)}:</strong> ${escapeHtml(values)}</div>`;
      })
      .join('');

    const infoIcon = document.createElement('i');
    infoIcon.className = 'bx bx-info-circle ms-1 no-export';
    infoIcon.setAttribute('role', 'button');
    infoIcon.setAttribute('tabindex', '0');
    infoIcon.setAttribute('data-bs-toggle', 'tooltip');
    infoIcon.setAttribute('data-bs-html', 'true');
    infoIcon.setAttribute('title', tooltipLines);
    indicator.appendChild(infoIcon);

    try {
      // bootstrap.Tooltip is available via Bootstrap bundle script
      new bootstrap.Tooltip(infoIcon);
    } catch {
      // ignore if bootstrap isn't available on a given page
    }
  }

  function reset() {
    Object.keys(filterOptions).forEach((key) => {
      selectedFilters[key] = filterOptions[key].map((o) => o.value);
      updateFilterSummary(key, selectedFilters[key]);
    });
    updateTitleIndicator();
  }

  function apply() {
    updateTitleIndicator();
    if (typeof onApplyHook === 'function') {
      onApplyHook(getState());
    }
  }

  function getState() {
    const out = {};
    Object.keys(filterOptions).forEach((key) => {
      out[key] = [...(selectedFilters[key] || [])];
    });
    return out;
  }

  function init({ onApply } = {}) {
    onApplyHook = typeof onApply === 'function' ? onApply : null;

    ensureFilterModal();
    const { filterModal, applyFilterModal, cancelFilterModal } = getModalEls();
    if (!filterModal || !applyFilterModal || !cancelFilterModal) return;

    // One-time modal listeners
    if (!filterModal.dataset.wired) {
      applyFilterModal.addEventListener('click', () => {
        if (currentFilterKey) {
          selectedFilters[currentFilterKey] = [...tempSelected];
          updateFilterSummary(currentFilterKey, selectedFilters[currentFilterKey]);
        }
        filterModal.classList.remove('active');
      });

      cancelFilterModal.addEventListener('click', () => {
        filterModal.classList.remove('active');
      });

      const overlay = filterModal.querySelector('.filter-modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', () => {
          filterModal.classList.remove('active');
        });
      }

      filterModal.dataset.wired = 'true';
    }

    // Init selected arrays (all selected by default)
    Object.keys(filterOptions).forEach((key) => {
      if (!Array.isArray(selectedFilters[key]) || selectedFilters[key].length === 0) {
        selectedFilters[key] = filterOptions[key].map((o) => o.value);
      }
      updateFilterSummary(key, selectedFilters[key]);
    });

    // Wire up "Select ..." buttons on the page (if present)
    Object.keys(buttonConfig).forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      if (btn.dataset.wired) return;

      btn.addEventListener('click', () => {
        const cfg = buttonConfig[btnId];
        openFilterModal(cfg.key, cfg.title, selectedFilters[cfg.key]);
      });
      btn.dataset.wired = 'true';
    });

    // Initial title indicator state (should be empty when all)
    updateTitleIndicator();
  }

  window.reportFilters = Object.freeze({
    init,
    reset,
    apply,
    getState,
    getAppliedFilters: computeAppliedSelections,
    filterDisplayNames: filterDisplayNames,
    filterOptions: filterOptions,
    selectedFilters: selectedFilters,
    _updateTitleIndicator: updateTitleIndicator
  });
})();

