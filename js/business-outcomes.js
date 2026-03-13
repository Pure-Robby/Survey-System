// Business Outcomes Detail Page JavaScript

// Mock data structure for Business Outcomes
const businessOutcomesData = {
    overallScore: 83.3,
    dimensions: [
        {
            name: "Continuous Development",
            averageScore: 85.0,
            statements: [
                {
                    text: "The organisation encourages innovation and creative problem-solving",
                    stronglyAgree: 9,
                    agree: 13,
                    neutral: 13,
                    disagree: 39,
                    stronglyDisagree: 26
                },
                {
                    text: "We regularly review and improve how we work",
                    stronglyAgree: 18,
                    agree: 27,
                    neutral: 20,
                    disagree: 21,
                    stronglyDisagree: 14
                },
                {
                    text: "Continuous improvement is part of our everyday culture",
                    stronglyAgree: 15,
                    agree: 23,
                    neutral: 25,
                    disagree: 22,
                    stronglyDisagree: 15
                }
            ]
        },
        {
            name: "Change Agility",
            averageScore: 78.5,
            statements: [
                {
                    text: "When a change is introduced, my line manager effectively communicates and manages the change with us as a team",
                    stronglyAgree: 21,
                    agree: 31,
                    neutral: 18,
                    disagree: 18,
                    stronglyDisagree: 12
                },
                {
                    text: "My organisation has provided me with sufficient resources to enable me to navigate current changes",
                    stronglyAgree: 19,
                    agree: 29,
                    neutral: 22,
                    disagree: 18,
                    stronglyDisagree: 12
                },
                {
                    text: "At the present time, I am coping with the changes in the organization",
                    stronglyAgree: 22,
                    agree: 33,
                    neutral: 20,
                    disagree: 15,
                    stronglyDisagree: 10
                }
            ]
        },
        {
            name: "Productivity",
            averageScore: 88.2,
            statements: [
                {
                    text: "My work environment supports focus and efficiency",
                    stronglyAgree: 27,
                    agree: 41,
                    neutral: 15,
                    disagree: 10,
                    stronglyDisagree: 7
                },
                {
                    text: "My workload is manageable and allows me to be productive",
                    stronglyAgree: 23,
                    agree: 35,
                    neutral: 20,
                    disagree: 13,
                    stronglyDisagree: 9
                },
                {
                    text: "Collaboration tools and processes help us work effectively as a team",
                    stronglyAgree: 25,
                    agree: 37,
                    neutral: 18,
                    disagree: 12,
                    stronglyDisagree: 8
                },
                {
                    text: "I feel motivated to perform at my best every day",
                    stronglyAgree: 26,
                    agree: 39,
                    neutral: 18,
                    disagree: 10,
                    stronglyDisagree: 7
                }
            ]
        },
        {
            name: "Customer Centricity",
            averageScore: 81.8,
            statements: [
                {
                    text: "I feel empowered to respond to customer concerns quickly and effectively",
                    stronglyAgree: 23,
                    agree: 35,
                    neutral: 20,
                    disagree: 13,
                    stronglyDisagree: 9
                },
                {
                    text: "Our processes are designed with the customer experience in mind",
                    stronglyAgree: 22,
                    agree: 33,
                    neutral: 22,
                    disagree: 14,
                    stronglyDisagree: 9
                },
                {
                    text: "I have the tools and resources I need to deliver great customer service",
                    stronglyAgree: 25,
                    agree: 37,
                    neutral: 18,
                    disagree: 12,
                    stronglyDisagree: 8
                },
                {
                    text: "We regularly use customer feedback to improve our products or services",
                    stronglyAgree: 24,
                    agree: 36,
                    neutral: 20,
                    disagree: 12,
                    stronglyDisagree: 8
                },
                {
                    text: "Customer satisfaction is a key metric in how we measure success",
                    stronglyAgree: 26,
                    agree: 39,
                    neutral: 15,
                    disagree: 12,
                    stronglyDisagree: 8
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
    const dataDateEl = document.getElementById("dataDate");
    if (dataDateEl) dataDateEl.textContent = "Data correct as of: " + new Date().toLocaleDateString("en-GB", options);

    // Render dimensions overview
    renderDimensionsOverview();
    
    // Render statements overview
    renderStatementsOverview();
    
    // Check for dimension parameter in URL and auto-open if present
    const urlParams = new URLSearchParams(window.location.search);
    const dimensionIndex = urlParams.get('dimension');
    if (dimensionIndex !== null) {
        const index = parseInt(dimensionIndex);
        if (!isNaN(index) && index >= 0 && index < businessOutcomesData.dimensions.length) {
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
    const sortedDimensions = [...businessOutcomesData.dimensions]
        .map((dim, originalIndex) => ({ ...dim, originalIndex }))
        .sort((a, b) => a.averageScore - b.averageScore);

    sortedDimensions.forEach((dimension) => {
        const dimensionCard = document.createElement('div');
        dimensionCard.className = 'dimension-card';
        dimensionCard.onclick = () => showDimensionDetail(dimension.originalIndex);
        
        const sanlamPct = dimension.sanlamScore != null ? dimension.sanlamScore : dimension.averageScore;
        dimensionCard.innerHTML = `
            <div class="dimension-card-header">
                <div class="dimension-card-header-left">
                <h4 class="dimension-name">${dimension.name}</h4>
                <p class="dimension-statements-count mb-0">${dimension.statements.length} Statement${dimension.statements.length !== 1 ? 's' : ''}</p>
                </div>
                <div class="dimension-score-col">
                    <div class="dimension-score">${dimension.averageScore}%</div>
                    <span class="lever-detail-sanlam" aria-label="Overall company score">Sanlam: ${sanlamPct}%</span>
                </div>
            </div>
            <div class="dimension-card-body">
                
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
    const dimension = businessOutcomesData.dimensions[dimensionIndex];
    if (!dimension) return;

    currentDimensionIndex = dimensionIndex;

    // Hide overview, show detail
    document.getElementById('dimensionsOverview').style.display = 'none';
    document.getElementById('statementsOverview').style.display = 'none';
    document.getElementById('dimensionDetail').style.display = 'block';

    const filtersApplied = document.body.classList.contains('filters-applied');
    const dimensionSanlamPct = dimension.sanlamScore != null ? dimension.sanlamScore : dimension.averageScore;
    const dimensionTitleScores = filtersApplied
        ? `<span class="dimension-detail-sanlam">Sanlam: ${dimensionSanlamPct}%</span><span class="dimension-detail-filtered">Filtered: ${dimension.averageScore}%</span>`
        : `<span class="dimension-detail-filtered">${dimension.averageScore}%</span>`;
    document.getElementById('dimensionDetailTitle').innerHTML = `<h4 class="dimension-detail-name fw-bold mb-0">${dimension.name}</h4><span class="dimension-detail-scores">${dimensionTitleScores}</span>`;

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
        const statementSanlamPct = statement.sanlamScore != null ? statement.sanlamScore : (dimension.sanlamScore != null ? dimension.sanlamScore : statementScore);
        const statementScoreMarkup = filtersApplied
            ? `<span class="statement-score-sanlam">Sanlam: ${statementSanlamPct}%</span><span class="statement-score-filtered">Filtered: ${statementScore}%</span>`
            : `<span class="statement-score-filtered">${statementScore}%</span>`;
        const statementDiv = document.createElement('div');
        statementDiv.className = 'statement-item';
        statementDiv.innerHTML = `
            <div class="statement-header">
                <div class="d-flex justify-content-between align-items-baseline gap-3 statement-header-row">
                    <h6 class="statement-text flex-grow-1 mb-0">${statement.text}</h6>
                    <div class="statement-scores">${statementScoreMarkup}</div>
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
    businessOutcomesData.dimensions.forEach(dimension => {
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
