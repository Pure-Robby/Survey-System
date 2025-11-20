// TFG Survey System POC - Dashboard Interactions

// ==================== Lever Details Data ====================
const leverDetailsData = {
    levers: [
        {
            name: "Business Outcomes",
            link: "business-outcomes.html",
            dimensions: [
                { name: "Continuous Development", score: 85.0, statementCount: 3 },
                { name: "Change Agility", score: 78.5, statementCount: 3 },
                { name: "Productivity", score: 88.2, statementCount: 4 },
                { name: "Customer Centricity", score: 81.8, statementCount: 5 }
            ]
        },
        {
            name: "Shared Values",
            link: "shared-values.html",
            dimensions: [
                { name: "Values", score: 72.3, statementCount: 2 },
                { name: "Integrity", score: 68.5, statementCount: 2 },
                { name: "Innovation", score: 65.8, statementCount: 3 },
                { name: "Care", score: 70.2, statementCount: 4 },
                { name: "Collaboration", score: 64.5, statementCount: 3 },
                { name: "Trust & Psychological Safety", score: 62.8, statementCount: 5 },
                { name: "Inclusion & Belonging", score: 69.5, statementCount: 2 }
            ]
        },
        {
            name: "Employee Experience",
            link: "employee-experience.html",
            dimensions: [
                { name: "Engagement", score: 78.5, statementCount: 12 },
                { name: "Team Effectiveness", score: 85.2, statementCount: 5 },
                { name: "Wellness", score: 80.8, statementCount: 5 },
                { name: "Development & Growth", score: 84.5, statementCount: 7 }
            ]
        },
        {
            name: "Leadership Enablement",
            link: "leadership-enablement.html",
            dimensions: [
                { 
                    name: "Envisage Our Future", 
                    score: 76.4, 
                    statementCount: 2,
                    guidingPrinciple: "Transform our organisation with vision, enhanced solutions and customer-centric excellence"
                },
                { 
                    name: "Champion Sustainable Results", 
                    score: 79.8, 
                    statementCount: 2,
                    guidingPrinciple: "Optimise resources to deliver creative solutions and cultivate a culture of growth"
                },
                { 
                    name: "Show Up and Inspire Excellence", 
                    score: 80.2, 
                    statementCount: 2,
                    guidingPrinciple: "Make quality decisions with speed, face challenges with humility, and lead with integrity and a growth mindset"
                },
                { 
                    name: "Win Together", 
                    score: 78.0, 
                    statementCount: 2,
                    guidingPrinciple: "Create a supportive, inclusive and engaging work environment for mutual success"
                }
            ]
        }
    ]
};

// ==================== Get Today's Date ====================
const options = { day: "2-digit", month: "short", year: "numeric" };
document.getElementById("dataDate").textContent =
    "Data correct as of: " + new Date().toLocaleDateString("en-GB", options);


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
function exportToPDF(filename = 'report') {
    // POC: Simple placeholder functionality
    alert(`PDF Export: ${filename}.pdf\n\nIn production, this would generate a PDF report of the current dashboard.`);
}

function exportToPPT(filename = 'report') {
    // POC: Simple placeholder functionality
    alert(`PowerPoint Export: ${filename}.pptx\n\nIn production, this would generate a PowerPoint presentation.`);
}

function exportToExcel(filename = 'comments') {
    // POC: Simple placeholder functionality
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
    breadcrumbs: [{ level: 'company', name: 'TFG Organization' }],
    sortBy: null,
    sortDirection: 'asc'
};

