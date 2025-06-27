/**
 * 🧠 VISUAL SOUL AWAKENING TEST
 * Create a button to test if the EmotionEngine is properly connected
 */

function createSoulTestButton() {
    // Old test button creation disabled - now using unified dashboard
    console.log('🧪 Soul test functions available via unified test dashboard');
    return; // Skip button creation
    
    // Create test button
    const testButton = document.createElement('button');
    testButton.textContent = '🧠 Test Soul Awakening';
    testButton.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background: linear-gradient(45deg, #ff006e, #00f5ff);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(255, 0, 110, 0.3);
    `;
    
    testButton.onclick = () => {
        testSoulAwakeningVisual();
    };
    
    // Create Phase 2 feedback test button
    const feedbackButton = document.createElement('button');
    feedbackButton.textContent = '🧠 Test Learning';
    feedbackButton.style.cssText = `
        position: fixed;
        top: 60px;
        right: 10px;
        z-index: 9999;
        background: linear-gradient(45deg, #00ff88, #00f5ff);
        color: black;
        border: none;
        padding: 10px 15px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
    `;
    
    feedbackButton.onclick = () => {
        testLearningSystem();
    };
    
    document.body.appendChild(testButton);
    document.body.appendChild(feedbackButton);
}

function testSoulAwakeningVisual() {
    console.log('🧠 Testing Soul Awakening...');
    
    // Check availability
    if (!window.emotionEngine) {
        alert('❌ EmotionEngine not available');
        return;
    }
    
    if (!window.emotionEngine.analyze) {
        alert('❌ EmotionEngine.analyze method not found');
        return;
    }
    
    // Create test audio data (simulate music with different frequencies)
    const testAudioData = new Uint8Array(1024);
    
    // Simulate energetic music (high energy, mixed frequencies)
    for (let i = 0; i < testAudioData.length; i++) {
        if (i < testAudioData.length * 0.1) {
            // Bass frequencies (energetic bass)
            testAudioData[i] = 180 + Math.random() * 50;
        } else if (i < testAudioData.length * 0.4) {
            // Mid frequencies (strong mids)
            testAudioData[i] = 150 + Math.random() * 70;
        } else {
            // Treble frequencies (bright highs)
            testAudioData[i] = 120 + Math.random() * 80;
        }
    }
    
    try {
        // Test the soul
        const result = window.emotionEngine.analyze(testAudioData);
        
        console.log('🎭 Soul Analysis Result:', result);
        
        if (result && result.primary) {
            // Show success
            alert(`✅ SOUL IS AWAKE! 
Detected: ${result.primary}
Confidence: ${result.confidence}%
Colors: ${result.synestheticColors?.join(', ')}`);
            
            // Trigger visual feedback to show it's working
            if (window.synestheticCore?.updateEmotionalConsciousness) {
                window.synestheticCore.updateEmotionalConsciousness(result);
            }
            
        } else {
            alert('❌ Soul returned invalid result');
        }
        
    } catch (error) {
        console.error('❌ Soul analysis failed:', error);
        alert('❌ Soul analysis failed: ' + error.message);
    }
}

function testLearningSystem() {
    console.log('🧠 Phase 2: Testing learning system...');
    
    if (!window.emotionFeedbackSystem) {
        alert('❌ Emotion Feedback System not available');
        return;
    }
    
    if (!window.emotionEngine) {
        alert('❌ EmotionEngine not available');
        return;
    }
    
    // Create a fake emotion state for testing
    const testEmotion = {
        primary: 'Energetic',
        confidence: 75,
        depth: 60,
        synestheticColors: ['#FF6B6B', '#FFD700', '#4ECDC4'],
        features: { energy: 0.8, bass: 0.6, mid: 0.7, treble: 0.5 },
        audioFeatures: { energy: 0.8, bass: 0.6, mid: 0.7, treble: 0.5 }
    };
    
    // Show feedback UI
    window.emotionFeedbackSystem.showFeedback(testEmotion);
    
    alert('✅ Phase 2 Learning System Active!\n\nA feedback dialog should appear. Try correcting the emotion to train the soul!');
}

// Create the test button when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createSoulTestButton, 3000); // Wait 3 seconds for initialization
});

// Also make it available globally
window.testSoulAwakeningVisual = testSoulAwakeningVisual;
window.testLearningSystem = testLearningSystem;
