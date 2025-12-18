// Dashboard Interactions Module

// ==================== Mock Data Access ====================
// Mock data is loaded from mock-data.js and available via window.mockData
// Access: window.mockData.leverDetailsData, window.mockData.progressTrackerData, window.mockData.businessUnitData
// In production: Remove mock-data.js script tag and replace with API calls

// Helper getters to avoid null errors and provide fallbacks
const getMockData = () => window.mockData || {};
const getLeverDetailsData = () => getMockData().leverDetailsData || { levers: [] };
const getProgressTrackerData = () => getMockData().progressTrackerData || { company: {}, segments: [] };
const getBusinessUnitData = () => getMockData().businessUnitData || [];

// ==================== Get Today's Date ====================
const options = { day: "2-digit", month: "short", year: "numeric" };
const dataDateElement = document.getElementById("dataDate");
if (dataDateElement) {
    dataDateElement.textContent =
        "Data correct as of: " + new Date().toLocaleDateString("en-GB", options);
}


// ==================== Counter Animation ====================
function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ==================== Tab Switching ====================
function initTabs() {
    // Handle old-style tabs with data-tab-content
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Handle new-style content tabs (matching reports page)
    const contentTabs = document.querySelectorAll('.content-tab');
    const contentTabPanes = document.querySelectorAll('.content-tab-pane');
    
    contentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active from all tabs and panes
            contentTabs.forEach(t => t.classList.remove('active'));
            contentTabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked tab
            tab.classList.add('active');
            
            // Find and activate target pane
            const targetPane = document.getElementById(`${targetTab}-tab`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            
            // Initialize leaderboard on first view
            if (targetTab === 'leaderboard' && typeof initializeLeaderboard === 'function') {
                initializeLeaderboard();
            }
        });
    });
}

// ==================== Filter Interactions ====================
function initFilters() {
    const filterButtons = document.querySelectorAll('[data-filter-all]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterId = button.getAttribute('data-filter-all');
            const select = document.getElementById(filterId);
            if (select) {
                select.selectedIndex = 0; // Reset to first option
            }
        });
    });
}

// ==================== Table Sorting ====================
function initTableSort() {
    const sortableHeaders = document.querySelectorAll('th[data-sortable]');
    
    sortableHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            const table = header.closest('table');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const columnIndex = Array.from(header.parentElement.children).indexOf(header);
            const isAscending = header.classList.contains('sort-asc');
            
            // Remove sort classes from all headers
            sortableHeaders.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            
            // Add sort class to current header
            if (isAscending) {
                header.classList.add('sort-desc');
            } else {
                header.classList.add('sort-asc');
            }
            
            // Sort rows
            rows.sort((a, b) => {
                const aValue = a.children[columnIndex].textContent.trim();
                const bValue = b.children[columnIndex].textContent.trim();
                
                // Try to parse as number
                const aNum = parseFloat(aValue.replace(/[^0-9.-]/g, ''));
                const bNum = parseFloat(bValue.replace(/[^0-9.-]/g, ''));
                
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return isAscending ? bNum - aNum : aNum - bNum;
                } else {
                    return isAscending ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
                }
            });
            
            // Reappend sorted rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

// ==================== Expand/Collapse Sections ====================
function initExpandCollapse() {
    const toggleButtons = document.querySelectorAll('[data-toggle]');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-toggle');
            const target = document.getElementById(targetId);
            
            if (target) {
                const isHidden = target.classList.contains('d-none');
                if (isHidden) {
                    target.classList.remove('d-none');
                    button.textContent = button.getAttribute('data-text-collapse') || 'View Less';
                } else {
                    target.classList.add('d-none');
                    button.textContent = button.getAttribute('data-text-expand') || 'View All';
                }
            }
        });
    });
}

// ==================== Checkbox Selection ====================
function initCheckboxes() {
    const masterCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    if (masterCheckbox) {
        masterCheckbox.addEventListener('change', () => {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = masterCheckbox.checked;
                updateRowSelection(checkbox);
            });
            updateBulkActions();
        });
    }
    
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateRowSelection(checkbox);
            updateBulkActions();
            
            // Update master checkbox
            if (masterCheckbox) {
                const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
                const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
                masterCheckbox.checked = allChecked;
                masterCheckbox.indeterminate = someChecked && !allChecked;
            }
        });
    });
}

