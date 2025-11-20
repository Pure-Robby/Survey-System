// Reports Section JavaScript - Simplified for Demo

// Filter Options Data
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
  company: [
    { value: 'all', label: 'All' },
    { value: 'Sanlam', label: 'Sanlam' },
    { value: 'Santam', label: 'Santam' },
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

let currentFilterKey = null;
let tempSelected = [];

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeFilterModals();
  initializeTabs();
  initializeStickySampleSize();
  initializeFileUpload();
  initializeReportComposition();
});

// Filter Modal Functions
function initializeFilterModals() {
  const filterModal = document.getElementById('filterModal');
  const filterModalTitle = document.getElementById('filterModalTitle');
  const filterModalBody = document.getElementById('filterModalBody');
  const applyFilterModal = document.getElementById('applyFilterModal');
  const cancelFilterModal = document.getElementById('cancelFilterModal');

  if (!filterModal) return;

  // Initialize selected arrays (all selected by default)
  const selectedFilters = {};
  Object.keys(filterOptions).forEach(key => {
    selectedFilters[key] = filterOptions[key].map(o => o.value);
  });

  // Open filter modal
  function openFilterModal(filterKey, title, selected) {
    currentFilterKey = filterKey;
    tempSelected = [...selected];
    filterModalTitle.textContent = title;
    filterModalBody.innerHTML = '';
    const options = filterOptions[filterKey];
    
    options.forEach((opt) => {
      const label = document.createElement('label');
      if (opt.value === 'all') label.classList.add('all-option');
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.gap = '8px';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = opt.value;
      checkbox.checked = tempSelected.includes(opt.value);
      
      checkbox.addEventListener('change', (e) => {
        if (opt.value === 'all') {
          if (e.target.checked) {
            tempSelected = options.map(o => o.value);
          } else {
            tempSelected = [];
          }
          filterModalBody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = e.target.checked;
          });
        } else {
          if (e.target.checked) {
            tempSelected.push(opt.value);
          } else {
            tempSelected = tempSelected.filter(v => v !== opt.value && v !== 'all');
          }
          const allExceptAll = options.filter(o => o.value !== 'all').map(o => o.value);
          const allChecked = allExceptAll.every(v => tempSelected.includes(v));
          const allCheckbox = filterModalBody.querySelector('input[value="all"]');
          if (allCheckbox) allCheckbox.checked = allChecked;
          if (allChecked) {
            if (!tempSelected.includes('all')) tempSelected.push('all');
          } else {
            tempSelected = tempSelected.filter(v => v !== 'all');
          }
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

  // Apply filter
  applyFilterModal.addEventListener('click', () => {
    if (currentFilterKey) {
      selectedFilters[currentFilterKey] = [...tempSelected];
      updateFilterSummary(currentFilterKey, selectedFilters[currentFilterKey]);
    }
    filterModal.classList.remove('active');
  });

  // Cancel filter
  cancelFilterModal.addEventListener('click', () => {
    filterModal.classList.remove('active');
  });

  // Close on overlay click
  const overlay = filterModal.querySelector('.filter-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      filterModal.classList.remove('active');
    });
  }

  // Set up filter button listeners
  const filterButtons = {
    'openWorkerGroupModal': { key: 'workerGroup', title: 'Select Worker Group' },
    'openClusterModal': { key: 'cluster', title: 'Select Cluster' },
    'openBusinessUnitModal': { key: 'businessUnit', title: 'Select Business Unit' },
    'openDivisionsModal': { key: 'divisions', title: 'Select Division' },
    'openDepartmentsModal': { key: 'departments', title: 'Select Department' },
    'openTeamsModal': { key: 'teams', title: 'Select Team' },
    'openCountryModal': { key: 'country', title: 'Select Country' },
    'openRegionModal': { key: 'region', title: 'Select Region' },
    'openCompanyModal': { key: 'company', title: 'Select Company' },
    'openSupervisoryOrgModal': { key: 'supervisoryOrg', title: 'Select Supervisory Organization' },
    'openJobFamilyModal': { key: 'jobFamily', title: 'Select Job Family' },
    'openWorkersManagerModal': { key: 'workersManager', title: 'Select Worker\'s Manager' },
    'openAgeBandModal': { key: 'ageBand', title: 'Select Age' },
    'openGenderModal': { key: 'gender', title: 'Select Gender' },
    'openRaceModal': { key: 'race', title: 'Select Race' },
    'openManagementLevelModal': { key: 'managementLevel', title: 'Select Management Level' }
  };

  Object.keys(filterButtons).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        const config = filterButtons[btnId];
        openFilterModal(config.key, config.title, selectedFilters[config.key]);
      });
    }
  });

  // Initialize summaries
  Object.keys(filterOptions).forEach(key => {
    updateFilterSummary(key, selectedFilters[key]);
  });
}

  // Update filter summary display
