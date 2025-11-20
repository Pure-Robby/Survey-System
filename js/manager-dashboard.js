// Mulilo Line Manager Dashboard 2025
// Annual Survey Results - JavaScript functionality for team management and insights

// Dashboard Configuration
const dashboardConfig = {
    currentTab: 'overview',
    currentFilter: 'all',
    teamData: {},
    actionItems: [],
    charts: {}
};

// Sample Team Data (in a real application, this would come from an API)
const sampleTeamData = {
    manager: {
        name: "Sarah Johnson",
        team: "Marketing Team",
        department: "Marketing & Communications"
    },
    teamSize: 12,
    responseRate: 83,
    responses: 10,
    avgEngagement: 3.7,
    flightRiskCount: 2,
    teamMembers: [
        {
            id: 1,
            name: "John Smith",
            position: "Senior Marketing Specialist",
            responded: true,
            engagementScore: 4.2,
            enpsScore: 9,
            flightRisk: "low",
            lastSurvey: "2025-01-15"
        },
        {
            id: 2,
            name: "Emily Chen",
            position: "Content Creator",
            responded: true,
            engagementScore: 3.8,
            enpsScore: 7,
            flightRisk: "low",
            lastSurvey: "2025-01-14"
        },
        {
            id: 3,
            name: "Michael Brown",
            position: "Digital Marketing Manager",
            responded: true,
            engagementScore: 2.1,
            enpsScore: 4,
            flightRisk: "high",
            lastSurvey: "2025-01-13"
        },
        {
            id: 4,
            name: "Lisa Rodriguez",
            position: "Brand Specialist",
            responded: true,
            engagementScore: 4.5,
            enpsScore: 10,
            flightRisk: "low",
            lastSurvey: "2025-01-16"
        },
        {
            id: 5,
            name: "David Kim",
            position: "Marketing Analyst",
            responded: true,
            engagementScore: 3.2,
            enpsScore: 6,
            flightRisk: "medium",
            lastSurvey: "2025-01-12"
        },
        {
            id: 6,
            name: "Jennifer Wilson",
            position: "Social Media Manager",
            responded: true,
            engagementScore: 4.0,
            enpsScore: 8,
            flightRisk: "low",
            lastSurvey: "2025-01-17"
        },
        {
            id: 7,
            name: "Robert Taylor",
            position: "Marketing Coordinator",
            responded: true,
            engagementScore: 3.5,
            enpsScore: 7,
            flightRisk: "low",
            lastSurvey: "2025-01-11"
        },
        {
            id: 8,
            name: "Amanda Davis",
            position: "Campaign Manager",
            responded: true,
            engagementScore: 2.8,
            enpsScore: 5,
            flightRisk: "medium",
            lastSurvey: "2025-01-10"
        },
        {
            id: 9,
            name: "Kevin Johnson",
            position: "Marketing Assistant",
            responded: true,
            engagementScore: 3.9,
            enpsScore: 8,
            flightRisk: "low",
            lastSurvey: "2025-01-18"
        },
        {
            id: 10,
            name: "Sarah Lee",
            position: "Brand Manager",
            responded: true,
            engagementScore: 4.1,
            enpsScore: 9,
            flightRisk: "low",
            lastSurvey: "2025-01-19"
        },
        {
            id: 11,
            name: "Mark Thompson",
            position: "PR Specialist",
            responded: false,
            engagementScore: null,
            enpsScore: null,
            flightRisk: "unknown",
            lastSurvey: null
        },
        {
            id: 12,
            name: "Jessica Garcia",
            position: "Content Writer",
            responded: false,
            engagementScore: null,
            enpsScore: null,
            flightRisk: "unknown",
            lastSurvey: null
        }
    ],
    engagementByDimension: {
        "Core Engagement": 3.7,
        "Values": 3.9,
        "Recognition": 3.2,
        "Development": 3.5,
        "Communication": 3.8,
        "Leadership": 3.6
    },
    topStrengths: [
        {
            title: "Values Alignment",
            score: 3.9,
            description: "Team shows strong alignment with company values and feels supported to uphold integrity and excellence.",
            impact: "High retention and strong culture fit"
        },
        {
            title: "Team Communication",
            score: 3.8,
            description: "Good communication flow within the team and clear understanding of expectations.",
            impact: "Efficient collaboration and project delivery"
        },
        {
            title: "Core Engagement",
            score: 3.7,
            description: "Team members feel connected to their work and understand their role in company success.",
            impact: "Consistent performance and motivation"
        }
    ],
    bottomOpportunities: [
        {
            title: "Recognition & Appreciation",
            score: 3.2,
            description: "Team members feel they don't receive enough recognition for their contributions and achievements.",
            impact: "Risk of decreased motivation and engagement"
        },
        {
            title: "Career Development",
            score: 3.5,
            description: "Limited opportunities for growth and skill development are affecting team satisfaction.",
            impact: "Potential talent loss and reduced innovation"
        },
        {
            title: "Leadership Support",
            score: 3.6,
            description: "Some team members feel they need more guidance and support from leadership.",
            impact: "Decreased confidence and autonomy"
        }
    ]
};

