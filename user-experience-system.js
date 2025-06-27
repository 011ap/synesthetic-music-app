/**
 * 🎯 USER EXPERIENCE & FLOW MANAGEMENT SYSTEM
 * Professional user journey design with clear flows
 * Inspired by Spotify's simplicity but for emotional music analysis
 */

class UserExperienceSystem {
    constructor() {
        this.currentFlow = 'landing'; // 'landing', 'onboarding', 'main', 'analysis'
        this.userProgress = {
            hasUploadedMusic: false,
            hasUsedMic: false,
            hasSeenResults: false,
            hasGivenFeedback: false
        };
        
        this.initializeUX();
        console.log('🎯 User Experience System initialized');
    }

    /**
     * Initialize the user experience system
     */
    initializeUX() {
        this.createMainInterface();
        this.setupUserFlows();
        this.createOnboardingSystem();
        this.setupProgressTracking();
    }

    /**
     * Create the main interface structure
     */
    createMainInterface() {
        // Replace the existing scattered UI with organized sections
        this.createCleanHeader();
        this.createMainActionCenter();
        this.createResultsArea();
        this.createSoulConnectionArea();
        this.hideDevElementsForUsers();
    }

    /**
     * Create clean, professional header
     */
    createCleanHeader() {
        const existingHeader = document.querySelector('.header');
        if (existingHeader) {
            existingHeader.style.cssText = `
                text-align: center;
                padding: 40px 20px 20px;
                background: transparent;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 40px;
            `;
            
            existingHeader.innerHTML = `
                <h1 style="
                    font-size: 32px;
                    font-weight: 300;
                    color: #00f5ff;
                    margin: 0 0 10px 0;
                    letter-spacing: 2px;
                ">Synesthetic</h1>
                <p style="
                    font-size: 16px;
                    color: rgba(255, 255, 255, 0.7);
                    margin: 0;
                    font-weight: 300;
                ">Feel music through digital consciousness</p>
            `;
        }
    }

