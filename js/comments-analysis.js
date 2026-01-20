// Comments Analysis Tool
const commentsAnalysis = (() => {
    // Mock comment data with themes and sentiment
    const mockComments = [
        {
            id: 1,
            text: "I really appreciate the opportunities for career growth and development. The company invests in our learning and provides clear paths for advancement.",
            sentiment: "positive",
            theme: "Career Growth",
            businessUnit: "Sanlam Group Office",
            date: "2026-01-15",
            author: "Employee A"
        },
        {
            id: 2,
            text: "The workload has become unmanageable. I'm constantly working overtime and feel overwhelmed with the amount of tasks assigned.",
            sentiment: "negative",
            theme: "Workload Management",
            businessUnit: "Sanlam Life & Savings",
            date: "2026-01-14",
            author: "Employee B"
        },
        {
            id: 3,
            text: "Our team works really well together. There's great collaboration and everyone supports each other.",
            sentiment: "positive",
            theme: "Team Collaboration",
            businessUnit: "Sanlam Investment Group",
            date: "2026-01-13",
            author: "Employee C"
        },
        {
            id: 4,
            text: "I feel like my contributions aren't recognized. There's no feedback or acknowledgment for good work.",
            sentiment: "negative",
            theme: "Recognition & Rewards",
            businessUnit: "Sanlam Fintech",
            date: "2026-01-12",
            author: "Employee D"
        },
        {
            id: 5,
            text: "The work-life balance is excellent. I can manage my personal commitments while meeting work requirements.",
            sentiment: "positive",
            theme: "Work-Life Balance",
            businessUnit: "Santam",
            date: "2026-01-11",
            author: "Employee E"
        },
        {
            id: 6,
            text: "Leadership needs to be more supportive. Decisions are made without consulting the team and there's little communication.",
            sentiment: "negative",
            theme: "Leadership Support",
            businessUnit: "SanlamAllianz",
            date: "2026-01-10",
            author: "Employee F"
        },
        {
            id: 7,
            text: "I'm satisfied with the current state of things. Nothing particularly stands out as excellent or problematic.",
            sentiment: "neutral",
            theme: "General",
            businessUnit: "Sanlam Life & Savings",
            date: "2026-01-09",
            author: "Employee G"
        },
        {
            id: 8,
            text: "The recognition programs are fantastic. I feel valued and appreciated for my contributions.",
            sentiment: "positive",
            theme: "Recognition & Rewards",
            businessUnit: "Sanlam Group Office",
            date: "2026-01-08",
            author: "Employee H"
        },
        {
            id: 9,
            text: "Career advancement opportunities are limited. I don't see a clear path forward in my current role.",
            sentiment: "negative",
            theme: "Career Growth",
            businessUnit: "Sanlam Fintech",
            date: "2026-01-07",
            author: "Employee I"
        },
        {
            id: 10,
            text: "The leadership team is very supportive and provides excellent guidance. They're approachable and listen to concerns.",
            sentiment: "positive",
            theme: "Leadership Support",
            businessUnit: "Sanlam Investment Group",
            date: "2026-01-06",
            author: "Employee J"
        }
    ];

    // Generate more mock comments to reach realistic numbers
    const themes = {
        positive: ["Career Growth", "Team Collaboration", "Work-Life Balance", "Recognition & Rewards", "Leadership Support", "Company Culture", "Benefits", "Training"],
        negative: ["Workload Management", "Leadership Support", "Work-Life Balance", "Recognition & Rewards", "Career Growth", "Team Collaboration", "Communication", "Resources", "Processes"],
        neutral: ["Career Growth", "Team Collaboration", "Work-Life Balance", "Recognition & Rewards", "Leadership Support", "Workload Management", "General", "Policies"]
    };

    const businessUnits = ["Sanlam Fintech", "Sanlam Life & Savings", "Santam", "SanlamAllianz", "Sanlam Group Office", "Sanlam Investment Group"];

    function generateMockComments(count) {
        const comments = [...mockComments];
        const sentimentCounts = { positive: 6943, negative: 4876, neutral: 3212 };
        const total = sentimentCounts.positive + sentimentCounts.negative + sentimentCounts.neutral;
        
        // Generate additional comments to match the sentiment distribution
        for (let i = 0; i < count - mockComments.length; i++) {
            const rand = Math.random();
            let sentiment, themeList;
            if (rand < sentimentCounts.positive / total) {
                sentiment = "positive";
                themeList = themes.positive;
            } else if (rand < (sentimentCounts.positive + sentimentCounts.neutral) / total) {
                sentiment = "neutral";
                themeList = themes.neutral;
            } else {
                sentiment = "negative";
                themeList = themes.negative;
            }
            
            const theme = themeList[Math.floor(Math.random() * themeList.length)];
            const businessUnit = businessUnits[Math.floor(Math.random() * businessUnits.length)];
            const daysAgo = Math.floor(Math.random() * 90);
            const date = new Date();
            date.setDate(date.getDate() - daysAgo);
            
            comments.push({
                id: mockComments.length + i + 1,
                text: generateCommentText(theme, sentiment),
                sentiment: sentiment,
                theme: theme,
                businessUnit: businessUnit,
                date: date.toISOString().split('T')[0],
                author: `Employee ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26)}`
            });
        }
        
        return comments;
    }

    function generateCommentText(theme, sentiment) {
        const templates = {
            "Career Growth": {
                positive: ["Great opportunities for growth", "Clear career paths", "Excellent development programs"],
                negative: ["Limited advancement opportunities", "No clear career path", "Lack of growth opportunities"]
            },
            "Workload Management": {
                negative: ["Too much work", "Unmanageable workload", "Constant overtime required"]
            },
            "Team Collaboration": {
                positive: ["Great team support", "Excellent collaboration", "Supportive colleagues"],
                negative: ["Lack of teamwork", "Poor collaboration", "Team conflicts and silos"]
            },
            "Recognition & Rewards": {
                positive: ["Feel valued and appreciated", "Great recognition programs"],
                negative: ["Lack of recognition", "No feedback on work"]
            },
            "Work-Life Balance": {
                positive: ["Good work-life balance", "Flexible arrangements"],
                negative: ["Poor work-life balance", "Too much overtime"]
            },
            "Leadership Support": {
                positive: ["Supportive leadership", "Good guidance from managers"],
                negative: ["Lack of leadership support", "Poor communication from management"]
            }
        };
        
        if (templates[theme] && templates[theme][sentiment]) {
            const options = templates[theme][sentiment];
            return options[Math.floor(Math.random() * options.length)];
        }
        return `Comment about ${theme} - ${sentiment} sentiment`;
    }

    let allComments = generateMockComments(15043);
    let filteredComments = [...allComments];
    let displayedCount = 50;

    // Initialize
    function init() {
        setupEventListeners();
        renderThemes();
        renderComments();
        renderInsights();
        renderThemeSentimentBreakdown();
        updateCounts();
        
        // Initialize sentiment chart
        if (typeof createDonutChart === 'function') {
            // Get colors from CSS variables
            const styles = getComputedStyle(document.documentElement);
            createDonutChart('sentimentDonut', [
                { value: 6943, color: styles.getPropertyValue('--color-positive').trim() || '#28a745' },
                { value: 4876, color: styles.getPropertyValue('--color-negative').trim() || '#dc3545' },
                { value: 3212, color: styles.getPropertyValue('--color-neutral').trim() || '#ffc107' }
            ]);
        }
    }

    function setupEventListeners() {
        const searchEl = document.getElementById('searchComments');
        const sentimentEl = document.getElementById('filterSentiment');
        const themeEl = document.getElementById('filterTheme');
        const businessUnitEl = document.getElementById('filterBusinessUnit');
        const dateRangeEl = document.getElementById('filterDateRange');
        const sortEl = document.getElementById('sortComments');
        
        if (searchEl) searchEl.addEventListener('input', applyFilters);
        if (sentimentEl) sentimentEl.addEventListener('change', applyFilters);
        if (themeEl) themeEl.addEventListener('change', applyFilters);
        if (businessUnitEl) businessUnitEl.addEventListener('change', applyFilters);
        if (dateRangeEl) dateRangeEl.addEventListener('change', applyFilters);
        if (sortEl) sortEl.addEventListener('change', applyFilters);
    }

    function applyFilters() {
        const searchEl = document.getElementById('searchComments');
        const sentimentEl = document.getElementById('filterSentiment');
        const themeEl = document.getElementById('filterTheme');
        const businessUnitEl = document.getElementById('filterBusinessUnit');
        const dateRangeEl = document.getElementById('filterDateRange');
        const sortEl = document.getElementById('sortComments');
        
        const searchTerm = searchEl ? searchEl.value.toLowerCase() : '';
        const sentiment = sentimentEl ? sentimentEl.value : '';
        const theme = themeEl ? themeEl.value : '';
        const businessUnit = businessUnitEl ? businessUnitEl.value : '';
        const dateRange = dateRangeEl ? dateRangeEl.value : '';
        const sortBy = sortEl ? sortEl.value : 'newest';

        filteredComments = allComments.filter(comment => {
            if (searchTerm && !comment.text.toLowerCase().includes(searchTerm)) return false;
            if (sentiment && comment.sentiment !== sentiment) return false;
            if (theme && comment.theme !== theme) return false;
            if (businessUnit && comment.businessUnit !== businessUnit) return false;
            
            if (dateRange) {
                const commentDate = new Date(comment.date);
                const daysAgo = parseInt(dateRange);
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
                if (commentDate < cutoffDate) return false;
            }
            
            return true;
        });

        // Sort comments
        filteredComments.sort((a, b) => {
            switch(sortBy) {
                case 'newest':
                    return new Date(b.date) - new Date(a.date);
                case 'oldest':
                    return new Date(a.date) - new Date(b.date);
                case 'sentiment':
                    const sentimentOrder = { positive: 1, neutral: 2, negative: 3 };
                    return sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment];
                case 'theme':
                    return a.theme.localeCompare(b.theme);
                default:
                    return 0;
            }
        });

        displayedCount = 50;
        renderComments();
        updateCounts();
    }

    function renderThemes() {
        // Use shared sentiment themes module
        if (typeof sentimentThemesShared !== 'undefined') {
            sentimentThemesShared.render();
        }

        // Populate theme filter from all unique themes
        const themeFilter = document.getElementById('filterTheme');
        if (themeFilter) {
            const allThemes = [...new Set(allComments.map(c => c.theme))].sort();
            allThemes.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme;
                option.textContent = theme;
                themeFilter.appendChild(option);
            });
        }
    }

    function renderThemeSentimentBreakdown() {
        const container = document.getElementById('themeSentimentBreakdown');
        if (!container) return;

        // Calculate sentiment breakdown by theme
        const themeBreakdown = {};
        allComments.forEach(comment => {
            if (!themeBreakdown[comment.theme]) {
                themeBreakdown[comment.theme] = {
                    positive: 0,
                    neutral: 0,
                    negative: 0,
                    total: 0
                };
            }
            themeBreakdown[comment.theme][comment.sentiment]++;
            themeBreakdown[comment.theme].total++;
        });

        // Get top 5 themes by total comment count
        const topThemes = Object.entries(themeBreakdown)
            .sort((a, b) => b[1].total - a[1].total)
            .slice(0, 5);

        // Render stacked bar chart
        container.innerHTML = topThemes.map(([theme, data]) => {
            const positivePercent = (data.positive / data.total * 100);
            const neutralPercent = (data.neutral / data.total * 100);
            const negativePercent = (data.negative / data.total * 100);

            return `
                <div class="theme-sentiment-row d-flex align-items-center gap-3">
                    <div class="theme-sentiment-label fs-7">${theme}</div>
                    <div class="theme-sentiment-bar-container d-flex">
                        <div class="theme-sentiment-bar theme-sentiment-bar-positive" 
                             style="width: ${positivePercent}%;"
                             title="Positive: ${data.positive} (${positivePercent.toFixed(1)}%)">
                            ${positivePercent > 8 ? `${data.positive}` : ''}
                        </div>
                        <div class="theme-sentiment-bar theme-sentiment-bar-neutral" 
                             style="width: ${neutralPercent}%;"
                             title="Neutral: ${data.neutral} (${neutralPercent.toFixed(1)}%)">
                            ${neutralPercent > 8 ? `${data.neutral}` : ''}
                        </div>
                        <div class="theme-sentiment-bar theme-sentiment-bar-negative" 
                             style="width: ${negativePercent}%;"
                             title="Negative: ${data.negative} (${negativePercent.toFixed(1)}%)">
                            ${negativePercent > 8 ? `${data.negative}` : ''}
                        </div>
                    </div>
                    <div class="theme-sentiment-total fs-7">
                        ${data.total.toLocaleString()} total
                    </div>
                </div>
            `;
        }).join('');

        // Add x-axis scale
        const xAxis = `
            <div class="theme-sentiment-axis">
                <span class="theme-sentiment-axis-tick">0%</span>
                <span class="theme-sentiment-axis-tick">25%</span>
                <span class="theme-sentiment-axis-tick">50%</span>
                <span class="theme-sentiment-axis-tick">75%</span>
                <span class="theme-sentiment-axis-tick">100%</span>
            </div>
        `;
        container.innerHTML += xAxis;

        // Add legend
        const legend = `
            <div class="d-flex justify-content-center gap-4 mt-4 pt-3 border-top">
                <div class="d-flex align-items-center gap-2">
                    <div class="sentiment-indicator sentiment-indicator-positive"></div>
                    <span class="fs-7">Positive</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <div class="sentiment-indicator sentiment-indicator-neutral"></div>
                    <span class="fs-7">Neutral</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <div class="sentiment-indicator sentiment-indicator-negative"></div>
                    <span class="fs-7">Negative</span>
                </div>
            </div>
        `;
        container.innerHTML += legend;
    }

    function renderComments() {
        const container = document.getElementById('commentsList');
        if (!container) return; // Exit if comments list is not present
        
        const commentsToShow = filteredComments.slice(0, displayedCount);
        
        if (commentsToShow.length === 0) {
            container.innerHTML = '<div class="text-center py-5 text-muted">No comments match your filters.</div>';
            return;
        }

        container.innerHTML = commentsToShow.map(comment => {
            const sentimentCardClass = {
                positive: 'enterprise-unit-card-success',
                negative: 'enterprise-unit-card-danger',
                neutral: 'enterprise-unit-card-warning'
            };
            const sentimentIconClass = {
                positive: 'icon-success',
                negative: 'icon-danger',
                neutral: 'icon-warning'
            };
            const sentimentIcon = {
                positive: 'bx-happy',
                negative: 'bx-sad',
                neutral: 'bx-confused'
            };
            const sentimentBadgeClass = {
                positive: 'badge-success',
                negative: 'badge-danger',
                neutral: 'badge-warning'
            };
            
            return `
                <div class="comment-item p-3 mb-3 border rounded ${sentimentCardClass[comment.sentiment]}">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="d-flex align-items-center gap-2">
                            <i class='bx ${sentimentIcon[comment.sentiment]} ${sentimentIconClass[comment.sentiment]}' style="font-size: 20px;"></i>
                            <span class="badge ${sentimentBadgeClass[comment.sentiment]} text-capitalize">${comment.sentiment}</span>
                            <span class="badge badge-primary">${comment.theme}</span>
                        </div>
                        <small class="text-muted">${comment.date}</small>
                    </div>
                    <p class="mb-2" style="font-size: 14px; line-height: 1.6;">${comment.text}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            <i class='bx bx-building'></i> ${comment.businessUnit} • 
                            <i class='bx bx-user'></i> ${comment.author}
                        </small>
                        <button class="btn btn-sm btn-link p-0" onclick="commentsAnalysis.pinComment(${comment.id})" title="Pin/Comment">
                            <i class='bx bx-pin'></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        const commentsShownEl = document.getElementById('commentsShown');
        if (commentsShownEl) {
            commentsShownEl.textContent = 
                `Showing ${Math.min(displayedCount, filteredComments.length)} of ${filteredComments.length.toLocaleString()} comments`;
        }
    }

    function loadMoreComments() {
        displayedCount += 50;
        renderComments();
    }

    function renderInsights() {
        const insights = generateInsights();
        const container = document.getElementById('insightsContainer');
        
        container.innerHTML = insights.map(insight => `
            <div class="">
                <div class="card-custom h-100">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <i class='bx ${insight.icon} ${insight.iconClass}' style="font-size: 24px;"></i>
                        <h6 class="mb-0 fw-semibold">${insight.title}</h6>
                    </div>
                    <p class="mb-0 fs-7 text-muted">${insight.description}</p>
                </div>
            </div>
        `).join('');
    }

    function generateInsights() {
        const total = allComments.length;
        const positive = allComments.filter(c => c.sentiment === 'positive').length;
        const negative = allComments.filter(c => c.sentiment === 'negative').length;
        const positivePercent = ((positive / total) * 100).toFixed(1);
        const negativePercent = ((negative / total) * 100).toFixed(1);

        // Find most common themes
        const themeCounts = {};
        allComments.forEach(c => {
            themeCounts[c.theme] = (themeCounts[c.theme] || 0) + 1;
        });
        const topTheme = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0];

        return [
            {
                title: "Overall Sentiment",
                description: `${positivePercent}% of comments are positive, indicating a generally favorable employee experience.`,
                icon: "bx-trending-up",
                iconClass: "icon-success"
            },
            {
                title: "Top Theme",
                description: `"${topTheme[0]}" appears in ${topTheme[1].toLocaleString()} comments, making it the most discussed topic.`,
                icon: "bx-bar-chart-alt-2",
                iconClass: "icon-primary"
            },
            {
                title: "Action Required",
                description: `${negativePercent}% negative sentiment suggests areas needing attention, particularly around ${Object.entries(themeCounts).filter(([t, c]) => allComments.filter(com => com.theme === t && com.sentiment === 'negative').length > 0).sort((a, b) => b[1] - a[1])[0]?.[0] || 'workload management'}.`,
                icon: "bx-error-circle",
                iconClass: "icon-danger"
            }
        ];
    }

    function updateCounts() {
        const total = filteredComments.length;
        const positive = filteredComments.filter(c => c.sentiment === 'positive').length;
        const neutral = filteredComments.filter(c => c.sentiment === 'neutral').length;
        const negative = filteredComments.filter(c => c.sentiment === 'negative').length;

        // Calculate percentages
        const positivePercent = total > 0 ? Math.round((positive / total) * 100) : 0;
        const neutralPercent = total > 0 ? Math.round((neutral / total) * 100) : 0;
        const negativePercent = total > 0 ? Math.round((negative / total) * 100) : 0;

        // Update counts
        document.getElementById('totalCommentsCount').textContent = total.toLocaleString();
        document.getElementById('positiveCount').textContent = positive.toLocaleString();
        document.getElementById('neutralCount').textContent = neutral.toLocaleString();
        document.getElementById('negativeCount').textContent = negative.toLocaleString();
        
        // Update percentages
        const positivePercentEl = document.getElementById('positivePercent');
        const neutralPercentEl = document.getElementById('neutralPercent');
        const negativePercentEl = document.getElementById('negativePercent');
        
        if (positivePercentEl) positivePercentEl.textContent = positivePercent;
        if (neutralPercentEl) neutralPercentEl.textContent = neutralPercent;
        if (negativePercentEl) negativePercentEl.textContent = negativePercent;
        
        // Update donut center count if element exists
        const sentimentCommentsCount = document.getElementById('sentimentCommentsCount');
        if (sentimentCommentsCount) {
            sentimentCommentsCount.textContent = total.toLocaleString();
        }
    }

    function clearFilters() {
        const searchEl = document.getElementById('searchComments');
        const sentimentEl = document.getElementById('filterSentiment');
        const themeEl = document.getElementById('filterTheme');
        const businessUnitEl = document.getElementById('filterBusinessUnit');
        const dateRangeEl = document.getElementById('filterDateRange');
        
        if (searchEl) searchEl.value = '';
        if (sentimentEl) sentimentEl.value = '';
        if (themeEl) themeEl.value = '';
        if (businessUnitEl) businessUnitEl.value = '';
        if (dateRangeEl) dateRangeEl.value = '';
        
        applyFilters();
    }

    function exportComments() {
        const csv = [
            ['Text', 'Sentiment', 'Theme', 'Business Unit', 'Date', 'Author'],
            ...filteredComments.map(c => [
                `"${c.text.replace(/"/g, '""')}"`,
                c.sentiment,
                c.theme,
                c.businessUnit,
                c.date,
                c.author
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comments-analysis-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    function pinComment(commentId) {
        const comment = allComments.find(c => c.id === commentId);
        if (comment) {
            // This would integrate with the pin-comments tool
            alert(`Comment pinned: "${comment.text.substring(0, 50)}..."`);
        }
    }

    return {
        init,
        applyFilters,
        clearFilters,
        loadMoreComments,
        exportComments,
        pinComment
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    commentsAnalysis.init();

    // Ensure hash navigation (e.g. comments-analysis.html#themesGrid) scrolls correctly
    // after any JS-driven layout/DOM updates have occurred.
    const scrollToHashTarget = () => {
        const { hash } = window.location;
        if (!hash || hash === '#') return;

        // Decode for safety (e.g. spaces encoded)
        const targetId = decodeURIComponent(hash.slice(1));
        if (!targetId) return;

        const el = document.getElementById(targetId);
        if (!el) return;

        const NAV_OFFSET_PX = 80;

        // Double-rAF to wait for layout; then scroll.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const top = Math.max(0, window.scrollY + rect.top - NAV_OFFSET_PX);
                window.scrollTo({ top });
            });
        });
    };

    scrollToHashTarget();
    window.addEventListener('hashchange', scrollToHashTarget);
});



