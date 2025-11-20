// Leadership Enablement Detail Page JavaScript

// Mock data structure for Leadership Enablement
const leadershipEnablementData = {
    overallScore: 78.6,
    dimensions: [
        {
            name: "Envisage Our Future",
            averageScore: 76.4,
            statements: [
                {
                    text: "My line manager communicates a clear and inspiring vision for the future",
                    agree: 50,
                    unsure: 22,
                    disagree: 28
                },
                {
                    text: "My line manager encourages me to create innovative, client-focused solutions",
                    agree: 52,
                    unsure: 20,
                    disagree: 28
                }
            ]
        },
        {
            name: "Champion Sustainable Results",
            averageScore: 79.8,
            statements: [
                {
                    text: "My line manager encourages the effective use of resources to drive continuous improvement",
                    agree: 54,
                    unsure: 20,
                    disagree: 26
                },
                {
                    text: "My line manager focuses on driving purpose driven, sustainable results",
                    agree: 56,
                    unsure: 18,
                    disagree: 26
                }
            ]
        },
        {
            name: "Show Up and Inspire Excellence",
            averageScore: 80.2,
            statements: [
                {
                    text: "My line manager makes clear decisions and responds effectively under pressure",
                    agree: 56,
                    unsure: 18,
                    disagree: 26
                },
                {
                    text: "My line manager displays humility, integrity and a learning mindset",
                    agree: 58,
                    unsure: 16,
                    disagree: 26
                }
            ]
        },
        {
            name: "Win Together",
            averageScore: 78.0,
            statements: [
                {
                    text: "My line manager enables a culture that fosters inclusion, psychological safety and support",
                    agree: 52,
                    unsure: 20,
                    disagree: 28
                },
                {
                    text: "My line manager drives a strong sense of collaboration and shared purpose in my team",
                    agree: 54,
                    unsure: 18,
                    disagree: 28
                }
            ]
        }
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set data date
    const options = { day: "2-digit", month: "short", year: "numeric" };
    document.getElementById("dataDate").textContent =
        "Data correct as of: " + new Date().toLocaleDateString("en-GB", options);

    // Render dimensions overview
    renderDimensionsOverview();
    
    // Render statements overview
    renderStatementsOverview();
    
    // Check for dimension parameter in URL and auto-open if present
    const urlParams = new URLSearchParams(window.location.search);
    const dimensionIndex = urlParams.get('dimension');
    if (dimensionIndex !== null) {
        const index = parseInt(dimensionIndex);
        if (!isNaN(index) && index >= 0 && index < leadershipEnablementData.dimensions.length) {
            showDimensionDetail(index);
        }
    }
});

// Render dimensions overview
function renderDimensionsOverview() {
    const container = document.getElementById('dimensionsOverview');
    if (!container) return;

    container.innerHTML = '';

    // Sort dimensions by score ascending (lowest/most concerning first)
    const sortedDimensions = [...leadershipEnablementData.dimensions]
        .map((dim, originalIndex) => ({ ...dim, originalIndex }))
        .sort((a, b) => a.averageScore - b.averageScore);

    sortedDimensions.forEach((dimension) => {
        const dimensionCard = document.createElement('div');
        dimensionCard.className = 'dimension-card';
        dimensionCard.onclick = () => showDimensionDetail(dimension.originalIndex);
        
        dimensionCard.innerHTML = `
            <div class="dimension-card-header">
                <h4 class="dimension-name">${dimension.name}</h4>
                <div class="dimension-score">${dimension.averageScore}%</div>
            </div>
            <div class="dimension-card-body">
                <p class="dimension-statements-count">${dimension.statements.length} Statement${dimension.statements.length !== 1 ? 's' : ''}</p>
                <div class="dimension-card-footer">
                    <span class="dimension-click-hint">Click to view details <i class='bx bx-chevron-right'></i></span>
                </div>
            </div>
        `;
        
        container.appendChild(dimensionCard);
    });
}