function updateRowSelection(checkbox) {
    const row = checkbox.closest('tr');
    if (row) {
        if (checkbox.checked) {
            row.classList.add('selected');
        } else {
            row.classList.remove('selected');
        }
    }
}

function updateBulkActions() {
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');
    
    if (bulkActions && selectedCount) {
        if (checkedCount > 0) {
            bulkActions.classList.remove('d-none');
            selectedCount.textContent = checkedCount;
        } else {
            bulkActions.classList.add('d-none');
        }
    }
}

// ==================== Offcanvas Functions ====================
function showOffcanvas(offcanvasId) {
    const offcanvas = document.getElementById(offcanvasId);
    if (offcanvas) {
        offcanvas.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Close on backdrop click
        offcanvas.addEventListener('click', function(e) {
            if (e.target === offcanvas) {
                hideOffcanvas(offcanvasId);
            }
        });
    }
}

function hideOffcanvas(offcanvasId) {
    const offcanvas = document.getElementById(offcanvasId);
    if (offcanvas) {
        offcanvas.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function clearFilters() {
    // Reset all filter dropdowns
    const filterIds = [
        'filter-worker-group', 'filter-cluster', 'filter-business-unit',
        'filter-division', 'filter-department', 'filter-job-family',
        'filter-manager', 'filter-age', 'filter-gender', 'filter-race'
    ];
    
    filterIds.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.selectedIndex = 0;
        }
    });
    
    alert('All filters have been cleared.');
}

function applyFilters() {
    // Collect selected filter values
    const filters = {
        workerGroup: document.getElementById('filter-worker-group').value,
        cluster: document.getElementById('filter-cluster').value,
        businessUnit: document.getElementById('filter-business-unit').value,
        division: document.getElementById('filter-division').value,
        department: document.getElementById('filter-department').value,
        jobFamily: document.getElementById('filter-job-family').value,
        manager: document.getElementById('filter-manager').value,
        age: document.getElementById('filter-age').value,
        gender: document.getElementById('filter-gender').value,
        race: document.getElementById('filter-race').value
    };
    
    // Filter out default/unselected values
    const activeFilters = Object.entries(filters)
        .filter(([key, value]) => !value.toLowerCase().startsWith('select'))
        .map(([key, value]) => value);
    
    hideOffcanvas('filtersOffcanvas');
    
    if (activeFilters.length > 0) {
        alert(`Filters applied:\n${activeFilters.join('\n')}\n\nIn production, this would update the dashboard data.`);
    } else {
        alert('No filters selected.');
    }
}

// ==================== Modal Functions ====================
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ==================== Export Functions ====================
/**
 * Export dashboard data to PDF
 * @param {string} filename - Name of the PDF file
 * Production: Implement server-side PDF generation or use a library like jsPDF
 */
function exportToPDF(filename = 'report') {
    alert(`PDF Export: ${filename}.pdf\n\nIn production, this would generate a PDF report of the current dashboard.`);
}

/**
 * Export dashboard data to PowerPoint
 * @param {string} filename - Name of the PowerPoint file
 * Production: Implement server-side PowerPoint generation or use a library like PptxGenJS
 */
function exportToPPT(filename = 'report') {
    alert(`PowerPoint Export: ${filename}.pptx\n\nIn production, this would generate a PowerPoint presentation.`);
}

/**
 * Export comments data to Excel
 * @param {string} filename - Name of the Excel file
 * Production: Use a library like SheetJS (xlsx) for Excel export
 */
function exportToExcel(filename = 'comments') {
    alert(`Excel Export: ${filename}.xlsx\n\nIn production, this would export comments data to Excel.`);
}

// ==================== Character Counter ====================
function initCharCounter() {
    const inputs = document.querySelectorAll('[data-char-limit]');
    
    inputs.forEach(input => {
        const limit = parseInt(input.getAttribute('data-char-limit'));
        const counterId = input.getAttribute('data-counter-id');
        const counter = document.getElementById(counterId);
        
        if (counter) {
            const updateCounter = () => {
                const remaining = limit - input.value.length;
                counter.textContent = remaining;
                
                if (remaining < 0) {
                    counter.classList.add('text-danger');
                } else {
                    counter.classList.remove('text-danger');
                }
            };
            
            input.addEventListener('input', updateCounter);
            updateCounter();
        }
    });
}

