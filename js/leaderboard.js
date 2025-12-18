// ============================================================================
// LEADERBOARD MODULE - Survey Completion Progress Leaderboard
// ============================================================================
// This module handles the rendering and interaction logic for the 
// organizational leaderboard view, featuring top performers and hierarchical
// business unit rankings with momentum indicators.
// ============================================================================

/**
 * Build leaderboard data structure based on shared org levels where possible.
 *
 * We derive population / completion metrics from the core progressTrackerData
 * (company + segments) in js/shared/mock-data.js so that:
 * - The Progress table and Leaderboard always stay in sync
 * - Org names and levels are consistent across the app
 *
 * We then group business units into higher-level \"divisions\" that reflect
 * organisational groupings used in other views.
 */
function buildLeaderboardDataFromProgressTracker() {
    const mock = (typeof window !== 'undefined' && window.mockData) ? window.mockData : {};
    const progressData = mock.progressTrackerData || {};
    const company = progressData.company || { name: 'Organisation', population: 0, completed: 0, inProgress: 0, notStarted: 0, completionRate: 0 };
    const segments = Array.isArray(progressData.segments) ? progressData.segments : [];

    // Helper to look up a segment (business unit) by name
    const findSegment = (name) => segments.find(s => s.name === name);

    // Static grouping of business units into higher-level org divisions.
    // This expresses the org levels used for the leaderboard view.
    const divisionGroups = [
        {
            divisionName: "Corporate Services",
            units: ["Sanlam Group Office", "Sanlam Fintech"],
            deltas: {
                "Sanlam Group Office": +1,
                "Sanlam Fintech": +2
            }
        },
        {
            divisionName: "Financial Services",
            units: ["Sanlam Life & Savings", "Sanlam Investment Group"],
            deltas: {
                "Sanlam Life & Savings": +1,
                "Sanlam Investment Group": +2
            }
        },
        {
            divisionName: "Insurance & Partnerships",
            units: ["Santam", "SanlamAllianz"],
            deltas: {
                "Santam": -1,
                "SanlamAllianz": 0
            }
        }
    ];

    const divisions = divisionGroups.map(group => {
        const businessUnits = group.units
            .map(unitName => {
                const seg = findSegment(unitName);
                if (!seg) return null;
                return {
                    name: seg.name,
                    population: seg.population,
                    completed: seg.completed,
                    inProgress: seg.inProgress,
                    notStarted: seg.notStarted,
                    completionRate: seg.completionRate,
                    delta: group.deltas[unitName] ?? 0
                };
            })
            .filter(Boolean);

        // Skip empty groups defensively
        if (!businessUnits.length) return null;

        return {
            divisionName: group.divisionName,
            businessUnits
        };
    }).filter(Boolean);

    return {
        groupName: company.name || "Organisation",
        divisions
    };
}

const leaderboardData = buildLeaderboardDataFromProgressTracker();

/**
 * Calculate global rankings for all business units based on completion rate
 * @returns {Array} Sorted array of business units with global ranks
 */
function calculateGlobalRankings() {
    const allUnits = [];
    
    // Flatten hierarchy to get all business units
    leaderboardData.divisions.forEach(division => {
        division.businessUnits.forEach(unit => {
            allUnits.push({
                ...unit,
                divisionName: division.divisionName
            });
        });
    });
    
    // Sort by completion rate (descending), then by name for ties
    allUnits.sort((a, b) => {
        if (b.completionRate !== a.completionRate) {
            return b.completionRate - a.completionRate;
        }
        return a.name.localeCompare(b.name);
    });
    
    // Assign global ranks
    allUnits.forEach((unit, index) => {
        unit.globalRank = index + 1;
    });
    
    return allUnits;
}

/**
 * Get completion rate color class based on thresholds
 * @param {number} rate - Completion rate percentage
 * @returns {string} CSS class name
 */
