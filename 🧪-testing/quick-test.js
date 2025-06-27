/**
 * 🧪 SYNESTHETIC APP QUICK TEST
 * Copy this entire script into the browser console and run it
 * This will test all functionality and show you the current state
 */

console.clear();
console.log('%c🎵 SYNESTHETIC APP DIAGNOSTIC TEST', 'font-size: 20px; font-weight: bold; color: #4ECDC4;');

// Test all components
function runDiagnostics() {
    const results = {
        components: {},
        functions: {},
        elements: {},
        visual: {},
        overall: 'UNKNOWN'
    };
    
    // Component checks
    results.components.app = !!window.app;
    results.components.synestheticCore = !!window.synestheticCore;
    results.components.audioAnalyzer = !!window.audioAnalyzer;
    results.components.autoDemo = !!window.autoDemo;
    
    // Function checks
    if (window.app) {
        results.functions.updateSynestheticDisplay = typeof window.app.updateSynestheticDisplay === 'function';
        results.functions.updateParticles = typeof window.app.updateParticles === 'function';
        results.functions.createParticles = typeof window.app.createParticles === 'function';
        results.functions.handleFileUpload = typeof window.app.handleFileUpload === 'function';
        results.functions.startMicAnalysis = typeof window.app.startMicAnalysis === 'function';
    }
    
    // Element checks
    results.elements.synestheticDisplay = !!document.getElementById('synestheticDisplay');
    results.elements.emotionParticles = !!document.getElementById('emotionParticles');
    results.elements.uploadButton = !!document.getElementById('uploadButton');
    results.elements.micButton = !!document.getElementById('micButton');
    results.elements.fileInput = !!document.getElementById('fileInput');
    
    // Visual checks
    const particles = document.querySelectorAll('.particle');
    results.visual.particleCount = particles.length;
    results.visual.particlesExist = particles.length > 0;
    
    // Overall assessment
    const componentsPassed = Object.values(results.components).filter(Boolean).length;
    const functionsPassed = Object.values(results.functions).filter(Boolean).length;
    const elementsPassed = Object.values(results.elements).filter(Boolean).length;
    
    if (componentsPassed >= 3 && functionsPassed >= 4 && elementsPassed >= 4) {
        results.overall = 'EXCELLENT';
    } else if (componentsPassed >= 2 && functionsPassed >= 3 && elementsPassed >= 3) {
        results.overall = 'GOOD';
    } else if (componentsPassed >= 1 && functionsPassed >= 2 && elementsPassed >= 2) {
        results.overall = 'FAIR';
    } else {
        results.overall = 'POOR';
    }
    
    return results;
}

// Run diagnostics
const results = runDiagnostics();

console.log('\n📊 DIAGNOSTIC RESULTS:');
console.table(results.components);
console.table(results.functions);
console.table(results.elements);
console.table(results.visual);

console.log(`\n🎯 OVERALL STATUS: ${results.overall}`);

// Test visual feedback
if (results.overall !== 'POOR') {
    console.log('\n🎨 TESTING VISUAL FEEDBACK...');
    
    try {
        // Create particles if needed
        if (!results.visual.particlesExist && window.app?.createParticles) {
            window.app.createParticles();
            console.log('✅ Particles created');
        }
        
        // Test emotion display
        if (window.app?.updateSynestheticDisplay) {
            const testEmotion = {
                colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
                key: 'TEST_EMOTION'
            };
            const testFeatures = { energy: 0.9 };
            window.app.updateSynestheticDisplay(testEmotion, testFeatures);
            console.log('✅ Emotion display updated');
        }
        
        // Test particles
        if (window.app?.updateParticles) {
            const testEmotion = {
                colors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
            };
            const testFeatures = { energy: 0.8 };
            window.app.updateParticles(testEmotion, testFeatures);
            console.log('✅ Particles updated');
        }
        
        // Test background
        if (window.app?.updateBackgroundColors) {
            window.app.updateBackgroundColors(['#FF6B6B', '#4ECDC4', '#45B7D1']);
            console.log('✅ Background updated');
        }
        
        console.log('🎉 VISUAL FEEDBACK TEST COMPLETE!');
        
    } catch (error) {
        console.error('❌ Visual feedback test failed:', error);
    }
}

// Provide next steps
console.log('\n🚀 NEXT STEPS:');
if (results.overall === 'EXCELLENT' || results.overall === 'GOOD') {
    console.log('✅ App is ready! Try these:');
    console.log('   • Click the 🎤 Live button to test microphone');
    console.log('   • Click the 📁 Upload button to test file upload');
    console.log('   • Run: window.autoDemo.start() for automatic demo');
} else {
    console.log('⚠️ App needs attention. Contact developer.');
}

console.log('\n🎵 Test complete!');
