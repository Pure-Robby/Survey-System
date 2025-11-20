// Shared Values Detail Page JavaScript

// Mock data structure for Shared Values
const sharedValuesData = {
    overallScore: 66.7,
    dimensions: [
        {
            name: "Values",
            averageScore: 72.3,
            statements: [
                {
                    text: "My organisation's values have been clearly communicated",
                    agree: 48,
                    unsure: 24,
                    disagree: 28
                },
                {
                    text: "I believe my leader acts in accordance with our corporate values",
                    agree: 45,
                    unsure: 22,
                    disagree: 33
                }
            ]
        },
        {
            name: "Integrity",
            averageScore: 68.5,
            statements: [
                {
                    text: "My team operates with honesty and transparency",
                    agree: 42,
                    unsure: 26,
                    disagree: 32
                },
                {
                    text: "Leadership acts with integrity and sets a strong ethical example",
                    agree: 44,
                    unsure: 21,
                    disagree: 35
                }
            ]
        },
        {
            name: "Innovation",
            averageScore: 65.8,
            statements: [
                {
                    text: "I am encouraged to share new ideas and creative solutions",
                    agree: 40,
                    unsure: 25,
                    disagree: 35
                },
                {
                    text: "The organisation actively supports innovation and continuous improvement",
                    agree: 38,
                    unsure: 28,
                    disagree: 34
                },
                {
                    text: "My team regularly discusses new ideas and ways to improve",
                    agree: 42,
                    unsure: 24,
                    disagree: 34
                }
            ]
        },
        {
            name: "Care",
            averageScore: 70.2,
            statements: [
                {
                    text: "People in my team treat each other with kindness and respect",
                    agree: 48,
                    unsure: 20,
                    disagree: 32
                },
                {
                    text: "I feel comfortable asking for help or support when I need it",
                    agree: 46,
                    unsure: 22,
                    disagree: 32
                },
                {
                    text: "Leadership demonstrates concern for employees during times of stress or uncertainty",
                    agree: 42,
                    unsure: 26,
                    disagree: 32
                },
                {
                    text: "Care is a visible and consistent value in how leaders communicate and act",
                    agree: 44,
                    unsure: 24,
                    disagree: 32
                }
            ]
        },
        {
            name: "Collaboration",
            averageScore: 64.5,
            statements: [
                {
                    text: "There is strong collaboration between different departments or teams",
                    agree: 38,
                    unsure: 27,
                    disagree: 35
                },
                {
                    text: "Open and respectful communication is encouraged in collaborative efforts",
                    agree: 40,
                    unsure: 25,
                    disagree: 35
                },
                {
                    text: "Leadership encourages collaboration across all levels of the organization",
                    agree: 39,
                    unsure: 26,
                    disagree: 35
                }
            ]
        },
        {
            name: "Trust & Psychological Safety",
            averageScore: 62.8,
            statements: [
                {
                    text: "I feel safe to speak up and share my honest opinions, even if they differ from others",
                    agree: 36,
                    unsure: 28,
                    disagree: 36
                },
                {
                    text: "Employees are encouraged to share their thoughts and views with their managers and senior leadership",
                    agree: 38,
                    unsure: 26,
                    disagree: 36
                },
                {
                    text: "I trust the decisions made by senior leadership",
                    agree: 35,
                    unsure: 30,
                    disagree: 35
                },
                {
                    text: "Leaders demonstrate integrity in their actions and decisions",
                    agree: 37,
                    unsure: 28,
                    disagree: 35
                },
                {
                    text: "Leaders are approachable and open to feedback",
                    agree: 39,
                    unsure: 26,
                    disagree: 35
                }
            ]
        },
        {
            name: "Inclusion & Belonging",
            averageScore: 69.5,
            statements: [
                {
                    text: "Leadership has clearly encouraged diversity and inclusion through its words and actions",
                    agree: 44,
                    unsure: 24,
                    disagree: 32
                },
                {
                    text: "The organisation has clear policies that ensure employees from various viewpoints and backgrounds are respected and valued",
                    agree: 46,
                    unsure: 22,
                    disagree: 32
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
        if (!isNaN(index) && index >= 0 && index < sharedValuesData.dimensions.length) {
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
    const sortedDimensions = [...sharedValuesData.dimensions]
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
    const dimension = sharedValuesData.dimensions[dimensionIndex];
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
    sharedValuesData.dimensions.forEach(dimension => {
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

