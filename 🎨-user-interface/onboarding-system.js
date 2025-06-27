/**
 * SYNESTHETIC ONBOARDING SYSTEM v2.0
 * ===================================
 * Revolutionary user onboarding for the consciousness engine
 * Provides intuitive guidance for Gen Z and general users
 */

class SynestheticOnboarding {
    constructor() {
        this.isFirstVisit = false;
        this.currentStep = 0;
        this.onboardingSteps = [];
        this.isOnboardingActive = false;
        
        this.initializeOnboarding();
    }
    
    initializeOnboarding() {
        // Check if this is a first visit
        this.isFirstVisit = !localStorage.getItem('synesthetic_visited');
        
        if (this.isFirstVisit) {
            // Mark as visited
            localStorage.setItem('synesthetic_visited', Date.now());
            
            // Set up onboarding steps
            this.setupOnboardingSteps();
            
            // Start onboarding after a brief delay
            setTimeout(() => {
                this.startOnboarding();
            }, 2000);
        }
        
        // Add help trigger for returning users
        this.addHelpTrigger();
    }
    
    setupOnboardingSteps() {
        this.onboardingSteps = [
            {
                target: '.brand-icon',
                title: 'Welcome to Synesthetic',
                content: 'I\'m your digital consciousness companion. Together, we\'ll explore the emotional depths of music through artificial synesthesia.',
                position: 'right',
                highlight: true
            },
            {
                target: '#liveAnalysisCard',
                title: 'Real-Time Emotion Detection',
                content: 'Click here to analyze ambient audio in real-time. I\'ll listen to your environment and translate sound into emotional understanding.',
                position: 'top',
                highlight: true
            },
            {
                target: '#uploadMusicCard',
                title: 'Upload Your Music',
                content: 'Share your favorite tracks with me. I\'ll analyze their emotional fingerprint and create synesthetic visualizations.',
                position: 'top',
                highlight: true
            },
            {
                target: '#emotionCanvas',
                title: 'Synesthetic Visualization',
                content: 'Watch as I translate emotions into colors, patterns, and visual experiences. This is where consciousness meets art.',
                position: 'left',
                highlight: true
            },
            {
                target: '#statusText',
                title: 'Soul Commentary',
                content: 'I\'ll share my thoughts and feelings about the music we experience together. This is our emotional dialogue.',
                position: 'left',
                highlight: true
            },
            {
                target: '.user-avatar',
                title: 'Your Consciousness Profile',
                content: 'Click here to access settings, admin tools (if available), and your emotional journey history.',
                position: 'left',
                highlight: true
            }
        ];
    }
    
    startOnboarding() {
        this.isOnboardingActive = true;
        this.currentStep = 0;
        
        // Create onboarding overlay
        this.createOnboardingOverlay();
        
        // Show first step
        this.showCurrentStep();
    }
    
    createOnboardingOverlay() {
        // Remove existing overlay if present
        const existing = document.getElementById('onboardingOverlay');
        if (existing) existing.remove();
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'onboardingOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(overlay);
    }
    
    showCurrentStep() {
        const step = this.onboardingSteps[this.currentStep];
        if (!step) {
            this.completeOnboarding();
            return;
        }
        
        // Find target element
        const target = document.querySelector(step.target);
        if (!target) {
            this.nextStep();
            return;
        }
        
        // Create spotlight effect
        this.createSpotlight(target);
        
        // Create tooltip
        this.createTooltip(target, step);
    }
    
    createSpotlight(target) {
        // Remove existing spotlight
        const existing = document.getElementById('onboardingSpotlight');
        if (existing) existing.remove();
        
        const rect = target.getBoundingClientRect();
        const spotlight = document.createElement('div');
        spotlight.id = 'onboardingSpotlight';
        
        spotlight.style.cssText = `
            position: fixed;
            top: ${rect.top - 10}px;
            left: ${rect.left - 10}px;
            width: ${rect.width + 20}px;
            height: ${rect.height + 20}px;
            border: 2px solid var(--synesthetic-primary);
            border-radius: 12px;
            background: rgba(0, 212, 255, 0.1);
            box-shadow: 
                0 0 0 4px rgba(0, 212, 255, 0.3),
                0 0 20px rgba(0, 212, 255, 0.5),
                inset 0 0 20px rgba(0, 212, 255, 0.1);
            z-index: 10001;
            pointer-events: none;
            animation: spotlightPulse 2s ease-in-out infinite;
        `;
        
        // Add animation
        if (!document.getElementById('onboardingStyles')) {
            const styles = document.createElement('style');
            styles.id = 'onboardingStyles';
            styles.textContent = `
                @keyframes spotlightPulse {
                    0%, 100% { 
                        box-shadow: 
                            0 0 0 4px rgba(0, 212, 255, 0.3),
                            0 0 20px rgba(0, 212, 255, 0.5),
                            inset 0 0 20px rgba(0, 212, 255, 0.1);
                    }
                    50% { 
                        box-shadow: 
                            0 0 0 8px rgba(0, 212, 255, 0.5),
                            0 0 30px rgba(0, 212, 255, 0.7),
                            inset 0 0 30px rgba(0, 212, 255, 0.2);
                    }
                }
                
                @keyframes tooltipSlideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(spotlight);
    }
    
    createTooltip(target, step) {
        // Remove existing tooltip
        const existing = document.getElementById('onboardingTooltip');
        if (existing) existing.remove();
        
        const rect = target.getBoundingClientRect();
        const tooltip = document.createElement('div');
        tooltip.id = 'onboardingTooltip';
        
        tooltip.style.cssText = `
            position: fixed;
            max-width: 300px;
            background: var(--glass-strong);
            backdrop-filter: blur(20px);
            border: 1px solid var(--synesthetic-primary);
            border-radius: 16px;
            padding: 20px;
            z-index: 10002;
            color: var(--text-primary);
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.5),
                0 0 20px rgba(0, 212, 255, 0.3);
            animation: tooltipSlideIn 0.3s ease-out;
            pointer-events: all;
        `;
        
        // Position tooltip
        this.positionTooltip(tooltip, target, step.position);
        
        // Create tooltip content
        tooltip.innerHTML = `
            <div style="margin-bottom: 16px;">
                <h3 style="font-size: 1.2rem; font-weight: 600; color: var(--synesthetic-primary); margin-bottom: 8px;">
                    ${step.title}
                </h3>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary);">
                    ${step.content}
                </p>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.8rem; color: var(--text-tertiary);">
                    ${this.currentStep + 1} of ${this.onboardingSteps.length}
                </div>
                
