// TFG Survey System POC - Chart Rendering

// ==================== Donut Chart ====================
function createDonutChart(elementId, data, size = 250) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const strokeWidth = size * 0.2; // Proportional stroke width (50 for 250px, 30 for 150px)
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Create SVG
    let svgHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
    
    let currentAngle = 0;
    data.forEach(item => {
        const percentage = item.value / total;
        const dashArray = circumference * percentage;
        const dashOffset = -currentAngle;
        
        svgHTML += `
            <circle
                cx="${size / 2}"
                cy="${size / 2}"
                r="${radius}"
                class="donut-segment"
                stroke="${item.color}"
                stroke-width="${strokeWidth}"
                fill="none"
                stroke-dasharray="${dashArray} ${circumference}"
                stroke-dashoffset="${dashOffset}"
                transform="rotate(-90 ${size / 2} ${size / 2})"
            />
        `;
        
        currentAngle += dashArray;
    });
    
    svgHTML += '</svg>';
    element.innerHTML = svgHTML;
}

// ==================== ENPS Donut Chart with Center Text ====================
function createEnpsDonutChart(elementId, data, centerLabel, centerValue, size = 150) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const strokeWidth = 18; // Fixed stroke width
    const radius = (size / 2) - (strokeWidth / 2);
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Create SVG
    let svgHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">`;
    
    let startAngle = 0; // Start at right, then rotated to top by CSS
    
    data.forEach((item) => {
        const percentage = item.value / total;
        const angle = percentage * 360;
        const endAngle = startAngle + angle;
        
        // Convert angles to radians
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        
        // Calculate arc points
        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);
        
        // Large arc flag
        const largeArc = angle > 180 ? 1 : 0;
        
        // Create path
        const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
        
        svgHTML += `
            <path
                d="${path}"
                stroke="${item.color}"
                stroke-width="${strokeWidth}"
                fill="none"
            />
        `;
        
        startAngle = endAngle;
    });
    
    svgHTML += '</svg>';
    
    // Add center text overlay
    const centerTextHTML = `
        <div class="enps-donut-center-text">
            <div class="enps-donut-center-label">${centerLabel}</div>
            <div class="enps-donut-center-value">${centerValue}</div>
        </div>
    `;
    
    element.innerHTML = svgHTML + centerTextHTML;
}

// ==================== Circular Progress ====================
function createCircularProgress(elementId, percentage, color = '#28a745') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const size = 150;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - percentage / 100);
    
    element.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
            <circle
                cx="${size / 2}"
                cy="${size / 2}"
                r="${radius}"
                class="circular-progress-bg"
            />
            <circle
                cx="${size / 2}"
                cy="${size / 2}"
                r="${radius}"
                class="circular-progress-bar"
                stroke="${color}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${dashOffset}"
            />
        </svg>
        <div class="circular-progress-text">
            ${Math.round(percentage)}%            
        </div>
        
    `;
}

// ==================== Horizontal Bar Chart ====================
function createBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '<div class="bar-chart">';
    
    data.forEach(item => {
        html += `
            <div class="bar-item">
                <div class="bar-label">
                    <span>${item.label}</span>
                    <span class="fw-bold">${item.count || ''}</span>
                </div>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${item.percentage}%; background-color: ${item.color};">
                        ${item.showValue ? item.value : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Animate bars
    setTimeout(() => {
        container.querySelectorAll('.bar-fill').forEach((bar, index) => {
            setTimeout(() => {
                bar.style.opacity = '1';
            }, index * 100);
        });
    }, 100);
}

