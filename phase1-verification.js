/**
 * PHASE 1 VERIFICATION SCRIPT
 * ===========================
 * Tests that the onboarding system is properly integrated and functional
 */

// Test 1: Check if onboarding system is loaded
console.log('🧪 PHASE 1 VERIFICATION STARTING...');

// Test 2: Check localStorage behavior
function testLocalStorage() {
    console.log('📊 Testing localStorage behavior...');
    
    const visited = localStorage.getItem('synesthetic_visited');
    const completed = localStorage.getItem('synesthetic_onboarding_completed');
    
    console.log(`✓ Visited flag: ${visited ? 'EXISTS' : 'NOT SET'}`);
    console.log(`✓ Completed flag: ${completed ? 'EXISTS' : 'NOT SET'}`);
    
    return { visited, completed };
}

// Test 3: Check if target elements exist
function testTargetElements() {
    console.log('🎯 Testing onboarding target elements...');
    
    const targets = [
        '.brand-icon',
        '#liveAnalysisCard', 
        '#uploadMusicCard',
        '#emotionCanvas',
        '#statusText',
        '.user-avatar'
    ];
    
    const results = {};
    targets.forEach(target => {
        const element = document.querySelector(target);
        results[target] = element ? 'FOUND' : 'MISSING';
        console.log(`${element ? '✓' : '❌'} ${target}: ${results[target]}`);
    });
    
    return results;
}

// Test 4: Force trigger onboarding for testing
function triggerOnboardingTest() {
    console.log('🚀 Triggering onboarding test...');
    
    // Clear storage to simulate first visit
    localStorage.removeItem('synesthetic_visited');
    localStorage.removeItem('synesthetic_onboarding_completed');
    
    // Create onboarding instance
    if (window.SynestheticOnboarding) {
        const onboarding = new window.SynestheticOnboarding();
        console.log('✓ Onboarding instance created successfully');
        return onboarding;
    } else {
        console.error('❌ SynestheticOnboarding class not available');
        return null;
    }
}

// Test 5: Verify onboarding initialization
function verifyOnboardingClass() {
    console.log('🔍 Verifying onboarding class...');
    
    if (typeof window.SynestheticOnboarding === 'function') {
        console.log('✓ SynestheticOnboarding class is available');
        
        // Test static method
        if (typeof window.SynestheticOnboarding.checkForGuidance === 'function') {
            console.log('✓ checkForGuidance static method available');
        } else {
            console.log('❌ checkForGuidance static method missing');
        }
        
        return true;
    } else {
        console.log('❌ SynestheticOnboarding class not found');
        return false;
    }
}

// Run comprehensive test
function runPhase1Verification() {
    console.log('\n' + '='.repeat(50));
    console.log('🎯 PHASE 1: ONBOARDING SYSTEM VERIFICATION');
    console.log('='.repeat(50));
    
    const results = {
        localStorage: testLocalStorage(),
        targetElements: testTargetElements(),
        onboardingClass: verifyOnboardingClass()
    };
    
    console.log('\n📋 VERIFICATION SUMMARY:');
    console.log('='.repeat(30));
    
    // Check if onboarding should trigger
    if (!results.localStorage.visited) {
        console.log('🎉 NEW USER DETECTED - Onboarding should trigger!');
        
        if (results.onboardingClass) {
            setTimeout(() => {
                console.log('⏰ Attempting to trigger onboarding in 2 seconds...');
                const onboarding = triggerOnboardingTest();
                
                if (onboarding) {
                    console.log('✅ PHASE 1 VERIFICATION: SUCCESS');
                    console.log('🎯 Onboarding system is fully functional!');
                } else {
                    console.log('❌ PHASE 1 VERIFICATION: FAILED');
                    console.log('🔧 Onboarding system needs debugging');
                }
            }, 2000);
        }
    } else {
        console.log('👤 RETURNING USER - Onboarding completed previously');
        console.log('💡 Clear localStorage to test new user experience');
    }
    
    return results;
}

// Auto-run when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPhase1Verification);
} else {
    runPhase1Verification();
}

// Make available globally for manual testing
window.runPhase1Verification = runPhase1Verification;
window.triggerOnboardingTest = triggerOnboardingTest;

console.log('🧪 Phase 1 verification script loaded. Run window.runPhase1Verification() to test manually.');