// Show dimension detail view
function showDimensionDetail(dimensionIndex) {
    const dimension = leadershipEnablementData.dimensions[dimensionIndex];
    if (!dimension) return;

    // Hide overview, show detail
    document.getElementById('dimensionsOverview').style.display = 'none';
    document.getElementById('statementsOverview').style.display = 'none';
    document.getElementById('dimensionDetail').style.display = 'block';

    // Set dimension title with score
    document.getElementById('dimensionDetailTitle').innerHTML = `
        ${dimension.name} <span>${dimension.averageScore}%</span>
    `;

    // Render statements
    const container = document.getElementById('statementsContainer');
    container.innerHTML = `<div class="d-flex align-items-center justify-content-between"><h6 class="mb-0">Statements Breakdown</h6><div class="statement-legend">
                        <div class="legend-item">
                            <div class="legend-color" style="background-color: #28a745;"></div>
                            <span>Positive</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color" style="background-color: #ffc107;"></div>
                            <span>Neutral</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color" style="background-color: #dc3545;"></div>
                            <span>Negative</span>
                        </div>
                    </div></div>
                    <hr>`;

    // Sort statements by score ascending (lowest/most concerning first)
    const sortedStatements = [...dimension.statements].sort((a, b) => a.agree - b.agree);

    sortedStatements.forEach((statement, index) => {
        const statementScore = statement.agree; // Positive percentage is the statement score
        const statementDiv = document.createElement('div');
        statementDiv.className = 'statement-item';
        statementDiv.innerHTML = `
            <div class="statement-header">
                <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 16px;">
                    <h6 class="statement-text" style="flex: 1;">${statement.text}</h6>
                    <span style="font-size: 1.25rem; font-weight: 500; background: var(--color-primary); color: white; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); white-space: nowrap;">${statementScore}%</span>
                </div>
            </div>
            <div class="statement-scoring">                
                <div class="statement-bar-container">
                    ${createStatementScoringBar(statement)}
                </div>
            </div>
        `;
        container.appendChild(statementDiv);
    });
}

// Create statement scoring bar visualization
function createStatementScoringBar(statement) {
    // Values are already percentages (sum to 100)
    const agreePercent = statement.agree;
    const unsurePercent = statement.unsure;
    const disagreePercent = statement.disagree;
    
    // Round to integers for display
    const agreeDisplay = Math.round(agreePercent);
    const unsureDisplay = Math.round(unsurePercent);
    const disagreeDisplay = Math.round(disagreePercent);

    return `
        <div class="statement-bar-track">
            <div class="statement-bar-segment agree" style="width: ${agreePercent}%;" title="Agree: ${agreeDisplay}%">
                ${agreeDisplay >= 5 ? `<span class="bar-label">${agreeDisplay}%</span>` : ''}
            </div>
            <div class="statement-bar-segment unsure" style="width: ${unsurePercent}%;" title="Unsure: ${unsureDisplay}%">
                ${unsureDisplay >= 5 ? `<span class="bar-label">${unsureDisplay}%</span>` : ''}
            </div>
            <div class="statement-bar-segment disagree" style="width: ${disagreePercent}%;" title="Disagree: ${disagreeDisplay}%">
                ${disagreeDisplay >= 5 ? `<span class="bar-label">${disagreeDisplay}%</span>` : ''}
            </div>
        </div>
    `;
}

// Render statements overview (top/bottom statements)
function renderStatementsOverview() {
    // Collect all statements from all dimensions with their dimension names
    const allStatements = [];
    leadershipEnablementData.dimensions.forEach(dimension => {
        dimension.statements.forEach(statement => {
            allStatements.push({
                text: statement.text,
                score: statement.agree,
                dimension: dimension.name
            });
        });
    });

    // Sort by score
    const sortedStatements = [...allStatements].sort((a, b) => a.score - b.score);
    
    // Get bottom 5 and top 5
    const bottomStatements = sortedStatements.slice(0, 5);
    const topStatements = sortedStatements.slice(-5).reverse();

    // Render bottom statements
    const bottomContainer = document.getElementById('bottomStatements');
    if (bottomContainer) {
        bottomContainer.innerHTML = bottomStatements.map(stmt => `
            <div class="statement-overview-item">
                <div class="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <div style="flex: 1;">
                        <p class="mb-1" style="font-size: 14px; line-height: 1.4;">${stmt.text}</p>
                        <p class="mb-0" style="font-size: 13px; color: #888;">${stmt.dimension}</p>
                    </div>
                    <span class="badge" style="background-color: var(--color-danger); color: white; font-size: 14px; padding: 4px 10px; white-space: nowrap;">${stmt.score}%</span>
                </div>
            </div>
        `).join('');
    }

    // Render top statements
    const topContainer = document.getElementById('topStatements');
    if (topContainer) {
        topContainer.innerHTML = topStatements.map(stmt => `
            <div class="statement-overview-item">
                <div class="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <div style="flex: 1;">
                        <p class="mb-1" style="font-size: 14px; line-height: 1.4;">${stmt.text}</p>
                        <p class="mb-0" style="font-size: 13px; color: #888;">${stmt.dimension}</p>
                    </div>
                    <span class="badge" style="background-color: var(--color-success); color: white; font-size: 14px; padding: 4px 10px; white-space: nowrap;">${stmt.score}%</span>
                </div>
            </div>
        `).join('');
    }
}

// Show dimensions overview
function showDimensionsOverview() {
    document.getElementById('dimensionsOverview').style.display = 'grid';
    document.getElementById('statementsOverview').style.display = 'block';
    document.getElementById('dimensionDetail').style.display = 'none';
}

// Make functions available globally
window.showDimensionsOverview = showDimensionsOverview;

