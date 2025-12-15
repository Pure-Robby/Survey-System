// ==================== Shared Sentiment Themes Module ====================
// 
// This file is used by both the Overview page (dashboard.js) and Comments Analysis page (comments-analysis.js)
// 
// IMPORTANT: This is the SINGLE SOURCE OF TRUTH for all sentiment-related data.
// Any changes made here will automatically be reflected on both pages.
// 
// What's Shared:
//   ✓ Sentiment breakdown (positive/neutral/negative counts and percentages)
//   ✓ Total comments and respondents counts
//   ✓ Question text displayed below the donut legend
//   ✓ Positive and negative theme lists with counts and percentages
//   ✓ All rendering logic for these components
// 
// Usage:
//   - Include this script BEFORE dashboard.js or comments-analysis.js
//   - Call sentimentThemesShared.render() to populate all components
//   - Access data via:
//       • sentimentThemesShared.sentimentData (donut data)
//       • sentimentThemesShared.themesData (theme lists)
// 
// To Update:
//   - Edit sentimentData object (lines 17-26) for donut/legend/question text
//   - Edit themesData object (lines 29-44) for theme lists
// 
// ============================================================================

const sentimentThemesShared = (() => {
    // Single source of truth for sentiment data
    const sentimentData = {
        totalComments: 15043,
        totalRespondents: 21564,
        questionText: "Free-text question text to be added here.",
        breakdown: {
            positive: { count: 6943, percentage: 46 },
            neutral: { count: 3212, percentage: 21 },
            negative: { count: 4876, percentage: 33 }
        }
    };

    // Single source of truth for sentiment themes data
    const themesData = {
        positive: [
            { theme: "Career Growth", count: 2288, percentage: 85 },
            { theme: "Team Collaboration", count: 1464, percentage: 55 },
            { theme: "Work-Life Balance", count: 889, percentage: 33 },
            { theme: "Recognition & Rewards", count: 525, percentage: 20 },
            { theme: "Leadership Support", count: 339, percentage: 13 }
        ],
        neutral: [
            { theme: "General Feedback", count: 856, percentage: 65 },
            { theme: "Career Growth", count: 642, percentage: 49 },
            { theme: "Work-Life Balance", count: 534, percentage: 41 },
            { theme: "Policies", count: 487, percentage: 37 },
            { theme: "Team Collaboration", count: 385, percentage: 29 }
        ],
        negative: [
            { theme: "Workload Management", count: 1423, percentage: 90 },
            { theme: "Leadership Support", count: 731, percentage: 46 },
            { theme: "Work-Life Balance", count: 589, percentage: 37 },
            { theme: "Recognition & Rewards", count: 464, percentage: 29 },
            { theme: "Career Growth", count: 369, percentage: 23 }
        ]
    };

    // Update donut center text
    function updateDonutCenterText() {
        const commentsCount = document.getElementById('sentimentCommentsCount');
        const respondentsCount = document.getElementById('sentimentRespondentsCount');
        
        if (commentsCount) {
            commentsCount.textContent = sentimentData.totalComments.toLocaleString();
        }
        if (respondentsCount) {
            respondentsCount.textContent = sentimentData.totalRespondents.toLocaleString();
        }
    }

    // Render sentiment donut legend and question text
    function renderSentimentLegend() {
        const container = document.getElementById('sentimentLegend');
        if (!container) return;
        
        container.innerHTML = `
            <div style="max-width: 180px;">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="d-flex align-items-center">
                        <div class="sentiment-indicator sentiment-indicator-positive"></div>
                        <span>Positive:</span>
                    </div>
                    <span class="fw-bold">${sentimentData.breakdown.positive.count.toLocaleString()} (${sentimentData.breakdown.positive.percentage}%)</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="d-flex align-items-center">
                        <div class="sentiment-indicator sentiment-indicator-neutral"></div>
                        <span>Neutral:</span>
                    </div>
                    <span class="fw-bold">${sentimentData.breakdown.neutral.count.toLocaleString()} (${sentimentData.breakdown.neutral.percentage}%)</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="sentiment-indicator sentiment-indicator-negative"></div>
                        <span>Negative:</span>
                    </div>
                    <span class="fw-bold">${sentimentData.breakdown.negative.count.toLocaleString()} (${sentimentData.breakdown.negative.percentage}%)</span>
                </div>
            </div>
            
            <div class="p-3 rounded-4 mt-auto" style="background: #e8e6df">
                <h6>Question text:</h6>
                <p class="mb-0 fs-7">${sentimentData.questionText}</p>
            </div>
        `;
    }

    // Render sentiment themes
    function renderThemes() {
        const positiveContainer = document.getElementById('positiveThemes');
        const neutralContainer = document.getElementById('neutralThemes');
        const negativeContainer = document.getElementById('negativeThemes');
        
        if (!positiveContainer || !negativeContainer) return;
        
        // Render positive themes
        positiveContainer.innerHTML = themesData.positive.map(item => `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1 gap-2">
                    <span class="fs-7 flex-shrink-0">${item.theme}</span>
                    <span class="fw-semibold fs-8 text-end lh-sm">${item.count.toLocaleString()} comments</span>
                </div>
                <div class="progress-bar-container theme-progress-container">
                    <div class="progress-bar theme-progress-bar-positive" style="width: ${item.percentage}%;"></div>
                </div>
            </div>
        `).join('');
        
        // Render neutral themes
        if (neutralContainer) {
            neutralContainer.innerHTML = themesData.neutral.map(item => `
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-1gap-2">
                        <span class="fs-7 flex-shrink-0">${item.theme}</span>
                        <span class="fw-semibold fs-8 text-end lh-sm">${item.count.toLocaleString()} comments</span>
                    </div>
                    <div class="progress-bar-container theme-progress-container">
                        <div class="progress-bar theme-progress-bar-neutral" style="width: ${item.percentage}%;"></div>
                    </div>
                </div>
            `).join('');
        }
        
        // Render negative themes
        negativeContainer.innerHTML = themesData.negative.map(item => `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1 gap-2">
                    <span class="fs-7 flex-shrink-0">${item.theme}</span>
                    <span class="fw-semibold fs-8 text-end lh-sm">${item.count.toLocaleString()} comments</span>
                </div>
                <div class="progress-bar-container theme-progress-container">
                    <div class="progress-bar theme-progress-bar-negative" style="width: ${item.percentage}%;"></div>
                </div>
            </div>
        `).join('');
    }

    // Render all components
    function renderAll() {
        updateDonutCenterText();
        renderSentimentLegend();
        renderThemes();
    }

    // Public API
    return {
        sentimentData: sentimentData,
        themesData: themesData,
        updateDonutCenterText: updateDonutCenterText,
        renderSentimentLegend: renderSentimentLegend,
        renderThemes: renderThemes,
        render: renderAll
    };
})();