// ==================== Stacked Bar Chart ====================
function createStackedBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '<div class="stacked-bar-chart">';
    
    data.forEach(item => {
        const total = item.positive + item.neutral + item.negative;
        const posPercent = (item.positive / total * 100).toFixed(1);
        const neuPercent = (item.neutral / total * 100).toFixed(1);
        const negPercent = (item.negative / total * 100).toFixed(1);
        
        html += `
            <div class="stacked-bar-item mb-3">
                <div class="bar-label mb-1">
                    <span class="fw-semibold">${item.label}</span>
                </div>
                <div class="bar-track" style="height: 30px; display: flex;">
                    <div class="bar-fill" style="width: ${posPercent}%; background-color: #28a745;" title="Positive: ${item.positive}"></div>
                    <div class="bar-fill" style="width: ${negPercent}%; background-color: #dc3545;" title="Negative: ${item.negative}"></div>
                    <div class="bar-fill" style="width: ${neuPercent}%; background-color: #ffc107;" title="Neutral: ${item.neutral}"></div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// ==================== Column Chart ====================
function createColumnChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = 300;
    
    let html = '<div class="column-chart" style="display: flex; align-items: flex-end; height: ' + chartHeight + 'px; gap: 8px;">';
    
    data.forEach(item => {
        const height = (item.value / maxValue) * chartHeight;
        html += `
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                <div style="width: 100%; height: ${height}px; background-color: ${item.color}; border-radius: 4px 4px 0 0; transition: height 0.5s ease;"></div>
                <div style="font-size: 11px; text-align: center; margin-top: 8px; transform: rotate(-45deg); white-space: nowrap;">${item.label}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// ==================== Sentiment Legend ====================
function createSentimentLegend(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="d-flex gap-3 justify-content-center">
            <div class="d-flex align-items-center gap-1">
                <div style="width: 12px; height: 12px; background-color: #28a745; border-radius: 50%;"></div>
                <span style="font-size: 12px;">Positive</span>
            </div>
            <div class="d-flex align-items-center gap-1">
                <div style="width: 12px; height: 12px; background-color: #dc3545; border-radius: 50%;"></div>
                <span style="font-size: 12px;">Negative</span>
            </div>
            <div class="d-flex align-items-center gap-1">
                <div style="width: 12px; height: 12px; background-color: #ffc107; border-radius: 50%;"></div>
                <span style="font-size: 12px;">Neutral</span>
            </div>
        </div>
    `;
}

// ==================== Initialize Charts on Page Load ====================
function initializeCharts() {
    // Check which page we're on and initialize appropriate charts
    
    // Sentiment Donut Chart (Overview Dashboard & Comments Analysis)
    const sentimentDonut = document.getElementById('sentimentDonut');
    if (sentimentDonut) {
        createDonutChart('sentimentDonut', [
            { value: 6943, color: '#28a745' }, // Positive
            { value: 4876, color: '#dc3545' }, // Negative
            { value: 3212, color: '#ffc107' }  // Neutral
        ]);
    }
    
    // Response Rate Circular Progress
    const responseProgress = document.getElementById('responseProgress');
    if (responseProgress) {
        createCircularProgress('responseProgress', 84, '#28a745');
    }
    
    // Pulse Score Average Circular Progress (77% of 6 points = 4.61)
    const pulseProgress = document.getElementById('pulseProgress');
    if (pulseProgress) {
        const pulseElement = document.getElementById('pulseProgress');
        pulseElement.innerHTML = `
            <svg width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="65" class="circular-progress-bg" />
                <circle cx="75" cy="75" r="65" class="circular-progress-bar" stroke="#f4a742" stroke-dasharray="408.407" stroke-dashoffset="${408.407 * (1 - 0.77)}" />
            </svg>
            <div class="circular-progress-text">77%</div>
        `;
    }
    
    // eNPS Score Donut Chart
    const enpsProgress = document.getElementById('enpsProgress');
    if (enpsProgress) {
        createEnpsDonutChart('enpsProgress', [
            { value: 42, color: '#28a745', percentage: 42 }, // Promoters
            { value: 33, color: '#ffc107', percentage: 33 }, // Passives
            { value: 25, color: '#dc3545', percentage: 25 }  // Detractors
        ], 'eNPS', '17', 150);
    }
    
    // Flight Risk Horizontal Bar Chart
    const flightRiskChart = document.getElementById('flightRiskChart');
    if (flightRiskChart) {
        createBarChart('flightRiskChart', [
            { label: 'High Risk', percentage: 30, count: '6,469', color: '#dc3545', value: '' },
            { label: 'Low Risk', percentage: 70, count: '15,095', color: '#28a745', value: '' }
        ]);
    }
    
    // eNPS Donut Chart
    const enpsDonut = document.getElementById('enpsDonut');
    if (enpsDonut) {
        createDonutChart('enpsDonut', [
            { value: 42, color: '#28a745' }, // Promoters
            { value: 33, color: '#ffc107' }, // Passives
            { value: 25, color: '#dc3545' }  // Detractors
        ]);
    }
    
    // Comment Sentiment Donut Chart (Overview Dashboard)
    const commentSentimentDonut = document.getElementById('commentSentimentDonut');
    if (commentSentimentDonut) {
        createDonutChart('commentSentimentDonut', [
            { value: 6943, color: '#28a745' }, // Positive
            { value: 3212, color: '#ffc107' }, // Neutral
            { value: 4876, color: '#dc3545' }  // Negative
        ]);
    }
}

// ==================== Export to Global Scope ====================
window.chartsJS = {
    createDonutChart,
    createEnpsDonutChart,
    createCircularProgress,
    createBarChart,
    createStackedBarChart,
    createColumnChart,
    createSentimentLegend,
    initializeCharts
};

// Auto-initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCharts);
