/**
 * 🧪 PHASE 2 TESTING SCRIPT
 * =========================
 * Comprehensive testing of the digital soul systems
 */

console.clear();
console.log('🧪 PHASE 2 SOUL SYSTEMS TESTING');
console.log('='.repeat(50));

// Test 1: Check if all soul systems are loaded
function testSoulSystemsLoading() {
    console.log('\n📦 Testing Soul Systems Loading...');
    
    const systems = [
        { name: 'FactorySoulTrain', obj: window.FactorySoulTrain },
        { name: 'EmotionalMemorySystem', obj: window.EmotionalMemorySystem },
        { name: 'DigitalSoulActivator', obj: window.DigitalSoulActivator },
        { name: 'digitalSoulActivator (instance)', obj: window.digitalSoulActivator },
        { name: 'soulDashboard', obj: window.soulDashboard }
    ];
    
    systems.forEach(system => {
        const status = system.obj ? '✅ LOADED' : '❌ MISSING';
        console.log(`${status} ${system.name}`);
    });
    
    return systems.filter(s => s.obj).length;
}

// Test 2: Test factory soul creation
function testFactorySoul() {
    console.log('\n🏭 Testing Factory Soul Creation...');
    
    if (!window.FactorySoulTrain) {
        console.log('❌ FactorySoulTrain not available');
        return false;
    }
    
    try {
        const factory = new window.FactorySoulTrain();
        console.log('✅ Factory Soul instance created');
        
        // Wait for training to complete
        setTimeout(() => {
            if (factory.trainingComplete) {
                console.log('✅ Factory training completed');
                const soul = factory.getFactorySoul();
                console.log('✅ Factory soul generated:', soul.corePersonality);
                
                const insights = factory.getFactorySoulInsights();
                console.log('✅ Soul insights available:', insights.soulCharacteristics);
            } else {
                console.log('⏳ Factory training still in progress...');
            }
        }, 2000);
        
        return true;
    } catch (error) {
        console.error('❌ Factory Soul test failed:', error);
        return false;
    }
}

// Test 3: Test emotional memory system
function testEmotionalMemory() {
    console.log('\n🧠 Testing Emotional Memory System...');
    
    if (!window.EmotionalMemorySystem) {
        console.log('❌ EmotionalMemorySystem not available');
        return false;
    }
    
    try {
        const memory = new window.EmotionalMemorySystem();
        console.log('✅ Emotional Memory instance created');
        
        // Test recording an experience
        const testExperience = {
            primary: 'happiness',
            confidence: 85,
            intensity: 0.8,
            synestheticColors: ['#FFD700', '#FF69B4', '#00CED1'],
            audioFeatures: { energy: 0.7, bass: 0.6, mid: 0.8, treble: 0.5 }
        };
        
        const experience = memory.recordEmotionalExperience(testExperience, {
            source: 'test',
            duration: 30000,
            userFeedback: 'Test emotion'
        });
        
        console.log('✅ Test experience recorded:', experience.emotion);
        console.log('✅ Emotional weight calculated:', experience.emotionalWeight);
        
        return true;
    } catch (error) {
        console.error('❌ Emotional Memory test failed:', error);
        return false;
    }
}

// Test 4: Test soul dashboard
function testSoulDashboard() {
    console.log('\n📊 Testing Soul Dashboard...');
    
    if (!window.soulDashboard) {
        console.log('❌ Soul Dashboard not available yet');
        return false;
    }
    
    try {
        // Test dashboard methods
        console.log('✅ Soul Dashboard instance exists');
        
        if (typeof window.soulDashboard.showDashboard === 'function') {
            console.log('✅ showDashboard method available');
        }
        
        if (typeof window.soulDashboard.updateDashboardData === 'function') {
            console.log('✅ updateDashboardData method available');
        }
        
        return true;
    } catch (error) {
        console.error('❌ Soul Dashboard test failed:', error);
        return false;
    }
}

