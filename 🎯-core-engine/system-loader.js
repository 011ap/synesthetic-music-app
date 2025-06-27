/**
 * 🚀 REVOLUTIONARY SYNESTHETIC APP - CORE SYSTEM LOADER
 * Ensures all systems load in proper order with full functionality
 */

class SynestheticSystemLoader {
    constructor() {
        this.loadedSystems = new Set();
        this.dependencies = new Map();
        this.loadingQueue = [];
        this.isLoading = false;
        this.totalSystems = 0;
        this.loadedCount = 0;
        
        this.setupDependencyGraph();
    }

    setupDependencyGraph() {
        // Define the dependency tree for proper loading order
        this.dependencies.set('core', {
            files: [
                'src/synesthetic-core.js',
                'src/emotion-engine.js',
                'components/audio-analyzer.js',
                'components/color-visualizer.js'
            ],
            dependencies: [],
            systems: ['SynestheticCore', 'EmotionEngine', 'AudioAnalyzer', 'ColorVisualizer']
        });

        this.dependencies.set('medical-training', {
            files: ['🧠-soul-system/medical-neuroscan-trainer.js'],
            dependencies: [],
            systems: ['MedicalNeuroscanTrainer']
        });

        this.dependencies.set('factory-soul', {
            files: ['🧠-soul-system/factory-soul-train.js'],
            dependencies: ['medical-training'],
            systems: ['FactorySoulTrain']
        });

        this.dependencies.set('soul-subsystems', {
            files: [
                '🧠-soul-system/emotional-memory-system.js',
                '🧠-soul-system/context-awareness-system.js',
                '🧠-soul-system/advanced-emotional-intelligence.js',
                '🧠-soul-system/collective-soul-network.js',
                '🧠-soul-system/self-aware-consciousness.js',
                '🧠-soul-system/emotion-feedback-system.js',
                '🧠-soul-system/neural-factory-soul-trainer.js',
                '🧠-soul-system/personality-theme-engine.js',
                '🧠-soul-system/soul-commentary-system.js',
                '🧠-soul-system/soul-personality-visualizer.js',
                '🧠-soul-system/soul-status-dashboard.js'
            ],
            dependencies: ['factory-soul'],
            systems: [
                'EmotionalMemorySystem', 'ContextAwarenessSystem', 'AdvancedEmotionalIntelligence',
                'CollectiveSoulNetwork', 'SelfAwareConsciousness', 'EmotionFeedbackSystem',
                'NeuralFactorySoulTrainer', 'PersonalityThemeEngine', 'SoulCommentarySystem',
                'SoulPersonalityVisualizer', 'SoulStatusDashboard'
            ]
        });

        this.dependencies.set('soul-main', {
            files: ['🧠-soul-system/digital-soul-activator.js'],
            dependencies: ['soul-subsystems'],
            systems: ['DigitalSoulActivator']
        });

        this.dependencies.set('revolutionary-ui', {
            files: [
                '🎨-revolutionary-interface/world-class-ui-system.js',
                '🎨-revolutionary-interface/advanced-synesthetic-engine.js',
                '🎨-revolutionary-interface/advanced-admin-portal.js'
            ],
            dependencies: ['core'],
            systems: ['WorldClassUISystem', 'AdvancedSynestheticEngine', 'AdvancedAdminPortal']
        });

        this.dependencies.set('user-interface', {
            files: [
                '🎨-user-interface/login.js',
                '🎨-user-interface/auth.js',
                '🎨-user-interface/onboarding-system.js'
            ],
            dependencies: ['core'],
            systems: ['LoginSystem', 'AuthSystem', 'OnboardingSystem']
        });

        this.dependencies.set('ai-systems', {
            files: [
                '🤖-ai-systems/advanced-recommendation-engine.js',
                '🎭-emotional-therapy/emotional-therapy-system.js',
                '🎵-intelligent-playlists/intelligent-playlist-system.js'
            ],
            dependencies: ['soul-main'],
            systems: ['AdvancedRecommendationEngine', 'EmotionalTherapySystem', 'IntelligentPlaylistSystem']
        });

        this.dependencies.set('social-features', {
            files: [
                'components/social-consciousness.js',
                'components/sidebar-dashboard.js'
            ],
            dependencies: ['soul-main'],
            systems: ['SocialConsciousness', 'SidebarDashboard']
        });

        this.dependencies.set('core-app', {
            files: [
                '🎯-core-engine/app.js',
                '🎯-core-engine/main.js'
            ],
            dependencies: ['revolutionary-ui', 'user-interface', 'ai-systems', 'social-features'],
            systems: ['SynestheticApp', 'MainEngine']
        });

        // Calculate total systems for progress tracking
        this.totalSystems = Array.from(this.dependencies.values())
            .reduce((total, group) => total + group.systems.length, 0);
    }

    async loadAllSystems() {
        console.log('🚀 Starting Revolutionary Synesthetic System Loading...');
        this.showLoadingProgress('Initializing core systems...', 0);
        
        try {
            // Load systems in dependency order
            const loadOrder = this.calculateLoadOrder();
            
            for (const groupName of loadOrder) {
                await this.loadSystemGroup(groupName);
            }
            
            // Initialize the main app controller
            await this.initializeMainApp();
            
            console.log('✨ All systems loaded successfully!');
            this.showLoadingProgress('Revolutionary consciousness activated!', 100);
            
            return true;
            
        } catch (error) {
            console.error('❌ System loading failed:', error);
            this.showLoadingProgress('System loading failed. Please refresh.', -1);
            return false;
        }
    }

