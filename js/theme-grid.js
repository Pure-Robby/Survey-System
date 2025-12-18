// ============================================================================
// THEME GRID MODULE
// ============================================================================
// Handles the display of comment themes in a grid layout with modals and
// secondary theme exploration functionality

(function() {
    'use strict';

    // Module state
    let currentTheme = null;
    let themeComments = [];
    
    // Theme definitions with Sanlam color palette and Material Icons
    const themes = [
        { id: 'leadership', name: 'Leadership', icon: 'workspace_premium', color: '#0075c9' },
        { id: 'communication', name: 'Communication', icon: 'forum', color: '#902d98' },
        { id: 'workload', name: 'Workload', icon: 'bar_chart', color: '#dd009b' },
        { id: 'culture', name: 'Company Culture', icon: 'favorite', color: '#4fc83c' },
        { id: 'growth', name: 'Growth & Development', icon: 'trending_up', color: '#ea8f3f' },
        { id: 'compensation', name: 'Compensation', icon: 'paid', color: '#cb333b' },
        { id: 'workspace', name: 'Workspace', icon: 'business', color: '#33647e' },
        { id: 'balance', name: 'Work-Life Balance', icon: 'balance', color: '#825474' }
    ];

    // Mock comment data generator
    function generateMockComments() {
        const comments = [];
        const businessUnits = [
            'Sanlam Fintech',
            'Sanlam Life & Savings',
            'Santam',
            'SanlamAllianz',
            'Sanlam Group Office',
            'Sanlam Investment Group'
        ];
        
        const commentTemplates = {
            leadership: {
                positive: [
                    'Our leadership team provides clear direction and excellent support.',
                    'Management is approachable and genuinely cares about team development.',
                    'Leadership decisions are well-communicated and logical.',
                    'Strong leadership drives our success and motivates the team.'
                ],
                neutral: [
                    'Leadership is competent but could be more inspiring.',
                    'Mixed experiences with different managers across units.',
                    'Generally supportive but could provide more strategic guidance.',
                    'Leadership tries hard but sometimes lacks necessary authority.'
                ],
                negative: [
                    'Leadership seems disconnected from day-to-day challenges.',
                    'Inconsistent messaging and frequent direction changes.',
                    'Poor decision-making affecting team morale.',
                    'Lack of transparency in strategic decisions.'
                ]
            },
            communication: {
                positive: [
                    'Cross-team collaboration has improved dramatically with new tools.',
                    'Regular updates and transparent communication from leadership.',
                    'Team meetings are productive and well-structured.',
                    'Information flows much better between departments now.'
                ],
                neutral: [
                    'Communication is adequate but could be more proactive.',
                    'Some teams communicate well while others remain siloed.',
                    'Information sharing has improved but still has gaps.',
                    'Meeting frequency is reasonable but effectiveness varies.'
                ],
                negative: [
                    'Lack of clear communication causing project delays.',
                    'Important decisions made without consulting affected teams.',
                    'Too many meetings with little actionable outcomes.',
                    'Information silos between departments creating inefficiencies.'
                ]
            },
            workload: {
                positive: [
                    'Team size increase has really helped balance workload.',
                    'New project management system makes prioritization clearer.',
                    'Automation tools have freed up time for strategic work.',
                    'Flexible scheduling helps manage peak periods effectively.'
                ],
                neutral: [
                    'Workload is manageable but could use better resource allocation.',
                    'Some projects are well-staffed while others feel understaffed.',
                    'Deadlines are reasonable most of the time with occasional crunch.',
                    'Task distribution could be more equitable across team.'
                ],
                negative: [
                    'Constantly overwhelmed with unrealistic deadlines.',
                    'Workload has increased significantly without additional team members.',
                    'Too many urgent requests interrupting planned work.',
                    'Burning out from sustained high-pressure environment.'
                ]
            },
            culture: {
                positive: [
                    'Inclusive culture where diverse perspectives are valued.',
                    'Great team spirit and supportive work environment.',
                    'Company values are clearly demonstrated in daily operations.',
                    'Positive culture of learning and continuous improvement.'
                ],
                neutral: [
                    'Company culture is generally positive but varies by department.',
                    'Cultural initiatives are well-intentioned but implementation inconsistent.',
                    'Work environment is professional though not particularly inspiring.',
                    'Culture is evolving positively but still has room for improvement.'
                ],
                negative: [
                    'Toxic culture with office politics affecting relationships.',
                    'Company values feel disconnected from actual practices.',
                    'Lack of diversity and inclusion in hiring decisions.',
                    'High-stress environment with little regard for work-life balance.'
                ]
            },
            growth: {
                positive: [
                    'Excellent professional development opportunities and learning budget.',
                    'Clear career progression paths with regular advancement opportunities.',
                    'Mentorship programs are well-structured and effective.',
                    'Company invests significantly in employee skill development.'
                ],
                neutral: [
                    'Some growth opportunities available but limited by budget.',
                    'Career development paths exist but not always clearly defined.',
                    'Training programs are decent but could be more comprehensive.',
                    'Growth opportunities vary significantly by role and department.'
                ],
                negative: [
                    'Limited opportunities for career advancement within organization.',
                    'Professional development budget cuts affecting skill building.',
                    'No clear succession planning or internal mobility programs.',
                    'Stagnant role with minimal learning or growth potential.'
                ]
            },
            compensation: {
                positive: [
                    'Competitive salary package with excellent benefits.',
                    'Fair and transparent compensation review process.',
                    'Performance bonuses are generous and merit-based.',
                    'Stock options and equity participation align interests well.'
                ],
                neutral: [
                    'Compensation is fair but not exceptional compared to market.',
                    'Benefits package is comprehensive though some areas could improve.',
                    'Salary reviews are regular but increases could be more substantial.',
                    'Total compensation is reasonable for the role and industry.'
                ],
                negative: [
                    'Below-market compensation despite increased responsibilities.',
                    'Benefits package has been reduced while healthcare costs increase.',
                    'No clear correlation between performance and compensation.',
                    'Pay equity issues exist across similar roles.'
                ]
            },
            workspace: {
                positive: [
                    'Modern office facilities with excellent amenities.',
                    'Flexible workspace arrangements support different work styles.',
                    'Comfortable and well-equipped work environment.',
                    'Great collaboration spaces and meeting rooms.'
                ],
                neutral: [
                    'Office space is adequate but could be more modern.',
                    'Some areas are well-maintained while others need updates.',
                    'Workspace is functional but not particularly inspiring.',
                    'Mix of open and private spaces works reasonably well.'
                ],
                negative: [
                    'Cramped workspace with inadequate facilities.',
                    'Noise levels make it difficult to concentrate.',
                    'Poor ergonomics and outdated equipment.',
                    'Lack of adequate meeting spaces for collaboration.'
                ]
            },
            balance: {
                positive: [
                    'Excellent work-life balance with flexible hours.',
                    'Company respects personal time and boundaries.',
                    'Remote work options have significantly improved balance.',
                    'Management actively encourages taking time off.'
                ],
                neutral: [
                    'Balance is generally okay but varies by team and season.',
                    'Flexibility is available but not always easy to utilize.',
                    'Work-life balance depends heavily on specific role.',
                    'Some progress but still room for improvement.'
                ],
                negative: [
                    'Work consistently bleeds into personal time.',
                    'Expected to be available outside normal hours.',
                    'Burnout is common due to unsustainable pace.',
                    'No respect for personal boundaries or time off.'
                ]
            }
        };

        const sentiments = ['positive', 'neutral', 'negative'];
        const now = new Date();
        
        // Generate 200 comments across themes
        for (let i = 1; i <= 200; i++) {
            const theme = themes[Math.floor(Math.random() * themes.length)];
            const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
            const businessUnit = businessUnits[Math.floor(Math.random() * businessUnits.length)];
            const secondaryTheme = themes[Math.floor(Math.random() * themes.length)].id;
            
            // Generate date within last 90 days
            const daysAgo = Math.floor(Math.random() * 90);
            const commentDate = new Date(now);
            commentDate.setDate(commentDate.getDate() - daysAgo);
            
            // Get template text
            const templates = commentTemplates[theme.id][sentiment];
            const text = templates[Math.floor(Math.random() * templates.length)];
            
            comments.push({
                id: i,
                theme: theme.id,
                sentiment: sentiment,
                text: text,
                date: commentDate.toISOString().split('T')[0],
                businessUnit: businessUnit,
                secondaryTheme: secondaryTheme
            });
        }
        
        return comments;
    }

    // Calculate theme statistics from comments
    function calculateThemeStats(comments) {
        const stats = {};
        
        // Initialize stats for all themes
        themes.forEach(theme => {
            stats[theme.id] = {
                ...theme,
                count: 0,
                positive: 0,
                neutral: 0,
                negative: 0
            };
        });
        
        // Calculate actual stats from comments
        comments.forEach(comment => {
            if (stats[comment.theme]) {
                stats[comment.theme].count++;
                stats[comment.theme][comment.sentiment]++;
            }
        });
        
        // Convert to array and calculate percentages
        return Object.values(stats).map(theme => ({
            ...theme,
            positivePercent: theme.count > 0 ? Math.round((theme.positive / theme.count) * 100) : 0,
            neutralPercent: theme.count > 0 ? Math.round((theme.neutral / theme.count) * 100) : 0,
            negativePercent: theme.count > 0 ? Math.round((theme.negative / theme.count) * 100) : 0
        })).sort((a, b) => b.count - a.count);
    }

    // Create individual theme tile
    function createInsightTile(theme, comments) {
        const tile = document.createElement('div');
        tile.className = 'insight-tile';
        
        tile.innerHTML = `
            <div class="tile-header">
                <div>
                    <div class="tile-title">${theme.name}</div>
                    <div class="tile-count">${theme.count} comments</div>
                </div>
                <div class="tile-icon" style="--tile-theme-color: ${theme.color};">
                    <span class="material-icons">${theme.icon}</span>
                </div>
            </div>
            
            <div class="sentiment-stats">
                <div class="sentiment-stat positive">
                    <span class="material-icons">sentiment_satisfied</span>
                    <span>${theme.positivePercent}%</span>
                </div>
                <div class="sentiment-stat neutral">
                    <span class="material-icons">sentiment_neutral</span>
                    <span>${theme.neutralPercent}%</span>
                </div>
                <div class="sentiment-stat negative">
                    <span class="material-icons">sentiment_dissatisfied</span>
                    <span>${theme.negativePercent}%</span>
                </div>
            </div>
            
            <div class="tile-actions">
                <button class="view-details-btn btn-primary-outline" data-theme="${theme.id}">
                    <span class="material-icons">visibility</span>
                    View Details
                </button>
                <button class="secondary-themes-btn btn-primary" data-theme="${theme.id}">
                    <span class="material-icons">insights</span>
                    Secondary Themes
                </button>
            </div>
        `;
        
        // Add event listeners
        const viewBtn = tile.querySelector('.view-details-btn');
        const secondaryBtn = tile.querySelector('.secondary-themes-btn');
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openThemeModal(theme, comments);
        });
        
        secondaryBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSecondaryThemeExplorerForTheme(theme);
        });
        
        return tile;
    }

    // Render theme grid
    function renderThemeGrid() {
        const grid = document.getElementById('insightsGrid');
        const themesCountEl = document.getElementById('themesCount');
        
        if (!grid) return;
        
        // Generate mock comments
        const comments = generateMockComments();
        
        // Calculate theme statistics
        const themeStats = calculateThemeStats(comments);
        
        // Update count
        const activeThemes = themeStats.filter(t => t.count > 0).length;
        if (themesCountEl) {
            themesCountEl.textContent = `${activeThemes} active themes`;
        }
        
        // Clear grid
        grid.innerHTML = '';
        
        // Render tiles for themes with comments
        themeStats.forEach(theme => {
            if (theme.count > 0) {
                const tile = createInsightTile(theme, comments);
                grid.appendChild(tile);
            }
        });
    }

    // Open theme modal with details
    function openThemeModal(theme, allComments) {
        currentTheme = theme;
        themeComments = allComments.filter(c => c.theme === theme.id);
        
        const modal = document.getElementById('modalOverlay');
        if (!modal) return;
        
        // Update modal title
        document.getElementById('modalTitle').textContent = `${theme.name} - Deep Dive`;
        
        // Update stats
        document.getElementById('modalPositive').textContent = `${theme.positivePercent}%`;
        document.getElementById('modalNeutral').textContent = `${theme.neutralPercent}%`;
        document.getElementById('modalNegative').textContent = `${theme.negativePercent}%`;
        
        // Render charts
        renderModalBarChart(theme);
        generateWordCloud(themeComments);
        
        // Load comments
        loadThemeComments(themeComments);
        
        // Show modal
        modal.classList.add('active');
    }

    // Render bar chart in modal
    function renderModalBarChart(theme) {
        const container = d3.select('#modalBarChart');
        container.selectAll('*').remove();
        
        const total = theme.positive + theme.neutral + theme.negative;
        
        const data = [
            { 
                label: 'Positive', 
                value: theme.positive, 
                color: '#28a745',
                percent: Math.round((theme.positive / total) * 100)
            },
            { 
                label: 'Neutral', 
                value: theme.neutral, 
                color: '#ffc107',
                percent: Math.round((theme.neutral / total) * 100)
            },
            { 
                label: 'Negative', 
                value: theme.negative, 
                color: '#dc3545',
                percent: Math.round((theme.negative / total) * 100)
            }
        ];
        
        const margin = { top: 15, right: 30, bottom: 50, left: 85 };
        const width = 320 - margin.left - margin.right;
        const height = 280 - margin.top - margin.bottom;
        
        const svg = container
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) * 1.1])
            .range([0, width]);
        
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, height])
            .padding(0.25);
        
        const bars = g.selectAll('.bar')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'bar');
        
        // Add bars with shadow effect
        bars.append('rect')
            .attr('x', 0)
            .attr('y', d => yScale(d.label))
            .attr('width', 0)
            .attr('height', yScale.bandwidth())
            .attr('fill', d => d.color)
            .attr('rx', 6)
            .attr('ry', 6)
            .transition()
            .duration(800)
            .attr('width', d => xScale(d.value));
        
        // Add value labels inside bars
        bars.append('text')
            .attr('class', 'bar-value')
            .attr('x', d => Math.max(xScale(d.value) - 10, 50))
            .attr('y', d => yScale(d.label) + yScale.bandwidth() / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .attr('opacity', 0)
            .text(d => `${d.value} (${d.percent}%)`)
            .transition()
            .delay(400)
            .duration(400)
            .attr('opacity', 1);
        
        // Add labels on the left
        g.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', -12)
            .attr('y', d => yScale(d.label) + yScale.bandwidth() / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .text(d => d.label);
        
        // Add summary text at the bottom
        const summaryGroup = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top + height + 20})`);
        
        summaryGroup.append('text')
            .attr('class', 'chart-summary')
            .attr('x', 0)
            .attr('y', 0)
            .style('font-size', '13px')
            .style('font-weight', '600')
            .style('fill', '#333e48')
            .text(`Total: ${total} comments`);
        
        summaryGroup.append('text')
            .attr('class', 'chart-summary-detail')
            .attr('x', 0)
            .attr('y', 18)
            .style('font-size', '12px')
            .style('fill', '#666')
            .text(`Dominant sentiment: ${data.sort((a, b) => b.value - a.value)[0].label}`);
    }

    // Generate word cloud from comments
    function generateWordCloud(comments) {
        const wordCloud = document.getElementById('wordCloud');
        if (!wordCloud) return;
        
        const words = {};
        const stopWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 
                          'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has',
                          'with', 'from', 'have', 'this', 'that', 'they', 'been', 'were',
                          'more', 'will', 'about', 'than', 'into', 'very', 'there'];
        
        comments.forEach(comment => {
            const text = comment.text.toLowerCase();
            const wordList = text.split(/\s+/).filter(word => 
                word.length > 4 && !stopWords.includes(word)
            );
            
            wordList.forEach(word => {
                words[word] = (words[word] || 0) + 1;
            });
        });
        
        const sortedWords = Object.entries(words)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 25);
        
        // Calculate min and max for scaling
        const counts = sortedWords.map(([, count]) => count);
        const maxCount = Math.max(...counts);
        const minCount = Math.min(...counts);
        
        wordCloud.innerHTML = sortedWords.map(([word, count], index) => {
            // Scale font size between 12px and 24px based on frequency
            const scale = (count - minCount) / (maxCount - minCount);
            const fontSize = 12 + (scale * 12);
            const delay = index * 0.03; // Stagger animation by 30ms
            
            return `<span class="word-item" style="font-size: ${fontSize}px; animation-delay: ${delay}s">${word}</span>`;
        }).join('');
    }

    // Load theme comments into modal
    function loadThemeComments(comments) {
        const commentsList = document.getElementById('modalCommentsList');
        if (!commentsList) return;
        
        commentsList.innerHTML = '';
        
        comments.slice(0, 20).forEach(comment => {
            const themeInfo = themes.find(t => t.id === comment.secondaryTheme);
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.innerHTML = `
                <div class="comment-header">
                    <span class="comment-sentiment ${comment.sentiment}">${comment.sentiment}</span>
                    <span class="comment-date">${formatDate(comment.date)}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-theme">Secondary theme: ${themeInfo ? themeInfo.name : 'None'}</div>
            `;
            commentsList.appendChild(commentItem);
        });
    }

    // Format date helper
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Close modal
    window.closeThemeModal = function() {
        const modal = document.getElementById('modalOverlay');
        if (modal) {
            modal.classList.remove('active');
        }
    };

    // Sort comments in modal
    window.sortThemeComments = function(sortBy) {
        if (!themeComments.length) return;
        
        let sorted = [...themeComments];
        
        if (sortBy === 'sentiment') {
            const sentimentOrder = { positive: 0, neutral: 1, negative: 2 };
            sorted.sort((a, b) => sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment]);
        } else if (sortBy === 'date') {
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        
        loadThemeComments(sorted);
    };

    // Export theme data
    window.exportThemeData = function() {
        if (!currentTheme || !themeComments.length) return;
        
        const csvContent = [
            ['Date', 'Sentiment', 'Business Unit', 'Comment', 'Secondary Theme'].join(','),
            ...themeComments.map(c => {
                const secondaryTheme = themes.find(t => t.id === c.secondaryTheme);
                return [
                    c.date,
                    c.sentiment,
                    c.businessUnit,
                    `"${c.text.replace(/"/g, '""')}"`,
                    secondaryTheme ? secondaryTheme.name : 'None'
                ].join(',');
            })
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}-comments.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    // Open secondary theme explorer
    window.openSecondaryThemeExplorer = function() {
        if (!currentTheme) return;
        openSecondaryThemeExplorerForTheme(currentTheme);
    };

    function openSecondaryThemeExplorerForTheme(theme) {
        // Navigate to secondary themes analysis in same tab
        const params = new URLSearchParams({
            theme: theme.id,
            name: theme.name,
            color: theme.color
        });
        window.location.href = `secondary-themes.html?${params.toString()}`;
    }

    // Close modal on overlay click
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('modalOverlay');
        if (modal && e.target === modal) {
            closeThemeModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeThemeModal();
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderThemeGrid);
    } else {
        renderThemeGrid();
    }

})();
