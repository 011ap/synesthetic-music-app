/**
 * Quick Factory Soul Test - Run in Browser Console
 * 
 * Paste this into the browser console at:
 * https://humble-lamp-jj4g5xgvprpw3p6j-8000.app.github.dev/
 */

async function quickFactorySoulTest() {
    console.log('🧪 Quick Factory Soul Test');
    console.log('=========================');
    
    // Check if factory soul system is loaded
    if (typeof FactorySoulTrain === 'undefined') {
        console.log('❌ FactorySoulTrain not available');
        return;
    }
    
    console.log('✅ FactorySoulTrain is available');
    
    // Create a trainer
    const trainer = new FactorySoulTrain();
    
    // Wait for initialization
    let attempts = 0;
    while (!trainer.trainingComplete && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 200));
        attempts++;
    }
    
    if (!trainer.trainingComplete) {
        console.log('⏰ Training still in progress...');
        return;
    }
    
    console.log('✅ Factory soul training complete');
    
    // Generate a soul
    const soul = trainer.getFactorySoul();
    console.log('🧬 Generated Factory Soul:');
    console.log('  Personality:', soul.corePersonality);
    console.log('  Musical DNA genres:', Object.keys(soul.musicalDNA));
    
    // Test emotion engine integration
    if (window.app && window.app.emotionEngine) {
        console.log('✅ Emotion engine available');
        
        if (window.app.emotionEngine.factorySoul) {
            console.log('✅ Emotion engine has factory soul loaded');
            console.log('🎭 Engine personality:', window.app.emotionEngine.factorySoul.corePersonality);
        } else {
            console.log('⚠️ Emotion engine factory soul not loaded');
        }
    } else {
        console.log('⚠️ Emotion engine not available');
    }
    
    console.log('🎉 Factory Soul System is working!');
    console.log('💡 Try uploading music or using the mic to see human-like emotional responses');
}

// Make it available globally
window.quickFactorySoulTest = quickFactorySoulTest;

console.log('🔧 Factory Soul Quick Test loaded. Run: quickFactorySoulTest()');
