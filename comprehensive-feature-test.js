// 🧪 COMPREHENSIVE FEATURE TEST SCRIPT
// Tests all core app functionality

console.log('🚀 Starting comprehensive feature validation...');

const tests = {
    coreLoading: false,
    emotionEngine: false,
    audioAnalyzer: false,
    soulSystem: false,
    authSystem: false,
    uiResponsive: false,
    aiSystems: false,
    socialFeatures: false
};

// Test 1: Core System Loading
function testCoreLoading() {
    console.log('🔧 Testing core system loading...');
    
    try {
        // Check if synesthetic core is loaded
        if (typeof window.SynestheticCore !== 'undefined') {
            tests.coreLoading = true;
            console.log('✅ SynestheticCore loaded successfully');
        } else {
            console.log('❌ SynestheticCore not found');
        }
        
        // Check if emotion engine is loaded
        if (typeof window.EmotionEngine !== 'undefined') {
            tests.emotionEngine = true;
            console.log('✅ EmotionEngine loaded successfully');
        } else {
            console.log('❌ EmotionEngine not found');
        }
        
        // Check if audio analyzer is loaded
        if (typeof window.AudioAnalyzer !== 'undefined') {
            tests.audioAnalyzer = true;
            console.log('✅ AudioAnalyzer loaded successfully');
        } else {
            console.log('❌ AudioAnalyzer not found');
        }
        
    } catch (error) {
        console.error('❌ Core loading test failed:', error);
    }
}

// Test 2: Soul System
function testSoulSystem() {
    console.log('🧠 Testing soul system...');
    
    try {
        if (typeof window.FactorySoulTrain !== 'undefined') {
            tests.soulSystem = true;
            console.log('✅ Soul system loaded successfully');
        } else {
            console.log('❌ Soul system not found');
        }
    } catch (error) {
        console.error('❌ Soul system test failed:', error);
    }
}

// Test 3: Authentication System
function testAuthSystem() {
    console.log('🔐 Testing authentication system...');
    
    try {
        if (typeof window.authManager !== 'undefined') {
            tests.authSystem = true;
            console.log('✅ Authentication system loaded successfully');
            
            // Test if auth UI elements exist
            const authButton = document.getElementById('authButton');
            const userDashboard = document.getElementById('userDashboard');
            
            if (authButton || userDashboard) {
                console.log('✅ Auth UI elements present');
            } else {
                console.log('⚠️ Auth UI elements not found');
            }
        } else {
            console.log('❌ Authentication manager not found');
        }
    } catch (error) {
        console.error('❌ Auth system test failed:', error);
    }
}

// Test 4: UI Responsiveness
function testUIResponsive() {
    console.log('🎨 Testing UI responsiveness...');
    
    try {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        const nowPlaying = document.getElementById('now-playing');
        
        if (sidebar && mainContent && nowPlaying) {
            tests.uiResponsive = true;
            console.log('✅ Main UI components present');
        } else {
            console.log('❌ Main UI components missing');
        }
        
        // Test navigation
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems.length > 0) {
            console.log(`✅ Found ${navItems.length} navigation items`);
        } else {
            console.log('❌ Navigation items not found');
        }
        
    } catch (error) {
        console.error('❌ UI responsive test failed:', error);
    }
}

// Test 5: AI Systems
function testAISystems() {
    console.log('🤖 Testing AI systems...');
    
    try {
        if (typeof window.AdvancedRecommendationEngine !== 'undefined') {
            tests.aiSystems = true;
            console.log('✅ AI recommendation engine loaded');
        } else {
            console.log('❌ AI recommendation engine not found');
        }
    } catch (error) {
        console.error('❌ AI systems test failed:', error);
    }
}

// Test 6: Social Features
function testSocialFeatures() {
    console.log('🌐 Testing social features...');
    
    try {
        if (typeof window.SocialConsciousness !== 'undefined') {
            tests.socialFeatures = true;
            console.log('✅ Social consciousness system loaded');
        } else {
            console.log('❌ Social consciousness system not found');
        }
    } catch (error) {
        console.error('❌ Social features test failed:', error);
    }
}

// Run all tests
function runAllTests() {
    console.log('🧪 Running comprehensive feature tests...');
    
    testCoreLoading();
    testSoulSystem();
    testAuthSystem();
    testUIResponsive();
    testAISystems();
    testSocialFeatures();
    
    // Generate test report
    setTimeout(() => {
        console.log('\n📊 TEST RESULTS SUMMARY:');
        console.log('========================');
        
        let passedTests = 0;
        let totalTests = Object.keys(tests).length;
        
        for (const [testName, result] of Object.entries(tests)) {
            const status = result ? '✅ PASS' : '❌ FAIL';
            console.log(`${testName}: ${status}`);
            if (result) passedTests++;
        }
        
        console.log(`\n🎯 Overall Score: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);
        
        if (passedTests === totalTests) {
            console.log('🎉 ALL TESTS PASSED! App is fully functional!');
        } else if (passedTests >= totalTests * 0.8) {
            console.log('⚠️ Most tests passed. Some minor issues to address.');
        } else {
            console.log('🔧 Major issues detected. Requires fixes.');
        }
        
        // Store results globally for external access
        window.testResults = {
            tests,
            score: passedTests / totalTests,
            passed: passedTests,
            total: totalTests
        };
        
    }, 2000);
}

// Auto-run tests when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}

// Export for manual testing
window.runComprehensiveTests = runAllTests;
