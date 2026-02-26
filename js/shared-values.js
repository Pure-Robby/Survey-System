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
                    stronglyAgree: 19,
                    agree: 29,
                    neutral: 24,
                    disagree: 17,
                    stronglyDisagree: 11
                },
                {
                    text: "I believe my leader acts in accordance with our corporate values",
                    stronglyAgree: 18,
                    agree: 27,
                    neutral: 22,
                    disagree: 20,
                    stronglyDisagree: 13
                }
            ]
        },
        {
            name: "Integrity",
            averageScore: 68.5,
            statements: [
                {
                    text: "My team operates with honesty and transparency",
                    stronglyAgree: 17,
                    agree: 25,
                    neutral: 26,
                    disagree: 19,
                    stronglyDisagree: 13
                },
                {
                    text: "Leadership acts with integrity and sets a strong ethical example",
                    stronglyAgree: 18,
                    agree: 26,
                    neutral: 21,
                    disagree: 21,
                    stronglyDisagree: 14
                }
            ]
        },
        {
            name: "Innovation",
            averageScore: 65.8,
            statements: [
                {
                    text: "I am encouraged to share new ideas and creative solutions",
                    stronglyAgree: 16,
                    agree: 24,
                    neutral: 25,
                    disagree: 21,
                    stronglyDisagree: 14
                },
                {
                    text: "The organisation actively supports innovation and continuous improvement",
                    stronglyAgree: 15,
                    agree: 23,
                    neutral: 28,
                    disagree: 20,
                    stronglyDisagree: 14
                },
                {
                    text: "My team regularly discusses new ideas and ways to improve",
                    stronglyAgree: 17,
                    agree: 25,
                    neutral: 24,
                    disagree: 20,
                    stronglyDisagree: 14
                }
            ]
        },
        {
            name: "Care",
            averageScore: 70.2,
            statements: [
                {
                    text: "People in my team treat each other with kindness and respect",
                    stronglyAgree: 19,
                    agree: 29,
                    neutral: 20,
                    disagree: 19,
                    stronglyDisagree: 13
                },
                {
                    text: "I feel comfortable asking for help or support when I need it",
                    stronglyAgree: 18,
                    agree: 28,
                    neutral: 22,
                    disagree: 19,
                    stronglyDisagree: 13
                },
                {
                    text: "Leadership demonstrates concern for employees during times of stress or uncertainty",
                    stronglyAgree: 17,
                    agree: 25,
                    neutral: 26,
                    disagree: 19,
                    stronglyDisagree: 13
                },
                {
                    text: "Care is a visible and consistent value in how leaders communicate and act",
                    stronglyAgree: 18,
                    agree: 26,
                    neutral: 24,
                    disagree: 19,
                    stronglyDisagree: 13
                }
            ]
        },
        {
            name: "Collaboration",
            averageScore: 64.5,
            statements: [
                {
                    text: "There is strong collaboration between different departments or teams",
                    stronglyAgree: 15,
                    agree: 23,
                    neutral: 27,
                    disagree: 21,
                    stronglyDisagree: 14
                },
                {
                    text: "Open and respectful communication is encouraged in collaborative efforts",
                    stronglyAgree: 16,
                    agree: 24,
                    neutral: 25,
                    disagree: 21,
                    stronglyDisagree: 14
                },
                {
                    text: "Leadership encourages collaboration across all levels of the organization",
                    stronglyAgree: 16,
                    agree: 23,
                    neutral: 26,
                    disagree: 21,
                    stronglyDisagree: 14
                }
            ]
        },
        {
            name: "Trust & Psychological Safety",
            averageScore: 62.8,
            statements: [
                {
                    text: "I feel safe to speak up and share my honest opinions, even if they differ from others",
                    stronglyAgree: 14,
                    agree: 22,
                    neutral: 28,
                    disagree: 22,
                    stronglyDisagree: 14
                },
                {
                    text: "Employees are encouraged to share their thoughts and views with their managers and senior leadership",
                    stronglyAgree: 15,
                    agree: 23,
                    neutral: 26,
                    disagree: 22,
                    stronglyDisagree: 14
                },
                {
                    text: "I trust the decisions made by senior leadership",
                    stronglyAgree: 14,
                    agree: 21,
                    neutral: 30,
                    disagree: 21,
                    stronglyDisagree: 14
                },
                {
                    text: "Leaders demonstrate integrity in their actions and decisions",
                    stronglyAgree: 15,
                    agree: 22,
                    neutral: 28,
                    disagree: 21,
                    stronglyDisagree: 14
                },
                {
                    text: "Leaders are approachable and open to feedback",
                    stronglyAgree: 16,
                    agree: 23,
                    neutral: 26,
                    disagree: 21,
                    stronglyDisagree: 14
                }
            ]
        },
        {
            name: "Inclusion & Belonging",
            averageScore: 69.5,
            statements: [
                {
                    text: "Leadership has clearly encouraged diversity and inclusion through its words and actions",
                    stronglyAgree: 18,
                    agree: 26,
                    neutral: 24,
                    disagree: 19,
                    stronglyDisagree: 13
                },
                {
                    text: "The organisation has clear policies that ensure employees from various viewpoints and backgrounds are respected and valued",
                    stronglyAgree: 18,
                    agree: 28,
                    neutral: 22,
                    disagree: 19,
                    stronglyDisagree: 13
                }
            ]
        }
    ]
};

// Global state for 5-point scale toggle
let use5PointScale = true;
let currentDimensionIndex = null;

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

