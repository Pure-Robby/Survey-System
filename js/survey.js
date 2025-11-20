// TFG Survey System POC - Survey Navigation and Validation

// ==================== Survey State ====================
const surveyState = {
    currentPage: 1,
    totalPages: 4,
    answers: {},
    isValid: false
};

// ==================== Page Navigation ====================
function showPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('[data-page]');
    pages.forEach(page => page.classList.add('d-none'));
    
    // Show target page
    const targetPage = document.querySelector(`[data-page="${pageNumber}"]`);
    if (targetPage) {
        targetPage.classList.remove('d-none');
        surveyState.currentPage = pageNumber;
        
        // Update progress
        updateProgress();
        
        // Update button visibility
        updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

function nextPage() {
    if (validateCurrentPage()) {
        if (surveyState.currentPage < surveyState.totalPages) {
            showPage(surveyState.currentPage + 1);
        } else {
            // Submit survey
            submitSurvey();
        }
    }
}

function previousPage() {
    if (surveyState.currentPage > 1) {
        showPage(surveyState.currentPage - 1);
    }
}

// ==================== Progress Update ====================
function updateProgress() {
    const progressBar = document.getElementById('surveyProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        const percentage = (surveyState.currentPage / surveyState.totalPages) * 100;
        progressBar.style.width = percentage + '%';
    }
    
    if (progressText) {
        const totalQuestions = 27; // As per plan
        progressText.textContent = `Page ${surveyState.currentPage} of ${surveyState.totalPages} (${totalQuestions} Questions in total)`;
    }
}

// ==================== Navigation Buttons ====================
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.classList.toggle('d-none', surveyState.currentPage === 1);
    }
    
    if (nextBtn) {
        nextBtn.textContent = surveyState.currentPage === surveyState.totalPages ? 'SUBMIT' : 'NEXT';
    }
}

// ==================== Validation ====================
function validateCurrentPage() {
    const currentPageElement = document.querySelector(`[data-page="${surveyState.currentPage}"]`);
    if (!currentPageElement) return true;
    
    let isValid = true;
    const requiredInputs = currentPageElement.querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
        const errorElement = input.parentElement.querySelector('.invalid-feedback');
        
        if (input.type === 'radio') {
            const name = input.name;
            const groupChecked = currentPageElement.querySelector(`input[name="${name}"]:checked`);
            if (!groupChecked) {
                isValid = false;
                if (errorElement) {
                    errorElement.classList.remove('d-none');
                }
            } else {
                if (errorElement) {
                    errorElement.classList.add('d-none');
                }
            }
        } else if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
                if (errorElement) {
                    errorElement.classList.remove('d-none');
                }
            } else {
                input.classList.remove('is-invalid');
                if (errorElement) {
                    errorElement.classList.add('d-none');
                }
            }
        }
    });
    
    if (!isValid) {
        alert('Please answer all required questions before proceeding.');
    }
    
    return isValid;
}

// ==================== Likert Scale Selection ====================
function initLikertScale() {
    const likertButtons = document.querySelectorAll('.likert-button');
    
    likertButtons.forEach(button => {
        button.addEventListener('click', () => {
            const questionName = button.getAttribute('data-question');
            const value = button.getAttribute('data-value');
            
            // Remove selected class from all buttons in this question
            const questionButtons = document.querySelectorAll(`.likert-button[data-question="${questionName}"]`);
            questionButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            button.classList.add('selected');
            
            // Store answer
            surveyState.answers[questionName] = value;
            
            // Mark hidden input as filled (for validation)
            const hiddenInput = document.querySelector(`input[name="${questionName}"]`);
            if (hiddenInput) {
                hiddenInput.value = value;
            }
        });
    });
}

// ==================== eNPS Scale ====================
function initEnpsScale() {
    const enpsButtons = document.querySelectorAll('.enps-button');
    
    enpsButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all buttons
            enpsButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            button.classList.add('selected');
            
            // Store answer
            const value = button.getAttribute('data-value');
            surveyState.answers.enps = value;
            
            // Update hidden input
            const hiddenInput = document.querySelector('input[name="enps"]');
            if (hiddenInput) {
                hiddenInput.value = value;
            }
        });
    });
}

// ==================== Flight Risk Questions ====================
function initFlightRisk() {
    const flightRiskButtons = document.querySelectorAll('.flight-risk-button');
    
    flightRiskButtons.forEach(button => {
        button.addEventListener('click', () => {
            const questionName = button.getAttribute('data-question');
            const value = button.getAttribute('data-value');
            
            // Remove selected class from buttons in this question
            const questionButtons = document.querySelectorAll(`.flight-risk-button[data-question="${questionName}"]`);
            questionButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class
            button.classList.add('selected');
            
            // Store answer
            surveyState.answers[questionName] = value;
            
            // Update hidden input
            const hiddenInput = document.querySelector(`input[name="${questionName}"]`);
            if (hiddenInput) {
                hiddenInput.value = value;
            }
        });
    });
}

// ==================== Character Counter ====================
function initCharacterCounter() {
    const textareas = document.querySelectorAll('textarea[data-max-length]');
    
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('data-max-length'));
        const counterId = textarea.getAttribute('data-counter-id');
        const counter = document.getElementById(counterId);
        
        if (counter) {
            textarea.addEventListener('input', () => {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = remaining;
                
                if (remaining < 0) {
                    counter.classList.add('text-danger');
                    textarea.classList.add('is-invalid');
                } else {
                    counter.classList.remove('text-danger');
                    textarea.classList.remove('is-invalid');
                }
            });
        }
    });
}

// ==================== Feedback Toggle ====================
function toggleFeedback(questionId) {
    const feedbackBox = document.getElementById(`feedback-${questionId}`);
    if (feedbackBox) {
        feedbackBox.classList.toggle('d-none');
    }
}

// ==================== Submit Survey ====================
function submitSurvey() {
    if (validateCurrentPage()) {
        // POC: Redirect to completion page
        window.location.href = 'survey-complete.html';
    }
}

// ==================== Local Storage (Optional) ====================
function saveProgress() {
    localStorage.setItem('surveyProgress', JSON.stringify(surveyState));
}

function loadProgress() {
    const saved = localStorage.getItem('surveyProgress');
    if (saved) {
        const savedState = JSON.parse(saved);
        Object.assign(surveyState, savedState);
    }
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Likert scales
    initLikertScale();
    
    // Initialize eNPS scale
    initEnpsScale();
    
    // Initialize flight risk
    initFlightRisk();
    
    // Initialize character counters
    initCharacterCounter();
    
    // Set up navigation buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextPage);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', previousPage);
    }
    
    // Initialize first page
    showPage(1);
    
    // Load saved progress (optional)
    // loadProgress();
    
    // Auto-save progress on change (optional)
    // document.addEventListener('change', saveProgress);
});

// ==================== Export to Global Scope ====================
window.surveyJS = {
    nextPage,
    previousPage,
    toggleFeedback,
    submitSurvey
};

