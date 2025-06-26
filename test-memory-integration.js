/**
 * 🧠 EMOTIONAL MEMORY SYSTEM INTEGRATION TEST
 * Test the Phase 2.2 emotional memory system
 */

function testEmotionalMemoryIntegration() {
    console.log('🧠 Testing Emotional Memory System Integration...');
    console.log('='.repeat(50));
    
    // Test 1: Check if memory system is loaded
    if (window.emotionalMemorySystem) {
        console.log('✅ Emotional Memory System loaded');
        console.log('Current emotional journey length:', window.emotionalMemorySystem.emotionalJourney.length);
        console.log('Session memory:', window.emotionalMemorySystem.sessionMemory.length);
        console.log('Emotional DNA status:', window.emotionalMemorySystem.emotionalDNA ? '✅ Present' : '⚠️ Not yet built');
    } else {
        console.log('❌ Emotional Memory System not found');
        return;
    }
    
    // Test 2: Check emotion engine integration
    if (window.emotionEngine) {
        console.log('✅ Emotion Engine loaded');
        console.log('Context tracking properties:');
        console.log('  - Current source:', window.emotionEngine.currentAnalysisSource);
        console.log('  - Session duration:', window.emotionEngine.currentSessionDuration);
        console.log('  - Last feedback:', window.emotionEngine.lastUserFeedback);
    } else {
        console.log('❌ Emotion Engine not found');
    }
    
    // Test 3: Record a test emotional experience
    console.log('\n🧪 Testing emotional experience recording...');
    
    const testEmotion = {
        primary: 'joy',
        confidence: 85,
        intensity: 0.8,
        synestheticColors: ['#ff006e', '#00f5ff'],
        features: {
            bassLevel: 0.6,
            midLevel: 0.7,
            trebleLevel: 0.5,
            totalEnergy: 0.65
        }
    };
    
    try {
        const experience = window.emotionalMemorySystem.recordEmotionalExperience(testEmotion, {
            source: 'test',
            duration: 30000,
            userFeedback: 'This feels accurate!'
        });
        
        console.log('✅ Test emotion recorded successfully');
        console.log('Experience ID:', experience.timestamp);
        console.log('Emotional weight:', experience.emotionalWeight);
        console.log('Context:', experience.context);
        
    } catch (error) {
        console.error('❌ Failed to record test emotion:', error);
    }
    
    // Test 4: Check memory retrieval
    console.log('\n🔍 Testing memory retrieval...');
    
    try {
        const recentMemories = window.emotionalMemorySystem.getRecentEmotionalJourney(5);
        console.log('✅ Retrieved', recentMemories.length, 'recent memories');
        
        const emotionalInsights = window.emotionalMemorySystem.getEmotionalInsights();
        console.log('✅ Emotional insights:', emotionalInsights);
        
    } catch (error) {
        console.error('❌ Failed to retrieve memories:', error);
    }
    
    // Test 5: Check if emotional DNA is being built
    console.log('\n🧬 Checking Emotional DNA...');
    
    if (window.emotionalMemorySystem.emotionalDNA) {
        console.log('✅ Emotional DNA present:');
        console.log('  - Dominant emotions:', window.emotionalMemorySystem.emotionalDNA.dominantEmotions);
        console.log('  - Emotional complexity:', window.emotionalMemorySystem.emotionalDNA.emotionalComplexity);
        console.log('  - Time patterns:', Object.keys(window.emotionalMemorySystem.emotionalDNA.timePatterns).length);
    } else {
        console.log('⚠️ Emotional DNA not yet built (need more experiences)');
    }
    
    console.log('\n🎯 Memory Integration Test Complete!');
    console.log('='.repeat(50));
}

// Auto-run if this script is loaded directly
if (typeof window !== 'undefined') {
    // Wait a moment for all systems to load
    setTimeout(testEmotionalMemoryIntegration, 1000);
}

// Export for manual testing
window.testEmotionalMemoryIntegration = testEmotionalMemoryIntegration;