// ==================== Progress Tracker State Management ====================
let progressTrackerState = {
    currentLevel: 'company',  // 'company', 'segments', 'divisions', 'departments', 'teams'
    currentSegment: null,
    currentDivision: null,
    currentDepartment: null,
    breadcrumbs: [{ level: 'company', name: 'Sanlam Overall' }],
    sortBy: null,
    sortDirection: 'asc'
};

// Progress Tracker Functions
function initializeProgressTracker() {
    renderProgressSummary();
    renderProgressTable();
    setupProgressEventListeners();
}

function setupProgressEventListeners() {
    // Back button
    const backBtn = document.getElementById('backToParent');
    if (backBtn) {
        backBtn.addEventListener('click', navigateBackInHierarchy);
    }
    
    // Table sorting
    const sortableHeaders = document.querySelectorAll('.progress-table th.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.getAttribute('data-sort');
            handleTableSort(sortKey);
        });
    });
}

function renderProgressSummary() {
    const data = getCurrentProgressData();
    
    const setField = (field, value, formatter = (v) => v.toLocaleString()) => {
        document.querySelectorAll(`[data-progress-field="${field}"]`).forEach(el => {
            el.textContent = formatter(value);
        });
    };

    setField('totalPopulation', data.population);
    setField('totalCompleted', data.completed);
    setField('totalInProgress', data.inProgress);
    setField('totalNotStarted', data.notStarted);

    document.querySelectorAll('[data-progress-field="overallCompletionRate"]').forEach(el => {
        el.textContent = data.completionRate + '%';
        el.className = 'card-value card-completion-rate';
    });
}

function renderProgressTable() {
    const tableData = getTableData();
    const tableBody = document.getElementById('progressTableBody');
    const tableTitle = document.getElementById('tableTitle');
    const backButton = document.getElementById('backToParent');
    
    if (!tableBody) return;

    
    // Update breadcrumbs
    updateBreadcrumbs();
    
    // Apply sorting if active
    let dataToRender = tableData;
    if (progressTrackerState.sortBy) {
        dataToRender = [...tableData].sort((a, b) => {
            let aValue, bValue;
            
            switch(progressTrackerState.sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    return progressTrackerState.sortDirection === 'asc' 
                        ? aValue.localeCompare(bValue) 
                        : bValue.localeCompare(aValue);
                case 'population':
                case 'completed':
                case 'inprogress':
                case 'notstarted':
                case 'completion':
                    aValue = progressTrackerState.sortBy === 'completion' ? a.completionRate : a[progressTrackerState.sortBy === 'inprogress' ? 'inProgress' : progressTrackerState.sortBy === 'notstarted' ? 'notStarted' : progressTrackerState.sortBy];
                    bValue = progressTrackerState.sortBy === 'completion' ? b.completionRate : b[progressTrackerState.sortBy === 'inprogress' ? 'inProgress' : progressTrackerState.sortBy === 'notstarted' ? 'notStarted' : progressTrackerState.sortBy];
                    return progressTrackerState.sortDirection === 'asc' 
                        ? aValue - bValue 
                        : bValue - aValue;
                default:
                    return 0;
            }
        });
    }
    
    // Render table rows
    tableBody.innerHTML = dataToRender.map(item => {
        const hasChildren = item.hasChildren;
        const rowClass = hasChildren ? 'clickable-row' : '';
        const unitClass = hasChildren ? 'unit-name clickable' : 'unit-name';
        const onClick = hasChildren ? `onclick="drillDown('${item.name.replace(/'/g, "\\'")}')" title="Click to view details"` : '';
        
        return `
        <tr ${onClick} class="${rowClass}">
            <td>
                <span class="${unitClass}">${item.name}</span>
            </td>
            <td>${item.population.toLocaleString()}</td>
            <td>${item.completed.toLocaleString()}</td>
            <td>${item.inProgress.toLocaleString()}</td>
            <td>${item.notStarted.toLocaleString()}</td>
            <td>
                <span class="completion-rate ${getCompletionRateClass(item.completionRate)}">
                    ${item.completionRate}%
                </span>
            </td>
        </tr>
    `;
    }).join('');
}

