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
                    stronglyAgree: 20,
                    agree: 30,
                    neutral: 22,
                    disagree: 17,
                    stronglyDisagree: 11
                },
                {
                    text: "My line manager encourages me to create innovative, client-focused solutions",
                    stronglyAgree: 21,
                    agree: 31,
                    neutral: 20,
                    disagree: 17,
                    stronglyDisagree: 11
                }
            ]
        },
        {
            name: "Champion Sustainable Results",
            averageScore: 79.8,
            statements: [
                {
                    text: "My line manager encourages the effective use of resources to drive continuous improvement",
                    stronglyAgree: 22,
                    agree: 32,
                    neutral: 20,
                    disagree: 16,
                    stronglyDisagree: 10
                },
                {
                    text: "My line manager focuses on driving purpose driven, sustainable results",
                    stronglyAgree: 22,
                    agree: 34,
                    neutral: 18,
                    disagree: 16,
                    stronglyDisagree: 10
                }
            ]
        },
        {
            name: "Show Up and Inspire Excellence",
            averageScore: 80.2,
            statements: [
                {
                    text: "My line manager makes clear decisions and responds effectively under pressure",
                    stronglyAgree: 22,
                    agree: 34,
                    neutral: 18,
                    disagree: 16,
                    stronglyDisagree: 10
                },
                {
                    text: "My line manager displays humility, integrity and a learning mindset",
                    stronglyAgree: 23,
                    agree: 35,
                    neutral: 16,
                    disagree: 16,
                    stronglyDisagree: 10
                }
            ]
        },
        {
            name: "Win Together",
            averageScore: 78.0,
            statements: [
                {
                    text: "My line manager enables a culture that fosters inclusion, psychological safety and support",
                    stronglyAgree: 21,
                    agree: 31,
                    neutral: 20,
                    disagree: 17,
                    stronglyDisagree: 11
                },
                {
                    text: "My line manager drives a strong sense of collaboration and shared purpose in my team",
                    stronglyAgree: 22,
                    agree: 32,
                    neutral: 18,
                    disagree: 17,
                    stronglyDisagree: 11
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
        if (!isNaN(index) && index >= 0 && index < leadershipEnablementData.dimensions.length) {
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
    const sortedDimensions = [...leadershipEnablementData.dimensions]
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
    const dimension = leadershipEnablementData.dimensions[dimensionIndex];
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
        const statementScore = statement.stronglyAgree + statement.agree; // Positive percentage is the statement score
        const statementSanlamPct = statement.sanlamScore != null ? statement.sanlamScore : (dimension.sanlamScore != null ? dimension.sanlamScore : statementScore);
        const statementScoreMarkup = filtersApplied
            ? `<span class="statement-score-sanlam">Sanlam: ${statementSanlamPct}%</span><span class="statement-score-filtered">Filtered: ${statementScore}%</span>`
            : `<span class="statement-score-filtered">${statementScore}%</span>`;
        const showDualBar = filtersApplied;
        const statementBarsHtml = showDualBar
            ? `<div class="statement-bar-row">
                    <span class="statement-bar-row-label">Sanlam: <span class="statement-bar-row-label-score">${statementSanlamPct}%</span></span>
                    ${createStatementScoringBar(statement)}
                </div>
                <div class="statement-bar-row">
                    <span class="statement-bar-row-label">Filtered: <span class="statement-bar-row-label-score">${statementScore}%</span></span>
                    ${createStatementScoringBar(statement)}
                </div>`
            : `<div class="statement-bar-container">${createStatementScoringBar(statement)}</div>`;
        const statementDiv = document.createElement('div');
        statementDiv.className = 'statement-item';
        statementDiv.innerHTML = `
            <div class="statement-header">
                <div class="d-flex justify-content-between align-items-baseline gap-3 statement-header-row">
                    <h6 class="statement-text flex-grow-1 mb-0">${statement.text}</h6>
                    ${showDualBar ? '' : `<div class="statement-scores">${statementScoreMarkup}</div>`}
                </div>
            </div>
            <div class="statement-scoring">${statementBarsHtml}</div>
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
    leadershipEnablementData.dimensions.forEach(dimension => {
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
