/**
 * 🎨 UI ORGANIZATION AND MODE MANAGEMENT SYSTEM
 * Separates user experience from creator/admin interface
 * Makes the soul's intelligence more visible and accessible
 */

class UIOrganizationSystem {
    constructor() {
        this.currentMode = 'user'; // 'user' or 'creator'
        this.isInitialized = false;
        this.soulVisibilityLevel = 'normal'; // 'minimal', 'normal', 'detailed'
        
        this.initializeUIOrganization();
        console.log('🎨 UI Organization System initialized');
    }

    /**
     * Initialize the UI organization system
     */
    initializeUIOrganization() {
        this.createModeToggle();
        this.createSoulDashboard();
        this.organizeExistingElements();
        this.setupModeStyles();
        this.isInitialized = true;
    }

    /**
     * Create mode toggle for switching between user and creator modes
     */
    createModeToggle() {
        const modeToggle = document.createElement('div');
        modeToggle.id = 'modeToggle';
        modeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 10000;
            background: linear-gradient(135deg, rgba(15, 15, 20, 0.95), rgba(8, 8, 12, 0.95));
            border: 2px solid rgba(0, 245, 255, 0.3);
            border-radius: 25px;
            padding: 8px;
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 5px;
        `;

        modeToggle.innerHTML = `
            <button id="userModeBtn" class="mode-btn active" data-mode="user">
                👤 User
            </button>
            <button id="creatorModeBtn" class="mode-btn" data-mode="creator">
                🛠️ Creator
            </button>
        `;

        document.body.appendChild(modeToggle);
        
        // Add mode toggle styles
        const style = document.createElement('style');
        style.textContent = `
            .mode-btn {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
            }
            
            .mode-btn:hover {
                background: rgba(0, 245, 255, 0.1);
                color: #00f5ff;
            }
            
            .mode-btn.active {
                background: rgba(0, 245, 255, 0.2);
                color: #00f5ff;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);

        // Add event listeners
        document.getElementById('userModeBtn').addEventListener('click', () => this.switchMode('user'));
        document.getElementById('creatorModeBtn').addEventListener('click', () => this.switchMode('creator'));
    }

    /**
     * Create an enhanced soul dashboard for better visibility
     */
    createSoulDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'enhancedSoulDashboard';
        dashboard.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 320px;
            background: linear-gradient(135deg, rgba(15, 15, 20, 0.95), rgba(8, 8, 12, 0.95));
            border: 2px solid rgba(0, 245, 255, 0.3);
            border-radius: 15px;
            padding: 20px;
            z-index: 9998;
            backdrop-filter: blur(10px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            font-family: 'Arial', sans-serif;
            color: white;
            display: block;
            max-height: 400px;
            overflow-y: auto;
        `;

        dashboard.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #00f5ff; font-size: 16px;">
                    🧠 Soul Status
                </h3>
                <div style="display: flex; gap: 5px;">
                    <button id="soulVisibilityBtn" style="
                        background: none;
                        border: 1px solid rgba(0, 245, 255, 0.3);
                        color: #00f5ff;
                        padding: 3px 8px;
                        border-radius: 3px;
                        font-size: 10px;
                        cursor: pointer;
                    ">Normal</button>
                    <button id="toggleSoulDashboard" style="
                        background: none;
                        border: 1px solid rgba(0, 245, 255, 0.3);
                        color: #00f5ff;
                        padding: 3px 8px;
                        border-radius: 3px;
                        font-size: 10px;
                        cursor: pointer;
                    ">−</button>
                </div>
            </div>
            
            <div id="soulStatusContent">
                <div id="soulCurrentEmotion" style="
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 10px;
                    border-left: 3px solid #ff69b4;
                ">
                    <div style="font-size: 14px; font-weight: bold; color: #ff69b4; margin-bottom: 5px;">
                        Current Feeling: <span id="soulCurrentEmotionText">Waiting...</span>
                    </div>
                    <div style="font-size: 12px; color: #aaa;">
                        Confidence: <span id="soulConfidenceText">--</span>
                    </div>
                </div>
                
                <div id="soulLearning" style="
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 10px;
                    border-left: 3px solid #00ff88;
                ">
                    <div style="font-size: 12px; color: #00ff88; margin-bottom: 5px;">
                        🧠 Learning Progress
                    </div>
                    <div style="font-size: 11px; color: #aaa;">
                        Experiences: <span id="soulExperienceCount">0</span><br>
                        Memory Depth: <span id="soulMemoryDepth">Basic</span>
                    </div>
                </div>
                
                <div id="soulAnalysisDetail" style="
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    padding: 12px;
                    border-left: 3px solid #ffd700;
                    display: none;
                ">
                    <div style="font-size: 12px; color: #ffd700; margin-bottom: 5px;">
                        🔍 Analysis Details
                    </div>
                    <div style="font-size: 10px; color: #aaa; line-height: 1.4;">
                        <div id="soulAnalysisText">No analysis running...</div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(dashboard);
        
        // Add event listeners
        document.getElementById('soulVisibilityBtn').addEventListener('click', () => this.cycleSoulVisibility());
        document.getElementById('toggleSoulDashboard').addEventListener('click', () => this.toggleSoulDashboard());
    }

    /**
     * Organize existing elements based on current mode
     */
    organizeExistingElements() {
        // Identify elements that should be hidden/shown based on mode
        this.creatorElements = [
            'tvModeBtn', // TV mode is more for testing
            // We'll add test buttons and debug elements here
        ];

        this.userElements = [
            'statusIndicator',
            'statusText',
            'primaryControls',
            'emotionalIntelligence'
        ];

        // Hide/show elements initially
        this.updateElementVisibility();
    }

    /**
     * Setup mode-specific styles
     */
    setupModeStyles() {
        const modeStyles = document.createElement('style');
        modeStyles.id = 'modeStyles';
        modeStyles.textContent = `
            .creator-mode .test-element {
                display: block !important;
            }
            
            .user-mode .test-element {
                display: none !important;
            }
            
            .creator-mode .debug-info {
                opacity: 1;
                display: block;
            }
            
            .user-mode .debug-info {
                opacity: 0;
                display: none;
            }
            
            .soul-dashboard-minimal #soulLearning,
            .soul-dashboard-minimal #soulAnalysisDetail {
                display: none;
            }
            
            .soul-dashboard-detailed #soulAnalysisDetail {
                display: block;
            }
        `;
        document.head.appendChild(modeStyles);
    }

    /**
     * Switch between user and creator modes
     */
    switchMode(mode) {
        if (this.currentMode === mode) return;

        this.currentMode = mode;
        
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });

        // Update body class for CSS targeting
        document.body.className = document.body.className.replace(/\b(user|creator)-mode\b/g, '');
        document.body.classList.add(`${mode}-mode`);

        // Update element visibility
        this.updateElementVisibility();

        // Show notification
        this.showModeChangeNotification(mode);

        console.log(`🎨 Switched to ${mode} mode`);
    }

    /**
     * Update visibility of elements based on current mode
     */
    updateElementVisibility() {
        // Hide all test elements in user mode
        if (this.currentMode === 'user') {
            // Find and hide test buttons and debug elements
            const testElements = document.querySelectorAll('[id*="test"], [id*="Test"], [class*="test"], .debug-info');
            testElements.forEach(el => {
                if (el.id !== 'statusText') { // Don't hide status text
                    el.style.display = 'none';
                }
            });

            // Enhance soul visibility for users
            this.enhanceSoulVisibilityForUsers();
        } else {
            // Show debug elements in creator mode
            const testElements = document.querySelectorAll('[id*="test"], [id*="Test"], [class*="test"], .debug-info');
            testElements.forEach(el => {
                el.style.display = '';
            });
        }
    }

    /**
     * Enhance soul visibility specifically for users
     */
    enhanceSoulVisibilityForUsers() {
        // Make the soul commentary more prominent for users
        if (window.soulCommentary && window.soulCommentary.commentaryContainer) {
            const container = window.soulCommentary.commentaryContainer;
            if (this.currentMode === 'user') {
                // Make commentary more user-friendly
                container.style.width = '380px';
                container.style.background = 'linear-gradient(135deg, rgba(15, 15, 20, 0.98), rgba(8, 8, 12, 0.98))';
                container.style.border = '3px solid rgba(0, 245, 255, 0.5)';
            }
        }
    }

    /**
     * Cycle through soul visibility levels
     */
    cycleSoulVisibility() {
        const levels = ['minimal', 'normal', 'detailed'];
        const currentIndex = levels.indexOf(this.soulVisibilityLevel);
        const nextIndex = (currentIndex + 1) % levels.length;
        this.soulVisibilityLevel = levels[nextIndex];

        // Update button text
        const btn = document.getElementById('soulVisibilityBtn');
        if (btn) {
            btn.textContent = this.soulVisibilityLevel.charAt(0).toUpperCase() + this.soulVisibilityLevel.slice(1);
        }

        // Update dashboard class
        const dashboard = document.getElementById('enhancedSoulDashboard');
        if (dashboard) {
            dashboard.className = dashboard.className.replace(/soul-dashboard-\w+/g, '');
            dashboard.classList.add(`soul-dashboard-${this.soulVisibilityLevel}`);
        }

        console.log(`🎨 Soul visibility: ${this.soulVisibilityLevel}`);
    }

    /**
     * Toggle soul dashboard visibility
     */
    toggleSoulDashboard() {
        const dashboard = document.getElementById('enhancedSoulDashboard');
        const toggleBtn = document.getElementById('toggleSoulDashboard');
        const content = document.getElementById('soulStatusContent');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggleBtn.textContent = '−';
            dashboard.style.height = 'auto';
        } else {
            content.style.display = 'none';
            toggleBtn.textContent = '+';
            dashboard.style.height = '60px';
        }
    }

    /**
     * Update soul dashboard with current information
     */
    updateSoulDashboard(emotionState = null, memoryStats = null) {
        if (!emotionState) return;

        // Update current emotion
        const emotionText = document.getElementById('soulCurrentEmotionText');
        const confidenceText = document.getElementById('soulConfidenceText');
        
        if (emotionText && emotionState.primary) {
            emotionText.textContent = emotionState.primary;
        }
        
        if (confidenceText && emotionState.confidence) {
            confidenceText.textContent = `${emotionState.confidence}%`;
        }

        // Update learning progress
        if (memoryStats) {
            const experienceCount = document.getElementById('soulExperienceCount');
            const memoryDepth = document.getElementById('soulMemoryDepth');
            
            if (experienceCount) {
                experienceCount.textContent = memoryStats.totalExperiences || 0;
            }
            
            if (memoryDepth) {
                const depth = (memoryStats.totalExperiences || 0) < 10 ? 'Basic' :
                             (memoryStats.totalExperiences || 0) < 50 ? 'Developing' :
                             (memoryStats.totalExperiences || 0) < 100 ? 'Advanced' : 'Deep';
                memoryDepth.textContent = depth;
            }
        }

        // Update analysis details
        if (this.soulVisibilityLevel === 'detailed') {
            const analysisText = document.getElementById('soulAnalysisText');
            if (analysisText && emotionState.audioFeatures) {
                const features = emotionState.audioFeatures;
                analysisText.innerHTML = `
                    Energy: ${((features.energy || 0.5) * 100).toFixed(0)}%<br>
                    Tempo: ${features.tempo?.toFixed(0) || '--'} BPM<br>
                    Bass: ${((features.bass || 0) * 100).toFixed(0)}%<br>
                    Brightness: ${features.spectralCentroid > 5000 ? 'High' : features.spectralCentroid < 2000 ? 'Low' : 'Medium'}
                `;
            }
        }
    }

    /**
     * Show mode change notification
     */
    showModeChangeNotification(mode) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(15, 15, 20, 0.98), rgba(8, 8, 12, 0.98));
            border: 2px solid rgba(0, 245, 255, 0.5);
            border-radius: 15px;
            padding: 20px 30px;
            z-index: 10001;
            color: white;
            text-align: center;
            font-family: 'Arial', sans-serif;
            backdrop-filter: blur(10px);
            animation: fadeInOut 2s ease-in-out;
        `;

