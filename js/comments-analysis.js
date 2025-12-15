// Comments Analysis Tool
const commentsAnalysis = (() => {
    // Mock comment data with themes and sentiment
    const mockComments = [
        {
            id: 1,
            text: "I really appreciate the opportunities for career growth and development. The company invests in our learning and provides clear paths for advancement.",
            sentiment: "positive",
            theme: "Career Growth",
            businessUnit: "Sanlam Corporate",
            date: "2026-01-15",
            author: "Employee A"
        },
        {
            id: 2,
            text: "The workload has become unmanageable. I'm constantly working overtime and feel overwhelmed with the amount of tasks assigned.",
            sentiment: "negative",
            theme: "Workload Management",
            businessUnit: "Sanlam Life",
            date: "2026-01-14",
            author: "Employee B"
        },
        {
            id: 3,
            text: "Our team works really well together. There's great collaboration and everyone supports each other.",
            sentiment: "positive",
            theme: "Team Collaboration",
            businessUnit: "Sanlam Investments",
            date: "2026-01-13",
            author: "Employee C"
        },
        {
            id: 4,
            text: "I feel like my contributions aren't recognized. There's no feedback or acknowledgment for good work.",
            sentiment: "negative",
            theme: "Recognition & Rewards",
            businessUnit: "Sanlam Personal Finance",
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
            businessUnit: "Sanlam Employee Benefits",
            date: "2026-01-10",
            author: "Employee F"
        },
        {
            id: 7,
            text: "I'm satisfied with the current state of things. Nothing particularly stands out as excellent or problematic.",
            sentiment: "neutral",
            theme: "General",
            businessUnit: "Sanlam Group Technology",
            date: "2026-01-09",
            author: "Employee G"
        },
        {
            id: 8,
            text: "The recognition programs are fantastic. I feel valued and appreciated for my contributions.",
            sentiment: "positive",
            theme: "Recognition & Rewards",
            businessUnit: "Sanlam Corporate",
            date: "2026-01-08",
            author: "Employee H"
        },
        {
            id: 9,
            text: "Career advancement opportunities are limited. I don't see a clear path forward in my current role.",
            sentiment: "negative",
            theme: "Career Growth",
            businessUnit: "Sanlam Life",
            date: "2026-01-07",
            author: "Employee I"
        },
        {
            id: 10,
            text: "The leadership team is very supportive and provides excellent guidance. They're approachable and listen to concerns.",
            sentiment: "positive",
            theme: "Leadership Support",
            businessUnit: "Sanlam Investments",
            date: "2026-01-06",
            author: "Employee J"
        }
    ];

    // Generate more mock comments to reach realistic numbers
    const themes = {
        positive: ["Career Growth", "Team Collaboration", "Work-Life Balance", "Recognition & Rewards", "Leadership Support", "Company Culture", "Benefits", "Training"],
        negative: ["Workload Management", "Leadership Support", "Work-Life Balance", "Recognition & Rewards", "Career Growth", "Communication", "Resources", "Processes"],
        neutral: ["General", "Policies", "Administration", "Facilities", "Technology"]
    };

    const businessUnits = ["Sanlam Corporate", "Sanlam Life", "Sanlam Investments", "Sanlam Personal Finance", "Santam", "Sanlam Employee Benefits", "Sanlam Group Technology"];

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
            } else if (rand < (sentimentCounts.positive + sentimentCounts.negative) / total) {
                sentiment = "negative";
                themeList = themes.negative;
            } else {
                sentiment = "neutral";
                themeList = themes.neutral;
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
                positive: ["Great team support", "Excellent collaboration", "Supportive colleagues"]
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
        updateCounts();
        
        // Initialize sentiment chart
        if (typeof createDonutChart === 'function') {
            createDonutChart('sentimentDonut', [
                { value: 6943, color: '#28a745' },
                { value: 4876, color: '#dc3545' },
                { value: 3212, color: '#ffc107' }
            ]);
        }
    }

    function setupEventListeners() {
        document.getElementById('searchComments').addEventListener('input', applyFilters);
        document.getElementById('filterSentiment').addEventListener('change', applyFilters);
        document.getElementById('filterTheme').addEventListener('change', applyFilters);
        document.getElementById('filterBusinessUnit').addEventListener('change', applyFilters);
        document.getElementById('filterDateRange').addEventListener('change', applyFilters);
        document.getElementById('sortComments').addEventListener('change', applyFilters);
    }

    function applyFilters() {
        const searchTerm = document.getElementById('searchComments').value.toLowerCase();
        const sentiment = document.getElementById('filterSentiment').value;
        const theme = document.getElementById('filterTheme').value;
        const businessUnit = document.getElementById('filterBusinessUnit').value;
        const dateRange = document.getElementById('filterDateRange').value;
        const sortBy = document.getElementById('sortComments').value;

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
        // Calculate theme counts
        const themeCounts = {};
        allComments.forEach(comment => {
            if (!themeCounts[comment.theme]) {
                themeCounts[comment.theme] = { positive: 0, negative: 0, neutral: 0 };
            }
            themeCounts[comment.theme][comment.sentiment]++;
        });

        // Get top positive themes
        const positiveThemes = Object.entries(themeCounts)
            .map(([theme, counts]) => ({
                theme,
                count: counts.positive,
                total: counts.positive + counts.negative + counts.neutral
            }))
            .filter(t => t.count > 0)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Get top negative themes
        const negativeThemes = Object.entries(themeCounts)
            .map(([theme, counts]) => ({
                theme,
                count: counts.negative,
                total: counts.positive + counts.negative + counts.neutral
            }))
            .filter(t => t.count > 0)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Render positive themes
        const positiveContainer = document.getElementById('positiveThemes');
        positiveContainer.innerHTML = positiveThemes.map(item => `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span style="font-size: 13px;">${item.theme}</span>
                    <span class="fw-bold" style="font-size: 13px;">${item.count.toLocaleString()} comments</span>
                </div>
                <div class="progress-bar-container" style="height: 6px;">
                    <div class="progress-bar" style="width: ${(item.count / Math.max(...positiveThemes.map(t => t.count)) * 100)}%; background-color: #28a745;"></div>
                </div>
            </div>
        `).join('');

        // Render negative themes
        const negativeContainer = document.getElementById('negativeThemes');
        negativeContainer.innerHTML = negativeThemes.map(item => `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span style="font-size: 13px;">${item.theme}</span>
                    <span class="fw-bold" style="font-size: 13px;">${item.count.toLocaleString()} comments</span>
                </div>
                <div class="progress-bar-container" style="height: 6px;">
                    <div class="progress-bar" style="width: ${(item.count / Math.max(...negativeThemes.map(t => t.count)) * 100)}%; background-color: #dc3545;"></div>
                </div>
            </div>
        `).join('');

        // Populate theme filter
        const themeFilter = document.getElementById('filterTheme');
        const allThemes = [...new Set(allComments.map(c => c.theme))].sort();
        allThemes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme;
            themeFilter.appendChild(option);
        });
    }

    function renderComments() {
        const container = document.getElementById('commentsList');
        const commentsToShow = filteredComments.slice(0, displayedCount);
        
        if (commentsToShow.length === 0) {
            container.innerHTML = '<div class="text-center py-5 text-muted">No comments match your filters.</div>';
            return;
        }

        container.innerHTML = commentsToShow.map(comment => {
            const sentimentColor = {
                positive: '#28a745',
                negative: '#dc3545',
                neutral: '#ffc107'
            };
            const sentimentIcon = {
                positive: 'bx-happy',
                negative: 'bx-sad',
                neutral: 'bx-confused'
            };
            
            return `
                <div class="comment-item p-3 mb-3 border rounded" style="border-left: 4px solid ${sentimentColor[comment.sentiment]} !important;">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="d-flex align-items-center gap-2">
                            <i class='bx ${sentimentIcon[comment.sentiment]}' style="color: ${sentimentColor[comment.sentiment]}; font-size: 20px;"></i>
                            <span class="badge" style="background-color: ${sentimentColor[comment.sentiment]}; color: white; text-transform: capitalize;">${comment.sentiment}</span>
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

        document.getElementById('commentsShown').textContent = 
            `Showing ${Math.min(displayedCount, filteredComments.length)} of ${filteredComments.length.toLocaleString()} comments`;
    }

    function loadMoreComments() {
        displayedCount += 50;
        renderComments();
    }

    function renderInsights() {
        const insights = generateInsights();
        const container = document.getElementById('insightsContainer');
        
        container.innerHTML = insights.map(insight => `
            <div class="col-md-4 mb-3">
                <div class="card-custom h-100">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <i class='bx ${insight.icon}' style="font-size: 24px; color: ${insight.color};"></i>
                        <h6 class="mb-0 fw-semibold">${insight.title}</h6>
                    </div>
                    <p class="mb-0" style="font-size: 14px; color: #666;">${insight.description}</p>
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
                color: "#28a745"
            },
            {
                title: "Top Theme",
                description: `"${topTheme[0]}" appears in ${topTheme[1].toLocaleString()} comments, making it the most discussed topic.`,
                icon: "bx-bar-chart-alt-2",
                color: "#0075C9"
            },
            {
                title: "Action Required",
                description: `${negativePercent}% negative sentiment suggests areas needing attention, particularly around ${Object.entries(themeCounts).filter(([t, c]) => allComments.filter(com => com.theme === t && com.sentiment === 'negative').length > 0).sort((a, b) => b[1] - a[1])[0]?.[0] || 'workload management'}.`,
                icon: "bx-error-circle",
                color: "#dc3545"
            }
        ];
    }

    function updateCounts() {
        const total = filteredComments.length;
        const positive = filteredComments.filter(c => c.sentiment === 'positive').length;
        const neutral = filteredComments.filter(c => c.sentiment === 'neutral').length;
        const negative = filteredComments.filter(c => c.sentiment === 'negative').length;

        document.getElementById('totalCommentsCount').textContent = total.toLocaleString();
        document.getElementById('positiveCount').textContent = positive.toLocaleString();
        document.getElementById('neutralCount').textContent = neutral.toLocaleString();
        document.getElementById('negativeCount').textContent = negative.toLocaleString();
        document.getElementById('sentimentTotal').textContent = total.toLocaleString();
    }

    function clearFilters() {
        document.getElementById('searchComments').value = '';
        document.getElementById('filterSentiment').value = '';
        document.getElementById('filterTheme').value = '';
        document.getElementById('filterBusinessUnit').value = '';
        document.getElementById('filterDateRange').value = '';
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
});



