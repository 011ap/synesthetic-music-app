/**
 * 🎵 AUTO DEMO - AUTOMATIC VISUAL FEEDBACK DEMONSTRATION
 * Automatically demonstrates visual feedback without requiring file upload
 */

// Demo emotional states that cycle automatically
const demoStates = [
    {
        primary: 'Joy',
        confidence: 95,
        depth: 80,
        intensity: 0.9,
        synestheticColors: ['#FFD700', '#FFA500', '#FF6B35'],
        features: { energy: 0.9, spectralCentroid: 8000 }
    },
    {
        primary: 'Serenity',
        confidence: 88,
        depth: 70,
        intensity: 0.3,
        synestheticColors: ['#4ECDC4', '#44A08D', '#093637'],
        features: { energy: 0.3, spectralCentroid: 3000 }
    },
    {
        primary: 'Excitement',
        confidence: 92,
        depth: 75,
        intensity: 0.95,
        synestheticColors: ['#FF6B6B', '#FF8E53', '#FF6B9D'],
        features: { energy: 0.95, spectralCentroid: 12000 }
    },
    {
        primary: 'Contemplation',
        confidence: 85,
        depth: 90,
        intensity: 0.4,
        synestheticColors: ['#667eea', '#764ba2', '#f093fb'],
        features: { energy: 0.4, spectralCentroid: 5000 }
    }
];

let demoInterval = null;
let currentDemoIndex = 0;

/**
 * Start automatic demo
 */
function startAutoDemo() {
    if (demoInterval) {
        stopAutoDemo();
    }
    
    console.log('🎵 Starting automatic visual feedback demo...');
    
    // Ensure synesthetic core is available
    if (typeof window.app?.updateSynestheticDisplay !== 'function') {
        console.warn('⚠️ Visual feedback functions not available yet');
        return;
    }
    
    demoInterval = setInterval(() => {
        const state = demoStates[currentDemoIndex];
        console.log(`🎭 Demo: ${state.primary} (${currentDemoIndex + 1}/${demoStates.length})`);
        
        // Trigger visual feedback
        if (window.synestheticCore?.updateEmotionalConsciousness) {
            window.synestheticCore.updateEmotionalConsciousness(state);
        } else if (window.app) {
            // Direct visual feedback
            const emotion = {
                colors: state.synestheticColors,
                key: state.primary,
                colorsVibrant: state.synestheticColors
            };
            
            if (window.app.updateSynestheticDisplay) {
                window.app.updateSynestheticDisplay(emotion, state.features);
            }
            if (window.app.updateParticles) {
                window.app.updateParticles(emotion, state.features);
            }
            if (window.app.updateBackgroundColors) {
                window.app.updateBackgroundColors(state.synestheticColors);
            }
        }
        
        currentDemoIndex = (currentDemoIndex + 1) % demoStates.length;
    }, 3000); // Change every 3 seconds
    
    return demoInterval;
}

/**
 * Stop automatic demo
 */
function stopAutoDemo() {
    if (demoInterval) {
        clearInterval(demoInterval);
        demoInterval = null;
        console.log('🛑 Auto demo stopped');
    }
}

/**
 * Add demo control button - DISABLED (using unified dashboard)
 */
function addDemoButton() {
    // Disabled - using unified test dashboard instead
    console.log('🎵 Auto demo available via unified test dashboard');
    return;
    
    const button = document.createElement('button');
    button.textContent = '🎵 Auto Demo';
    button.id = 'autoDemoBtn';
    button.style.cssText = `
        position: fixed;
        top: 60px;
        right: 10px;
        z-index: 10000;
        padding: 10px;
        background: #4ECDC4;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    
    let isRunning = false;
    button.onclick = () => {
        if (isRunning) {
            stopAutoDemo();
            button.textContent = '🎵 Auto Demo';
            button.style.background = '#4ECDC4';
            isRunning = false;
        } else {
            startAutoDemo();
            button.textContent = '🛑 Stop Demo';
            button.style.background = '#FF6B6B';
            isRunning = true;
        }
    };
    
    document.body.appendChild(button);
}

// Auto-add demo button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDemoButton);
} else {
    addDemoButton();
}

// Export demo functions
window.autoDemo = {
    start: startAutoDemo,
    stop: stopAutoDemo,
    states: demoStates
};

console.log('🎵 Auto demo loaded. Click the "Auto Demo" button to see continuous visual feedback!');