function getCurrentProgressData() {
    const data = getProgressTrackerData();
    if (progressTrackerState.currentLevel === 'company') {
        return data.company;
    } else if (progressTrackerState.currentLevel === 'segments') {
        const segment = data.segments.find(s => s.name === progressTrackerState.currentSegment);
        return segment || data.company;
    } else if (progressTrackerState.currentLevel === 'divisions') {
        const segment = data.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        return division || data.company;
    } else if (progressTrackerState.currentLevel === 'departments') {
        const segment = data.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        const department = division ? division.departments.find(d => d.name === progressTrackerState.currentDepartment) : null;
        return department || data.company;
    } else if (progressTrackerState.currentLevel === 'teams') {
        const segment = data.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        const department = division ? division.departments.find(d => d.name === progressTrackerState.currentDepartment) : null;
        return department || data.company;
    }
    return data.company;
}

function getTableData() {
    const data = getProgressTrackerData();
    if (progressTrackerState.currentLevel === 'company') {
        return data.segments.map(segment => ({
            ...segment,
            hasChildren: segment.divisions && segment.divisions.length > 0
        }));
    } else if (progressTrackerState.currentLevel === 'segments') {
        const segment = data.segments.find(s => s.name === progressTrackerState.currentSegment);
        return segment ? segment.divisions.map(division => ({
            ...division,
            hasChildren: division.departments && division.departments.length > 0
        })) : [];
    } else if (progressTrackerState.currentLevel === 'divisions') {
        const segment = data.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        return division ? division.departments.map(department => ({
            ...department,
            hasChildren: department.teams && department.teams.length > 0
        })) : [];
    } else if (progressTrackerState.currentLevel === 'departments') {
        const segment = data.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        const department = division ? division.departments.find(d => d.name === progressTrackerState.currentDepartment) : null;
        return department ? department.teams.map(team => ({
            ...team,
            hasChildren: false
        })) : [];
    }
    return [];
}

function drillDown(itemName) {
    if (progressTrackerState.currentLevel === 'company') {
        // Drilling into segments
        progressTrackerState.currentLevel = 'segments';
        progressTrackerState.currentSegment = itemName;
        progressTrackerState.breadcrumbs.push({ level: 'segments', name: itemName });
    } else if (progressTrackerState.currentLevel === 'segments') {
        // Drilling into divisions
        progressTrackerState.currentLevel = 'divisions';
        progressTrackerState.currentDivision = itemName;
        progressTrackerState.breadcrumbs.push({ level: 'divisions', name: itemName });
    } else if (progressTrackerState.currentLevel === 'divisions') {
        // Drilling into departments
        progressTrackerState.currentLevel = 'departments';
        progressTrackerState.currentDepartment = itemName;
        progressTrackerState.breadcrumbs.push({ level: 'departments', name: itemName });
    } else if (progressTrackerState.currentLevel === 'departments') {
        // Drilling into teams
        progressTrackerState.currentLevel = 'teams';
        progressTrackerState.breadcrumbs.push({ level: 'teams', name: itemName });
    }
    
    renderProgressSummary();
    renderProgressTable();
}

function navigateBackInHierarchy() {
    if (progressTrackerState.currentLevel === 'segments') {
        progressTrackerState.currentLevel = 'company';
        progressTrackerState.currentSegment = null;
        progressTrackerState.breadcrumbs = progressTrackerState.breadcrumbs.slice(0, 1);
    } else if (progressTrackerState.currentLevel === 'divisions') {
        progressTrackerState.currentLevel = 'segments';
        progressTrackerState.currentDivision = null;
        progressTrackerState.breadcrumbs = progressTrackerState.breadcrumbs.slice(0, 2);
    } else if (progressTrackerState.currentLevel === 'departments') {
        progressTrackerState.currentLevel = 'divisions';
        progressTrackerState.currentDepartment = null;
        progressTrackerState.breadcrumbs = progressTrackerState.breadcrumbs.slice(0, 3);
    } else if (progressTrackerState.currentLevel === 'teams') {
        progressTrackerState.currentLevel = 'departments';
        progressTrackerState.breadcrumbs = progressTrackerState.breadcrumbs.slice(0, 4);
    }
    
    renderProgressSummary();
    renderProgressTable();
}