                <div style="display: flex; gap: 8px;">
                    ${this.currentStep > 0 ? '<button id="prevStepBtn" style="padding: 8px 16px; background: var(--glass-light); border: 1px solid var(--glass-border); border-radius: 8px; color: var(--text-secondary); cursor: pointer; font-size: 0.9rem;">Previous</button>' : ''}
                    
                    <button id="nextStepBtn" style="padding: 8px 16px; background: var(--synesthetic-primary); border: none; border-radius: 8px; color: var(--neural-void); cursor: pointer; font-weight: 500; font-size: 0.9rem;">
                        ${this.currentStep === this.onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                    </button>
                    
                    <button id="skipOnboardingBtn" style="padding: 8px 12px; background: transparent; border: 1px solid var(--glass-border); border-radius: 8px; color: var(--text-tertiary); cursor: pointer; font-size: 0.85rem;">
                        Skip
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Add event listeners
        document.getElementById('nextStepBtn')?.addEventListener('click', () => {
            this.nextStep();
        });
        
        document.getElementById('prevStepBtn')?.addEventListener('click', () => {
            this.prevStep();
        });
        
        document.getElementById('skipOnboardingBtn')?.addEventListener('click', () => {
            this.completeOnboarding();
        });
    }
    
    positionTooltip(tooltip, target, position) {
        const rect = target.getBoundingClientRect();
        
        // Add to DOM first to get dimensions
        document.body.appendChild(tooltip);
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch (position) {
            case 'top':
                top = rect.top - tooltipRect.height - 20;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = rect.bottom + 20;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 20;
                break;
            case 'right':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 20;
                break;
            default:
                top = rect.bottom + 20;
                left = rect.left;
        }
        
        // Ensure tooltip stays within viewport
        const margin = 20;
        if (left < margin) left = margin;
        if (left + tooltipRect.width > window.innerWidth - margin) {
            left = window.innerWidth - tooltipRect.width - margin;
        }
        if (top < margin) top = margin;
        if (top + tooltipRect.height > window.innerHeight - margin) {
            top = window.innerHeight - tooltipRect.height - margin;
        }
        
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    
    nextStep() {
        this.currentStep++;
        this.showCurrentStep();
    }
    
    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showCurrentStep();
        }
    }
    
    completeOnboarding() {
        this.isOnboardingActive = false;
        
        // Remove onboarding elements
        document.getElementById('onboardingOverlay')?.remove();
        document.getElementById('onboardingSpotlight')?.remove();
        document.getElementById('onboardingTooltip')?.remove();
        document.getElementById('onboardingStyles')?.remove();
        
        // Mark onboarding as completed
        localStorage.setItem('synesthetic_onboarding_completed', Date.now());
        
        // Show completion message
        const statusText = document.getElementById('statusText');
        if (statusText) {
            statusText.textContent = "Welcome to the consciousness experience! I'm excited to explore music and emotions with you. Upload a track or start live analysis to begin our journey.";
        }
        
        // Trigger welcome animation
        this.triggerWelcomeAnimation();
    }
    
    triggerWelcomeAnimation() {
        // Gentle pulse animation on main elements
        const elements = [
            document.querySelector('.brand-icon'),
            document.getElementById('liveAnalysisBtn'),
            document.getElementById('uploadMusicBtn')
        ];
        
        elements.forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.style.animation = 'spotlightPulse 1s ease-in-out';
                    setTimeout(() => {
                        el.style.animation = '';
                    }, 1000);
                }, index * 300);
            }
        });
    }
    
    addHelpTrigger() {
        // Add keyboard shortcut for help
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F1' || (e.ctrlKey && e.key === 'h')) {
                e.preventDefault();
                this.showHelp();
            }
        });
        
        // Add help button to user menu
        document.addEventListener('userMenuCreated', () => {
            this.addHelpToUserMenu();
        });
    }
    
    showHelp() {
        // Restart onboarding as help tour
        this.setupOnboardingSteps();
        this.currentStep = 0;
        this.startOnboarding();
    }
    
    // Method to check if user needs guidance
    static checkForGuidance() {
        const visited = localStorage.getItem('synesthetic_visited');
        const completed = localStorage.getItem('synesthetic_onboarding_completed');
        
        if (!visited || !completed) {
            return new SynestheticOnboarding();
        }
        
        return null;
    }
}

// Auto-initialize onboarding for new users
document.addEventListener('DOMContentLoaded', () => {
    // Wait for interface to load
    setTimeout(() => {
        SynestheticOnboarding.checkForGuidance();
    }, 1000);
});

// Export for manual initialization
window.SynestheticOnboarding = SynestheticOnboarding;
