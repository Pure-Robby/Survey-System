// Shared Report Filters (POC)
// - Reuses the Reports page "modern-report-form" pattern (button opens checkbox modal)
// - Does NOT update data; only updates the page title indicator per POC rules.
(() => {
  const filterOptions = {
    workerGroup: [
      { value: 'all', label: 'All' },
      { value: 'executive', label: 'Executive' },
      { value: 'management', label: 'Management' },
      { value: 'staff', label: 'Staff' }
    ],
    cluster: [
      { value: 'all', label: 'All' },
      { value: 'operations', label: 'Operations' },
      { value: 'sales', label: 'Sales' },
      { value: 'corporate', label: 'Corporate' }
    ],
    businessUnit: [
      { value: 'all', label: 'All' },
      { value: 'finance', label: 'Finance' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'technology', label: 'Technology' },
      { value: 'operations', label: 'Operations' },
      { value: 'human-resources', label: 'Human Resources' },
      { value: 'sales', label: 'Sales' }
    ],
    divisions: [
      { value: 'all', label: 'All' },
      { value: 'division-1', label: 'Division 1' },
      { value: 'division-2', label: 'Division 2' },
      { value: 'division-3', label: 'Division 3' },
      { value: 'division-4', label: 'Division 4' },
      { value: 'division-5', label: 'Division 5' }
    ],
    departments: [
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
    teams: [
      { value: 'all', label: 'All' },
      { value: 'team-alpha', label: 'Team Alpha' },
      { value: 'team-beta', label: 'Team Beta' },
      { value: 'team-gamma', label: 'Team Gamma' },
      { value: 'team-delta', label: 'Team Delta' },
      { value: 'team-epsilon', label: 'Team Epsilon' }
    ],
    jobFamily: [
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
    workersManager: [
      { value: 'all', label: 'All' },
      { value: 'manager-1', label: 'Manager 1' },
      { value: 'manager-2', label: 'Manager 2' },
      { value: 'manager-3', label: 'Manager 3' },
      { value: 'manager-4', label: 'Manager 4' },
      { value: 'manager-5', label: 'Manager 5' },
      { value: 'manager-6', label: 'Manager 6' }
    ],
    race: [
      { value: 'all', label: 'All' },
      { value: 'asian', label: 'Asian' },
      { value: 'black', label: 'Black' },
      { value: 'coloured', label: 'Coloured' },
      { value: 'white', label: 'White' },
      { value: 'other', label: 'Other' },
      { value: 'prefer-not', label: 'Prefer not to say' }
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
    managementLevel: [
      { value: 'all', label: 'All' },
      { value: 'executive', label: 'Executive' },
      { value: 'senior-management', label: 'Senior Management' },
      { value: 'middle-management', label: 'Middle Management' },
      { value: 'supervisor', label: 'Supervisor' },
      { value: 'individual-contributor', label: 'Individual Contributor' },
      { value: 'entry-level', label: 'Entry Level' }
    ],
    performanceLevel: [
      { value: 'all', label: 'All' },
      { value: 'high-performer', label: 'High Performer' },
      { value: 'medium-performer', label: 'Medium Performer' },
      { value: 'low-performer', label: 'Low Performer' }
    ],
    country: [
      { value: 'all', label: 'All' },
      { value: 'south-africa', label: 'South Africa' },
      { value: 'namibia', label: 'Namibia' },
      { value: 'botswana', label: 'Botswana' }
    ],
    supervisoryOrg: [
      { value: 'all', label: 'All' },
      { value: 'executive-office', label: 'Executive Office' },
      { value: 'finance-operations', label: 'Finance & Operations' },
      { value: 'human-resources', label: 'Human Resources' },
      { value: 'information-technology', label: 'Information Technology' },
      { value: 'legal-compliance', label: 'Legal & Compliance' },
      { value: 'marketing-communications', label: 'Marketing & Communications' },
      { value: 'sales-distribution', label: 'Sales & Distribution' }
    ],
    region: [
      { value: 'all', label: 'All' },
      { value: 'south-africa', label: 'South Africa' },
      { value: 'southern-africa', label: 'Southern Africa' },
      { value: 'east-africa', label: 'East Africa' },
      { value: 'west-africa', label: 'West Africa' }
    ]
  };

  const filterDisplayNames = {
    workerGroup: 'Worker Group',
    cluster: 'Cluster',
    businessUnit: 'Business Unit',
    divisions: 'Division',
    departments: 'Department',
    teams: 'Team',
    country: 'Country',
    region: 'Region',
    supervisoryOrg: 'Supervisory Organization',
    jobFamily: 'Job Family',
    workersManager: "Worker's Manager",
    ageBand: 'Age',
    gender: 'Gender',
    race: 'Race',
    managementLevel: 'Management Level',
    performanceLevel: 'Performance Level'
  };

  const summaryIdMap = {
    workerGroup: 'workerGroupSelectedSummary',
    cluster: 'clusterSelectedSummary',
    businessUnit: 'businessUnitSelectedSummary',
    divisions: 'divisionsSelectedSummary',
    departments: 'departmentsSelectedSummary',
    teams: 'teamsSelectedSummary',
    country: 'countrySelectedSummary',
    region: 'regionSelectedSummary',
    supervisoryOrg: 'supervisoryOrgSelectedSummary',
    jobFamily: 'jobFamilySelectedSummary',
    workersManager: 'workersManagerSelectedSummary',
    ageBand: 'ageBandSelectedSummary',
    gender: 'genderSelectedSummary',
    race: 'raceSelectedSummary',
    managementLevel: 'managementLevelSelectedSummary',
    performanceLevel: 'performanceLevelSelectedSummary'
  };

  const buttonConfig = {
    openWorkerGroupModal: { key: 'workerGroup', title: 'Select Worker Group' },
    openClusterModal: { key: 'cluster', title: 'Select Cluster' },
    openBusinessUnitModal: { key: 'businessUnit', title: 'Select Business Unit' },
    openDivisionsModal: { key: 'divisions', title: 'Select Division' },
    openDepartmentsModal: { key: 'departments', title: 'Select Department' },
    openTeamsModal: { key: 'teams', title: 'Select Team' },
    openCountryModal: { key: 'country', title: 'Select Country' },
    openRegionModal: { key: 'region', title: 'Select Region' },
    openSupervisoryOrgModal: { key: 'supervisoryOrg', title: 'Select Supervisory Organization' },
    openJobFamilyModal: { key: 'jobFamily', title: 'Select Job Family' },
    openWorkersManagerModal: { key: 'workersManager', title: "Select Worker's Manager" },
    openAgeBandModal: { key: 'ageBand', title: 'Select Age' },
    openGenderModal: { key: 'gender', title: 'Select Gender' },
    openRaceModal: { key: 'race', title: 'Select Race' },
    openManagementLevelModal: { key: 'managementLevel', title: 'Select Management Level' },
    openPerformanceLevelModal: { key: 'performanceLevel', title: 'Select Performance Level' }
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
      const singleLabel = Object.values(perFilter)[0][0];
      indicator.textContent = `- ${singleLabel}`;
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
    infoIcon.className = 'bx bx-info-circle ms-1';
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
    // exposed for debugging/demo only
    _updateTitleIndicator: updateTitleIndicator
  });
})();