function updateBreadcrumbs() {
    const breadcrumbPath = document.querySelector('.breadcrumb-path');
    if (!breadcrumbPath) return;
    
    breadcrumbPath.innerHTML = progressTrackerState.breadcrumbs.map((crumb, index) => {
        const isLast = index === progressTrackerState.breadcrumbs.length - 1;
        const separator = index > 0 ? '<span class="breadcrumb-separator">›</span>' : '';
        
        // Add home icon for the top level (company)
        const homeIcon = index === 0 ? '<i class="material-icons">home</i>' : '';
        
        return `${separator}<span class="breadcrumb-item ${isLast ? 'active' : ''}" 
                       ${!isLast ? `onclick="navigateToBreadcrumb(${index})"` : ''} 
                       data-level="${crumb.level}">
                    ${homeIcon}${crumb.name}
                </span>`;
    }).join('');
}

function navigateToBreadcrumb(index) {
    if (index === 0) {
        // Navigate back to company level
        progressTrackerState.currentLevel = 'company';
        progressTrackerState.currentSegment = null;
        progressTrackerState.currentDivision = null;
        progressTrackerState.currentDepartment = null;
        progressTrackerState.breadcrumbs = progressTrackerState.breadcrumbs.slice(0, 1);
    } else if (index === 1) {
        // Navigate back to segments level
        progressTrackerState.currentLevel = 'segments';
        progressTrackerState.currentDivision = null;
        progressTrackerState.currentDepartment = null;
        progressTrackerState.breadcrumbs = progressTrackerState.breadcrumbs.slice(0, 2);
    } else if (index === 2) {
        // Navigate back to divisions level
        progressTrackerState.currentLevel = 'divisions';
        progressTrackerState.currentDepartment = null;
        progressTrackerState.breadcrumbs = progressTrackerState.breadcrumbs.slice(0, 3);
    } else if (index === 3) {
        // Navigate back to departments level
        progressTrackerState.currentLevel = 'departments';
        progressTrackerState.breadcrumbs = progressTrackerState.breadcrumbs.slice(0, 4);
    }
    
    renderProgressSummary();
    renderProgressTable();
}

function getCompletionRateClass(rate) {
    if (rate >= 75) return 'excellent';
    if (rate >= 60) return 'good';
    if (rate >= 45) return 'fair';
    return 'attention';
}

function handleTableSort(sortKey) {
    if (progressTrackerState.sortBy === sortKey) {
        progressTrackerState.sortDirection = progressTrackerState.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        progressTrackerState.sortBy = sortKey;
        progressTrackerState.sortDirection = 'asc';
    }
    
    // Re-render table with sorting applied
    renderProgressTable();
}

function updateSortIcons() {
    // Reset all sort icons
    document.querySelectorAll('.sort-icon').forEach(icon => {
        icon.textContent = 'sort';
    });
    
    // Update the active sort icon
    if (progressTrackerState.sortBy) {
        const activeHeader = document.querySelector(`[data-sort="${progressTrackerState.sortBy}"] .sort-icon`);
        if (activeHeader) {
            activeHeader.textContent = progressTrackerState.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
        }
    }
}

// Make drillDown and navigateToBreadcrumb available globally
window.drillDown = drillDown;
window.navigateToBreadcrumb = navigateToBreadcrumb;

// ==================== Render Lever Details Overview ====================
// Track sort state for each lever
const leverSortState = {};