// Mock data structure for progress tracker
const progressTrackerData = {
    company: {
        name: "TFG Organization",
        population: 27686,
        completed: 23364,
        inProgress: 166,
        notStarted: 4156,
        completionRate: 84,
        children: "segments"
    },
    segments: [
        {
            name: "Retail Operations",
            population: 12500,
            completed: 11000,
            inProgress: 80,
            notStarted: 1420,
            completionRate: 88,
            divisions: [
                {
                    name: "Store Operations",
                    population: 8500,
                    completed: 7650,
                    inProgress: 50,
                    notStarted: 800,
                    completionRate: 90,
                    departments: [
                        {
                            name: "Sales",
                            population: 6000,
                            completed: 5500,
                            inProgress: 30,
                            notStarted: 470,
                            completionRate: 92,
                            teams: [
                                {
                                    name: "Sales Team A",
                                    population: 2000,
                                    completed: 1900,
                                    inProgress: 10,
                                    notStarted: 90,
                                    completionRate: 95
                                },
                                {
                                    name: "Sales Team B",
                                    population: 2000,
                                    completed: 1800,
                                    inProgress: 10,
                                    notStarted: 190,
                                    completionRate: 90
                                },
                                {
                                    name: "Sales Team C",
                                    population: 2000,
                                    completed: 1800,
                                    inProgress: 10,
                                    notStarted: 190,
                                    completionRate: 90
                                }
                            ]
                        },
                        {
                            name: "Customer Service",
                            population: 2500,
                            completed: 2150,
                            inProgress: 20,
                            notStarted: 330,
                            completionRate: 86,
                            teams: []
                        }
                    ]
                },
                {
                    name: "Distribution",
                    population: 4000,
                    completed: 3350,
                    inProgress: 30,
                    notStarted: 620,
                    completionRate: 84,
                    departments: [
                        {
                            name: "Warehouse",
                            population: 3000,
                            completed: 2500,
                            inProgress: 20,
                            notStarted: 480,
                            completionRate: 83,
                            teams: []
                        },
                        {
                            name: "Logistics",
                            population: 1000,
                            completed: 850,
                            inProgress: 10,
                            notStarted: 140,
                            completionRate: 85,
                            teams: []
                        }
                    ]
                }
            ]
        },
        {
            name: "Corporate",
            population: 8000,
            completed: 7200,
            inProgress: 50,
            notStarted: 750,
            completionRate: 90,
            divisions: [
                {
                    name: "Finance",
                    population: 3000,
                    completed: 2800,
                    inProgress: 20,
                    notStarted: 180,
                    completionRate: 93,
                    departments: [
                        {
                            name: "Accounting",
                            population: 1500,
                            completed: 1420,
                            inProgress: 10,
                            notStarted: 70,
                            completionRate: 95,
                            teams: []
                        },
                        {
                            name: "Financial Planning",
                            population: 1500,
                            completed: 1380,
                            inProgress: 10,
                            notStarted: 110,
                            completionRate: 92,
                            teams: []
                        }
                    ]
                },
                {
                    name: "Human Resources",
                    population: 2500,
                    completed: 2300,
                    inProgress: 15,
                    notStarted: 185,
                    completionRate: 92,
                    departments: [
                        {
                            name: "Recruitment",
                            population: 1200,
                            completed: 1100,
                            inProgress: 8,
                            notStarted: 92,
                            completionRate: 92,
                            teams: []
                        },
                        {
                            name: "Employee Relations",
                            population: 1300,
                            completed: 1200,
                            inProgress: 7,
                            notStarted: 93,
                            completionRate: 92,
                            teams: []
                        }
                    ]
                },
                {
                    name: "IT",
                    population: 2500,
                    completed: 2100,
                    inProgress: 15,
                    notStarted: 385,
                    completionRate: 84,
                    departments: [
                        {
                            name: "Development",
                            population: 1500,
                            completed: 1250,
                            inProgress: 10,
                            notStarted: 240,
                            completionRate: 83,
                            teams: []
                        },
                        {
                            name: "Infrastructure",
                            population: 1000,
                            completed: 850,
                            inProgress: 5,
                            notStarted: 145,
                            completionRate: 85,
                            teams: []
                        }
                    ]
                }
            ]
        },
        {
            name: "Marketing & Sales",
            population: 7186,
            completed: 5164,
            inProgress: 36,
            notStarted: 1986,
            completionRate: 72,
            divisions: [
                {
                    name: "Digital Marketing",
                    population: 4000,
                    completed: 3000,
                    inProgress: 20,
                    notStarted: 980,
                    completionRate: 75,
                    departments: [
                        {
                            name: "Social Media",
                            population: 2000,
                            completed: 1500,
                            inProgress: 10,
                            notStarted: 490,
                            completionRate: 75,
                            teams: []
                        },
                        {
                            name: "Content",
                            population: 2000,
                            completed: 1500,
                            inProgress: 10,
                            notStarted: 490,
                            completionRate: 75,
                            teams: []
                        }
                    ]
                },
                {
                    name: "Brand Management",
                    population: 3186,
                    completed: 2164,
                    inProgress: 16,
                    notStarted: 1006,
                    completionRate: 68,
                    departments: [
                        {
                            name: "Brand Strategy",
                            population: 2000,
                            completed: 1400,
                            inProgress: 10,
                            notStarted: 590,
                            completionRate: 70,
                            teams: []
                        },
                        {
                            name: "Creative",
                            population: 1186,
                            completed: 764,
                            inProgress: 6,
                            notStarted: 416,
                            completionRate: 64,
                            teams: []
                        }
                    ]
                }
            ]
        }
    ]
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
    
    const totalPopulation = document.getElementById('totalPopulation');
    const totalCompleted = document.getElementById('totalCompleted');
    const totalInProgress = document.getElementById('totalInProgress');
    const totalNotStarted = document.getElementById('totalNotStarted');
    const overallCompletionRate = document.getElementById('overallCompletionRate');
    
    if (totalPopulation) totalPopulation.textContent = data.population.toLocaleString();
    if (totalCompleted) totalCompleted.textContent = data.completed.toLocaleString();
    if (totalInProgress) totalInProgress.textContent = data.inProgress.toLocaleString();
    if (totalNotStarted) totalNotStarted.textContent = data.notStarted.toLocaleString();
    
    if (overallCompletionRate) {
        overallCompletionRate.textContent = data.completionRate + '%';
        overallCompletionRate.className = 'card-value card-completion-rate';
    }
}