function updateFilterSummary(filterKey, selected) {
  // Map filter keys to their summary element IDs
  const summaryIdMap = {
    'workerGroup': 'workerGroupSelectedSummary',
    'cluster': 'clusterSelectedSummary',
    'businessUnit': 'businessUnitSelectedSummary',
    'divisions': 'divisionsSelectedSummary',
    'departments': 'departmentsSelectedSummary',
    'teams': 'teamsSelectedSummary',
    'country': 'countrySelectedSummary',
    'region': 'regionSelectedSummary',
    'company': 'companySelectedSummary',
    'supervisoryOrg': 'supervisoryOrgSelectedSummary',
    'jobFamily': 'jobFamilySelectedSummary',
    'workersManager': 'workersManagerSelectedSummary',
    'ageBand': 'ageBandSelectedSummary',
    'gender': 'genderSelectedSummary',
    'race': 'raceSelectedSummary',
    'managementLevel': 'managementLevelSelectedSummary'
  };

  const summaryId = summaryIdMap[filterKey];
  if (!summaryId) return;
  
  const summary = document.getElementById(summaryId);
  if (!summary) return;

  const options = filterOptions[filterKey];
  if (!options) return;

  if (selected.includes('all') || selected.length === options.length) {
    summary.textContent = 'All';
    summary.className = 'selected-summary';
  } else if (selected.length === 0) {
    summary.textContent = 'None';
    summary.className = 'selected-summary';
  } else {
    summary.innerHTML = '';
    summary.className = 'selected-summary multiple';
    const selectedOptions = options
      .filter(opt => selected.includes(opt.value) && opt.value !== 'all');
    selectedOptions.forEach(opt => {
      const tag = document.createElement('span');
      tag.className = 'summary-tag';
      tag.textContent = opt.label;
      summary.appendChild(tag);
    });
  }
}

