/**
 * 🚀 SYNESTHETIC APP INITIALIZATION
 * Properly orchestrates the loading and initialization of all components
 * Ensures dependencies are loaded in the correct order
 */

// Global initialization state
window.synestheticInit = {
    componentsLoaded: new Set(),
    isReady: false,
    initPromise: null
};

/**
 * Initialize the synesthetic consciousness engine
 * This ensures all components are loaded before starting the main engine
 */
async function initializeSynestheticApp() {
    console.log('🚀 Starting Synesthetic App initialization...');
    
    try {
        // Wait for DOM to be ready
        if (document.readyState !== 'complete') {
            await new Promise(resolve => {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', resolve);
                } else {
                    window.addEventListener('load', resolve);
                }
            });
        }
        
        // Wait for all essential components to be loaded
        await waitForComponents();
        
        // Initialize the main synesthetic consciousness
        if (window.SynestheticCore && !window.synestheticCore) {
            window.synestheticCore = new window.SynestheticCore();
            console.log('🧠 Synesthetic consciousness engine successfully initialized!');
        }
        
        // 🧠 PHASE 1: AWAKEN THE EMOTION ENGINE
        if (window.EmotionEngine && !window.emotionEngine) {
            window.emotionEngine = new window.EmotionEngine(window.synestheticCore);
            console.log('🎭 Emotion Engine awakened and connected to consciousness!');
        }
        
        // Mark as ready
        window.synestheticInit.isReady = true;
        
        // Dispatch ready event
        window.dispatchEvent(new CustomEvent('synestheticReady', {
            detail: { synestheticCore: window.synestheticCore }
        }));
        
        console.log('✨ Synesthetic App fully initialized and ready!');
        
    } catch (error) {
        console.error('❌ Failed to initialize Synesthetic App:', error);
        
        // Provide fallback functionality
        initializeFallbackMode();
    }
}

/**
 * Wait for essential components to be loaded
 */
async function waitForComponents() {
    const requiredComponents = [
        'EmotionEngine',
        'ColorVisualizer', 
        'AudioAnalyzer',
        'ConsciousnessInterface',
        'SocialConsciousness',
        'SupabaseClient',
        'SmartLights',
        'SynestheticCore'
    ];
    
    const maxWaitTime = 5000; // 5 seconds max
    const checkInterval = 100; // Check every 100ms
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
        const checkComponents = () => {
            const loadedComponents = requiredComponents.filter(name => window[name]);
            
            console.log(`📦 Components loaded: ${loadedComponents.length}/${requiredComponents.length}`, loadedComponents);
            
            if (loadedComponents.length === requiredComponents.length) {
                console.log('✅ All components loaded successfully');
                resolve();
                return;
            }
            
            if (Date.now() - startTime > maxWaitTime) {
                console.warn('⚠️ Timeout waiting for components, proceeding with available ones');
                resolve(); // Don't reject, proceed with what we have
                return;
            }
            
            setTimeout(checkComponents, checkInterval);
        };
        
        checkComponents();
    });
}

/**
 * Initialize fallback mode with basic functionality
 */
function initializeFallbackMode() {
    console.log('🔄 Initializing fallback mode...');
    
    // Create minimal synesthetic core if none exists
    if (!window.synestheticCore) {
        window.synestheticCore = {
            updateEmotionalConsciousness: (emotionalState) => {
                console.log('📊 Fallback: Emotional state update', emotionalState);
                
                // Update basic UI elements
                const primaryEmotion = document.getElementById('primaryEmotion');
                const emotionDescription = document.getElementById('emotionDescription');
                const primaryConfidence = document.getElementById('primaryConfidence');
                
                if (primaryEmotion) primaryEmotion.textContent = emotionalState.primary || 'Unknown';
                if (emotionDescription) emotionDescription.textContent = `${emotionalState.primary} detected with ${emotionalState.confidence}% confidence`;
                if (primaryConfidence) primaryConfidence.textContent = `${emotionalState.confidence || 0}%`;
                
                // Basic visual feedback
                if (window.app && emotionalState.synestheticColors) {
                    const emotion = {
                        colors: emotionalState.synestheticColors,
                        key: emotionalState.primary,
                        colorsVibrant: emotionalState.synestheticColors
                    };
                    const features = emotionalState.features || { energy: emotionalState.intensity || 0.7 };
                    
                    if (window.app.updateSynestheticDisplay) {
                        window.app.updateSynestheticDisplay(emotion, features);
                    }
                    if (window.app.updateParticles) {
                        window.app.updateParticles(emotion, features);
                    }
                    if (window.app.updateBackgroundColors) {
                        window.app.updateBackgroundColors(emotionalState.synestheticColors);
                    }
                }
            },
            
            startFileAnalysis: window.synestheticCore?.startFileAnalysis || (() => {
                console.log('📁 File analysis not available in fallback mode');
            })
        };
    }
    
    // Mark as ready (with limitations)
    window.synestheticInit.isReady = true;
    console.log('🔧 Fallback mode initialized - basic functionality available');
}

/**
 * Get initialization status
 */
function getInitStatus() {
    return {
        isReady: window.synestheticInit.isReady,
        componentsLoaded: Array.from(window.synestheticInit.componentsLoaded),
        hasSynestheticCore: !!window.synestheticCore
    };
}

// Start initialization when this script loads
if (window.synestheticInit && !window.synestheticInit.initPromise) {
    window.synestheticInit.initPromise = initializeSynestheticApp();
}

// Export utilities
window.synestheticInit.initialize = initializeSynestheticApp;
window.synestheticInit.getStatus = getInitStatus;

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!window.synestheticInit.initPromise) {
        window.synestheticInit.initPromise = initializeSynestheticApp();
    }
});

export { initializeSynestheticApp, getInitStatus };