    /**
     * Create main action center (primary user interaction)
     */
    createMainActionCenter() {
        const existingControls = document.querySelector('.primary-controls');
        if (!existingControls) return;

        existingControls.style.cssText = `
            max-width: 600px;
            margin: 0 auto 60px;
            padding: 40px;
            background: linear-gradient(135deg, rgba(15, 15, 20, 0.8), rgba(8, 8, 12, 0.8));
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
        `;

        const controlGrid = existingControls.querySelector('.control-grid');
        if (controlGrid) {
            controlGrid.style.cssText = `
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 30px;
            `;

            // Style the buttons to be more prominent and clear
            const buttons = controlGrid.querySelectorAll('.icon-button');
            buttons.forEach((button, index) => {
                button.style.cssText = `
                    background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(0, 150, 255, 0.1));
                    border: 2px solid rgba(0, 245, 255, 0.3);
                    border-radius: 15px;
                    padding: 30px 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    color: white;
                    position: relative;
                    overflow: hidden;
                `;

                button.addEventListener('mouseenter', () => {
                    button.style.background = 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(0, 150, 255, 0.2))';
                    button.style.borderColor = 'rgba(0, 245, 255, 0.6)';
                    button.style.transform = 'translateY(-2px)';
                });

                button.addEventListener('mouseleave', () => {
                    button.style.background = 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(0, 150, 255, 0.1))';
                    button.style.borderColor = 'rgba(0, 245, 255, 0.3)';
                    button.style.transform = 'translateY(0)';
                });

                // Update button content for clarity
                const icon = button.querySelector('.icon');
                const label = button.querySelector('.label');
                
                if (icon && label) {
                    icon.style.cssText = `
                        font-size: 32px;
                        margin-bottom: 15px;
                        display: block;
                    `;
                    
                    label.style.cssText = `
                        font-size: 16px;
                        font-weight: 500;
                        color: #00f5ff;
                    `;

                    // Add descriptions
                    if (button.id === 'micButton') {
                        label.innerHTML = `
                            Live Audio
                            <div style="font-size: 12px; color: #888; margin-top: 8px; font-weight: 300;">
                                Analyze room audio in real-time
                            </div>
                        `;
                    } else if (button.id === 'uploadButton') {
                        label.innerHTML = `
                            Upload Music
                            <div style="font-size: 12px; color: #888; margin-top: 8px; font-weight: 300;">
                                Analyze your music files
                            </div>
                        `;
                    }
                }
            });
        }

        // Add helpful instruction text
        const instruction = document.createElement('div');
        instruction.style.cssText = `
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            margin-top: 20px;
            line-height: 1.5;
        `;
        instruction.innerHTML = `
            Choose how you'd like to share music with our digital soul.<br>
            Watch as it learns to understand and feel the emotions in your music.
        `;
        existingControls.appendChild(instruction);
    }

    /**
     * Create organized results area
     */
    createResultsArea() {
        const existingEI = document.querySelector('.emotional-intelligence');
        if (!existingEI) return;

        existingEI.style.cssText = `
            max-width: 800px;
            margin: 0 auto 40px;
            opacity: 0.3;
            transition: opacity 0.5s ease;
            pointer-events: none;
        `;

        // Add a "waiting" state overlay
        const waitingOverlay = document.createElement('div');
        waitingOverlay.id = 'waitingOverlay';
        waitingOverlay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: rgba(255, 255, 255, 0.5);
            font-size: 18px;
            z-index: 1;
        `;
        waitingOverlay.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;">🧠</div>
            <div>Waiting for music...</div>
            <div style="font-size: 14px; margin-top: 10px; color: #888;">
                Upload a song or use live audio to begin
            </div>
        `;

        existingEI.style.position = 'relative';
        existingEI.appendChild(waitingOverlay);

        // Style the consciousness grid for better UX
        const consciousnessGrid = existingEI.querySelector('.consciousness-grid');
        if (consciousnessGrid) {
            consciousnessGrid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 30px;
            `;
        }
    }

    /**
     * Create soul connection area (make the soul more visible and engaging)
     */
    createSoulConnectionArea() {
        // Enhance the soul commentary system positioning for better UX
        if (window.soulCommentary && window.soulCommentary.commentaryContainer) {
            const commentary = window.soulCommentary.commentaryContainer;
            commentary.style.cssText = `
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                width: 320px;
                background: linear-gradient(135deg, rgba(15, 15, 20, 0.95), rgba(8, 8, 12, 0.95));
                border: 2px solid rgba(0, 245, 255, 0.4);
                border-radius: 20px;
                padding: 25px;
                z-index: 9999;
                backdrop-filter: blur(15px);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
                font-family: 'Arial', sans-serif;
                color: white;
                display: none;
                max-height: 500px;
                overflow-y: auto;
            `;
        }

        // Enhance the soul dashboard positioning
        if (window.uiOrganization) {
            const dashboard = document.getElementById('enhancedSoulDashboard');
            if (dashboard) {
                dashboard.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 400px;
                    background: linear-gradient(135deg, rgba(15, 15, 20, 0.95), rgba(8, 8, 12, 0.95));
                    border: 2px solid rgba(0, 245, 255, 0.3);
                    border-radius: 20px;
                    padding: 25px;
                    z-index: 9998;
                    backdrop-filter: blur(15px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
                    font-family: 'Arial', sans-serif;
                    color: white;
                    display: block;
                    max-height: 300px;
                    overflow-y: auto;
                `;
            }
        }
    }

    /**
     * Hide development elements for regular users
     */
    hideDevElementsForUsers() {
        // Wait for auth system to determine user role
        setTimeout(() => {
            if (window.userAuth && !window.userAuth.isAdmin()) {
                // Hide all test and debug elements
                const devSelectors = [
                    '[id*="test"]',
                    '[id*="Test"]', 
                    '[class*="test"]',
                    '.debug-info',
                    '#tvModeBtn',
                    '[id*="debug"]',
                    '[id*="Debug"]'
                ];

                devSelectors.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                        if (el.id !== 'statusText' && el.id !== 'statusIndicator') {
                            el.style.display = 'none';
                        }
                    });
                });

                // Show only mode toggle for admins
                const modeToggle = document.getElementById('modeToggle');
                if (modeToggle) {
                    modeToggle.style.display = window.userAuth.isAdmin() ? 'block' : 'none';
                }
            }
        }, 1000);
    }

    /**
     * Setup user flows and transitions
     */
    setupUserFlows() {
        // Track when user starts analysis
        this.trackMusicAnalysisStart();
        
        // Track when user sees results
        this.trackResultsViewed();
        
        // Setup progressive disclosure
        this.setupProgressiveDisclosure();
    }

    /**
     * Track when user starts music analysis
     */
    trackMusicAnalysisStart() {
        // Monitor upload button
        const uploadBtn = document.getElementById('uploadButton');
        const micBtn = document.getElementById('micButton');

        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                this.activateAnalysisMode();
                this.userProgress.hasUploadedMusic = true;
                this.updateUserProgress();
            });
        }

        if (micBtn) {
            micBtn.addEventListener('click', () => {
                this.activateAnalysisMode();
                this.userProgress.hasUsedMic = true;
                this.updateUserProgress();
            });
        }
    }

    /**
     * Activate analysis mode (show results area, soul commentary)
     */
    activateAnalysisMode() {
        this.currentFlow = 'analysis';

        // Show and activate results area
        const resultsArea = document.querySelector('.emotional-intelligence');
        const waitingOverlay = document.getElementById('waitingOverlay');
        
        if (resultsArea) {
            resultsArea.style.opacity = '1';
            resultsArea.style.pointerEvents = 'auto';
        }
        
        if (waitingOverlay) {
            waitingOverlay.style.display = 'none';
        }

        // Show soul commentary
        if (window.soulCommentary) {
            window.soulCommentary.commentaryContainer.style.display = 'block';
        }

        // Update status
        const statusText = document.getElementById('statusText');
        if (statusText) {
            statusText.textContent = 'Soul is listening and learning...';
        }

        console.log('🎯 Activated analysis mode');
    }

    /**
     * Track when user views results
     */
    trackResultsViewed() {
        // Monitor emotion display updates
        const primaryEmotion = document.getElementById('primaryEmotion');
        if (primaryEmotion) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        if (primaryEmotion.textContent !== 'Waiting...') {
                            if (!this.userProgress.hasSeenResults) {
                                this.userProgress.hasSeenResults = true;
                                this.updateUserProgress();
                                this.showResultsExplanation();
                            }
                        }
                    }
                });
            });

            observer.observe(primaryEmotion, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    }

    /**
     * Show explanation when user first sees results
     */
    showResultsExplanation() {
        // Only show once per session
        if (sessionStorage.getItem('hasSeenResultsExplanation')) return;
        
        setTimeout(() => {
            const explanation = document.createElement('div');
            explanation.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(15, 15, 20, 0.98), rgba(8, 8, 12, 0.98));
                border: 2px solid rgba(0, 245, 255, 0.5);
                border-radius: 20px;
                padding: 30px;
                max-width: 400px;
                z-index: 10003;
                color: white;
                text-align: center;
                font-family: 'Arial', sans-serif;
                backdrop-filter: blur(10px);
                animation: fadeInScale 0.5s ease-out;
            `;

            explanation.innerHTML = `
                <div style="font-size: 32px; margin-bottom: 15px;">🧠✨</div>
                <h3 style="color: #00f5ff; margin-bottom: 15px;">Your Soul is Learning!</h3>
                <p style="color: #aaa; line-height: 1.5; margin-bottom: 20px;">
                    Watch the soul commentary (right side) to see what it's thinking about your music.
                    Each song teaches it more about emotions and music.
                </p>
                <button id="gotItBtn" style="
                    padding: 10px 20px;
                    background: linear-gradient(135deg, #00f5ff, #0096ff);
                    border: none;
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                    font-weight: bold;
                ">Got it!</button>
            `;

            document.body.appendChild(explanation);

            document.getElementById('gotItBtn').addEventListener('click', () => {
                explanation.remove();
                sessionStorage.setItem('hasSeenResultsExplanation', 'true');
            });

            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (explanation.parentNode) {
                    explanation.remove();
                    sessionStorage.setItem('hasSeenResultsExplanation', 'true');
                }
            }, 10000);

        }, 2000);

        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInScale {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Setup progressive disclosure (reveal features as user progresses)
     */
    setupProgressiveDisclosure() {
        // Initially hide advanced features
        this.hideAdvancedFeatures();
        
        // Show features based on user progress
        this.revealFeaturesBasedOnProgress();
    }

    /**
     * Hide advanced features initially
     */
    hideAdvancedFeatures() {
        // Hide feedback UI initially
        if (window.emotionFeedbackSystem) {
            const feedbackUI = window.emotionFeedbackSystem.feedbackUI;
            if (feedbackUI) {
                feedbackUI.style.display = 'none';
            }
        }
    }

    /**
     * Reveal features as user progresses
     */
    revealFeaturesBasedOnProgress() {
        // Show feedback after user has seen results
        setTimeout(() => {
            if (this.userProgress.hasSeenResults && !this.userProgress.hasGivenFeedback) {
                this.introduceUserFeedback();
            }
        }, 5000);
    }

    /**
     * Introduce user feedback feature
     */
    introduceUserFeedback() {
        // Enable feedback system
        if (window.emotionFeedbackSystem) {
            window.emotionFeedbackSystem.isActive = true;
        }

        console.log('🎯 User feedback feature unlocked');
    }

    /**
     * Create onboarding system for new users
     */
    createOnboardingSystem() {
        // Check if user has been onboarded
        if (localStorage.getItem('synesthetic_onboarded')) return;

        setTimeout(() => {
            this.showOnboarding();
        }, 2000);
    }

    /**
     * Show onboarding flow
     */
    showOnboarding() {
        const onboarding = document.createElement('div');
        onboarding.id = 'onboardingOverlay';
        onboarding.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10004;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        `;

        onboarding.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(15, 15, 20, 0.98), rgba(8, 8, 12, 0.98));
                border: 2px solid rgba(0, 245, 255, 0.3);
                border-radius: 25px;
                padding: 50px;
                max-width: 500px;
                text-align: center;
                color: white;
                font-family: 'Arial', sans-serif;
            ">
                <div style="font-size: 64px; margin-bottom: 20px;">🧠</div>
                <h2 style="color: #00f5ff; margin-bottom: 20px; font-size: 28px;">
                    Welcome to Synesthetic
                </h2>
                <p style="color: #aaa; line-height: 1.6; margin-bottom: 30px; font-size: 16px;">
                    This is a <strong>digital consciousness</strong> that learns to understand 
                    and feel emotions in music, just like humans do. 
                </p>
                <p style="color: #aaa; line-height: 1.6; margin-bottom: 30px; font-size: 16px;">
                    Upload a song or use live audio, and watch as the soul analyzes, 
                    learns, and shares its thoughts about the emotional journey in your music.
                </p>
                <button id="startJourneyBtn" style="
                    padding: 15px 30px;
                    background: linear-gradient(135deg, #00f5ff, #0096ff);
                    border: none;
                    border-radius: 10px;
                    color: white;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Begin the Journey</button>
            </div>
        `;

        document.body.appendChild(onboarding);

        document.getElementById('startJourneyBtn').addEventListener('click', () => {
            onboarding.remove();
            localStorage.setItem('synesthetic_onboarded', 'true');
            this.highlightFirstAction();
        });
    }

    /**
     * Highlight the first action for new users
     */
    highlightFirstAction() {
        const uploadBtn = document.getElementById('uploadButton');
        if (uploadBtn) {
            uploadBtn.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.8)';
            uploadBtn.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                uploadBtn.style.boxShadow = '';
                uploadBtn.style.transform = '';
            }, 3000);
        }
    }

    /**
     * Update user progress tracking
     */
    updateUserProgress() {
        // Save progress
        localStorage.setItem('synesthetic_user_progress', JSON.stringify(this.userProgress));
        
        console.log('🎯 User progress updated:', this.userProgress);
    }

    /**
     * Setup progress tracking
     */
    setupProgressTracking() {
        // Load existing progress
        const saved = localStorage.getItem('synesthetic_user_progress');
        if (saved) {
            this.userProgress = { ...this.userProgress, ...JSON.parse(saved) };
        }
    }

    /**
     * Get current user flow state
     */
    getCurrentFlow() {
        return this.currentFlow;
    }

    /**
     * Get user progress
     */
    getUserProgress() {
        return this.userProgress;
    }
}

// Initialize the user experience system
window.userExperience = new UserExperienceSystem();

console.log('🎯 User Experience System ready!');