// Toggle scale function
function toggleScale() {
    use5PointScale = !use5PointScale;
    if (currentDimensionIndex !== null) {
        showDimensionDetail(currentDimensionIndex);
    }
}

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

    currentDimensionIndex = dimensionIndex;

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
    
    let legendHTML = '';
    if (use5PointScale) {
        legendHTML = `
            <div class="statement-legend">
                <div class="legend-item">
                    <div class="legend-color" style="background-color: var(--color-scale-strongly-agree);"></div>
                    <span>Strongly Agree</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: var(--color-scale-agree);"></div>
                    <span>Agree</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: var(--color-scale-neutral);"></div>
                    <span>Neutral</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: var(--color-scale-disagree);"></div>
                    <span>Disagree</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: var(--color-scale-strongly-disagree);"></div>
                    <span>Strongly Disagree</span>
                </div>
            </div>`;
    } else {
        legendHTML = `
            <div class="statement-legend">
                <div class="legend-item">
                    <div class="legend-color" style="background-color: var(--color-positive);"></div>
                    <span>Agree</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: var(--color-neutral);"></div>
                    <span>Neutral</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: var(--color-negative);"></div>
                    <span>Disagree</span>
                </div>
            </div>`;
    }

    container.innerHTML = `
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h6 class="mb-0">Statements Distribution Breakdown</h6>
            <div class="d-flex align-items-center gap-3">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="scaleToggle" ${use5PointScale ? 'checked' : ''} onchange="toggleScale()">
                    <label class="form-check-label" for="scaleToggle">5-Point Scale</label>
                </div>
                ${legendHTML}
            </div>
        </div>
        <hr>`;

    // Sort statements by score ascending (lowest/most concerning first)
    const sortedStatements = [...dimension.statements].sort((a, b) => (a.stronglyAgree + a.agree) - (b.stronglyAgree + b.agree));

    sortedStatements.forEach((statement, index) => {
        const statementScore = statement.stronglyAgree + statement.agree; // Positive percentage is the sum of SA and A
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
    if (use5PointScale) {
        // Values are already percentages (sum to 100)
        const saPercent = statement.stronglyAgree;
        const aPercent = statement.agree;
        const nPercent = statement.neutral;
        const dPercent = statement.disagree;
        const sdPercent = statement.stronglyDisagree;
        
        // Round to integers for display
        const saDisplay = Math.round(saPercent);
        const aDisplay = Math.round(aPercent);
        const nDisplay = Math.round(nPercent);
        const dDisplay = Math.round(dPercent);
        const sdDisplay = Math.round(sdPercent);

        return `
            <div class="statement-bar-track">
                <div class="statement-bar-segment strongly-agree" style="width: ${saPercent}%;" title="Strongly Agree: ${saDisplay}%">
                    ${saDisplay >= 5 ? `<span class="bar-label">${saDisplay}%</span>` : ''}
                </div>
                <div class="statement-bar-segment agree" style="width: ${aPercent}%;" title="Agree: ${aDisplay}%">
                    ${aDisplay >= 5 ? `<span class="bar-label">${aDisplay}%</span>` : ''}
                </div>
                <div class="statement-bar-segment neutral" style="width: ${nPercent}%;" title="Neutral: ${nDisplay}%">
                    ${nDisplay >= 5 ? `<span class="bar-label">${nDisplay}%</span>` : ''}
                </div>
                <div class="statement-bar-segment disagree" style="width: ${dPercent}%;" title="Disagree: ${dDisplay}%">
                    ${dDisplay >= 5 ? `<span class="bar-label">${dDisplay}%</span>` : ''}
                </div>
                <div class="statement-bar-segment strongly-disagree" style="width: ${sdPercent}%;" title="Strongly Disagree: ${sdDisplay}%">
                    ${sdDisplay >= 5 ? `<span class="bar-label">${sdDisplay}%</span>` : ''}
                </div>
            </div>
        `;
    } else {
        // 3-point scale aggregation
        const agreePercent = statement.stronglyAgree + statement.agree;
        const neutralPercent = statement.neutral;
        const disagreePercent = statement.disagree + statement.stronglyDisagree;

        const agreeDisplay = Math.round(agreePercent);
        const neutralDisplay = Math.round(neutralPercent);
        const disagreeDisplay = Math.round(disagreePercent);

        return `
            <div class="statement-bar-track">
                <div class="statement-bar-segment" style="width: ${agreePercent}%; background-color: var(--color-positive);" title="Agree: ${agreeDisplay}%">
                    ${agreeDisplay >= 5 ? `<span class="bar-label">${agreeDisplay}%</span>` : ''}
                </div>
                <div class="statement-bar-segment" style="width: ${neutralPercent}%; background-color: var(--color-neutral);" title="Neutral: ${neutralDisplay}%">
                    ${neutralDisplay >= 5 ? `<span class="bar-label" style="color: var(--color-text);">${neutralDisplay}%</span>` : ''}
                </div>
                <div class="statement-bar-segment" style="width: ${disagreePercent}%; background-color: var(--color-negative);" title="Disagree: ${disagreeDisplay}%">
                    ${disagreeDisplay >= 5 ? `<span class="bar-label">${disagreeDisplay}%</span>` : ''}
                </div>
            </div>
        `;
    }
}

// Render statements overview (top/bottom statements)
function renderStatementsOverview() {
    // Collect all statements from all dimensions with their dimension names
    const allStatements = [];
    sharedValuesData.dimensions.forEach(dimension => {
        dimension.statements.forEach(statement => {
            allStatements.push({
                text: statement.text,
                score: statement.stronglyAgree + statement.agree,
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
