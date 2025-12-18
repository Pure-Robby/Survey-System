// Report Viewer - Generate Cover Slide from URL Parameters

document.addEventListener('DOMContentLoaded', function() {
    initializeReportViewer();
    initializeButtons();
});

function initializeReportViewer() {
    const params = new URLSearchParams(window.location.search);
    const reportName = params.get('reportName') || 'Untitled Report';
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const slideContainer = document.getElementById('slide-container');
    if (slideContainer) {
        slideContainer.innerHTML = createCoverSlide(reportName, currentDate) + createWipSlide();
    }
    
    updatePageTitle(reportName);
    updatePreviewTitle(reportName);
}

function initializeButtons() {
    const closeBtn = document.getElementById('close-btn');
    const exportPptBtn = document.getElementById('export-ppt-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            window.close();
        });
    }
    
    if (exportPptBtn) {
        exportPptBtn.addEventListener('click', function() {
            alert('PowerPoint export functionality coming soon!');
        });
    }
    
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            alert('PDF export functionality coming soon!');
        });
    }
}

function createCoverSlide(reportName, date) {
    return `
        <div class="slide slide-title">
            <div class="title-content">
                <!--<h1 class="survey-name mb-4">Sanlam 2026 Culture Measurement</h1>-->
                <h2 class="text-end">${escapeHtml(reportName)}</h2>
                <p class="date text-end">${date}</p>
            </div>
        </div>
    `;
}

function updatePageTitle(reportName) {
    document.title = `${reportName} - Report Viewer`;
}

function updatePreviewTitle(reportName) {
    const previewTitle = document.getElementById('preview-title');
    if (previewTitle) {
        previewTitle.textContent = reportName;
    }
}

function createWipSlide() {
    return `
        <div class="slide slide-wip">
            <div class="wip-content">
                <h2>This is a work in progress</h2>
            </div>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
