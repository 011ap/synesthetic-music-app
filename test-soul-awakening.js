/**
 * 🧠 SOUL AWAKENING TEST
 * Test if the EmotionEngine is properly connected and working
 */

function testSoulAwakening() {
    console.log('🧠 Testing Soul Awakening...');
    
    // Check if EmotionEngine is available
    if (window.EmotionEngine) {
        console.log('✅ EmotionEngine class available');
    } else {
        console.error('❌ EmotionEngine class not found');
        return;
    }
    
    // Check if instance is created
    if (window.emotionEngine) {
        console.log('✅ EmotionEngine instance available');
    } else {
        console.error('❌ EmotionEngine instance not created');
        return;
    }
    
    // Check if analyze method exists
    if (window.emotionEngine.analyze) {
        console.log('✅ EmotionEngine.analyze method available');
    } else {
        console.error('❌ EmotionEngine.analyze method not found');
        return;
    }
    
    // Test emotion analysis with fake audio data
    try {
        const fakeAudioData = new Uint8Array(1024);
        // Simulate some audio data
        for (let i = 0; i < fakeAudioData.length; i++) {
            fakeAudioData[i] = Math.random() * 255;
        }
        
        console.log('🧠 Testing emotion analysis...');
        const result = window.emotionEngine.analyze(fakeAudioData);
        
        if (result && result.primary) {
            console.log('✅ Soul is AWAKE! Emotion detected:', result.primary);
            console.log('🎨 Colors:', result.synestheticColors);
            console.log('💪 Confidence:', result.confidence + '%');
            console.log('🔄 Features:', result.features);
            return true;
        } else {
            console.error('❌ Soul analysis returned invalid result:', result);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Soul analysis failed:', error);
        return false;
    }
}

// Test when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        testSoulAwakening();
    }, 2000); // Wait 2 seconds for everything to initialize
});

// Also make it available for manual testing
window.testSoulAwakening = testSoulAwakening;