// Sample Action Items
const sampleActionItems = [
    {
        id: 1,
        title: "Implement Weekly Recognition Programme",
        description: "Start weekly team meetings with recognition of individual and team achievements",
        priority: "high",
        category: "recognition",
        status: "current",
        dueDate: "2025-02-15",
        createdDate: "2025-01-20",
        progress: 60
    },
    {
        id: 2,
        title: "Create Individual Development Plans",
        description: "Work with each team member to create personalised development and career growth plans",
        priority: "medium",
        category: "development",
        status: "current",
        dueDate: "2025-03-01",
        createdDate: "2025-01-22",
        progress: 30
    },
    {
        id: 3,
        title: "Establish Monthly One-on-Ones",
        description: "Schedule regular one-on-one meetings with each team member for guidance and feedback",
        priority: "high",
        category: "communication",
        status: "current",
        dueDate: "2025-02-01",
        createdDate: "2025-01-18",
        progress: 80
    },
    {
        id: 4,
        title: "Team Building Workshop",
        description: "Organize a team building session to strengthen relationships and improve collaboration",
        priority: "medium",
        category: "engagement",
        status: "planned",
        dueDate: "2025-04-15",
        createdDate: "2025-01-25",
        progress: 0
    },
    {
        id: 5,
        title: "Skills Training Programme",
        description: "Implement quarterly skills training sessions based on team member interests and company needs",
        priority: "medium",
        category: "development",
        status: "planned",
        dueDate: "2025-05-01",
        createdDate: "2025-01-26",
        progress: 0
    },
    {
        id: 6,
        title: "Improved Project Communication",
        description: "Implemented new project management system with better communication tools",
        priority: "high",
        category: "communication",
        status: "completed",
        dueDate: "2025-01-10",
        createdDate: "2024-12-15",
        progress: 100
    },
    {
        id: 7,
        title: "Team Feedback Sessions",
        description: "Conducted structured feedback sessions to understand team concerns and suggestions",
        priority: "medium",
        category: "engagement",
        status: "completed",
        dueDate: "2025-01-05",
        createdDate: "2024-12-20",
        progress: 100
    }
];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Manager Dashboard Loading...');
    initializeDashboard();
    loadDashboardData();
    setupEventListeners();
});

function initializeDashboard() {
    // Set manager info
    const managerNameEl = document.getElementById('managerName');
    if (managerNameEl) {
        managerNameEl.textContent = `Welcome, ${sampleTeamData.manager.name}`;
    }
    
    // Load initial data
    dashboardConfig.teamData = sampleTeamData;
    dashboardConfig.actionItems = sampleActionItems;
    
    console.log('Dashboard initialized with team data');
}

function loadDashboardData() {
    updateTeamSummary();
    createEngagementTable();
    loadInsights();
    loadActionItems();
    loadProgressData();
}