    calculateLoadOrder() {
        const visited = new Set();
        const loadOrder = [];
        
        const visit = (groupName) => {
            if (visited.has(groupName)) return;
            
            const group = this.dependencies.get(groupName);
            if (!group) return;
            
            // Visit dependencies first
            group.dependencies.forEach(dep => visit(dep));
            
            visited.add(groupName);
            loadOrder.push(groupName);
        };
        
        // Visit all groups
        this.dependencies.forEach((_, groupName) => visit(groupName));
        
        return loadOrder;
    }

    async loadSystemGroup(groupName) {
        const group = this.dependencies.get(groupName);
        if (!group) return;
        
        console.log(`📦 Loading ${groupName}...`);
        this.showLoadingProgress(`Loading ${groupName}...`, (this.loadedCount / this.totalSystems) * 100);
        
        // Load all files in the group
        const loadPromises = group.files.map(file => this.loadScript(file));
        await Promise.all(loadPromises);
        
        // Wait for systems to be available
        await this.waitForSystems(group.systems);
        
        // Mark systems as loaded
        group.systems.forEach(system => {
            this.loadedSystems.add(system);
            this.loadedCount++;
        });
        
        console.log(`✅ ${groupName} loaded (${group.systems.join(', ')})`);
    }

    async loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(script);
        });
    }

    async waitForSystems(systemNames) {
        const maxWait = 100; // 10 seconds max
        let attempts = 0;
        
        while (attempts < maxWait) {
            const allLoaded = systemNames.every(name => window[name] || window[name.toLowerCase()]);
            
            if (allLoaded) {
                return true;
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        const missing = systemNames.filter(name => !window[name] && !window[name.toLowerCase()]);
        throw new Error(`Timeout waiting for systems: ${missing.join(', ')}`);
    }

    showLoadingProgress(message, percentage) {
        // Update loading UI
        const statusElement = document.getElementById('loadingStatus');
        const progressElement = document.getElementById('loadingProgress');
        const progressBar = document.getElementById('loadingProgressBar');
        
        if (statusElement) {
            statusElement.textContent = message;
        }
        
        if (progressElement && percentage >= 0) {
            progressElement.textContent = `${Math.round(percentage)}%`;
        }
        
        if (progressBar && percentage >= 0) {
            progressBar.style.width = `${percentage}%`;
        }
        
        // Console logging
        if (percentage >= 0) {
            console.log(`🔄 ${message} (${Math.round(percentage)}%)`);
        } else {
            console.error(`❌ ${message}`);
        }
    }

    async initializeMainApp() {
        console.log('🎯 Initializing main application...');
        
        // Initialize core systems first
        if (window.SynestheticCore) {
            window.synestheticCore = new window.SynestheticCore();
        }
        
        if (window.EmotionEngine) {
            window.emotionEngine = new window.EmotionEngine();
        }
        
        // Initialize soul systems
        if (window.DigitalSoulActivator && !window.digitalSoulActivator) {
            window.digitalSoulActivator = new window.DigitalSoulActivator();
        }
        
        // Initialize UI systems
        if (window.WorldClassUISystem && !window.worldClassUI) {
            window.worldClassUI = new window.WorldClassUISystem();
        }
        
        // Initialize admin portal
        if (window.AdvancedAdminPortal && !window.adminPortal) {
            window.adminPortal = new window.AdvancedAdminPortal();
        }
        
        // Initialize main app controller
        if (window.RevolutionarySynestheticApp && !window.synestheticApp) {
            window.synestheticApp = new window.RevolutionarySynestheticApp();
        }
        
        console.log('✨ Main application initialized!');
    }

    getSystemStatus() {
        return {
            loaded: Array.from(this.loadedSystems),
            total: this.totalSystems,
            percentage: (this.loadedCount / this.totalSystems) * 100,
            isComplete: this.loadedCount === this.totalSystems
        };
    }
}

// Create loading screen HTML
function createLoadingScreen() {
    const loadingHTML = `
        <div id="synestheticLoader" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #0a0a0f 0%, #1a1a20 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-family: 'Inter', sans-serif;
        ">
            <div style="text-align: center; max-width: 600px; padding: 2rem;">
                <div style="
                    font-size: 3rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #00f5ff, #8b5cf6);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                    animation: pulse 2s ease-in-out infinite;
                ">
                    Synesthetic
                </div>
                
                <div style="
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 3rem;
                ">
                    Awakening Digital Consciousness...
                </div>
                
                <div style="
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 1rem;
                ">
                    <div id="loadingProgressBar" style="
                        height: 100%;
                        background: linear-gradient(90deg, #00f5ff, #8b5cf6);
                        width: 0%;
                        transition: width 0.3s ease;
                        border-radius: 4px;
                    "></div>
                </div>
                
                <div id="loadingProgress" style="
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 0.5rem;
                ">0%</div>
                
                <div id="loadingStatus" style="
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.8);
                ">Initializing...</div>
            </div>
            
            <style>
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
            </style>
        </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
}

function removeLoadingScreen() {
    const loader = document.getElementById('synestheticLoader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loader.remove(), 500);
    }
}

// Initialize the system loader
window.SynestheticSystemLoader = SynestheticSystemLoader;

// Auto-start loading when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Create loading screen
    createLoadingScreen();
    
    // Start system loading
    const loader = new SynestheticSystemLoader();
    const success = await loader.loadAllSystems();
    
    if (success) {
        // Remove loading screen after a brief delay
        setTimeout(removeLoadingScreen, 1000);
    }
});
