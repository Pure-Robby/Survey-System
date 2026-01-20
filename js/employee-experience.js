// Employee Experience Detail Page JavaScript

// Mock data structure for Employee Experience
const employeeExperienceData = {
    overallScore: 82.1,
    dimensions: [
        {
            name: "Engagement",
            averageScore: 78.5,
            statements: [
                {
                    text: "I am proud to work for this organisation",
                    agree: 52,
                    unsure: 20,
                    disagree: 28
                },
                {
                    text: "I would recommend this organisation as a great place to work",
                    agree: 50,
                    unsure: 22,
                    disagree: 28
                },
                {
                    text: "I feel motivated and engaged in my work",
                    agree: 54,
                    unsure: 18,
                    disagree: 28
                },
                {
                    text: "I understand how my work contributes to the organisation's goals",
                    agree: 56,
                    unsure: 18,
                    disagree: 26
                },
                {
                    text: "I feel valued and appreciated for my contributions",
                    agree: 48,
                    unsure: 24,
                    disagree: 28
                },
                {
                    text: "My manager recognizes and appreciates my efforts",
                    agree: 52,
                    unsure: 20,
                    disagree: 28
                },
                {
                    text: "I have the autonomy to make decisions in my role",
                    agree: 50,
                    unsure: 22,
                    disagree: 28
                },
                {
                    text: "I feel a strong sense of belonging at this organisation",
                    agree: 48,
                    unsure: 24,
                    disagree: 28
                },
                {
                    text: "The work I do makes a difference",
                    agree: 54,
                    unsure: 20,
                    disagree: 26
                },
                {
                    text: "I am satisfied with my current role",
                    agree: 51,
                    unsure: 21,
                    disagree: 28
                },
                {
                    text: "I see myself working here in two years time",
                    agree: 47,
                    unsure: 26,
                    disagree: 27
                },
                {
                    text: "I am enthusiastic about the future direction of the organisation",
                    agree: 49,
                    unsure: 23,
                    disagree: 28
                }
            ]
        },
        {
            name: "Team Effectiveness",
            averageScore: 85.2,
            statements: [
                {
                    text: "My team has a clear understanding of our goals and priorities",
                    agree: 58,
                    unsure: 17,
                    disagree: 25
                },
                {
                    text: "I feel connected to my team",
                    agree: 60,
                    unsure: 15,
                    disagree: 25
                },
                {
                    text: "I have the technology I need to help me stay connected to my manager and team",
                    agree: 62,
                    unsure: 15,
                    disagree: 23
                },
                {
                    text: "Everyone on my team contributes equally to our success",
                    agree: 54,
                    unsure: 20,
                    disagree: 26
                },
                {
                    text: "There is a strong sense of mutual respect and trust in my team",
                    agree: 58,
                    unsure: 17,
                    disagree: 25
                }
            ]
        },
        {
            name: "Wellness",
            averageScore: 80.8,
            statements: [
                {
                    text: "I feel emotionally supported at work",
                    agree: 54,
                    unsure: 20,
                    disagree: 26
                },
                {
                    text: "My current role allows me to have the work-life balance that I want",
                    agree: 52,
                    unsure: 22,
                    disagree: 26
                },
                {
                    text: "I am able to manage work-related stress effectively",
                    agree: 50,
                    unsure: 24,
                    disagree: 26
                },
                {
                    text: "My manager cares about my well-being",
                    agree: 58,
                    unsure: 18,
                    disagree: 24
                },
                {
                    text: "I know how to access support for mental or physical health when needed",
                    agree: 60,
                    unsure: 18,
                    disagree: 22
                }
            ]
        },
        {
            name: "Development & Growth",
            averageScore: 84.5,
            statements: [
                {
                    text: "I have access to the learning and development resources I need to grow in my role",
                    agree: 58,
                    unsure: 18,
                    disagree: 24
                },
                {
                    text: "My organisation has professional development resources that are useful to me",
                    agree: 56,
                    unsure: 20,
                    disagree: 24
                },
                {
                    text: "I understand the career opportunities available at my organisation",
                    agree: 52,
                    unsure: 24,
                    disagree: 24
                },
                {
                    text: "Leadership encourages and supports employee growth, career development and progression",
                    agree: 54,
                    unsure: 22,
                    disagree: 24
                },
                {
                    text: "I believe that there are clear opportunities to grow and develop within the organisation",
                    agree: 53,
                    unsure: 23,
                    disagree: 24
                },
                {
                    text: "The organisation does provide adequate and appropriate resources and learning offerings for skills development and career growth",
                    agree: 55,
                    unsure: 21,
                    disagree: 24
                },
                {
                    text: "In my team, my line manager supports my professional growth and learning",
                    agree: 60,
                    unsure: 18,
                    disagree: 22
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
        if (!isNaN(index) && index >= 0 && index < employeeExperienceData.dimensions.length) {
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
    const sortedDimensions = [...employeeExperienceData.dimensions]
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
    const dimension = employeeExperienceData.dimensions[dimensionIndex];
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
    container.innerHTML = `<div class="d-flex align-items-center justify-content-between"><h6 class="mb-0">Statements Distribution Breakdown</h6><div class="statement-legend">
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
    employeeExperienceData.dimensions.forEach(dimension => {
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