// Tab Switching
function initializeTabs() {
  const tabs = document.querySelectorAll('.content-tab');
  const tabPanes = document.querySelectorAll('.content-tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      tabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      const targetPane = document.getElementById(targetTab + '-tab');
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// Sticky Sample Size Card
function initializeStickySampleSize() {
  const resultsCountCard = document.getElementById('resultsCountCard');
  const stickyResultsCard = document.getElementById('stickyResultsCard');
  const stickyResultsCount = document.getElementById('stickyResultsCount');
  const resultsCount = document.getElementById('resultsCount');
  
  if (!resultsCountCard || !stickyResultsCard) return;

  let isStickyVisible = false;
  stickyResultsCard.style.display = 'none';

  function syncStickyContent() {
    if (stickyResultsCount && resultsCount) {
      stickyResultsCount.textContent = resultsCount.textContent;
    }
    const countTotal = document.querySelector('#resultsCountCard .count-total');
    const stickyCountTotal = document.querySelector('#stickyResultsCard .count-total');
    if (countTotal && stickyCountTotal) {
      stickyCountTotal.textContent = countTotal.textContent;
    }
  }

  function showStickyCard() {
    if (!isStickyVisible) {
      syncStickyContent();
      stickyResultsCard.style.display = 'block';
      isStickyVisible = true;
    }
  }

  function hideStickyCard() {
    if (isStickyVisible) {
      stickyResultsCard.style.display = 'none';
      isStickyVisible = false;
    }
  }

  function checkScrollPosition() {
    const rect = resultsCountCard.getBoundingClientRect();
    const isOriginalCardVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isOriginalCardVisible) {
      hideStickyCard();
    } else {
      showStickyCard();
    }
  }

  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        checkScrollPosition();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  setTimeout(checkScrollPosition, 1000);
  window.addEventListener('resize', function() {
    setTimeout(checkScrollPosition, 100);
  });

  window.syncStickyContent = syncStickyContent;
}

// Sample Size Loading Functions
function showSampleSizeLoading() {
  const resultsCountCard = document.getElementById('resultsCountCard');
  const stickyResultsCard = document.getElementById('stickyResultsCard');
  const resultsCountSpinner = document.getElementById('resultsCountSpinner');
  const stickyResultsCountSpinner = document.getElementById('stickyResultsCountSpinner');
  const resultsCountDisplay = resultsCountCard?.querySelector('.count-display');
  const stickyResultsCountDisplay = stickyResultsCard?.querySelector('.count-display');

  if (resultsCountSpinner) resultsCountSpinner.style.display = 'flex';
  if (stickyResultsCountSpinner) stickyResultsCountSpinner.style.display = 'flex';
  if (resultsCountDisplay) resultsCountDisplay.classList.add('loading');
  if (stickyResultsCountDisplay) stickyResultsCountDisplay.classList.add('loading');
}

function hideSampleSizeLoading() {
  const resultsCountCard = document.getElementById('resultsCountCard');
  const stickyResultsCard = document.getElementById('stickyResultsCard');
  const resultsCountSpinner = document.getElementById('resultsCountSpinner');
  const stickyResultsCountSpinner = document.getElementById('stickyResultsCountSpinner');
  const resultsCountDisplay = resultsCountCard?.querySelector('.count-display');
  const stickyResultsCountDisplay = stickyResultsCard?.querySelector('.count-display');

  if (resultsCountSpinner) resultsCountSpinner.style.display = 'none';
  if (stickyResultsCountSpinner) stickyResultsCountSpinner.style.display = 'none';
  if (resultsCountDisplay) resultsCountDisplay.classList.remove('loading');
  if (stickyResultsCountDisplay) stickyResultsCountDisplay.classList.remove('loading');
}

// File Upload Functions
function initializeFileUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const uploadPreview = document.getElementById('uploadPreview');
  const uploadActions = document.getElementById('uploadActions');
  const fileInput = document.getElementById('customReportFile');
  const browseFileBtn = document.getElementById('browseFileBtn');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const processReportBtn = document.getElementById('processReportBtn');
  const cancelUploadBtn = document.getElementById('cancelUploadBtn');

  if (!uploadArea || !fileInput) return;

  if (browseFileBtn) {
    browseFileBtn.addEventListener('click', () => fileInput.click());
  }

  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) handleFileUpload(file);
    });
  }

  if (uploadArea) {
    uploadArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', function(e) {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', function(e) {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length > 0) handleFileUpload(files[0]);
    });
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', resetFileUpload);
  }

  if (cancelUploadBtn) {
    cancelUploadBtn.addEventListener('click', resetFileUpload);
  }

  if (processReportBtn) {
    processReportBtn.addEventListener('click', function() {
      alert('Report processing functionality would be implemented here.');
    });
  }

  function handleFileUpload(file) {
    const allowedTypes = ['.xlsx', '.csv'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please select a valid file type: XLSX or CSV');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    if (fileName) fileName.textContent = file.name;
    if (fileSize) fileSize.textContent = formatFileSize(file.size);
    
    if (uploadArea) uploadArea.style.display = 'none';
    if (uploadPreview) uploadPreview.style.display = 'block';
    if (uploadActions) uploadActions.style.display = 'block';
  }

  function resetFileUpload() {
    if (fileInput) fileInput.value = '';
    if (uploadArea) {
      uploadArea.style.display = 'block';
      uploadArea.classList.remove('drag-over');
    }
    if (uploadPreview) uploadPreview.style.display = 'none';
    if (uploadActions) uploadActions.style.display = 'none';
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Report Composition Checkboxes
function initializeReportComposition() {
  const compositionCheckboxes = document.querySelectorAll('input[name="compositionItems"]');
  
  compositionCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Simple demo - just log the change
      console.log('Composition checkbox changed:', this.value, this.checked);
    });
  });
}

