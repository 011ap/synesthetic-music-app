// Simple browser test script to validate visual feedback
// This script can be copy-pasted into the browser console

console.log('🧪 Testing Synesthetic App Visual Feedback...');

// Test 1: Check if core components are loaded
console.log('\n=== Component Availability Test ===');
console.log('window.app:', !!window.app);
console.log('window.synestheticCore:', !!window.synestheticCore);
console.log('window.SynestheticCore:', !!window.SynestheticCore);
console.log('window.audioAnalyzer:', !!window.audioAnalyzer);
console.log('window.autoDemo:', !!window.autoDemo);

// Test 2: Check visual feedback functions
console.log('\n=== Visual Feedback Functions Test ===');
if (window.app) {
    console.log('updateSynestheticDisplay:', typeof window.app.updateSynestheticDisplay);
    console.log('updateParticles:', typeof window.app.updateParticles);
    console.log('updateBackgroundColors:', typeof window.app.updateBackgroundColors);
    console.log('createParticles:', typeof window.app.createParticles);
}

// Test 3: Check upload functions
console.log('\n=== Upload Functions Test ===');
if (window.app) {
    console.log('showUploadSection:', typeof window.app.showUploadSection);
    console.log('handleUploadClick:', typeof window.app.handleUploadClick);
    console.log('handleFileUpload:', typeof window.app.handleFileUpload);
}

// Test 4: Check mic functions
console.log('\n=== Mic Functions Test ===');
if (window.app) {
    console.log('startMicAnalysis:', typeof window.app.startMicAnalysis);
    console.log('stopMicAnalysis:', typeof window.app.stopMicAnalysis);
}

// Test 5: Check DOM elements
console.log('\n=== DOM Elements Test ===');
console.log('synestheticDisplay:', !!document.getElementById('synestheticDisplay'));
console.log('emotionParticles:', !!document.getElementById('emotionParticles'));
console.log('uploadButton:', !!document.getElementById('uploadButton'));
console.log('micButton:', !!document.getElementById('micButton'));
console.log('uploadArea:', !!document.getElementById('uploadArea'));
console.log('fileInput:', !!document.getElementById('fileInput'));

// Test 6: Particles existence
console.log('\n=== Particles Test ===');
const particles = document.querySelectorAll('.particle');
console.log('Particle count:', particles.length);

// Test 7: Manual visual feedback test
console.log('\n=== Manual Visual Feedback Test ===');
if (window.app && window.app.updateSynestheticDisplay) {
    const testEmotion = {
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
        key: 'TEST'
    };
    const testFeatures = {
        energy: 0.8
    };
    
    try {
        window.app.updateSynestheticDisplay(testEmotion, testFeatures);
        console.log('✅ Visual feedback test successful');
    } catch (error) {
        console.error('❌ Visual feedback test failed:', error);
    }
}

// Test 8: Auto demo test
console.log('\n=== Auto Demo Test ===');
if (window.autoDemo && window.autoDemo.start) {
    console.log('✅ Auto demo available. Run: window.autoDemo.start()');
} else {
    console.log('❌ Auto demo not available');
}

console.log('\n🧪 Test complete. Copy this into browser console to run.');
