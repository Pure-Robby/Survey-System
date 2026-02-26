// Sanlam Staff Culture Survey - JavaScript v23Jan2026
class PulseCultureSurvey {
    constructor() {
        this.currentPage = 0; // Start at landing page (0)
        this.totalPages = 7; // 7 survey pages
        this.responses = {};
        this.maxScore = 5; // 5-point scale
        
        this.dimensions = {
            business: [1, 2, 3, 4],
            values: [5, 6, 7, 8],
            experience: [9, 10, 11, 12],
            leadership: [13, 14, 15, 16]
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        
        // Check for URL parameter to jump directly to results
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('results') === 'true' || urlParams.get('dashboard') === 'true') {
            // Fill with sample data if needed, then show dashboard
            this.loadSavedProgress();
            // If no saved responses, populate with sample data for testing
            if (Object.keys(this.responses).length === 0) {
                this.populateSampleData();
            }
            this.showDashboard();
            return;
        }
        
        this.loadSavedProgress();
        this.updateProgressIndicator();
    }
    
    populateSampleData() {
        // Populate sample responses for testing/demo purposes
        for (let i = 1; i <= 20; i++) {
            if (i <= 16) {
                // Likert scale questions (1-5)
                this.responses[`q${i}`] = Math.floor(Math.random() * 3) + 3; // Random 3-5
            } else if (i === 17 || i === 18) {
                // Yes/No questions
                this.responses[`q${i}`] = Math.random() > 0.5 ? 'yes' : 'no';
            } else if (i === 19) {
                // eNPS (0-10)
                this.responses[`q${i}`] = Math.floor(Math.random() * 11);
            } else if (i === 20) {
                // Open-ended feedback
                this.responses[`q${i}`] = 'Sample feedback response for testing.';
            }
        }
    }

    setupEventListeners() {
        // Landing page start button
        document.getElementById('startSurvey')?.addEventListener('click', () => this.startSurvey());
        
        // Navigation buttons
        document.getElementById('nextPage1')?.addEventListener('click', () => this.nextPage());
        document.getElementById('nextPage2')?.addEventListener('click', () => this.nextPage());
        document.getElementById('nextPage3')?.addEventListener('click', () => this.nextPage());
        document.getElementById('nextPage4')?.addEventListener('click', () => this.nextPage());
        document.getElementById('nextPage5')?.addEventListener('click', () => this.nextPage());
        document.getElementById('nextPage6')?.addEventListener('click', () => this.nextPage());
        document.getElementById('nextPage7')?.addEventListener('click', () => this.nextPage());
        
        document.getElementById('prevPage2')?.addEventListener('click', () => this.prevPage());
        document.getElementById('prevPage3')?.addEventListener('click', () => this.prevPage());
        document.getElementById('prevPage4')?.addEventListener('click', () => this.prevPage());
        document.getElementById('prevPage5')?.addEventListener('click', () => this.prevPage());
        document.getElementById('prevPage6')?.addEventListener('click', () => this.prevPage());
        document.getElementById('prevPage7')?.addEventListener('click', () => this.prevPage());
        
        // Dashboard buttons
        document.getElementById('downloadResults')?.addEventListener('click', () => this.downloadResults());
        
        // Form inputs - save progress on change
        const form = document.getElementById('cultureSurvey');
        if (form) {
            form.addEventListener('change', () => {
                this.saveProgress();
                this.updateProgressPercentage(); // Update percentage when questions are answered
                this.updateFlightRiskReasonsVisibility(); // Check if reasons should be shown
            });
        }
    }

