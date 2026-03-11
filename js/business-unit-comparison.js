(function () {
    'use strict';

    const STRENGTHS = [
        'Innovation', 'Collaboration', 'Customer Focus', 'Leadership', 'Agility',
        'Accountability', 'Integrity', 'Communication', 'Efficiency', 'Resilience',
        'Empowerment', 'Quality', 'Governance', 'Risk Awareness', 'Team Culture',
        'Strategic Alignment', 'Service Delivery', 'Process Excellence', 'Data-Driven',
        'Digital Enablement', 'Compliance', 'Adaptability', 'Talent Development'
    ];

    const PRIORITIES = [
        'Change Readiness', 'Workload Balance', 'Leadership Support', 'Employee Wellbeing',
        'Digital Adoption', 'Culture Alignment', 'Training', 'Retention', 'Communication',
        'Resource Allocation', 'Process Improvement', 'Innovation Culture', 'Inclusion',
        'Knowledge Sharing', 'Career Growth', 'Recognition', 'Succession Planning',
        'Cross-team Collaboration', 'Automation', 'Engagement'
    ];

    function hashStr(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = ((h << 5) - h + str.charCodeAt(i)) | 0;
        }
        return Math.abs(h);
    }

    function simulateScores(name) {
        const h = hashStr(name);
        return {
            cultureIndex: +(70 + (h % 2500) / 100).toFixed(1),
            responseRate: 80 + (h % 19),
            employeeCount: 10 + (h % 500),
            keyStrength: STRENGTHS[h % STRENGTHS.length],
            priorityArea: PRIORITIES[(h >> 4) % PRIORITIES.length]
        };
    }

    function getScoreColorClass(score) {
        if (score >= 85) return 'business-unit-score-excellent';
        if (score >= 80) return 'business-unit-score-good';
        return 'business-unit-score-poor';
    }

    function init() {
        const tree = window.hierarchyData;
        if (!tree || !tree.children) return;

        const container = document.getElementById('buComparisonBody');
        if (!container) return;

        const topUnits = tree.children;

        let html = '';
        topUnits.forEach((unit, idx) => {
            html += buildNodeRows(unit, `${idx}`, null, 0);
        });

        container.innerHTML = html;
        bindToggleHandlers(container);
    }

    function buildNodeRows(node, key, parentKey, depth) {
        const scores = simulateScores(node.name);
        const hasChildren = node.children && node.children.length > 0;
        const isTopLevel = depth === 0;

        let classes = isTopLevel ? 'bu-parent-row' : 'bu-child-row bu-sub-row';
        classes += ` bu-depth-${depth}`;
        if (hasChildren && !isTopLevel) classes += ' bu-expandable';

        const parentAttr = parentKey !== null ? ` data-bu-parent="${parentKey}"` : '';
        const keyAttr = hasChildren ? ` data-bu-key="${key}"` : '';
        const chevron = hasChildren ? `<i class='bx bx-chevron-right bu-chevron'></i>` : '';
        const scoreClass = getScoreColorClass(scores.cultureIndex);

        let html = `<tr class="${classes}"${parentAttr}${keyAttr}>
            <td class="${isTopLevel ? 'fw-semibold' : ''}">
                ${chevron}${node.name}
            </td>
            <td class="text-center">
                <span class="badge business-unit-score-badge ${scoreClass}">${scores.cultureIndex}%</span>
            </td>
            <td class="text-center">${scores.responseRate}%</td>
            <td class="text-center">${scores.employeeCount.toLocaleString()}</td>
            <td class="text-center">
                <span class="badge badge-success badge-sm">${scores.keyStrength}</span>
            </td>
            <td class="text-center">
                <span class="badge badge-warning badge-sm">${scores.priorityArea}</span>
            </td>
        </tr>`;

        if (hasChildren) {
            const childDepth = depth + 1;
            html += `<tr class="bu-child-row bu-label-row bu-depth-${childDepth}" data-bu-parent="${key}">
                <td colspan="6"><span class="bu-sub-label">Sub-Units (${node.children.length})</span></td></tr>`;

            node.children.forEach((child, cIdx) => {
                const childKey = `${key}-${cIdx}`;
                html += buildNodeRows(child, childKey, key, childDepth);
            });
        }

        return html;
    }

    function bindToggleHandlers(container) {

        function toggleChildren(triggerRow, expand) {
            const key = triggerRow.getAttribute('data-bu-key');
            const directChildren = container.querySelectorAll(`:scope > .bu-child-row[data-bu-parent="${key}"]`);

            if (expand) {
                triggerRow.classList.add('expanded');
                directChildren.forEach((child, i) => {
                    child.style.display = 'table-row';
                    child.querySelectorAll('td').forEach(td => {
                        td.style.transitionDelay = `${Math.min(i, 8) * 30}ms`;
                    });
                });
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        directChildren.forEach(child => child.classList.add('bu-visible'));
                    });
                });
            } else {
                triggerRow.classList.remove('expanded');
                const allDesc = getAllDescendants(container, key);
                allDesc.forEach(child => child.classList.remove('bu-visible'));
                container.querySelectorAll('.bu-expandable.expanded').forEach(row => {
                    const pk = row.getAttribute('data-bu-parent');
                    if (pk === key || isDescendantKey(pk, key, container)) {
                        row.classList.remove('expanded');
                    }
                });
                setTimeout(() => {
                    allDesc.forEach(child => { child.style.display = 'none'; });
                }, 220);
            }
        }

        function isDescendantKey(childParent, ancestorKey, ctx) {
            const parentRow = ctx.querySelector(`[data-bu-key="${childParent}"]`);
            if (!parentRow) return false;
            const pp = parentRow.getAttribute('data-bu-parent');
            if (pp === ancestorKey) return true;
            if (pp) return isDescendantKey(pp, ancestorKey, ctx);
            return false;
        }

        function getAllDescendants(ctx, parentKey) {
            const direct = ctx.querySelectorAll(`:scope > .bu-child-row[data-bu-parent="${parentKey}"]`);
            let all = [...direct];
            direct.forEach(child => {
                const childKey = child.getAttribute('data-bu-key');
                if (childKey) all = all.concat(getAllDescendants(ctx, childKey));
            });
            return all;
        }

        container.querySelectorAll('.bu-parent-row[data-bu-key]').forEach(row => {
            row.addEventListener('click', () => {
                toggleChildren(row, !row.classList.contains('expanded'));
            });
        });

        container.addEventListener('click', (e) => {
            const row = e.target.closest('.bu-expandable[data-bu-key]');
            if (!row) return;
            e.stopPropagation();
            toggleChildren(row, !row.classList.contains('expanded'));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