        const modeInfo = {
            user: {
                icon: '👤',
                title: 'User Mode',
                description: 'Clean interface focused on music and soul connection'
            },
            creator: {
                icon: '🛠️',
                title: 'Creator Mode', 
                description: 'Full access to development tools and soul analysis'
            }
        };

        const info = modeInfo[mode];
        notification.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 10px;">${info.icon}</div>
            <div style="font-size: 18px; font-weight: bold; color: #00f5ff; margin-bottom: 5px;">
                ${info.title}
            </div>
            <div style="font-size: 14px; color: #aaa;">
                ${info.description}
            </div>
        `;

        document.body.appendChild(notification);

        // Add animation styles
        const animStyle = document.createElement('style');
        animStyle.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(animStyle);

        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (animStyle.parentNode) {
                animStyle.parentNode.removeChild(animStyle);
            }
        }, 2000);
    }

    /**
     * Get current mode
     */
    getCurrentMode() {
        return this.currentMode;
    }

    /**
     * Get soul visibility level
     */
    getSoulVisibilityLevel() {
        return this.soulVisibilityLevel;
    }
}

// Initialize the UI organization system
window.uiOrganization = new UIOrganizationSystem();

// Connect to emotion updates
if (window.emotionEngine) {
    const originalAnalyze = window.emotionEngine.analyze;
    window.emotionEngine.analyze = function(...args) {
        const result = originalAnalyze.apply(this, args);
        if (window.uiOrganization && result) {
            window.uiOrganization.updateSoulDashboard(result);
        }
        return result;
    };
}

// Connect to memory system updates
if (window.emotionalMemorySystem) {
    setInterval(() => {
        if (window.uiOrganization && window.emotionalMemorySystem.getMemoryStats) {
            const memoryStats = window.emotionalMemorySystem.getMemoryStats();
            window.uiOrganization.updateSoulDashboard(null, memoryStats);
        }
    }, 5000);
}

console.log('🎨 UI Organization System ready! Use User/Creator toggle to switch modes.');