function setupEventListeners() {
    // Add action form handler
    const addActionForm = document.getElementById('addActionForm');
    if (addActionForm) {
        addActionForm.addEventListener('submit', handleAddAction);
    }
    
    // Modal click outside to close
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('addActionModal');
        if (event.target === modal) {
            closeAddActionModal();
        }
    });
    
    // Set default due date to 30 days from now
    const dueDateInput = document.getElementById('actionDueDate');
    if (dueDateInput) {
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 30);
        dueDateInput.value = defaultDate.toISOString().split('T')[0];
    }
}

// Tab Management
function switchTab(tabName) {
    // Update active tab button
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    
    dashboardConfig.currentTab = tabName;
    
    // Load tab-specific data
    switch(tabName) {
        case 'overview':
            updateEngagementTable();
            break;
        case 'insights':
            // Insights already loaded
            break;
        case 'actions':
            loadActionItems();
            break;
        case 'progress':
            updateProgressView();
            break;
    }
}

// Team Summary Functions
function updateTeamSummary() {
    const data = dashboardConfig.teamData;
    
    // Update summary cards
    updateElement('teamSize', data.teamSize);
    updateElement('responseRate', data.responseRate + '%');
    updateElement('avgEngagement', Math.round((data.avgEngagement / 5) * 100) + '%');
    updateElement('flightRiskCount', data.flightRiskCount);
    
    // Add detail text
    const responseDetail = document.querySelector('.response-rate .summary-detail');
    if (responseDetail) {
        responseDetail.textContent = `${data.responses} of ${data.teamSize} responded`;
    }
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}


