// ============================================================================
// SECONDARY THEME EXPLORER
// ============================================================================

(function() {
    'use strict';

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const primaryThemeId = urlParams.get('theme') || 'leadership';
    const themeName = urlParams.get('name') || 'Theme';
    const themeColor = urlParams.get('color') || '#0075c9';

    // Theme definitions with Material Icons
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

    let allComments = [];
    let primaryTheme = null;
    let secondaryThemeStats = [];

    // Initialize
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Find primary theme
        primaryTheme = themes.find(t => t.id === primaryThemeId) || themes[0];
        
        // Generate data
        generateSecondaryThemeData();
        calculateSecondaryThemeStats();
        
        // Render interface
        updateHeader();
        updateInsightsBanner();
        renderRelationshipMap();
        renderSecondaryThemeCards();
        renderCommentsExplorer();
        generateInsights();
    }

    function generateSecondaryThemeData() {
        const sentiments = ['positive', 'neutral', 'negative'];
        const businessUnits = [
            'Sanlam Fintech',
            'Sanlam Life & Savings',
            'Santam',
            'SanlamAllianz',
            'Sanlam Group Office',
            'Sanlam Investment Group'
        ];
        
        const commentCount = 50 + Math.floor(Math.random() * 30);
        allComments = [];
        
        for (let i = 1; i <= commentCount; i++) {
            const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
            const businessUnit = businessUnits[Math.floor(Math.random() * businessUnits.length)];
            
            const validSecondaryThemes = themes.filter(t => t.id !== primaryTheme.id);
            const selectedSecondary = validSecondaryThemes[Math.floor(Math.random() * validSecondaryThemes.length)];
            
            const daysAgo = Math.floor(Math.random() * 90);
            const commentDate = new Date();
            commentDate.setDate(commentDate.getDate() - daysAgo);
            
            allComments.push({
                id: i,
                theme: primaryTheme.id,
                secondaryTheme: selectedSecondary.id,
                sentiment: sentiment,
                text: generateRealisticComment(primaryTheme.name, selectedSecondary.name, sentiment),
                date: commentDate.toISOString().split('T')[0],
                businessUnit: businessUnit
            });
        }
    }

    function generateRealisticComment(primary, secondary, sentiment) {
        const templates = {
            positive: [
                `Great improvements in ${primary} thanks to better ${secondary} initiatives.`,
                `The new ${primary} approach really helps with ${secondary} challenges.`,
                `Excellent progress on ${primary} - especially appreciate the ${secondary} focus.`,
                `Love how ${primary} improvements are positively affecting ${secondary}.`
            ],
            neutral: [
                `${primary} is okay but could be better integrated with ${secondary}.`,
                `Some progress on ${primary} but ${secondary} still needs attention.`,
                `${primary} initiatives are moving forward, ${secondary} impact is unclear.`,
                `Moderate improvement in ${primary}, neutral effect on ${secondary}.`
            ],
            negative: [
                `${primary} issues are getting worse and affecting ${secondary} negatively.`,
                `Poor ${primary} management is creating problems with ${secondary}.`,
                `${primary} concerns are not being addressed, impacting ${secondary}.`,
                `Frustrated with ${primary} situation, especially impact on ${secondary}.`
            ]
        };
        
        const template = templates[sentiment][Math.floor(Math.random() * templates[sentiment].length)];
        return template.replace(/\b\w/g, l => l.toLowerCase());
    }

    function calculateSecondaryThemeStats() {
        const stats = {};
        
        themes.filter(t => t.id !== primaryTheme.id).forEach(theme => {
            stats[theme.id] = {
                ...theme,
                count: 0,
                positive: 0,
                neutral: 0,
                negative: 0
            };
        });
        
        allComments.forEach(comment => {
            if (stats[comment.secondaryTheme]) {
                stats[comment.secondaryTheme].count++;
                stats[comment.secondaryTheme][comment.sentiment]++;
            }
        });
        
        secondaryThemeStats = Object.values(stats).map(theme => {
            const total = theme.count;
            return {
                ...theme,
                positivePercent: total > 0 ? Math.round((theme.positive / total) * 100) : 0,
                neutralPercent: total > 0 ? Math.round((theme.neutral / total) * 100) : 0,
                negativePercent: total > 0 ? Math.round((theme.negative / total) * 100) : 0,
                strength: calculateConnectionStrength(theme.count, allComments.length)
            };
        }).sort((a, b) => b.count - a.count);
    }

    function calculateConnectionStrength(count, total) {
        const percentage = (count / total) * 100;
        if (percentage >= 15) return 'Strong';
        if (percentage >= 8) return 'Moderate';
        if (percentage >= 3) return 'Weak';
        return 'Minimal';
    }

    function updateHeader() {
        const secondaryCount = secondaryThemeStats.filter(t => t.count > 0).length;
        
        document.getElementById('breadcrumbTheme').textContent = `${themeName} - Secondary Themes`;
        document.getElementById('primaryThemeTitle').textContent = themeName;
        document.getElementById('primaryThemeDescription').textContent = 
            `Analyzing ${allComments.length} comments and their relationships with ${secondaryCount} secondary themes`;
        document.getElementById('totalComments').textContent = allComments.length;
        document.getElementById('totalSecondaryThemes').textContent = secondaryCount;
        
        const themeBadge = document.getElementById('themeBadge');
        const icon = themeBadge.querySelector('.material-icons');
        icon.textContent = primaryTheme.icon;
        themeBadge.style.background = `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, -20)})`;
        
        // Populate theme selector dropdown
        populateThemeSelector();
        
        // Populate secondary theme dropdown
        const dropdown = document.getElementById('focusSecondaryTheme');
        dropdown.innerHTML = '<option value="all">All Secondary Themes</option>';
        secondaryThemeStats.forEach(theme => {
            if (theme.count > 0) {
                dropdown.innerHTML += `<option value="${theme.id}">${theme.name} (${theme.count})</option>`;
            }
        });
    }

    function populateThemeSelector() {
        const selector = document.getElementById('themeSelector');
        if (!selector) return;
        
        selector.innerHTML = '';
        themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme.id;
            option.textContent = theme.name;
            option.dataset.color = theme.color;
            if (theme.id === primaryThemeId) {
                option.selected = true;
            }
            selector.appendChild(option);
        });
    }

    window.switchTheme = function() {
        const selector = document.getElementById('themeSelector');
        const selectedTheme = themes.find(t => t.id === selector.value);
        
        if (selectedTheme && selectedTheme.id !== primaryThemeId) {
            const params = new URLSearchParams({
                theme: selectedTheme.id,
                name: selectedTheme.name,
                color: selectedTheme.color
            });
            window.location.href = `secondary-themes.html?${params.toString()}`;
        }
    };

    function updateInsightsBanner() {
        const topSecondary = secondaryThemeStats[0];
        const totalConnections = secondaryThemeStats.filter(t => t.count > 0).length;
        
        document.getElementById('keyInsight').textContent = 
            `${topSecondary.name} shows the strongest connection with ${topSecondary.count} related comments (${topSecondary.strength.toLowerCase()} correlation). ${totalConnections} secondary themes detected.`;
    }

    function renderRelationshipMap() {
        const container = document.getElementById('relationshipMap');
        container.innerHTML = '';
        
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        // Prepare nodes and links
        const nodes = [
            {
                id: primaryTheme.id,
                name: primaryTheme.name,
                color: themeColor,
                type: 'primary',
                size: 40
            },
            ...secondaryThemeStats.filter(t => t.count > 0).map(theme => ({
                id: theme.id,
                name: theme.name,
                color: theme.color,
                type: 'secondary',
                size: Math.max(theme.count * 2, 15),
                count: theme.count
            }))
        ];
        
        const links = secondaryThemeStats.filter(t => t.count > 0).map(theme => ({
            source: primaryTheme.id,
            target: theme.id,
            value: theme.count,
            strength: theme.strength
        }));
        
        // Create force simulation
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(d => 100 + (20 - d.value) * 5))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(d => d.size + 5));
        
        // Add links
        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', d => d.value >= 5 ? '#333' : '#999')
            .attr('stroke-width', d => Math.max(d.value / 2, 1))
            .attr('stroke-opacity', 0.7);
        
        // Add nodes
        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', d => d.size)
            .attr('fill', d => d.color)
            .attr('stroke', '#fff')
            .attr('stroke-width', d => d.type === 'primary' ? 4 : 2)
            .style('cursor', 'pointer')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended))
            .on('click', function(event, d) {
                if (d.type === 'secondary') {
                    highlightSecondaryTheme(d.id);
                }
            })
            .on('mouseover', function(event, d) {
                link.style('opacity', l => 
                    l.source.id === d.id || l.target.id === d.id ? 1 : 0.3);
            })
            .on('mouseout', function() {
                link.style('opacity', 0.7);
            });
        
        // Add labels
        const label = svg.append('g')
            .selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .text(d => d.name)
            .attr('font-size', d => d.type === 'primary' ? 14 : 12)
            .attr('font-weight', d => d.type === 'primary' ? 'bold' : 'normal')
            .attr('text-anchor', 'middle')
            .attr('dy', 4)
            .style('pointer-events', 'none');
        
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
            
            label
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
        
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    function renderSecondaryThemeCards() {
        const container = document.getElementById('secondaryThemesContainer');
        container.innerHTML = '';
        
        secondaryThemeStats.forEach((theme, index) => {
            if (theme.count === 0) return;
            
            const card = document.createElement('div');
            card.className = 'secondary-theme-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.onclick = () => highlightSecondaryTheme(theme.id);
            
            card.innerHTML = `
                <div class="theme-card-header">
                    <div class="theme-card-title">
                        <span class="material-icons theme-card-icon" style="color: ${theme.color};">${theme.icon}</span>
                        ${theme.name}
                    </div>
                    <div class="connection-strength ${theme.strength.toLowerCase()}">${theme.strength}</div>
                </div>
                
                <div class="theme-stats-mini">
                    <div class="stat-mini">
                        <span class="stat-mini-value">${theme.count}</span>
                        <span class="stat-mini-label">Comments</span>
                    </div>
                    <div class="stat-mini">
                        <span class="stat-mini-value">${theme.positivePercent}%</span>
                        <span class="stat-mini-label">Positive</span>
                    </div>
                    <div class="stat-mini">
                        <span class="stat-mini-value">${Math.round((theme.count / allComments.length) * 100)}%</span>
                        <span class="stat-mini-label">Coverage</span>
                    </div>
                </div>
                
                <div class="sentiment-bar">
                    <div class="sentiment-fill" style="width: ${theme.positivePercent}%"></div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    function renderCommentsExplorer() {
        window.filterCommentsBySecondary();
    }

    window.filterCommentsBySecondary = function() {
        const focusTheme = document.getElementById('focusSecondaryTheme').value;
        const focusSentiment = document.getElementById('focusSentiment').value;
        
        let filteredComments = allComments.filter(comment => {
            if (focusTheme !== 'all' && comment.secondaryTheme !== focusTheme) return false;
            if (focusSentiment !== 'all' && comment.sentiment !== focusSentiment) return false;
            return true;
        });
        
        const container = document.getElementById('filteredCommentsGrid');
        container.innerHTML = '';
        
        if (filteredComments.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="text-center py-5 text-muted">
                        <i class="bx bx-search" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
                        No comments match the selected criteria
                    </div>
                </div>
            `;
            return;
        }
        
        filteredComments.slice(0, 12).forEach(comment => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            
            const primaryThemeObj = themes.find(t => t.id === comment.theme);
            const secondaryThemeObj = themes.find(t => t.id === comment.secondaryTheme);
            
            col.innerHTML = `
                <div class="comment-card">
                    <div class="comment-card-header">
                        <div class="comment-themes">
                            <span class="theme-tag primary">${primaryThemeObj.name}</span>
                            <span class="theme-tag secondary">${secondaryThemeObj.name}</span>
                        </div>
                        <div class="comment-sentiment ${comment.sentiment}">${comment.sentiment}</div>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                    <div class="comment-meta">
                        ${comment.businessUnit} • ${formatDate(comment.date)}
                    </div>
                </div>
            `;
            
            container.appendChild(col);
        });
        
        if (filteredComments.length > 12) {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="comment-card" style="background: var(--color-bg-subtle); border-style: dashed;">
                    <div class="text-center py-4 text-muted">
                        <i class="bx bx-plus" style="font-size: 2rem; display: block; margin-bottom: 0.5rem;"></i>
                        <strong>+${filteredComments.length - 12} more comments</strong><br>
                        <small>Adjust filters to explore more</small>
                    </div>
                </div>
            `;
            container.appendChild(col);
        }
    };

    function generateInsights() {
        const topSecondary = secondaryThemeStats[0];
        const negativeThemes = secondaryThemeStats.filter(t => t.negativePercent > 50);
        
        document.getElementById('patternInsight').textContent = 
            `${topSecondary.name} appears in ${Math.round((topSecondary.count / allComments.length) * 100)}% of ${primaryTheme.name} discussions, suggesting a strong operational connection.`;
        
        if (negativeThemes.length > 0) {
            document.getElementById('trendInsight').textContent = 
                `${negativeThemes.length} secondary theme(s) show concerning sentiment patterns, particularly ${negativeThemes[0].name} with ${negativeThemes[0].negativePercent}% negative feedback.`;
        } else {
            document.getElementById('trendInsight').textContent = 
                `Positive trend detected: Most secondary themes show balanced or positive sentiment when combined with ${primaryTheme.name}.`;
        }
        
        if (topSecondary.negativePercent > 40) {
            document.getElementById('recommendationInsight').textContent = 
                `Focus improvement efforts on the ${primaryTheme.name}-${topSecondary.name} connection to address ${topSecondary.negative} negative comments.`;
        } else {
            document.getElementById('recommendationInsight').textContent = 
                `Leverage the strong ${primaryTheme.name}-${topSecondary.name} relationship as a model for improving other theme combinations.`;
        }
    }

    window.sortSecondaryThemes = function() {
        const sortBy = document.getElementById('sortSecondary').value;
        
        switch(sortBy) {
            case 'frequency':
                secondaryThemeStats.sort((a, b) => b.count - a.count);
                break;
            case 'sentiment':
                secondaryThemeStats.sort((a, b) => b.positivePercent - a.positivePercent);
                break;
            case 'alphabetical':
                secondaryThemeStats.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        renderSecondaryThemeCards();
    };

    function highlightSecondaryTheme(themeId) {
        document.getElementById('focusSecondaryTheme').value = themeId;
        filterCommentsBySecondary();
        
        document.querySelector('.card-custom:has(#filteredCommentsGrid)').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    function adjustColor(color, percent) {
        const num = parseInt(color.replace("#",""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + 
            (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
            .toString(16).slice(1);
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

})();