function renderProgressTable() {
    const tableData = getTableData();
    const tableBody = document.getElementById('progressTableBody');
    const tableTitle = document.getElementById('tableTitle');
    const backButton = document.getElementById('backToParent');
    
    if (!tableBody) return;
    
    // Update table title and back button
    if (progressTrackerState.currentLevel === 'company') {
        if (tableTitle) tableTitle.textContent = 'TFG Organization Overview';
        if (backButton) backButton.style.display = 'none';
    } else if (progressTrackerState.currentLevel === 'segments') {
        if (tableTitle) tableTitle.textContent = `${progressTrackerState.currentSegment} - Divisions`;
        if (backButton) backButton.style.display = 'flex';
    } else if (progressTrackerState.currentLevel === 'divisions') {
        if (tableTitle) tableTitle.textContent = `${progressTrackerState.currentDivision} - Departments`;
        if (backButton) backButton.style.display = 'flex';
    } else if (progressTrackerState.currentLevel === 'departments') {
        if (tableTitle) tableTitle.textContent = `${progressTrackerState.currentDepartment} - Teams`;
        if (backButton) backButton.style.display = 'flex';
    } else if (progressTrackerState.currentLevel === 'teams') {
        if (tableTitle) tableTitle.textContent = 'Team Details';
        if (backButton) backButton.style.display = 'flex';
    }
    
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
    if (progressTrackerState.currentLevel === 'company') {
        return progressTrackerData.company;
    } else if (progressTrackerState.currentLevel === 'segments') {
        const segment = progressTrackerData.segments.find(s => s.name === progressTrackerState.currentSegment);
        return segment || progressTrackerData.company;
    } else if (progressTrackerState.currentLevel === 'divisions') {
        const segment = progressTrackerData.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        return division || progressTrackerData.company;
    } else if (progressTrackerState.currentLevel === 'departments') {
        const segment = progressTrackerData.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        const department = division ? division.departments.find(d => d.name === progressTrackerState.currentDepartment) : null;
        return department || progressTrackerData.company;
    } else if (progressTrackerState.currentLevel === 'teams') {
        const segment = progressTrackerData.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        const department = division ? division.departments.find(d => d.name === progressTrackerState.currentDepartment) : null;
        return department || progressTrackerData.company;
    }
    return progressTrackerData.company;
}

function getTableData() {
    if (progressTrackerState.currentLevel === 'company') {
        return progressTrackerData.segments.map(segment => ({
            ...segment,
            hasChildren: segment.divisions && segment.divisions.length > 0
        }));
    } else if (progressTrackerState.currentLevel === 'segments') {
        const segment = progressTrackerData.segments.find(s => s.name === progressTrackerState.currentSegment);
        return segment ? segment.divisions.map(division => ({
            ...division,
            hasChildren: division.departments && division.departments.length > 0
        })) : [];
    } else if (progressTrackerState.currentLevel === 'divisions') {
        const segment = progressTrackerData.segments.find(s => s.name === progressTrackerState.currentSegment);
        const division = segment ? segment.divisions.find(d => d.name === progressTrackerState.currentDivision) : null;
        return division ? division.departments.map(department => ({
            ...department,
            hasChildren: department.teams && department.teams.length > 0
        })) : [];
    } else if (progressTrackerState.currentLevel === 'departments') {
        const segment = progressTrackerData.segments.find(s => s.name === progressTrackerState.currentSegment);
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
function renderLeverDetailsOverview() {
    const container = document.getElementById('leverDetailsOverview');
    if (!container) return;

    container.innerHTML = '';

    leverDetailsData.levers.forEach((lever) => {
        const leverCard = document.createElement('div');
        leverCard.className = 'lever-detail-card';
        
        // Sort dimensions by score ascending (lowest/most concerning first)
        const sortedDimensions = [...lever.dimensions].sort((a, b) => a.score - b.score);
        
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
        
        leverCard.innerHTML = `
            <div class="lever-detail-header">
                ${lever.name}
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