function renderLeverDetailsOverview() {
    const container = document.getElementById('leverDetailsOverview');
    if (!container) return;

    container.innerHTML = '';

    getLeverDetailsData().levers.forEach((lever, leverIndex) => {
        // Initialize sort state if not exists (default: ascending - lowest first)
        if (!leverSortState[lever.name]) {
            leverSortState[lever.name] = 'asc';
        }
        
        const leverCard = document.createElement('div');
        leverCard.className = 'lever-detail-card';
        
        // Sort dimensions based on current sort state
        const sortOrder = leverSortState[lever.name];
        const sortedDimensions = [...lever.dimensions].sort((a, b) => {
            return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
        });
        
        // Create dimension list items with click-through functionality
        const dimensionListHTML = sortedDimensions.map((dimension, sortedIndex) => {
            // Find the original index of this dimension in the unsorted array
            const originalIndex = lever.dimensions.findIndex(d => d.name === dimension.name);
            return `
                <li class="dimension-list-item dimension-list-item-clickable" onclick="window.location.href='${lever.link}?dimension=${originalIndex}'">
                    <div class="dimension-info">
                        <div class="dimension-name-text">${dimension.name}</div>
                        <div class="dimension-statements-badge">${dimension.statementCount} statement${dimension.statementCount !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="dimension-score-badge">${dimension.score}%</div>
                </li>
            `;
        }).join('');
        
        // Add sort indicator icon
        const sortIcon = sortOrder === 'asc' ? 'bx-sort-up' : 'bx-sort-down';
        const sortHint = sortOrder === 'asc' ? 'Lowest to Highest' : 'Highest to Lowest';
        
        leverCard.innerHTML = `
            <div class="lever-detail-header" style="cursor: pointer;" onclick="toggleLeverSort('${lever.name}')" title="Click to sort by score">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span>${lever.name}</span>
                    <i class='bx ${sortIcon}' style="font-size: 18px; opacity: 0.8;"></i>
                </div>
            </div>
            <div class="lever-detail-body">
                <ul class="dimension-list">
                    ${dimensionListHTML}
                </ul>
            </div>
        `;
        
        container.appendChild(leverCard);
    });
}

function toggleLeverSort(leverName) {
    // Toggle sort order
    leverSortState[leverName] = leverSortState[leverName] === 'asc' ? 'desc' : 'asc';
    // Re-render the overview
    renderLeverDetailsOverview();
}

// ==================== Initialize on Page Load ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tabs
    initTabs();
    
    // Initialize filters
    initFilters();
    
    // Initialize table sorting
    initTableSort();
    
    // Initialize expand/collapse
    initExpandCollapse();
    
    // Initialize checkboxes
    initCheckboxes();
    
    // Initialize character counters
    initCharCounter();
    
    // Animate counters on page load
    const counters = document.querySelectorAll('[data-count-to]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count-to'));
        animateCounter(counter, target);
    });
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card-custom, .metric-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 50);
    });
    
    // Initialize Progress Tracker if on progress tracker page
    if (document.getElementById('progressTableBody')) {
        initializeProgressTracker();
    }
    
    // Initialize Response Rate Leaderboard if on progress tracker page
    if (document.getElementById('exportLeaderboardPDF')) {
        initializeLeaderboard();
    }
    
    // Render Lever Details Overview if on dashboard page
    if (document.getElementById('leverDetailsOverview')) {
        renderLeverDetailsOverview();
    }
    
    // Initialize Enterprise Insights if on dashboard page
    if (document.getElementById('topPerformingUnits')) {
        renderEnterpriseInsights();
    }
    
    // Render Sentiment Themes if on dashboard page (using shared module)
    if (document.getElementById('positiveThemes') && document.getElementById('negativeThemes')) {
        if (typeof sentimentThemesShared !== 'undefined') {
            sentimentThemesShared.render();
        }
    }
});

// ==================== Response Rate Leaderboard Functions ====================
function initializeLeaderboard() {
    // Set current date
    const dateElement = document.getElementById('leaderboardDate');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Export PDF button
    const exportBtn = document.getElementById('exportLeaderboardPDF');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportLeaderboardPDF);
    }
    
    // Apply completion rate colors
    applyCompletionRateColors();
}

function exportLeaderboardPDF() {
    window.print();
}

function applyCompletionRateColors() {
    document.querySelectorAll('.response-rate-leaderboard-table .completion-rate').forEach(span => {
        // Remove any previous color classes
        span.classList.remove('excellent', 'good', 'fair', 'attention');
        // Extract numeric value
        const match = span.textContent.match(/\d+/);
        if (match) {
            const rate = parseInt(match[0], 10);
            const colorClass = getCompletionRateClass(rate);
            span.classList.add(colorClass);
        }
    });
}

