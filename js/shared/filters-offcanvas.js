// Inject shared Filters Offcanvas markup (single source of truth).
// Keeps `index.html` and `comments-analysis.html` DRY by avoiding duplicated HTML.
(() => {
  const OFFCANVAS_ID = 'filtersOffcanvas';

  function injectFiltersOffcanvas() {
    if (document.getElementById(OFFCANVAS_ID)) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <!-- Filters Offcanvas (injected) -->
      <div class="offcanvas-backdrop no-export" id="${OFFCANVAS_ID}">
        <div class="offcanvas-content">
          <div class="offcanvas-header">
            <h4 class="mb-0"><i class='bx bx-filter'></i> Filters</h4>
            <button class="btn-icon" onclick="uiOffcanvas.hide('${OFFCANVAS_ID}')" aria-label="Close">
              <i class='bx bx-x icon-24'></i>
            </button>
          </div>

          <div class="offcanvas-body">
            <form class="modern-report-form">
              <div class="report-filters-card">
                <h3>Organisational Levels</h3>
                <div class="filters-grid">
                  <div class="filter-row">
                    <label>Organisational Level 1</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel1Modal">Select Organisational Level 1</button>
                    <span class="selected-summary" id="organisationalLevel1SelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Organisational Level 2</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel2Modal">Select Organisational Level 2</button>
                    <span class="selected-summary" id="organisationalLevel2SelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Organisational Level 3</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel3Modal">Select Organisational Level 3</button>
                    <span class="selected-summary" id="organisationalLevel3SelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Organisational Level 4</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel4Modal">Select Organisational Level 4</button>
                    <span class="selected-summary" id="organisationalLevel4SelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Organisational Level 5</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel5Modal">Select Organisational Level 5</button>
                    <span class="selected-summary" id="organisationalLevel5SelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Organisational Level 6</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel6Modal">Select Organisational Level 6</button>
                    <span class="selected-summary" id="organisationalLevel6SelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Organisational Level 7</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel7Modal">Select Organisational Level 7</button>
                    <span class="selected-summary" id="organisationalLevel7SelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Organisational Level 8</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel8Modal">Select Organisational Level 8</button>
                    <span class="selected-summary" id="organisationalLevel8SelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Organisational Level 9</label>
                    <button type="button" class="filter-modal-btn" id="openOrganisationalLevel9Modal">Select Organisational Level 9</button>
                    <span class="selected-summary" id="organisationalLevel9SelectedSummary">All</span>
                  </div>
                </div>
              </div>

              <div class="report-filters-card">
                <div class="filters-grid">
                  <div class="filter-row">
                    <label>Line Manager</label>
                    <button type="button" class="filter-modal-btn" id="openLineManagerModal">Select Line Manager</button>
                    <span class="selected-summary" id="lineManagerSelectedSummary">All</span>
                  </div>
                  <div class="filter-row justify-content-center">
                   <div class="form-check">
                    <input class="form-check-input" style="width: 16px; height: 16px;" type="checkbox" value="" id="includeIndirectReports">
                    <label class="form-check-label" for="includeIndirectReports">
                      Include indirect reports
                    </label>
                  </div>
                  </div>
                </div>
              </div>

              <div class="report-filters-card">
                <h3>Demographics</h3>
                <div class="filters-grid">
                  <div class="filter-row">
                    <label>Gender</label>
                    <button type="button" class="filter-modal-btn" id="openGenderModal">Select Gender</button>
                    <span class="selected-summary" id="genderSelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Age</label>
                    <button type="button" class="filter-modal-btn" id="openAgeBandModal">Select Age</button>
                    <span class="selected-summary" id="ageBandSelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Ethnicity</label>
                    <button type="button" class="filter-modal-btn" id="openEthnicityModal">Select Ethnicity</button>
                    <span class="selected-summary" id="ethnicitySelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Tenure</label>
                    <button type="button" class="filter-modal-btn" id="openTenureModal">Select Tenure</button>
                    <span class="selected-summary" id="tenureSelectedSummary">All</span>
                  </div>
                  <div class="filter-row">
                    <label>Job Level</label>
                    <button type="button" class="filter-modal-btn" id="openJobLevelModal">Select Job Level</button>
                    <span class="selected-summary" id="jobLevelSelectedSummary">All</span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="offcanvas-footer justify-content-end">
            <button class="btn-custom btn-secondary" onclick="reportFilters.reset()">
              <i class='bx bx-reset'></i> Clear Filters
            </button>
            <button class="btn-custom btn-primary" onclick="reportFilters.apply(); uiOffcanvas.hide('${OFFCANVAS_ID}')">
              <i class='bx bx-check'></i> Apply Selection
            </button>
          </div>
        </div>
      </div>
    `.trim();

    document.body.appendChild(wrapper.firstElementChild);
  }

  function bootstrapFilters() {
    injectFiltersOffcanvas();

    // Ensure wiring runs after the markup exists.
    if (window.reportFilters && !window.__reportFiltersInitialized) {
      window.reportFilters.init();
      window.__reportFiltersInitialized = true;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapFilters);
  } else {
    bootstrapFilters();
  }
})();