// Engagement Table Functions
function createEngagementTable() {
    const tableBody = document.getElementById('engagementTableBody');
    if (!tableBody) return;
    
    const teamData = dashboardConfig.teamData.engagementByDimension;
    const companyAverages = {
        "Core Engagement": 3.5,
        "Values": 3.6,
        "Recognition": 3.4,
        "Development": 3.7,
        "Communication": 3.5,
        "Leadership": 3.6
    };
    
    const rows = Object.keys(teamData).map(dimension => {
        const teamScore = teamData[dimension];
        const companyScore = companyAverages[dimension];
        
        // Convert to percentages
        const teamPercentage = Math.round((teamScore / 5) * 100);
        const companyPercentage = Math.round((companyScore / 5) * 100);
        const difference = teamPercentage - companyPercentage;
        
        let differenceClass = 'difference-neutral';
        let statusClass = 'status-equal';
        let statusText = 'On Par';
        
        if (difference > 2) {
            differenceClass = 'difference-positive';
            statusClass = 'status-above';
            statusText = 'Above Average';
        } else if (difference < -2) {
            differenceClass = 'difference-negative';
            statusClass = 'status-below';
            statusText = 'Below Average';
        }
        
        const differenceText = difference > 0 ? `+${difference}%` : `${difference}%`;
        
        return `
            <tr>
                <td class="dimension-name">${dimension}</td>
                <td class="score-value team-score">${teamPercentage}%</td>
                <td class="score-value company-score">${companyPercentage}%</td>
                <td class="difference-value ${differenceClass}">${differenceText}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = rows.join('');
}

function updateEngagementTable() {
    const filter = document.getElementById('timeFilter').value;
    
    // In a real application, this would update the table with different data based on the filter
    // For now, we'll just refresh the current table
    console.log('Updating engagement table with filter:', filter);
    createEngagementTable();
}

// Insights Functions
function loadInsights() {
    loadTopStrengths();
    loadBottomOpportunities();
    loadRecommendations();
}

function loadTopStrengths() {
    const container = document.getElementById('topStrengths');
    if (!container) return;
    
    const strengths = dashboardConfig.teamData.topStrengths;
    container.innerHTML = strengths.map(strength => `
        <div class="insight-item strength">
            <div class="insight-title">${strength.title}</div>
            <div class="insight-score high">${Math.round((strength.score / 5) * 100)}%</div>
            <div class="insight-description">${strength.description}</div>
            <div class="insight-impact">Impact: ${strength.impact}</div>
        </div>
    `).join('');
}

function loadBottomOpportunities() {
    const container = document.getElementById('bottomOpportunities');
    if (!container) return;
    
    const opportunities = dashboardConfig.teamData.bottomOpportunities;
    container.innerHTML = opportunities.map(opportunity => `
        <div class="insight-item opportunity">
            <div class="insight-title">${opportunity.title}</div>
            <div class="insight-score low">${Math.round((opportunity.score / 5) * 100)}%</div>
            <div class="insight-description">${opportunity.description}</div>
            <div class="insight-impact">Risk: ${opportunity.impact}</div>
        </div>
    `).join('');
}

function loadRecommendations() {
    const container = document.getElementById('recommendationsGrid');
    if (!container) return;
    
    const recommendations = [
        {
            title: "Implement Recognition Programme",
            description: "Start a structured recognition programme to address the team's need for appreciation and acknowledgment of their contributions."
        },
        {
            title: "Career Development Planning",
            description: "Work with each team member to create individual development plans with clear growth opportunities and skill-building initiatives."
        },
        {
            title: "Increase Leadership Visibility",
            description: "Schedule regular check-ins and provide more guidance and support to team members who feel they need additional leadership attention."
        },
        {
            title: "Peer Recognition System",
            description: "Enable team members to recognize each other's contributions through a peer-to-peer recognition platform or process."
        },
        {
            title: "Skills Training Opportunities",
            description: "Identify and provide relevant training opportunities that align with both individual interests and business needs."
        },
        {
            title: "Mentorship Programme",
            description: "Establish mentorship relationships within or outside the team to support professional development and career growth."
        }
    ];
    
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card">
            <div class="recommendation-title">${rec.title}</div>
            <div class="recommendation-description">${rec.description}</div>
        </div>
    `).join('');
}

// Action Items Functions
function loadActionItems() {
    loadActionsByStatus('current', 'currentActions');
    loadActionsByStatus('planned', 'plannedActions');
    loadActionsByStatus('completed', 'completedActions');
    updateActionCounts();
}

function loadActionsByStatus(status, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const actions = dashboardConfig.actionItems.filter(action => action.status === status);
    container.innerHTML = actions.map(action => createActionCard(action)).join('');
}

function createActionCard(action) {
    const priorityClass = action.priority;
    const isCompleted = action.status === 'completed';
    
    return `
        <div class="action-item ${action.status}">
            <div class="action-header">
                <div>
                    <div class="action-title">${action.title}</div>
                    <div class="action-priority ${priorityClass}">${action.priority.toUpperCase()}</div>
                </div>
            </div>
            <div class="action-description">${action.description}</div>
            <div class="action-footer">
                <div class="action-due">Due: ${formatDate(action.dueDate)}</div>
                <div class="action-actions">
                    ${!isCompleted ? `
                        <button class="action-btn" onclick="editAction(${action.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="completeAction(${action.id})" title="Mark Complete">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="action-btn" onclick="deleteAction(${action.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateActionCounts() {
    const currentCount = dashboardConfig.actionItems.filter(a => a.status === 'current').length;
    const plannedCount = dashboardConfig.actionItems.filter(a => a.status === 'planned').length;
    const completedCount = dashboardConfig.actionItems.filter(a => a.status === 'completed').length;
    
    updateElement('currentCount', currentCount);
    updateElement('plannedCount', plannedCount);
    updateElement('completedCount', completedCount);
}

// Action Item Management
function openAddActionModal() {
    const modal = document.getElementById('addActionModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeAddActionModal() {
    const modal = document.getElementById('addActionModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('addActionForm');
        if (form) {
            form.reset();
            // Reset due date to default
            const dueDateInput = document.getElementById('actionDueDate');
            if (dueDateInput) {
                const defaultDate = new Date();
                defaultDate.setDate(defaultDate.getDate() + 30);
                dueDateInput.value = defaultDate.toISOString().split('T')[0];
            }
        }
    }
}

function handleAddAction(event) {
    event.preventDefault();
    
    const title = document.getElementById('actionTitle').value.trim();
    const description = document.getElementById('actionDescription').value.trim();
    const priority = document.getElementById('actionPriority').value;
    const dueDate = document.getElementById('actionDueDate').value;
    const category = document.getElementById('actionCategory').value;
    
    if (!title || !description || !dueDate) {
        showToast('Please fill in all required fields', 'warning');
        return;
    }
    
    const newAction = {
        id: Date.now(), // Simple ID generation
        title: title,
        description: description,
        priority: priority,
        category: category,
        status: 'current',
        dueDate: dueDate,
        createdDate: new Date().toISOString().split('T')[0],
        progress: 0
    };
    
    dashboardConfig.actionItems.push(newAction);
    
    loadActionItems();
    closeAddActionModal();
    showToast('Action item added successfully!', 'success');
}

function editAction(actionId) {
    // In a real application, this would open an edit modal
    showToast('Edit functionality would be implemented here', 'info');
}

function completeAction(actionId) {
    const action = dashboardConfig.actionItems.find(a => a.id === actionId);
    if (action) {
        action.status = 'completed';
        action.progress = 100;
        loadActionItems();
        showToast('Action item marked as complete!', 'success');
    }
}

function deleteAction(actionId) {
    if (confirm('Are you sure you want to delete this action item?')) {
        dashboardConfig.actionItems = dashboardConfig.actionItems.filter(a => a.id !== actionId);
        loadActionItems();
        showToast('Action item deleted', 'info');
    }
}

// Progress Tracking Functions
function loadProgressData() {
    createEngagementTrendChart();
    createActionsCompletedChart();
    createSatisfactionChart();
    loadProgressTimeline();
}

function createEngagementTrendChart() {
    const ctx = document.getElementById('engagementTrendChart');
    if (!ctx) return;
    
    // Annual trend data (converted to percentages)
    const trendData = [68, 70, 72, 74];
    const labels = ['2022', '2023', '2024', '2025'];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: trendData,
                borderColor: 'rgba(0, 116, 200, 1)',
                backgroundColor: 'rgba(45, 95, 93, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function createActionsCompletedChart() {
    const ctx = document.getElementById('actionsCompletedChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [78, 22],
                backgroundColor: ['rgba(0, 116, 200, 1)', 'rgba(233, 236, 239, 1)'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function createSatisfactionChart() {
    const ctx = document.getElementById('satisfactionChart');
    if (!ctx) return;
    
    const satisfactionData = [72, 76, 80, 84];
    const labels = ['2022', '2023', '2024', '2025'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: satisfactionData,
                backgroundColor: 'rgba(0, 116, 200, 0.8)',
                borderColor: 'rgba(0, 116, 200, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function loadProgressTimeline() {
    const container = document.getElementById('progressTimeline');
    if (!container) return;
    
    const milestones = [
        {
            date: "2025-01-20",
            title: "Recognition Programme Launched",
            description: "Successfully implemented weekly team recognition meetings with positive initial feedback from team members."
        },
        {
            date: "2025-01-15",
            title: "Annual Survey Completed",
            description: "Achieved 83% response rate for the 2025 employee experience survey, providing valuable insights into team satisfaction."
        },
        {
            date: "2025-01-10",
            title: "One-on-One Schedule Established",
            description: "Set up monthly one-on-one meetings with all team members to improve communication and support."
        },
        {
            date: "2025-01-05",
            title: "Development Planning Initiated",
            description: "Started individual development planning sessions to address career growth opportunities."
        }
    ];
    
    container.innerHTML = milestones.map(milestone => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDate(milestone.date)}</div>
            <div class="timeline-title">${milestone.title}</div>
            <div class="timeline-description">${milestone.description}</div>
        </div>
    `).join('');
}

function updateProgressView() {
    const period = document.getElementById('progressPeriod').value;
    console.log('Updating progress view for period:', period);
    // In a real application, this would filter data based on the selected period
}

// Export Functions
function exportTeamReport() {
    showToast('Export functionality would be implemented here', 'info');
    // In a real application, this would generate and download a comprehensive team report
}

// Utility Functions
function formatDate(dateString) {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'warning' ? 'exclamation-triangle' : 
                 type === 'error' ? 'times-circle' : 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Console log for debugging
console.log('Manager Dashboard Script Loaded');
console.log('Dashboard Configuration:', dashboardConfig);