// ==================== Enterprise Insights Functions ====================
function renderEnterpriseInsights() {
    renderTopPerformingUnits();
    renderUnitsNeedingAttention();
    renderBusinessUnitComparison();
    renderStrategicRecommendations();
    renderKeyMetricsSummary();
}

function renderTopPerformingUnits() {
    const topUnits = [...getBusinessUnitData()]
        .sort((a, b) => b.cultureIndex - a.cultureIndex)
        .slice(0, 3);
    
    const container = document.getElementById('topPerformingUnits');
    if (!container) return;
    
    container.innerHTML = topUnits.map((unit, index) => `
        <div class="enterprise-unit-card enterprise-unit-card-success d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
                <div class="enterprise-unit-rank enterprise-unit-rank-success d-flex align-items-center justify-content-center">
                    ${index + 1}
                </div>
                <div>
                    <h6 class="mb-1 fw-semibold">${unit.name} <span class="text-muted fs-7 fw-normal">• ${unit.employeeCount.toLocaleString()} respondents</span></h6>
                    <span class="fs-7">Strength: <strong>${unit.keyStrength}</strong></span>
                </div>
            </div>
            <div class="text-end">
                <div class="enterprise-unit-score enterprise-unit-score-success">${unit.cultureIndex}%</div>
                <small class="text-muted">Culture Index</small>
            </div>
        </div>
    `).join('');
}

function renderUnitsNeedingAttention() {
    const unitsNeedingAttention = [...getBusinessUnitData()]
        .sort((a, b) => a.cultureIndex - b.cultureIndex)
        .slice(0, 3);
    
    const container = document.getElementById('unitsNeedingAttention');
    if (!container) return;
    
    container.innerHTML = unitsNeedingAttention.map((unit, index) => `
        <div class="enterprise-unit-card enterprise-unit-card-danger d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
                <div class="enterprise-unit-rank enterprise-unit-rank-danger d-flex align-items-center justify-content-center">
                    ${index + 1}
                </div>
                <div>
                    <h6 class="mb-1 fw-semibold">${unit.name} <span class="text-muted fs-7 fw-normal">• ${unit.employeeCount.toLocaleString()} respondents</span></h6>
                    <span class="fs-7">Priority: <strong>${unit.priorityArea}</strong></span>
                </div>
            </div>
            <div class="text-end">
                <div class="enterprise-unit-score enterprise-unit-score-danger">${unit.cultureIndex}%</div>
                <small class="text-muted">Culture Index</small>
            </div>
        </div>
    `).join('');
}

function renderBusinessUnitComparison() {
    const sortedUnits = [...getBusinessUnitData()].sort((a, b) => b.cultureIndex - a.cultureIndex);
    const container = document.getElementById('businessUnitTableBody');
    if (!container) return;
    
    container.innerHTML = sortedUnits.map(unit => {
        const scoreClass = getScoreColorClass(unit.cultureIndex);
        return `
            <tr>
                <td class="fw-semibold">${unit.name}</td>
                <td class="text-center">
                    <span class="badge business-unit-score-badge ${scoreClass}">
                        ${unit.cultureIndex}%
                    </span>
                </td>
                <td class="text-center">${unit.responseRate}%</td>
                <td class="text-center">${unit.employeeCount.toLocaleString()}</td>
                <td class="text-center">
                    <span class="badge badge-success badge-sm">${unit.keyStrength}</span>
                </td>
                <td class="text-center">
                    <span class="badge badge-warning badge-sm">${unit.priorityArea}</span>
                </td>
            </tr>
        `;
    }).join('');
}