function getCompletionClass(rate) {
    if (rate >= 75) return 'excellent';
    if (rate >= 60) return 'good';
    if (rate >= 45) return 'fair';
    return 'attention';
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * Render momentum indicator with appropriate icon and color
 * @param {number} delta - Change in completion rate
 * @returns {string} HTML for momentum indicator
 */
function renderMomentumIndicator(delta) {
    if (delta > 0) {
        return `<span class="momentum-indicator momentum-up">
            <i class="material-icons">arrow_upward</i>
            <span>+${delta}</span>
        </span>`;
    } else if (delta < 0) {
        return `<span class="momentum-indicator momentum-down">
            <i class="material-icons">arrow_downward</i>
            <span>${delta}</span>
        </span>`;
    } else {
        return `<span class="momentum-indicator momentum-flat">
            <i class="material-icons">remove</i>
            <span>0</span>
        </span>`;
    }
}

/**
 * Render Champion Zone with top 3 performers
 */
function renderChampionZone() {
    const rankedUnits = calculateGlobalRankings();
    const top3 = rankedUnits.slice(0, 3);
    const container = document.getElementById('championZone');
    
    if (!container) return;
    
    const html = `
        <div class="champion-zone-header">
            <h3 class="mb-0">
                <i class="material-icons">emoji_events</i>
                Participation Leaders
            </h3>
            <p class="text-muted mb-0 fs-7">Top performing business units by completion rate</p>
        </div>
        <div class="champion-cards">
            ${top3.map((unit, index) => `
                <div class="champion-card ${index === 0 ? 'rank-1' : ''}">
                    <div class="champion-rank">
                        ${index === 0 ? '<i class="material-icons">emoji_events</i>' : ''}
                        <span class="rank-number">#${unit.globalRank}</span>
                    </div>
                    <div class="champion-info">
                        <h4 class="champion-name">${unit.name}</h4>
                        <p class="champion-division">${unit.divisionName}</p>
                    </div>
                    <div class="champion-stats">
                        <div class="champion-rate ${getCompletionClass(unit.completionRate)}">
                            ${unit.completionRate}%
                        </div>
                        ${renderMomentumIndicator(unit.delta)}
                    </div>
                    <div class="champion-details">
                        <div class="stat-item">
                            <span class="stat-label">Population</span>
                            <span class="stat-value">${formatNumber(unit.population)}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Completed</span>
                            <span class="stat-value">${formatNumber(unit.completed)}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Render a business unit row with all details
 * @param {Object} unit - Business unit data with rank
 * @returns {string} HTML for business unit row
 */
function renderBusinessUnitRow(unit) {
    const completionClass = getCompletionClass(unit.completionRate);
    
    return `
        <div class="business-unit-row">
            <div class="unit-rank-badge">
                <span class="rank-badge ${completionClass}">${unit.globalRank}</span>
            </div>
            <div class="unit-info">
                <h5 class="unit-name">${unit.name}</h5>
                <div class="unit-meta">
                    <span class="meta-item">
                        <i class="material-icons">groups</i>
                        ${formatNumber(unit.population)}
                    </span>
                </div>
            </div>
            <div class="unit-breakdown">
                <div class="breakdown-item breakdown-completed">
                    <span class="breakdown-label">Completed</span>
                    <span class="breakdown-value">${formatNumber(unit.completed)}</span>
                </div>
                <div class="breakdown-item breakdown-progress">
                    <span class="breakdown-label">In Progress</span>
                    <span class="breakdown-value">${formatNumber(unit.inProgress)}</span>
                </div>
                <div class="breakdown-item breakdown-not-started">
                    <span class="breakdown-label">Not Started</span>
                    <span class="breakdown-value">${formatNumber(unit.notStarted)}</span>
                </div>
            </div>
            <div class="unit-progress">
                <div class="lb-progress-bar-container">
                    <div class="lb-progress-bar ${completionClass}" style="width: ${unit.completionRate}%"></div>
                </div>
            </div>
            <div class="unit-completion">
                <span class="completion-badge ${completionClass}">${unit.completionRate}%</span>
                ${renderMomentumIndicator(unit.delta)}
            </div>
        </div>
    `;
}

/**
 * Render the complete organizational leaderboard with collapsible divisions
 */
function renderOrgLeaderboard() {
    const rankedUnits = calculateGlobalRankings();
    const container = document.getElementById('orgLeaderboard');
    
    if (!container) return;
    
    // Create a map for quick rank lookup
    const rankMap = {};
    rankedUnits.forEach(unit => {
        rankMap[unit.name] = unit.globalRank;
    });
    
    const html = `
        <div class="org-leaderboard-header">
            <h3 class="mb-0">Organizational Leaderboard</h3>
            <p class="text-muted mb-0 fs-7">Rankings by division - ${leaderboardData.groupName}</p>
        </div>
        <div class="divisions-container">
            ${leaderboardData.divisions.map((division, divIndex) => {
                const divisionId = `division-${divIndex}`;
                const unitsWithRanks = division.businessUnits.map(unit => ({
                    ...unit,
                    globalRank: rankMap[unit.name],
                    divisionName: division.divisionName
                })).sort((a, b) => a.globalRank - b.globalRank);
                
                return `
                    <div class="division-section">
                        <div class="division-header" 
                             data-bs-toggle="collapse" 
                             data-bs-target="#${divisionId}"
                             aria-expanded="true"
                             aria-controls="${divisionId}">
                            <div class="division-title">
                                <i class="material-icons chevron">expand_more</i>
                                <h4>${division.divisionName}</h4>
                                <span class="unit-count">${division.businessUnits.length} unit${division.businessUnits.length !== 1 ? 's' : ''}</span>
                            </div>
                            <div class="division-stats">
                                <span class="stat-badge">
                                    Avg: ${Math.round(division.businessUnits.reduce((sum, u) => sum + u.completionRate, 0) / division.businessUnits.length)}%
                                </span>
                            </div>
                        </div>
                        <div class="collapse show" id="${divisionId}">
                            <div class="division-body">
                                ${unitsWithRanks.map(unit => renderBusinessUnitRow(unit)).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    container.innerHTML = html;
    
    // Add collapse event listeners for chevron rotation
    const collapseElements = container.querySelectorAll('.collapse');
    collapseElements.forEach(collapse => {
        collapse.addEventListener('show.bs.collapse', function() {
            const header = this.previousElementSibling;
            const chevron = header.querySelector('.chevron');
            if (chevron) chevron.classList.add('rotated');
        });
        
        collapse.addEventListener('hide.bs.collapse', function() {
            const header = this.previousElementSibling;
            const chevron = header.querySelector('.chevron');
            if (chevron) chevron.classList.remove('rotated');
        });
    });
}

/**
 * Initialize the leaderboard view
 * This function should be called when the leaderboard tab is activated
 */
let leaderboardInitialized = false;

function initializeLeaderboard() {
    // Only initialize once
    if (leaderboardInitialized) return;
    
    renderChampionZone();
    renderOrgLeaderboard();
    
    leaderboardInitialized = true;
}

// Make initializeLeaderboard available globally
if (typeof window !== 'undefined') {
    window.initializeLeaderboard = initializeLeaderboard;
}