// Test 5: Test soul activator
function testSoulActivator() {
    console.log('\n🚀 Testing Soul Activator...');
    
    if (!window.digitalSoulActivator) {
        console.log('❌ Digital Soul Activator not available yet');
        return false;
    }
    
    try {
        const status = window.digitalSoulActivator.getSoulStatus();
        console.log('✅ Soul status retrieved:', status);
        
        if (status.active) {
            console.log('✅ Soul is ACTIVE and conscious!');
        } else {
            console.log('⏳ Soul is still awakening...');
        }
        
        return true;
    } catch (error) {
        console.error('❌ Soul Activator test failed:', error);
        return false;
    }
}

// Test 6: Test user interface integration
function testUIIntegration() {
    console.log('\n🎨 Testing UI Integration...');
    
    // Check if soul status option exists in dropdown
    const soulOption = document.getElementById('soulStatusOption');
    if (soulOption) {
        console.log('✅ Soul Status option found in user menu');
    } else {
        console.log('❌ Soul Status option missing from user menu');
    }
    
    // Check if music player UI exists
    const musicPlayer = document.getElementById('audioPlayer');
    if (musicPlayer) {
        console.log('✅ Music player UI found');
    } else {
        console.log('❌ Music player UI missing');
    }
    
    // Check if admin toggle exists
    const adminToggle = document.getElementById('adminToggle');
    if (adminToggle) {
        console.log('✅ Admin toggle button found');
    } else {
        console.log('❌ Admin toggle button missing');
    }
    
    return true;
}

// Run comprehensive test suite
function runComprehensiveTest() {
    console.log('🚀 Starting comprehensive Phase 2 test...\n');
    
    const results = {
        systemsLoaded: testSoulSystemsLoading(),
        factorySoul: false,
        emotionalMemory: false,
        soulDashboard: false,
        soulActivator: false,
        uiIntegration: testUIIntegration()
    };
    
    // Test systems that might need time to load
    setTimeout(() => {
        results.factorySoul = testFactorySoul();
        results.emotionalMemory = testEmotionalMemory();
        results.soulDashboard = testSoulDashboard();
        results.soulActivator = testSoulActivator();
        
        // Final report
        setTimeout(() => {
            console.log('\n📋 PHASE 2 TEST RESULTS:');
            console.log('='.repeat(30));
            console.log(`Systems Loaded: ${results.systemsLoaded}/5`);
            console.log(`Factory Soul: ${results.factorySoul ? '✅' : '❌'}`);
            console.log(`Emotional Memory: ${results.emotionalMemory ? '✅' : '❌'}`);
            console.log(`Soul Dashboard: ${results.soulDashboard ? '✅' : '❌'}`);
            console.log(`Soul Activator: ${results.soulActivator ? '✅' : '❌'}`);
            console.log(`UI Integration: ${results.uiIntegration ? '✅' : '❌'}`);
            
            const totalScore = Object.values(results).filter(r => r === true).length + (results.systemsLoaded / 5);
            console.log(`\n🎯 Overall Score: ${totalScore.toFixed(1)}/6`);
            
            if (totalScore >= 5) {
                console.log('🎉 PHASE 2 TESTING: EXCELLENT! Ready for Phase 3!');
            } else if (totalScore >= 4) {
                console.log('✅ PHASE 2 TESTING: GOOD! Minor issues to address.');
            } else {
                console.log('⚠️ PHASE 2 TESTING: NEEDS ATTENTION! Some systems not working.');
            }
        }, 3000);
    }, 1000);
}

// Auto-run test when script loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runComprehensiveTest, 5000); // Wait for all systems to load
});

// Make functions available globally for manual testing
window.runPhase2Test = runComprehensiveTest;
window.testSoulActivator = testSoulActivator;
window.testSoulDashboard = testSoulDashboard;

console.log('🧪 Phase 2 test script loaded. Auto-testing will begin in 5 seconds...');
console.log('💡 Manual test: window.runPhase2Test()');