function renderStrategicRecommendations() {
    const recommendations = [
        {
            title: "Focus on Leadership Development",
            description: "SanlamAllianz and Santam show lower scores in Leadership Support. Implement targeted leadership training programs.",
            priority: "high",
            impact: "High"
        },
        {
            title: "Enhance Workload Management",
            description: "Multiple units report workload concerns. Review resource allocation and consider process optimization initiatives.",
            priority: "high",
            impact: "High"
        },
        {
            title: "Replicate Best Practices",
            description: "Sanlam Fintech and Sanlam Investment Group excel in Productivity and Team Effectiveness. Document and share their practices.",
            priority: "medium",
            impact: "Medium"
        },
        {
            title: "Improve Change Agility",
            description: "Several units need improvement in Change Agility. Develop change management capabilities across the organization.",
            priority: "medium",
            impact: "Medium"
        }
    ];
    
    const container = document.getElementById('strategicRecommendations');
    if (!container) return;
    
    container.innerHTML = recommendations.map(rec => {
        const priorityClass = rec.priority === 'high' ? 'recommendation-priority-high' : 'recommendation-priority-medium';
        return `
            <div class="recommendation-card">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="mb-0 fw-semibold">${rec.title}</h6>
                    <span class="badge recommendation-priority-badge ${priorityClass}">
                        ${rec.priority.toUpperCase()} PRIORITY
                    </span>
                </div>
                <p class="recommendation-description mb-0">${rec.description}</p>
                <div class="mt-2">
                    <small class="text-muted">Impact: <strong>${rec.impact}</strong></small>
                </div>
            </div>
        `;
    }).join('');
}

function renderKeyMetricsSummary() {
    const data = getBusinessUnitData();
    const unitsWithHighRisk = data.filter(u => u.cultureIndex < 80).length;
    const unitsExceedingTarget = data.filter(u => u.cultureIndex >= 85).length;
    const avgResponseRate = (data.reduce((sum, u) => sum + u.responseRate, 0) / data.length).toFixed(1);
    const highestPerformer = [...data].sort((a, b) => b.cultureIndex - a.cultureIndex)[0];
    const lowestPerformer = [...data].sort((a, b) => a.cultureIndex - b.cultureIndex)[0];
    const performanceGap = (highestPerformer.cultureIndex - lowestPerformer.cultureIndex).toFixed(1);
    const avgCultureIndex = (data.reduce((sum, u) => sum + u.cultureIndex, 0) / data.length).toFixed(1);
    
    const metrics = [
        { 
            label: "Units at Risk", 
            value: unitsWithHighRisk, 
            subtitle: `Below 80% threshold`,
            type: "danger",
            icon: "bx-error-circle"
        },
        { 
            label: "Units Exceeding Target", 
            value: unitsExceedingTarget, 
            subtitle: `Scoring 85% or above`,
            type: "success",
            icon: "bx-trophy"
        },
        { 
            label: "Performance Gap", 
            value: `${performanceGap}%`, 
            subtitle: `Between top & bottom units`,
            type: "warning",
            icon: "bx-bar-chart-alt-2"
        },
        { 
            label: "Average Culture Index", 
            value: `${avgCultureIndex}%`, 
            subtitle: `Across all business units`,
            type: "primary",
            icon: "bx-line-chart"
        }
    ];
    
    const container = document.getElementById('keyMetricsSummary');
    if (!container) return;
    
    container.innerHTML = `
        <div class="row g-3">
            ${metrics.map(metric => `
                <div class="col-6">
                    <div class="metric-summary-card metric-summary-card-${metric.type}">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class='bx ${metric.icon} metric-summary-icon metric-summary-icon-${metric.type}'></i>
                            <div style="flex: 1;">
                                <div class="metric-summary-value metric-summary-value-${metric.type}">
                                    ${metric.value}
                                </div>
                                <div class="metric-summary-label">${metric.label}</div>
                                <small class="text-muted metric-summary-subtitle">${metric.subtitle}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function getScoreColorClass(score) {
    if (score >= 85) return 'business-unit-score-excellent';
    if (score >= 75) return 'business-unit-score-good';
    if (score >= 65) return 'business-unit-score-fair';
    return 'business-unit-score-poor';
}

// ==================== Export to Global Scope ====================
window.dashboardJS = {
    showModal,
    hideModal,
    showOffcanvas,
    hideOffcanvas,
    clearFilters,
    applyFilters,
    exportToPDF,
    exportToPPT,
    exportToExcel,
    animateCounter
};

// Make toggleLeverSort globally accessible
window.toggleLeverSort = toggleLeverSort;

