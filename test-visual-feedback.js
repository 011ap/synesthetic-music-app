/**
 * 🧪 VISUAL FEEDBACK TESTING UTILITY
 * Simple test functions to verify visual feedback components are working
 */

// Test emotional states for visual feedback verification
const testEmotions = [
    {
        primary: 'Joy',
        confidence: 95,
        depth: 80,
        intensity: 0.9,
        synestheticColors: ['#FFD700', '#FFA500', '#FF6347'],
        features: { energy: 0.8, spectralCentroid: 8000, bass: 120, mid: 150, treble: 180 }
    },
    {
        primary: 'Melancholy',
        confidence: 87,
        depth: 95,
        intensity: 0.3,
        synestheticColors: ['#4169E1', '#6495ED', '#87CEEB'],
        features: { energy: 0.3, spectralCentroid: 3000, bass: 200, mid: 80, treble: 60 }
    },
    {
        primary: 'Determination',
        confidence: 92,
        depth: 70,
        intensity: 0.95,
        synestheticColors: ['#DC143C', '#FF6347', '#FF4500'],
        features: { energy: 0.9, spectralCentroid: 12000, bass: 180, mid: 200, treble: 220 }
    },
    {
        primary: 'Serenity',
        confidence: 78,
        depth: 60,
        intensity: 0.2,
        synestheticColors: ['#98FB98', '#90EE90', '#87CEEB'],
        features: { energy: 0.2, spectralCentroid: 2000, bass: 60, mid: 90, treble: 70 }
    }
];

/**
 * Test visual feedback with different emotional states
 */
function testVisualFeedback() {
    console.log('🧪 Starting visual feedback test...');
    
    // Test basic system availability
    const status = {
        synestheticCore: !!window.synestheticCore,
        app: !!window.app,
        updateSynestheticDisplay: !!(window.app && window.app.updateSynestheticDisplay),
        updateParticles: !!(window.app && window.app.updateParticles),
        updateBackgroundColors: !!(window.app && window.app.updateBackgroundColors)
    };
    
    console.log('📊 System Status:', status);
    
    if (!status.synestheticCore) {
        console.error('❌ synestheticCore not available');
        return false;
    }
    
    // Test with each emotion
    testEmotions.forEach((emotion, index) => {
        setTimeout(() => {
            console.log(`🎭 Testing emotion ${index + 1}: ${emotion.primary}`);
            
            if (window.synestheticCore && window.synestheticCore.updateEmotionalConsciousness) {
                window.synestheticCore.updateEmotionalConsciousness(emotion);
            } else {
                console.warn('⚠️ updateEmotionalConsciousness not available');
            }
        }, index * 3000); // 3 second intervals
    });
    
    return true;
}

/**
 * Test individual visual components
 */
function testIndividualComponents() {
    console.log('🔧 Testing individual visual components...');
    
    const testEmotion = testEmotions[0]; // Use Joy for testing
    const emotion = {
        colors: testEmotion.synestheticColors,
        key: testEmotion.primary,
        colorsVibrant: testEmotion.synestheticColors
    };
    const features = testEmotion.features;
    
    // Test synesthetic display
    if (window.app && window.app.updateSynestheticDisplay) {
        console.log('🌈 Testing synesthetic display...');
        window.app.updateSynestheticDisplay(emotion, features);
    }
    
    // Test particles
    if (window.app && window.app.updateParticles) {
        console.log('✨ Testing particles...');
        window.app.updateParticles(emotion, features);
    }
    
    // Test background colors
    if (window.app && window.app.updateBackgroundColors) {
        console.log('🎨 Testing background colors...');
        window.app.updateBackgroundColors(testEmotion.synestheticColors);
    }
    
    // Test particle creation
    if (window.app && window.app.createParticles) {
        console.log('💫 Recreating particles...');
        window.app.createParticles();
    }
}

/**
 * Test the file analysis pipeline
 */
function testFileAnalysis() {
    console.log('📁 Testing file analysis pipeline...');
    
    if (!window.synestheticCore || !window.synestheticCore.startFileAnalysis) {
        console.warn('⚠️ startFileAnalysis not available');
        return false;
    }
    
    // Create a fake audio blob for testing
    const fakeAudioData = new Uint8Array(44100); // 1 second of fake audio data
    for (let i = 0; i < fakeAudioData.length; i++) {
        fakeAudioData[i] = Math.sin(i * 440 * 2 * Math.PI / 44100) * 127 + 127; // 440Hz tone
    }
    
    const blob = new Blob([fakeAudioData], { type: 'audio/wav' });
    
    try {
        window.synestheticCore.startFileAnalysis(blob);
        console.log('✅ File analysis test initiated');
        return true;
    } catch (error) {
        console.error('❌ File analysis test failed:', error);
        return false;
    }
}

/**
 * Check DOM elements required for visual feedback
 */
function checkDOMElements() {
    console.log('🔍 Checking DOM elements...');
    
    const requiredElements = [
        'primaryEmotion',
        'emotionDescription', 
        'primaryConfidence',
        'synestheticDisplay',
        'emotionParticles'
    ];
    
    const status = {};
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        status[id] = !!element;
        if (!element) {
            console.warn(`⚠️ Missing DOM element: #${id}`);
        }
    });
    
    console.log('📋 DOM Element Status:', status);
    return status;
}

/**
 * Run comprehensive test suite
 */
function runFullTest() {
    console.log('🚀 Running comprehensive visual feedback test suite...');
    
    // Wait for initialization if needed
    const runTests = () => {
        console.log('1. Checking DOM elements...');
        checkDOMElements();
        
        setTimeout(() => {
            console.log('2. Testing individual components...');
            testIndividualComponents();
        }, 1000);
        
        setTimeout(() => {
            console.log('3. Testing complete emotional states...');
            testVisualFeedback();
        }, 2000);
        
        setTimeout(() => {
            console.log('4. Testing file analysis...');
            testFileAnalysis();
        }, 15000); // After emotional state tests
    };
    
    if (window.synestheticInit && !window.synestheticInit.isReady) {
        console.log('⏳ Waiting for synesthetic initialization...');
        window.addEventListener('synestheticReady', runTests);
    } else {
        runTests();
    }
}

// Add test button to the page (for easy access)
function addTestButton() {
    const button = document.createElement('button');
    button.textContent = '🧪 Test Visual Feedback';
    button.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 10000;
        padding: 10px;
        background: #FFD700;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    button.onclick = runFullTest;
    document.body.appendChild(button);
}

// Auto-add test button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTestButton);
} else {
    addTestButton();
}

// Export test functions
window.synestheticTest = {
    testVisualFeedback,
    testIndividualComponents,
    testFileAnalysis,
    checkDOMElements,
    runFullTest
};

console.log('🧪 Visual feedback testing utility loaded. Use synestheticTest.runFullTest() or click the test button.');