    updateFlightRiskReasonsVisibility() {
        const q17 = document.querySelector('input[name="q17"]:checked');
        const q18 = document.querySelector('input[name="q18"]:checked');
        const reasonsContainer = document.getElementById('flightRiskReasonsContainer');
        
        if (reasonsContainer) {
            if (q17 && q18 && q17.value === 'yes' && q18.value === 'yes') {
                reasonsContainer.style.display = 'block';
            } else {
                reasonsContainer.style.display = 'none';
                // Clear selections when hidden
                const checkboxes = reasonsContainer.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => checkbox.checked = false);
            }
        }
    }

    startSurvey() {
        this.showPage(1); // Go to first survey page
    }

    nextPage() {
        if (this.validateCurrentPage()) {
            this.saveProgress();
            
            // If we're on page 7 (Feedback), go directly to results
            if (this.currentPage === 7) {
                this.submitSurvey();
            } else if (this.currentPage < this.totalPages) {
                this.showPage(this.currentPage + 1);
            }
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        } else if (this.currentPage === 1) {
            this.showPage(0); // Go back to landing page
        }
    }

    showPage(pageNumber) {
        // Hide current page
        if (this.currentPage === 0) {
            // Hide landing page
            const landingPage = document.getElementById('landingPage');
            if (landingPage) {
                landingPage.classList.remove('active');
            }
        } else {
            // Hide survey page
            const currentPageElement = document.getElementById(`page${this.currentPage}`);
            if (currentPageElement) {
                currentPageElement.classList.remove('active');
            }
        }

        // Show new page
        this.currentPage = pageNumber;
        if (pageNumber === 0) {
            // Show landing page
            const landingPage = document.getElementById('landingPage');
            if (landingPage) {
                landingPage.classList.add('active');
            }
        } else {
            // Show survey page
            const newPageElement = document.getElementById(`page${this.currentPage}`);
            if (newPageElement) {
                newPageElement.classList.add('active');
            }
        }

        // Update Flight Risk reasons visibility if on page 5
        if (this.currentPage === 5) {
            this.updateFlightRiskReasonsVisibility();
        }

        this.updateProgressIndicator();

        // Scroll after progress UI has been shown/hidden by updateProgressIndicator()
        if (pageNumber === 0) {
            document.getElementById('landingPage')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            const progressInfoContainer = document.querySelector('.progress-info-container');
            if (progressInfoContainer) {
                progressInfoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                document.getElementById(`page${this.currentPage}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    validateCurrentPage() {
        // Landing page doesn't need validation
        if (this.currentPage === 0) {
            return true;
        }

        // Page 7: open-ended feedback
        if (this.currentPage === 7) {
            const feedback = document.querySelector('textarea[name="q20"]');
            if (!feedback || !feedback.value.trim()) {
                alert('Please answer the feedback question before proceeding.');
                return false;
            }
            return true;
        }

        const pageQuestions = this.getQuestionsForPage(this.currentPage);
        const missingQuestions = [];

        pageQuestions.forEach(questionNum => {
            const radios = document.querySelectorAll(`input[name="q${questionNum}"]`);
            const isAnswered = Array.from(radios).some(radio => radio.checked);
            
            if (!isAnswered) {
                missingQuestions.push(questionNum);
            }
        });

        // For Flight Risk page (page 5), check if reasons are required
        if (this.currentPage === 5) {
            const q17 = document.querySelector('input[name="q17"]:checked');
            const q18 = document.querySelector('input[name="q18"]:checked');
            
            if (q17 && q18 && q17.value === 'yes' && q18.value === 'yes') {
                const reasonsChecked = document.querySelectorAll('input[name="flightRiskReasons"]:checked');
                if (reasonsChecked.length === 0) {
                    alert('Please select at least one reason for your answers.');
                    return false;
                }
            }
        }

        if (missingQuestions.length > 0) {
            alert(`Please answer question(s) ${missingQuestions.join(', ')} before proceeding.`);
            return false;
        }

        return true;
    }

    getQuestionsForPage(pageNumber) {
        switch (pageNumber) {
            case 1: return [1, 2, 3, 4];
            case 2: return [5, 6, 7, 8];
            case 3: return [9, 10, 11, 12];
            case 4: return [13, 14, 15, 16];
            case 5: return [17, 18]; // Flight Risk
            case 6: return [19]; // eNPS
            case 7: return [20]; // Feedback (open-ended)
            default: return [];
        }
    }

    updateProgressIndicator() {
        const steps = document.querySelectorAll('.progress-step');
        
        // Hide progress for landing page
        const progressContainer = document.querySelector('.progress-container');
        const progressInfoContainer = document.querySelector('.progress-info-container');
        
        if (this.currentPage === 0) {
            if (progressContainer) progressContainer.style.display = 'none';
            if (progressInfoContainer) progressInfoContainer.style.display = 'none';
            return;
        } else {
            if (progressContainer) progressContainer.style.display = 'block';
            if (progressInfoContainer) progressInfoContainer.style.display = 'block';
        }
        
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentPage || (stepNumber <= 7 && this.currentPage === 8)) {
                step.classList.add('completed');
            } else if (stepNumber === this.currentPage) {
                step.classList.add('active');
            }
        });
        
        // Update progress info
        this.updateProgressInfo();
        
        // Update progress percentage
        this.updateProgressPercentage();
    }

    updateProgressInfo() {
        const progressQuestions = document.getElementById('progressQuestions');
        const progressSection = document.getElementById('progressSection');
        
        // Skip progress info for landing page
        if (this.currentPage === 0) {
            return;
        }
        
        if (this.currentPage <= 7) {
            const pageQuestions = this.getQuestionsForPage(this.currentPage);
            const startQuestion = Math.min(...pageQuestions);
            const endQuestion = Math.max(...pageQuestions);
            
            if (progressQuestions) {
                progressQuestions.textContent = `Questions ${startQuestion} - ${endQuestion} of 20`;
            }
            
            const sectionNames = {
                1: 'Business Outcomes',
                2: 'Shared Values', 
                3: 'Employee Experience',
                4: 'Leadership Enablement',
                5: 'Flight Risk',
                6: 'eNPS',
                7: 'Feedback'
            };
            
            if (progressSection) {
                progressSection.textContent = sectionNames[this.currentPage] || '';
            }
        } else {
            // Dashboard page
            if (progressQuestions) {
                progressQuestions.textContent = 'Survey Complete';
            }
            if (progressSection) {
                progressSection.textContent = 'Results Dashboard';
            }
        }
    }

    updateProgressPercentage() {
        // Skip progress percentage for landing page
        if (this.currentPage === 0) {
            return;
        }

        const totalPages = 8; // 7 survey pages + 1 dashboard page
        let progressPercentage;
        
        if (this.currentPage <= 7) {
            // Calculate percentage based on current page and answered questions
            const basePercentage = ((this.currentPage - 1) / totalPages) * 100;
            const currentPageQuestions = this.getQuestionsForPage(this.currentPage);
            const answeredQuestions = currentPageQuestions.filter(questionNum => {
                const radios = document.querySelectorAll(`input[name="q${questionNum}"]`);
                if (radios.length > 0) {
                    return Array.from(radios).some(radio => radio.checked);
                }
                // Special case: open-ended feedback (q20)
                if (questionNum === 20) {
                    const t = document.querySelector('textarea[name="q20"]');
                    return !!(t && t.value.trim());
                }
                return false;
            });
            
            const pageProgressPercentage = (answeredQuestions.length / currentPageQuestions.length) * (100 / totalPages);
            progressPercentage = basePercentage + pageProgressPercentage;
        } else {
            // Dashboard page - 100% complete
            progressPercentage = 100;
        }
        
        // Update the progress bar
        const progressFill = document.getElementById('progressPercentageFill');
        
        console.log('Updating progress percentage:', progressPercentage, 'Current page:', this.currentPage);
        
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
            console.log('Progress bar updated successfully');
        } else {
            console.error('Progress fill element not found');
        }
    }

    submitSurvey() {
        if (!this.validateCurrentPage()) {
            return;
        }

        this.collectResponses();
        this.showDashboard();
    }

    collectResponses() {
        this.responses = {};
        this.comments = {};
        
        // Collect all responses (1-16 questions - Likert scale)
        for (let i = 1; i <= 16; i++) {
            const selectedRadio = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedRadio) {
                this.responses[`q${i}`] = parseInt(selectedRadio.value);
            }
            
            // Collect comments
            const commentTextarea = document.querySelector(`textarea[name="q${i}_comment"]`);
            if (commentTextarea && commentTextarea.value.trim()) {
                this.comments[`q${i}_comment`] = commentTextarea.value.trim();
            }
        }

        // Collect Flight Risk questions (17-18) - Yes/No
        for (let i = 17; i <= 18; i++) {
            const selectedRadio = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedRadio) {
                this.responses[`q${i}`] = selectedRadio.value; // "yes" or "no"
            }
        }

        // Collect Flight Risk reasons (if both q17 and q18 are "yes")
        const flightRiskReasons = [];
        const checkboxes = document.querySelectorAll('input[name="flightRiskReasons"]:checked');
        checkboxes.forEach(checkbox => {
            flightRiskReasons.push(checkbox.value);
        });
        if (flightRiskReasons.length > 0) {
            this.responses['flightRiskReasons'] = flightRiskReasons;
        }

        // Collect eNPS question (19) - 1-10 scale
        const enpsRadio = document.querySelector(`input[name="q19"]:checked`);
        if (enpsRadio) {
            this.responses['q19'] = parseInt(enpsRadio.value);
        }

        // Collect open-ended feedback (20)
        const feedbackTextarea = document.querySelector('textarea[name="q20"]');
        if (feedbackTextarea && feedbackTextarea.value.trim()) {
            this.responses['q20'] = feedbackTextarea.value.trim();
        }

        this.saveProgress();
    }

    collectCurrentResponses() {
        const responses = {};
        
        // Collect Likert scale questions (1-16)
        for (let i = 1; i <= 16; i++) {
            const selectedRadio = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedRadio) {
                responses[`q${i}`] = parseInt(selectedRadio.value);
            }
        }

        // Collect Flight Risk questions (17-18)
        for (let i = 17; i <= 18; i++) {
            const selectedRadio = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedRadio) {
                responses[`q${i}`] = selectedRadio.value;
            }
        }

        // Collect eNPS question (19)
        const enpsRadio = document.querySelector(`input[name="q19"]:checked`);
        if (enpsRadio) {
            responses['q19'] = parseInt(enpsRadio.value);
        }

        // Collect open-ended feedback (20)
        const feedbackTextarea = document.querySelector('textarea[name="q20"]');
        if (feedbackTextarea && feedbackTextarea.value.trim()) {
            responses['q20'] = feedbackTextarea.value.trim();
        }
        
        return responses;
    }

    showDashboard() {
        // Hide survey pages
        document.querySelectorAll('.survey-page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show dashboard
        const dashboard = document.getElementById('dashboard');
            if (dashboard) {
                dashboard.classList.add('active');
                this.currentPage = 8; // Dashboard page (after 7 survey pages)
                this.updateProgressIndicator();
            this.generateResults();
            const progressInfoContainer = document.querySelector('.progress-info-container');
            if (progressInfoContainer) {
                progressInfoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    generateResults() {
        this.calculateScores();
        this.createVisualIndicators();
        this.generateInsights();
        this.renderLeverDetailsOverview();
        this.renderRetentionEnpsSummary();
    }

    calculateScores() {
        const dimensionScores = {};
        
        // Calculate dimension scores
        Object.keys(this.dimensions).forEach(dimension => {
            const questions = this.dimensions[dimension];
            let total = 0;
            let count = 0;
            
            questions.forEach(questionNum => {
                const response = this.responses[`q${questionNum}`];
                if (response !== undefined) {
                    // No reverse-scored questions in new structure
                    total += response;
                    count++;
                }
            });
            
            dimensionScores[dimension] = count > 0 ? (total / count) : 0;
        });

        // Calculate overall score
        const overallScore = Object.values(dimensionScores).reduce((sum, score) => sum + score, 0) / Object.keys(dimensionScores).length;

        // Update score displays (results summary shows percentages)
        const overallPct = (overallScore / this.maxScore) * 100;
        const businessPct = (dimensionScores.business / this.maxScore) * 100;
        const valuesPct = (dimensionScores.values / this.maxScore) * 100;
        const experiencePct = (dimensionScores.experience / this.maxScore) * 100;
        const leadershipPct = (dimensionScores.leadership / this.maxScore) * 100;

        document.getElementById('overallScore').textContent = `${Math.round(overallPct)}%`;
        document.getElementById('businessScore').textContent = `${Math.round(businessPct)}%`;
        document.getElementById('valuesScore').textContent = `${Math.round(valuesPct)}%`;
        document.getElementById('experienceScore').textContent = `${Math.round(experiencePct)}%`;
        document.getElementById('leadershipScore').textContent = `${Math.round(leadershipPct)}%`;

        this.dimensionScores = dimensionScores;
        this.overallScore = overallScore;
    }

    createVisualIndicators() {
        this.createCultureGauge();
        this.createResponseQualityBars();
        this.createDimensionMeters();
    }

    createCultureGauge() {
        const percentage = (this.overallScore / this.maxScore) * 100;
        const gaugeFill = document.getElementById('gaugeFill');
        const gaugeText = document.getElementById('gaugeText');
        const gaugeStatus = document.getElementById('gaugeStatus');
        
        if (gaugeFill && gaugeText && gaugeStatus) {
            // Indicator card uses percentage (to match results summary)
            gaugeText.textContent = `${Math.round(percentage)}%`;
            
            // Animate the gauge fill after a short delay
            setTimeout(() => {
                const degrees = (percentage / 100) * 360;
                
                // Create the conic gradient based on the score
                let fillColor = '#0072CE'; // Default Sanlam blue
                if (percentage >= 80) {
                    fillColor = '#4A90E2'; // Light blue for excellent
                } else if (percentage >= 65) {
                    fillColor = '#0072CE'; // Sanlam blue for good
                } else if (percentage >= 50) {
                    fillColor = '#FFC107'; // Yellow for developing
                } else if (percentage >= 30) {
                    fillColor = '#FF9800'; // Orange for needs work
                } else {
                    fillColor = '#F44336'; // Red for critical
                }
                
                gaugeFill.style.background = `conic-gradient(
                    ${fillColor} 0deg ${degrees}deg,
                    #E0E0E0 ${degrees}deg 360deg
                )`;
                
                // Update status text based on score
                if (percentage >= 80) {
                    gaugeStatus.textContent = "Excellent Culture";
                    gaugeStatus.style.color = "#4A90E2";
                } else if (percentage >= 65) {
                    gaugeStatus.textContent = "Strong Culture";
                    gaugeStatus.style.color = "#0072CE";
                } else if (percentage >= 50) {
                    gaugeStatus.textContent = "Developing Culture";
                    gaugeStatus.style.color = "#FFC107";
                } else if (percentage >= 30) {
                    gaugeStatus.textContent = "Needs Improvement";
                    gaugeStatus.style.color = "#FF9800";
                } else {
                    gaugeStatus.textContent = "Critical - Needs Attention";
                    gaugeStatus.style.color = "#F44336";
                }
            }, 500);
        }
    }

    createResponseQualityBars() {
        const responseCounts = Array(3).fill(0); // Negative, Neutral, Positive
        
        Object.values(this.responses).forEach(response => {
            if (response <= 2) {
                responseCounts[0]++; // Negative (1-2)
            } else if (response === 3) {
                responseCounts[1]++; // Neutral (3)
            } else {
                responseCounts[2]++; // Positive (4-5)
            }
        });
        
        const totalResponses = Object.keys(this.responses).length;
        const maxCount = Math.max(...responseCounts);
        
        // Animate bars
        setTimeout(() => {
            responseCounts.forEach((count, index) => {
                const barFill = document.getElementById(`bar${index + 1}`);
                if (barFill) {
                    const height = maxCount > 0 ? (count / maxCount) * 80 : 8;
                    barFill.style.height = `${Math.max(height, 8)}px`;
                }
            });
        }, 800);
    }

    createDimensionMeters() {
        const dimensions = ['business', 'values', 'experience', 'leadership'];
        
        setTimeout(() => {
            dimensions.forEach(dimension => {
                const meter = document.getElementById(`${dimension}Meter`);
                const display = document.getElementById(`${dimension}Display`);
                
                if (meter && display) {
                    const score = this.dimensionScores[dimension];
                    const percentage = (score / this.maxScore) * 100;
                    
                    meter.style.width = `${percentage}%`;
                    // Indicator card uses percentage (to match results summary)
                    display.textContent = `${Math.round(percentage)}%`;
                    
                    // Color coding based on score
                    if (score >= 4.5) {
                        meter.style.background = "linear-gradient(90deg, #0072CE 0%, #4A90E2 100%)";
                    } else if (score >= 3.5) {
                        meter.style.background = "linear-gradient(90deg, #4A90E2 0%, #0072CE 100%)";
                    } else if (score >= 2.5) {
                        meter.style.background = "linear-gradient(90deg, #d97706 0%, #f59e0b 100%)";
                    } else {
                        meter.style.background = "linear-gradient(90deg, #dc2626 0%, #ef4444 100%)";
                    }
                }
            });
        }, 1000);
    }

    generateInsights() {
        this.generatePersonalInsights();
        this.generateRecommendations();
    }

    generatePersonalInsights() {
        const insights = [];
        
        // Overall response pattern analysis
        const responseValues = Object.values(this.responses);
        const averageResponse = responseValues.reduce((sum, val) => sum + val, 0) / responseValues.length;
        const responseVariance = this.calculateVariance(responseValues);
        
        // Insight 1: Response consistency
        if (responseVariance < 0.5) {
            insights.push({
                title: "Consistent Response Pattern",
                icon: "psychology",
                message: "Your responses show high consistency across all dimensions, indicating clear and stable perceptions of your organizational culture. This suggests you have well-formed opinions about your workplace."
            });
        } else if (responseVariance > 2.0) {
            insights.push({
                title: "Varied Experience",
                icon: "insights",
                message: "Your responses vary significantly across different areas, suggesting you experience different aspects of organizational culture quite differently. This is valuable feedback showing nuanced perceptions."
            });
        } else {
            insights.push({
                title: "Balanced Perspective",
                icon: "balance",
                message: "Your responses show a balanced view across different cultural dimensions, indicating you experience both positive and challenging aspects of your workplace culture."
            });
        }

        // Insight 2: Overall optimism level
        if (averageResponse >= 4.5) {
            insights.push({
                title: "Positive Workplace Perspective",
                icon: "sentiment_very_satisfied",
                message: "You maintain a predominantly positive view of your workplace culture. Your responses indicate strong satisfaction with most organizational aspects, which contributes to a healthy work environment."
            });
        } else if (averageResponse <= 2.5) {
            insights.push({
                title: "Critical Culture Assessment",
                icon: "sentiment_dissatisfied",
                message: "Your responses indicate significant concerns about various aspects of organizational culture. Your critical perspective highlights important areas that may need attention and improvement."
            });
        } else {
            insights.push({
                title: "Realistic Culture Assessment",
                icon: "sentiment_neutral",
                message: "Your responses reflect a realistic view of your workplace culture, recognizing both strengths and areas for improvement. This balanced perspective is valuable for constructive change."
            });
        }

        // Insight 3: Strongest or weakest dimension
        const sortedDimensions = Object.entries(this.dimensionScores).sort((a, b) => b[1] - a[1]);
        const strongestDimension = sortedDimensions[0];
        const weakestDimension = sortedDimensions[sortedDimensions.length - 1];
        
        if (strongestDimension[1] >= 4.5) {
            const dimensionInfo = this.getDimensionInfo(strongestDimension[0]);
            insights.push({
                title: `${dimensionInfo.name} Champion`,
                icon: dimensionInfo.icon,
                message: `You rate ${dimensionInfo.name.toLowerCase()} very highly (${strongestDimension[1].toFixed(1)}/5). This suggests you're experiencing the best of what your organization offers in this area and could be a positive influence on others.`
            });
        } else if (weakestDimension[1] <= 2.5) {
            const dimensionInfo = this.getDimensionInfo(weakestDimension[0]);
            insights.push({
                title: `${dimensionInfo.name} Growth Area`,
                icon: "trending_up",
                message: `Your ${dimensionInfo.name.toLowerCase()} score indicates room for improvement (${weakestDimension[1].toFixed(1)}/5). This area represents your biggest opportunity for enhanced workplace experience.`
            });
        } else {
            // Response pattern insight as fallback
            const stronglyPositive = responseValues.filter(r => r >= 5).length;
            const stronglyNegative = responseValues.filter(r => r <= 2).length;
            
            if (stronglyPositive > stronglyNegative) {
                insights.push({
                    title: "Culture Advocate",
                    icon: "volunteer_activism",
                    message: "You tend to strongly agree with positive culture statements, suggesting you could be a valuable culture advocate within your organization. Your positive energy likely influences team dynamics."
                });
            } else if (stronglyNegative > stronglyPositive) {
                insights.push({
                    title: "Change Catalyst",
                    icon: "auto_fix_high",
                    message: "Your critical assessment of current culture could position you as a catalyst for positive change. Your insights can help leadership understand areas needing improvement."
                });
            } else {
                insights.push({
                    title: "Thoughtful Observer",
                    icon: "visibility",
                    message: "Your measured responses suggest you're a thoughtful observer of workplace culture, carefully considering each aspect rather than making sweeping judgments."
                });
            }
        }

        this.displayPersonalInsights(insights);
    }

    generateRecommendations() {
        const recommendations = [];
        
        // Get sorted dimensions (lowest to highest scores)
        const sortedDimensions = Object.entries(this.dimensionScores).sort((a, b) => a[1] - b[1]);
        
        // Recommendation 1: Focus on lowest scoring dimension
        const lowestDimension = sortedDimensions[0];
        const dimensionInfo = this.getDimensionInfo(lowestDimension[0]);
        const recommendation = this.getDimensionRecommendation(lowestDimension[0], lowestDimension[1]);
        
        if (recommendation) {
            recommendations.push({
                ...recommendation,
                priority: lowestDimension[1] < 2.5 ? 'high-priority' : lowestDimension[1] < 3.5 ? 'medium' : 'low',
                dimension: dimensionInfo.name
            });
        }

        // Recommendation 2: Overall culture improvement or leadership
        if (this.overallScore < 3.0) {
            recommendations.push({
                title: "Comprehensive Culture Assessment",
                icon: "assessment",
                message: "Consider having an open conversation with your manager or HR about your culture experience. Your feedback could help identify systemic issues and improvement opportunities.",
                priority: 'high-priority',
                actions: ["Schedule a 1:1 with your manager", "Share specific examples of concerns", "Suggest concrete improvements"]
            });
        } else if (this.overallScore >= 4.5) {
            recommendations.push({
                title: "Culture Leadership Opportunity",
                icon: "groups",
                message: "Your positive culture experience positions you well to mentor others and contribute to culture initiatives. Consider taking on leadership roles in culture-building activities.",
                priority: 'success',
                actions: ["Volunteer for culture committees", "Mentor new team members", "Share best practices"]
            });
        } else {
            recommendations.push({
                title: "Selective Culture Improvement",
                icon: "tune",
                message: "Focus on specific areas where you see potential for improvement while leveraging the positive aspects of your current culture experience.",
                priority: 'medium',
                actions: ["Identify 2-3 priority areas", "Engage with colleagues on solutions", "Participate in culture surveys"]
            });
        }

        // Recommendation 3: Personal development based on response patterns
        const responseValues = Object.values(this.responses);
        const responseVariance = this.calculateVariance(responseValues);
        
        if (responseVariance > 2.0) {
            recommendations.push({
                title: "Targeted Improvement Focus",
                icon: "track_changes",
                message: "Your varied responses suggest focusing on specific areas rather than broad changes. Identify your top 2-3 concerns and work on targeted improvements.",
                priority: 'medium',
                actions: ["Prioritize your main concerns", "Create specific action plans", "Track progress over time"]
            });
        } else if (this.overallScore >= 4.0) {
            recommendations.push({
                title: "Peer Support & Mentoring",
                icon: "people",
                message: "Your positive culture experience makes you well-positioned to support colleagues who may be struggling. Consider becoming a culture ambassador.",
                priority: 'success',
                actions: ["Offer support to new team members", "Share positive experiences", "Be a culture role model"]
            });
        } else {
            // Get second lowest dimension for additional focus
            const secondLowestDimension = sortedDimensions[1];
            const secondDimensionInfo = this.getDimensionInfo(secondLowestDimension[0]);
            const secondRecommendation = this.getDimensionRecommendation(secondLowestDimension[0], secondLowestDimension[1]);
            
            if (secondRecommendation) {
                recommendations.push({
                    ...secondRecommendation,
                    title: `Secondary Focus: ${secondRecommendation.title}`,
                    priority: secondLowestDimension[1] < 3.0 ? 'medium' : 'low',
                    dimension: secondDimensionInfo.name
                });
            } else {
                recommendations.push({
                    title: "Professional Development",
                    icon: "school",
                    message: "Invest in your professional growth to improve your overall workplace experience and build resilience in challenging cultural environments.",
                    priority: 'medium',
                    actions: ["Seek learning opportunities", "Build new skills", "Expand your network"]
                });
            }
        }

        this.displayRecommendations(recommendations);
    }

    getDimensionInfo(dimension) {
        const dimensionMap = {
            business: { name: "Business Outcomes", icon: "trending_up" },
            values: { name: "Shared Values", icon: "stars" },
            experience: { name: "Employee Experience", icon: "favorite" },
            leadership: { name: "Leadership Enablement", icon: "people" }
        };
        return dimensionMap[dimension];
    }

    getDimensionRecommendation(dimension, score) {
        const recommendations = {
            business: {
                title: "Drive Business Impact",
                icon: "trending_up",
                message: "Focus on understanding how your work contributes to business outcomes. Seek opportunities to align your efforts with organizational goals and measure impact.",
                actions: ["Connect daily work to business goals", "Ask for performance metrics and KPIs", "Suggest improvements to business processes"]
            },
            values: {
                title: "Strengthen Values Alignment",
                icon: "stars",
                message: "Deepen your understanding of organizational values and find ways to embody them in your daily work. Engage with values-based initiatives and discussions.",
                actions: ["Learn more about company values", "Participate in values-driven projects", "Share examples of values in action"]
            },
            experience: {
                title: "Enhance Work Experience",
                icon: "favorite",
                message: "Work on improving your overall workplace experience. This includes seeking better resources, work-life balance, recognition, and development opportunities.",
                actions: ["Request necessary tools and resources", "Discuss workload and balance with manager", "Seek recognition and development opportunities"]
            },
            leadership: {
                title: "Engage with Leadership",
                icon: "people",
                message: "Build stronger relationships with leadership and seek more support and empowerment. Communicate your needs and provide feedback on leadership effectiveness.",
                actions: ["Schedule regular check-ins with manager", "Provide constructive feedback to leadership", "Seek mentorship and empowerment opportunities"]
            }
        };
        
        return recommendations[dimension];
    }

    calculateVariance(values) {
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    }

    displayPersonalInsights(insights) {
        const container = document.getElementById('personalInsightsContainer');
        if (!container) return;

        container.innerHTML = insights.map(insight => `
            <div class="insight-item">
                <h4>
                    <span class="material-icons">${insight.icon}</span>
                    ${insight.title}
                </h4>
                <p>${insight.message}</p>
            </div>
        `).join('');
    }

    displayRecommendations(recommendations) {
        const container = document.getElementById('recommendationsContainer');
        if (!container) return;

        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item ${rec.priority}">
                <h4>
                    <span class="material-icons">${rec.icon}</span>
                    ${rec.title}
                </h4>
                <p>${rec.message}</p>
                ${rec.actions ? `
                    <ul style="margin-top: 12px; padding-left: 20px; color: var(--on-surface-variant);">
                        ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');
    }

    async downloadResults() {
        try {
            // Get the dashboard element
            const dashboard = document.getElementById('dashboard');
            if (!dashboard) {
                console.error('Dashboard element not found');
                return;
            }

            // Show loading state
            const downloadBtn = document.getElementById('downloadResults');
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<span class="material-icons">hourglass_empty</span>Generating PDF...';
            downloadBtn.disabled = true;

            // Create a temporary container with enhanced styles for PDF
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '0';
            tempContainer.style.width = dashboard.offsetWidth + 'px';
            tempContainer.style.backgroundColor = '#FFFFFF';
            // Keep fonts consistent with the on-screen dashboard
            tempContainer.style.fontFamily = "'Roboto', Arial, sans-serif";
            tempContainer.classList.add('pdf-export');

            // Add PDF-only CSS overrides (stability + match on-screen styling)
            const pdfStyle = document.createElement('style');
            pdfStyle.textContent = `
                .pdf-export { box-sizing: border-box; padding: 12px; }
                .pdf-export * { box-sizing: border-box; }

                /* Prevent faint PDF captures (disable animations/transforms) */
                .pdf-export *, .pdf-export *::before, .pdf-export *::after {
                    animation: none !important;
                    transition: none !important;
                }
                .pdf-export .dashboard,
                .pdf-export .dashboard * {
                    opacity: 1 !important;
                    transform: none !important;
                }

                /* Header */
                .pdf-header { display:flex; align-items:center; gap:16px; margin-bottom: 18px; }
                .pdf-header img { height: 40px; width: auto; object-fit: contain; }
                .pdf-header-title { font-size: 18px; font-weight: 600; color: #111827; }

                /* Make card borders/shadows visible in PDF */
                .pdf-export .md-card,
                .pdf-export .indicator-card,
                .pdf-export .score-card,
                .pdf-export .lever-detail-card,
                .pdf-export .insight-card {
                    box-shadow: 0 2px 10px rgba(0,0,0,0.10) !important;
                    border: 1px solid rgba(0,0,0,0.14) !important;
                }

                /* Ensure score card text stays white/light */
                .pdf-export .score-card,
                .pdf-export .score-card * {
                    color: #ffffff !important;
                }
                .pdf-export .score-card .score-value {
                    font-weight: 300 !important;
                }

                /* Replace color-mix green gradient with a static equivalent for html2canvas */
                .pdf-export .score-card:nth-child(4) {
                    background: linear-gradient(135deg, #4fc83c 0%, #378c2a 100%) !important;
                }
                .pdf-export .lever-detail-card:nth-child(3) .lever-detail-header {
                    background: linear-gradient(135deg, #4fc83c 0%, #378c2a 100%) !important;
                }

                /* Footer (reuse site footer styling basics) */
                .pdf-footer { margin-top: 22px; padding-top: 14px; border-top: 1px solid rgba(0,0,0,0.12); }
            `;
            tempContainer.appendChild(pdfStyle);
            
            // Build a PDF header with Sanlam logo (from frontend)
            const header = document.createElement('div');
            header.className = 'pdf-header';
            header.innerHTML = `
                <img src="sanlam-logo.png" alt="Sanlam Logo" />
                <div class="pdf-header-title">Sanlam Culture Survey Results</div>
            `;
            tempContainer.appendChild(header);

            // Clone dashboard content (but remove interactive actions)
            const dashboardClone = dashboard.cloneNode(true);
            dashboardClone.removeAttribute('id');
            // Avoid triggering fade-in animations on the cloned dashboard
            dashboardClone.classList.remove('active');
            dashboardClone.style.display = 'block';

            // Remove dashboard title + intro (PDF has its own header)
            dashboardClone.querySelector('.dashboard-title')?.remove();
            dashboardClone.querySelector('.dashboard-intro')?.remove();

            // Remove download button / action buttons from PDF
            dashboardClone.querySelector('#downloadResults')?.remove();
            dashboardClone.querySelector('.action-buttons')?.remove();

            tempContainer.appendChild(dashboardClone);

            // Append the same footer as the frontend (if present)
            const footer = document.querySelector('.survey-footer');
            if (footer) {
                const footerClone = footer.cloneNode(true);
                footerClone.classList.add('pdf-footer');
                // Ensure Pure Survey logo uses local copy for PDF reliability
                footerClone.querySelectorAll('img.footer-logo').forEach(img => {
                    img.setAttribute('src', 'pure-survey-logo.png');
                });
                tempContainer.appendChild(footerClone);
            }
            document.body.appendChild(tempContainer);

            // Enhance colors and contrast for PDF
            this.enhanceColorsForPDF(tempContainer);

            // Ensure web fonts (e.g. Roboto) are loaded before html2canvas snapshots
            if (document.fonts && document.fonts.ready) {
                await document.fonts.ready;
            }

            // Create canvas from enhanced container
            const canvas = await html2canvas(tempContainer, {
                scale: 3, // Increased scale for better quality
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#FFFFFF', // Pure white background
                logging: false,
                width: tempContainer.scrollWidth,
                height: tempContainer.scrollHeight,
                onclone: (clonedDoc) => {
                    // Additional color enhancements in cloned document
                    const clonedContainer = clonedDoc.querySelector('div');
                    if (clonedContainer) {
                        this.enhanceColorsForPDF(clonedContainer);
                    }
                }
            });

            // Remove temporary container
            document.body.removeChild(tempContainer);

            // Force opaque white background (PNG alpha can render "semi-transparent" in some PDF viewers)
            const enhancedCanvas = document.createElement('canvas');
            enhancedCanvas.width = canvas.width;
            enhancedCanvas.height = canvas.height;
            const enhancedCtx = enhancedCanvas.getContext('2d');
            enhancedCtx.fillStyle = '#FFFFFF';
            enhancedCtx.fillRect(0, 0, enhancedCanvas.width, enhancedCanvas.height);
            enhancedCtx.drawImage(canvas, 0, 0);

            // Create a SINGLE-PAGE PDF by sizing the page height to fit the full dashboard image.
            // This keeps everything on one page without downscaling.
            const marginMm = 5;
            const pageWidth = 210; // A4 width in mm (keep width consistent)
            const imgWidth = pageWidth - marginMm * 2;
            const imgHeight = (enhancedCanvas.height * imgWidth) / enhancedCanvas.width;
            const pageHeight = imgHeight + marginMm * 2; // custom height to fit

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [pageWidth, pageHeight],
                compress: false // Disable compression for better color quality
            });

            pdf.addImage(
                enhancedCanvas.toDataURL('image/jpeg', 1.0),
                'JPEG',
                marginMm,
                marginMm,
                imgWidth,
                imgHeight,
                undefined,
                'FAST'
            );

            // Download the PDF
            const timestamp = new Date().toISOString().split('T')[0];
            pdf.save(`sanlam-culture-survey-results-${timestamp}.pdf`);

            // Reset button
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('There was an error generating the PDF. Please try again.');
            
            // Reset button
            const downloadBtn = document.getElementById('downloadResults');
            downloadBtn.innerHTML = '<span class="material-icons">download</span>Download Results';
            downloadBtn.disabled = false;
        }
    }

    enhanceColorsForPDF(container) {
        // html2canvas cannot parse some modern CSS color functions (e.g. `color(srgb ...)`),
        // which can be produced by `color-mix(...)` in computed styles. Normalize to rgb/rgba
        // and strip gradients that may contain unsupported color functions.
        const colorCtx = document.createElement('canvas').getContext('2d');
        const normalizeColor = (value, fallback) => {
            if (!value || value === 'none') return fallback;
            // html2canvas error we saw: unsupported color function "color"
            // Canvas generally normalizes supported CSS colors into rgb/rgba strings.
            try {
                colorCtx.fillStyle = '#000';
                colorCtx.fillStyle = value;
                return colorCtx.fillStyle || fallback;
            } catch {
                return fallback;
            }
        };

        // Color mappings for enhanced visibility in PDF
        const colorMappings = {
            'var(--primary-color)': '#0072CE',
            'var(--primary-dark)': '#005A9F',
            'var(--primary-light)': '#4A90E2',
            'var(--color-pink)': '#D81B60',
            'var(--color-cyan)': '#00ACC1',
            'var(--color-teal)': '#00695C',
            'var(--color-green)': '#388E3C',
            'var(--color-orange)': '#F57C00',
            'var(--on-surface)': '#1A1A1A',
            'var(--on-surface-variant)': '#424242',
            'rgba(0,0,0,0.6)': '#424242',
            'rgba(0,0,0,0.54)': '#525252',
            'rgba(0,0,0,0.38)': '#757575'
        };

        // Apply enhanced styles to all elements
        const allElements = container.querySelectorAll('*');
        allElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);

            const hasUnsupportedColorFn = (value) =>
                typeof value === 'string' && (value.includes('color(') || value.includes('color-mix('));

            // Remove complex backgrounds/gradients that may include unsupported color functions
            const bgImage = computedStyle.backgroundImage;
            if (bgImage && bgImage !== 'none' && hasUnsupportedColorFn(bgImage)) {
                element.style.backgroundImage = 'none';
            }

            // Normalize any computed colors that use unsupported functions into rgb/rgba
            const normalizeIfNeeded = (prop, fallback) => {
                const v = computedStyle[prop];
                if (!v) return;
                if (hasUnsupportedColorFn(v)) {
                    element.style[prop] = normalizeColor(v, fallback);
                }
            };

            normalizeIfNeeded('color', '#1A1A1A');
            normalizeIfNeeded('backgroundColor', '#FFFFFF');
            normalizeIfNeeded('borderTopColor', '#E0E0E0');
            normalizeIfNeeded('borderRightColor', '#E0E0E0');
            normalizeIfNeeded('borderBottomColor', '#E0E0E0');
            normalizeIfNeeded('borderLeftColor', '#E0E0E0');

            // Aggressively strip other properties that html2canvas may parse and choke on in Chrome
            // (especially when color-mix() is converted to color(srgb ...) in computed styles)
            const stripIfBad = (cssProp, replacement = 'none') => {
                const v = computedStyle.getPropertyValue(cssProp);
                if (v && v !== 'none' && hasUnsupportedColorFn(v)) {
                    element.style.setProperty(cssProp, replacement);
                }
            };

            // Background shorthands / images
            stripIfBad('background', 'none');
            stripIfBad('background-image', 'none');

            // Shadows / effects
            stripIfBad('box-shadow', 'none');
            stripIfBad('text-shadow', 'none');
            stripIfBad('filter', 'none');

            // Border / outline shorthands (html2canvas reads these in some engines)
            stripIfBad('border', '1px solid #E0E0E0');
            stripIfBad('border-color', '#E0E0E0');
            stripIfBad('outline', 'none');
            stripIfBad('outline-color', '#E0E0E0');
            stripIfBad('text-decoration-color', '#1A1A1A');
            stripIfBad('caret-color', '#1A1A1A');
            stripIfBad('border-image-source', 'none');
            stripIfBad('mask-image', 'none');

            // SVG-ish paint properties (can surface on icon/graphics in some browsers)
            stripIfBad('fill', '#1A1A1A');
            stripIfBad('stroke', '#1A1A1A');
            stripIfBad('stop-color', '#1A1A1A');
            stripIfBad('-webkit-text-stroke-color', '#1A1A1A');
            
            // Enhance text colors
            if (computedStyle.color && computedStyle.color.includes('rgba')) {
                element.style.color = '#1A1A1A';
            }
            
            // Enhance background colors
            if (element.style.backgroundColor || computedStyle.backgroundColor) {
                const bgColor = element.style.backgroundColor || computedStyle.backgroundColor;
                Object.keys(colorMappings).forEach(cssVar => {
                    if (bgColor.includes(cssVar)) {
                        element.style.backgroundColor = colorMappings[cssVar];
                    }
                });
            }

            // Preserve on-screen styling for score values (PDF should match UI)
            // NOTE: previously forced blue + bold for PDF contrast, but that breaks branded cards.
            
            if (element.classList.contains('gauge-fill')) {
                element.style.backgroundColor = '#0072CE';
            }
            
            if (element.classList.contains('meter-fill')) {
                element.style.backgroundColor = '#0072CE';
            }
            
            if (element.classList.contains('bar-fill')) {
                element.style.backgroundColor = '#0072CE';
            }

            // Enhance dimension-specific colors
            if (element.hasAttribute('data-dimension')) {
                const dimension = element.getAttribute('data-dimension');
                const dimColors = {
                    'sentiment': '#E91E63',
                    'talent': '#00BCD4', 
                    'engagement': '#009688',
                    'psychSafety': '#FF9800'
                };
                
                const meterFill = element.querySelector('.meter-fill');
                if (meterFill && dimColors[dimension]) {
                    meterFill.style.backgroundColor = dimColors[dimension];
                }
                
                const icon = element.querySelector('.dimension-icon');
                if (icon && dimColors[dimension]) {
                    icon.style.backgroundColor = dimColors[dimension];
                }
            }
        });
    }

    enhanceCanvasColors(canvas) {
        // Create a new canvas for color enhancement
        const enhancedCanvas = document.createElement('canvas');
        enhancedCanvas.width = canvas.width;
        enhancedCanvas.height = canvas.height;
        
        const ctx = enhancedCanvas.getContext('2d');
        
        // Draw original canvas
        ctx.drawImage(canvas, 0, 0);
        
        // Get image data for color enhancement
        const imageData = ctx.getImageData(0, 0, enhancedCanvas.width, enhancedCanvas.height);
        const data = imageData.data;
        
        // Enhance colors by increasing contrast and saturation
        for (let i = 0; i < data.length; i += 4) {
            // Skip if pixel is white or near-white background
            if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
                continue;
            }
            
            // Increase contrast
            data[i] = Math.min(255, data[i] * 1.3);     // Red
            data[i + 1] = Math.min(255, data[i + 1] * 1.3); // Green  
            data[i + 2] = Math.min(255, data[i + 2] * 1.3); // Blue
            
            // Ensure minimum opacity for visibility
            if (data[i + 3] < 200) {
                data[i + 3] = Math.min(255, data[i + 3] * 1.5);
            }
        }
        
        // Put enhanced image data back
        ctx.putImageData(imageData, 0, 0);
        
        return enhancedCanvas;
    }

    generateResultsText() {
        const timestamp = new Date().toLocaleString();
        
        let results = `SANLAM CULTURE SURVEY RESULTS\n`;
        results += `Generated: ${timestamp}\n`;
        results += `${'='.repeat(50)}\n\n`;
        
        results += `OVERALL CULTURE SCORE: ${this.overallScore.toFixed(1)}/5.0\n\n`;
        
        results += `DIMENSION SCORES:\n`;
        results += `• Business Outcomes: ${this.dimensionScores.business.toFixed(1)}/5.0\n`;
        results += `• Shared Values: ${this.dimensionScores.values.toFixed(1)}/5.0\n`;
        results += `• Employee Experience: ${this.dimensionScores.experience.toFixed(1)}/5.0\n`;
        results += `• Leadership Enablement: ${this.dimensionScores.leadership.toFixed(1)}/5.0\n\n`;
        
        results += `DETAILED RESPONSES:\n`;
        for (let i = 1; i <= 16; i++) {
            const response = this.responses[`q${i}`];
            if (response !== undefined) {
                results += `Question ${i}: ${response}/5\n`;
            }
        }
        
        // Include comments if any were provided
        if (this.comments && Object.keys(this.comments).length > 0) {
            results += `\nCOMMENTS:\n`;
            Object.keys(this.comments).forEach(commentKey => {
                const questionNum = commentKey.replace('_comment', '').replace('q', '');
                results += `Question ${questionNum}: ${this.comments[commentKey]}\n`;
            });
        }
        
        results += `\n${'='.repeat(50)}\n`;
        results += `Survey completed using Sanlam Culture Survey\n`;
        results += `For more insights and analysis, please review the dashboard charts and recommendations.`;
        
        return results;
    }

    saveProgress() {
        // Collect current comments
        const currentComments = {};
        for (let i = 1; i <= 16; i++) {
            const commentTextarea = document.querySelector(`textarea[name="q${i}_comment"]`);
            if (commentTextarea && commentTextarea.value.trim()) {
                currentComments[`q${i}_comment`] = commentTextarea.value.trim();
            }
        }
        
        const progressData = {
            currentPage: this.currentPage,
            responses: this.collectCurrentResponses(),
            comments: currentComments,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('sanlamCultureSurveyProgress', JSON.stringify(progressData));
    }

    loadSavedProgress() {
        const savedData = localStorage.getItem('sanlamCultureSurveyProgress');
        
        if (savedData) {
            try {
                const progressData = JSON.parse(savedData);
                
                // Restore responses
                Object.keys(progressData.responses || {}).forEach(questionKey => {
                    if (questionKey === 'flightRiskReasons') {
                        // Restore flight risk reasons checkboxes
                        const reasons = progressData.responses[questionKey];
                        if (Array.isArray(reasons)) {
                            reasons.forEach(reason => {
                                const checkbox = document.querySelector(`input[name="flightRiskReasons"][value="${reason}"]`);
                                if (checkbox) {
                                    checkbox.checked = true;
                                }
                            });
                        }
                    } else {
                        const questionNum = questionKey.replace('q', '');
                        const value = progressData.responses[questionKey];
                        // Open-ended feedback (q20) is a textarea, not a radio input
                        if (questionNum === '20') {
                            const textarea = document.querySelector('textarea[name="q20"]');
                            if (textarea && typeof value === 'string') {
                                textarea.value = value;
                            }
                        } else {
                            const radio = document.querySelector(`input[name="q${questionNum}"][value="${value}"]`);
                            if (radio) {
                                radio.checked = true;
                            }
                        }
                    }
                });
                
                // Restore comments
                Object.keys(progressData.comments || {}).forEach(commentKey => {
                    const textarea = document.querySelector(`textarea[name="${commentKey}"]`);
                    if (textarea) {
                        textarea.value = progressData.comments[commentKey];
                    }
                });
                
                this.responses = progressData.responses || {};
                this.comments = progressData.comments || {};
                
                // Update Flight Risk reasons visibility after restoring
                this.updateFlightRiskReasonsVisibility();
            } catch (error) {
                console.warn('Failed to load saved progress:', error);
            }
        }
    }

    renderLeverDetailsOverview() {
        const container = document.getElementById('leverDetailsOverview');
        if (!container) return;

        container.innerHTML = '';

        // Mock lever details data - in production, this would come from API
        const leverDetailsData = {
            levers: [
                {
                    name: "Business Outcomes",
                    dimensions: [
                        { name: "Continuous Development", score: 85.0, statementCount: 3 },
                        { name: "Change Agility", score: 78.5, statementCount: 3 },
                        { name: "Productivity", score: 88.2, statementCount: 4 },
                        { name: "Customer Centricity", score: 81.8, statementCount: 5 }
                    ]
                },
                {
                    name: "Shared Values",
                    dimensions: [
                        { name: "Values", score: 72.3, statementCount: 2 },
                        { name: "Integrity", score: 68.5, statementCount: 2 },
                        { name: "Innovation", score: 65.8, statementCount: 3 },
                        { name: "Care", score: 70.2, statementCount: 4 },
                        { name: "Collaboration", score: 64.5, statementCount: 3 },
                        { name: "Trust & Psychological Safety", score: 62.8, statementCount: 5 },
                        { name: "Inclusion & Belonging", score: 69.5, statementCount: 2 }
                    ]
                },
                {
                    name: "Employee Experience",
                    dimensions: [
                        { name: "Engagement", score: 78.5, statementCount: 12 },
                        { name: "Team Effectiveness", score: 85.2, statementCount: 5 },
                        { name: "Wellness", score: 80.8, statementCount: 5 },
                        { name: "Development & Growth", score: 84.5, statementCount: 7 }
                    ]
                },
                {
                    name: "Leadership Enablement",
                    dimensions: [
                        { name: "Envisage Our Future", score: 76.4, statementCount: 2 },
                        { name: "Champion Sustainable Results", score: 79.8, statementCount: 2 },
                        { name: "Show Up and Inspire Excellence", score: 80.2, statementCount: 2 },
                        { name: "Win Together", score: 78.0, statementCount: 2 }
                    ]
                }
            ]
        };

        leverDetailsData.levers.forEach((lever) => {
            const leverCard = document.createElement('div');
            leverCard.className = 'lever-detail-card';
            
            // Add compact class if there are more than 4 dimensions
            if (lever.dimensions.length > 4) {
                leverCard.className += ' compact';
            }
            
            // Create dimension list items without click-through functionality
            const dimensionListHTML = lever.dimensions.map((dimension) => {
                return `
                    <li class="dimension-list-item">
                        <div class="dimension-info">
                            <div class="dimension-name-text">${dimension.name}</div>
                            <!--<div class="dimension-statements-badge">${dimension.statementCount} statement${dimension.statementCount !== 1 ? 's' : ''}</div>-->
                        </div>
                        <div class="dimension-score-badge">${dimension.score}%</div>
                    </li>
                `;
            }).join('');
            
            leverCard.innerHTML = `
                <div class="lever-detail-header">
                    <h3 class="text-start">${lever.name}</h3>
                </div>
                <div class="lever-detail-body">
                    <ul class="dimension-list">
                        ${dimensionListHTML}
                    </ul>
                </div>
            `;
            
            container.appendChild(leverCard);
        });
    }

    renderRetentionEnpsSummary() {
        const container = document.getElementById('retentionEnpsSummary');
        if (!container) return;

        const q17 = this.responses?.q17; // 'yes' | 'no'
        const q18 = this.responses?.q18; // 'yes' | 'no'
        const q19 = this.responses?.q19; // 0..10 number

        // --- Flight Risk ---
        const yesCount = [q17, q18].filter(v => v === 'yes').length;
        const flightRiskLevel = yesCount === 0 ? 'low' : yesCount === 1 ? 'medium' : 'high';
        const flightRiskLabel =
            flightRiskLevel === 'low'
                ? 'Low'
                : flightRiskLevel === 'medium'
                    ? 'Medium'
                    : 'High';

        const flightRiskHeadline =
            flightRiskLevel === 'low'
                ? '<span class="fw-normal">likelihood of leaving</span>'
                : flightRiskLevel === 'medium'
                    ? '<span class="fw-normal">likelihood of leaving</span>'
                    : '<span class="fw-normal">likelihood of leaving</span>';

        const flightItems = [
            { key: 'q17', text: 'I am actively searching for another job', value: q17 },
            { key: 'q18', text: 'I am planning to quit my job in the next 3 months', value: q18 },
        ];

        const flightRowsHtml = flightItems
            .map(item => {
                const isNo = item.value === 'no';
                const isYes = item.value === 'yes';
                const text = item.text;
                return `
                    <div class="retention-check-row">
                        <span class="answer-dot ${isNo ? 'no' : isYes ? 'yes' : 'unknown'}"></span>
                        <div>${text}</div>
                    </div>
                `;
            })
            .join('');

        const reasons = Array.isArray(this.responses?.flightRiskReasons) ? this.responses.flightRiskReasons : [];
        const showReasons = flightRiskLevel === 'high';
        const reasonLabelMap = {
            better_compensation: 'Better compensation',
            career_advancement: 'Career advancement opportunities',
            work_life_balance: 'Better work-life balance',
            company_culture: 'Company culture concerns',
            management_issues: 'Management or leadership issues',
            location_remote: 'Location or remote work preferences',
            job_security: 'Job security concerns',
            other: 'Other',
        };
        const reasonChipsHtml =
            showReasons && reasons.length > 0
                ? `
                    <div class="insight-divider"></div>
                    <div class="retention-body"><strong>Reasons selected:</strong></div>
                    <div class="reason-chips">
                        ${reasons.map(r => `<span class="reason-chip">${reasonLabelMap[r] || r}</span>`).join('')}
                    </div>
                `
                : '';

        // --- eNPS ---
        const enpsValue = Number.isFinite(q19) ? q19 : null;
        const enpsCategory =
            enpsValue === null
                ? 'Incomplete'
                : enpsValue <= 6
                    ? 'Detractor'
                    : enpsValue <= 8
                        ? 'Passive'
                        : 'Promoter';

        const enpsRagClass =
            enpsValue === null
                ? 'rag-neutral'
                : enpsValue <= 6
                    ? 'rag-red'
                    : enpsValue <= 8
                        ? 'rag-orange'
                        : 'rag-green';

        const knobPct = enpsValue === null ? 50 : Math.max(0, Math.min(100, (enpsValue / 10) * 100));

        container.innerHTML = `
            <div class="insight-card">
                <h3 class="card-title">Your Flight Risk Score</h3>
                <div class="card-divider"></div>

                <div class="retention-status">
                    <span class="status-dot ${flightRiskLevel}"></span>
                    <div><strong>${flightRiskLabel}</strong> ${flightRiskHeadline.replace(flightRiskLabel.toLowerCase(), '').trim()}</div>
                </div>

                <div class="card-divider"></div>

                <p class="retention-body">
                    Based on your responses to questions about staying with the organisation.
                </p>

                <div class="retention-checklist">
                    ${flightRowsHtml}
                </div>

               

                <div class="card-divider"></div>
                <div class="retention-footnote"><span class="fw-bold">Note:</span> This insight reflects intention, not certainty.</div>
            </div>

            <div class="insight-card">
                <h3 class="card-title">Your eNPS Score</h3>
                <div class="card-divider"></div>

                <div class="enps-score-wrap mb-2">
                    <div class="enps-score">${enpsValue === null ? '--' : enpsValue}</div>
                    <div class="enps-score-sub">/10</div>
                </div>

                <div class="text-center">
                    <div class="enps-pill ${enpsRagClass}">${enpsCategory}</div>
                </div>

                <div class="card-divider"></div>

                <p class="enps-desc">
                    This reflects how likely you are to recommend the organisation as a place to work.
                </p>

                <div class="enps-scale-wrap">
                    <div class="enps-track">
                        <div class="enps-ticks">
                            ${Array.from({ length: 11 }).map(() => '<span></span>').join('')}
                        </div>
                        <div class="enps-knob ${enpsRagClass}" style="--enps: ${enpsValue === null ? 5 : enpsValue};"></div>
                    </div>
                    <div class="enps-scale-labels">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize the survey when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PulseCultureSurvey();
}); 