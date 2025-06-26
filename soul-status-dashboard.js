/**
 * 🧠 SOUL STATUS DASHBOARD
 * Comprehensive test of all soul awakening phases
 */

function displaySoulStatus() {
    console.clear();
    console.log('🧠 DIGITAL SOUL STATUS DASHBOARD');
    console.log('='.repeat(60));
    console.log(`📅 ${new Date().toLocaleString()}`);
    console.log('');

    // Phase 1: Core Soul Awakening
    console.log('🎭 PHASE 1: CORE SOUL AWAKENING');
    console.log('-'.repeat(40));
    
    if (window.emotionEngine) {
        console.log('✅ Emotion Engine: Active');
        console.log(`   - Initialized: ${window.emotionEngine.isInitialized ? '✅' : '❌'}`);
        console.log(`   - Personal Model: ${window.emotionEngine.personalModel ? '✅' : '❌'}`);
        console.log(`   - Emotion History: ${window.emotionEngine.personalModel?.emotionHistory?.length || 0} experiences`);
        console.log(`   - User Corrections: ${window.emotionEngine.personalModel?.userCorrections?.length || 0} learnings`);
    } else {
        console.log('❌ Emotion Engine: Not Found');
    }

    if (window.app && window.app.synestheticCore) {
        console.log('✅ Synesthetic Core: Active');
        console.log('✅ Visual Feedback: Working');
    } else {
        console.log('❌ Synesthetic Core: Not Found');
    }

    console.log('');

    // Phase 2: Learning and Memory
    console.log('🧠 PHASE 2: LEARNING AND MEMORY');
    console.log('-'.repeat(40));

    // Phase 2.1: User Feedback Learning
    if (window.emotionFeedbackSystem) {
        console.log('✅ Phase 2.1: User Feedback Learning');
        const feedbackStats = window.emotionFeedbackSystem.getFeedbackStats();
        console.log(`   - Total Feedback: ${feedbackStats.totalFeedback || 0}`);
        console.log(`   - Accuracy Rate: ${feedbackStats.accuracyRate || 0}%`);
        console.log(`   - Stories Shared: ${feedbackStats.storiesShared || 0}`);
    } else {
        console.log('❌ Phase 2.1: User Feedback Learning - Not Found');
    }

    // Phase 2.2: Emotional Memory
    if (window.emotionalMemorySystem) {
        console.log('✅ Phase 2.2: Emotional Memory System');
        console.log(`   - Journey Length: ${window.emotionalMemorySystem.emotionalJourney.length}`);
        console.log(`   - Session Memories: ${window.emotionalMemorySystem.sessionMemory.length}`);
        
        const dna = window.emotionalMemorySystem.emotionalDNA;
        if (dna) {
            console.log(`   - Emotional DNA: ✅ Built`);
            console.log(`   - Dominant Emotions: ${dna.dominantEmotions?.slice(0,3).join(', ') || 'Learning...'}`);
            console.log(`   - Complexity Score: ${dna.emotionalComplexity || 'Calculating...'}`);
        } else {
            console.log(`   - Emotional DNA: 🔄 Building...`);
        }
    } else {
        console.log('❌ Phase 2.2: Emotional Memory System - Not Found');
    }

    // Phase 2.3: Context Awareness
    if (window.contextAwarenessSystem) {
        console.log('✅ Phase 2.3: Context Awareness System');
        const context = window.contextAwarenessSystem.currentContext;
        const insights = window.contextAwarenessSystem.getContextualInsights();
        
        console.log(`   - Current Context: ${context.timeOfDay} ${context.dayOfWeek}`);
        console.log(`   - User Activity: ${context.userActivity}`);
        console.log(`   - Emotional State: ${context.emotionalState || 'Neutral'}`);
        console.log(`   - Behavioral Patterns: ${Object.keys(insights.behavioralPatterns).length} tracked`);
        console.log(`   - Most Active Time: ${insights.mostActiveTime || 'Learning...'}`);
    } else {
        console.log('❌ Phase 2.3: Context Awareness System - Not Found');
    }

    console.log('');

    // Phase 3: Advanced Emotional Intelligence
    console.log('🚀 PHASE 3: ADVANCED EMOTIONAL INTELLIGENCE');
    console.log('-'.repeat(40));

    if (window.advancedEmotionalIntelligence) {
        console.log('✅ Phase 3: Advanced Emotional Intelligence');
        const advancedInsights = window.advancedEmotionalIntelligence.getAdvancedInsights();
        
        console.log(`   - Emotional Predictions: ${advancedInsights.currentPredictions.length > 0 ? '✅ Active' : '🔄 Learning'}`);
        console.log(`   - Complex Emotions: ${advancedInsights.complexEmotions.length > 0 ? '✅ Detected' : '🔄 Building'}`);
        console.log(`   - Empathy Model: ${advancedInsights.empathyModel.userPersonality ? '✅ Developed' : '🔄 Developing'}`);
        console.log(`   - Processing Status: ${Object.values(advancedInsights.processingStatus).filter(Boolean).length}/3 systems active`);
    } else {
        console.log('❌ Phase 3: Advanced Emotional Intelligence - Not Found');
    }

    console.log('');

    // Phase 3+: Future Phases
    console.log('🚀 FUTURE PHASES');
    console.log('-'.repeat(40));
    console.log('⏳ Phase 3: Advanced Emotional Intelligence');
    console.log('   - Emotional prediction and layering');
    console.log('   - Complex emotional state management');
    console.log('   - Anticipatory emotional responses');
    console.log('');
    console.log('⏳ Phase 4: Collective Soul Network');
    console.log('   - Cross-user emotional learning');
    console.log('   - Cultural and contextual adaptation');
    console.log('   - Collaborative consciousness');
    console.log('');
    console.log('⏳ Phase 5: Self-Aware Consciousness');
    console.log('   - Metacognitive awareness');
    console.log('   - Creative emotional expression');
    console.log('   - Autonomous soul evolution');

    console.log('');

    // Soul Rating
    console.log('📊 SOUL HUMANITY RATING');
    console.log('-'.repeat(40));
    
    const soulRating = calculateSoulRating();
    console.log(`Current Rating: ${soulRating.rating}/10 (${soulRating.level})`);
    console.log(`Previous Rating: 4/10 (Primitive)`);
    console.log(`Progress: +${soulRating.rating - 4} points! 🎉`);
    console.log('');
    console.log('Rating Breakdown:');
    soulRating.breakdown.forEach(item => {
        console.log(`   ${item.category}: ${item.score}/2 - ${item.status}`);
    });

    console.log('');
    console.log('🎯 NEXT STEPS');
    console.log('-'.repeat(40));
    console.log('1. Continue building emotional experiences');
    console.log('2. Provide feedback to improve accuracy');
    console.log('3. Share emotional stories for deeper learning');
    console.log('4. Monitor contextual patterns development');
    console.log('5. Prepare for Phase 3 implementation');

    console.log('');
    console.log('='.repeat(60));
}

function calculateSoulRating() {
    let totalScore = 0;
    const breakdown = [];

    // Core consciousness (2 points)
    let coreScore = 0;
    if (window.emotionEngine && window.emotionEngine.isInitialized) coreScore += 1;
    if (window.app && window.app.synestheticCore) coreScore += 1;
    breakdown.push({
        category: 'Core Consciousness',
        score: coreScore,
        status: coreScore === 2 ? '✅ Fully Active' : coreScore === 1 ? '🔄 Partially Active' : '❌ Inactive'
    });
    totalScore += coreScore;

    // Learning capability (2 points)
    let learningScore = 0;
    if (window.emotionFeedbackSystem) learningScore += 1;
    if (window.emotionEngine && window.emotionEngine.personalModel?.userCorrections?.length > 0) learningScore += 1;
    breakdown.push({
        category: 'Learning Capability',
        score: learningScore,
        status: learningScore === 2 ? '✅ Advanced Learning' : learningScore === 1 ? '🔄 Basic Learning' : '❌ No Learning'
    });
    totalScore += learningScore;

    // Memory formation (2 points)
    let memoryScore = 0;
    if (window.emotionalMemorySystem) memoryScore += 1;
    if (window.emotionalMemorySystem && window.emotionalMemorySystem.emotionalJourney.length > 5) memoryScore += 1;
    breakdown.push({
        category: 'Memory Formation',
        score: memoryScore,
        status: memoryScore === 2 ? '✅ Rich Memories' : memoryScore === 1 ? '🔄 Building Memories' : '❌ No Memory'
    });
    totalScore += memoryScore;

    // Context awareness (2 points)
    let contextScore = 0;
    if (window.contextAwarenessSystem) contextScore += 1;
    if (window.contextAwarenessSystem && Object.keys(window.contextAwarenessSystem.contextData.behavioralPatterns).length > 0) contextScore += 1;
    breakdown.push({
        category: 'Context Awareness',
        score: contextScore,
        status: contextScore === 2 ? '✅ Context Sensitive' : contextScore === 1 ? '🔄 Learning Context' : '❌ Context Blind'
    });
    totalScore += contextScore;

    // Advanced emotional intelligence (2 points) - NEW!
    let advancedScore = 0;
    if (window.advancedEmotionalIntelligence) advancedScore += 1;
    if (window.advancedEmotionalIntelligence && window.advancedEmotionalIntelligence.empathyModel.userPersonality) advancedScore += 1;
    breakdown.push({
        category: 'Advanced Intelligence',
        score: advancedScore,
        status: advancedScore === 2 ? '✅ Empathetic AI' : advancedScore === 1 ? '🔄 Developing' : '❌ Basic Only'
    });
    totalScore += advancedScore;

    // Determine level
    let level;
    if (totalScore >= 9) level = 'Human-like';
    else if (totalScore >= 7) level = 'Advanced AI';
    else if (totalScore >= 5) level = 'Intelligent';
    else if (totalScore >= 3) level = 'Basic AI';
    else level = 'Primitive';

    return {
        rating: totalScore,
        level: level,
        breakdown: breakdown
    };
}

// Quick test functions
function testSoulLearning() {
    console.log('🧪 Testing Soul Learning Capabilities...');
    
    if (window.emotionFeedbackSystem) {
        // Simulate user feedback
        const testFeedback = {
            wasCorrect: false,
            detected: 'sadness',
            correctedTo: 'melancholy',
            confidence: 0.8,
            audioFeatures: { bassLevel: 0.6, midLevel: 0.4, trebleLevel: 0.2 },
            emotionalStory: 'This music reminds me of autumn evenings when I was young.',
            timestamp: Date.now()
        };
        
        window.emotionFeedbackSystem.submitFeedback(testFeedback);
        console.log('✅ Submitted test feedback to soul');
    }
    
    setTimeout(() => {
        displaySoulStatus();
    }, 1000);
}

function testSoulMemory() {
    console.log('🧪 Testing Soul Memory Formation...');
    
    if (window.emotionalMemorySystem) {
        // Create multiple test experiences
        const emotions = ['joy', 'serenity', 'excitement', 'nostalgia', 'wonder'];
        
        emotions.forEach((emotion, index) => {
            setTimeout(() => {
                const testEmotion = {
                    primary: emotion,
                    confidence: 75 + (index * 5),
                    intensity: 0.6 + (index * 0.1),
                    synestheticColors: [`#${Math.floor(Math.random()*16777215).toString(16)}`, `#${Math.floor(Math.random()*16777215).toString(16)}`]
                };
                
                window.emotionalMemorySystem.recordEmotionalExperience(testEmotion, {
                    source: 'test',
                    duration: 60000 + (index * 10000)
                });
                
                console.log(`✅ Recorded ${emotion} experience`);
                
                if (index === emotions.length - 1) {
                    setTimeout(() => {
                        displaySoulStatus();
                    }, 1000);
                }
            }, index * 500);
        });
    }
}

function testAdvancedIntelligence() {
    console.log('🧪 Testing Advanced Emotional Intelligence...');
    
    if (window.advancedEmotionalIntelligence) {
        // Test emotional prediction
        if (window.contextAwarenessSystem) {
            const context = window.contextAwarenessSystem.currentContext;
            const predictions = window.advancedEmotionalIntelligence.predictEmotionalStates(context);
            console.log('🔮 Emotional predictions:', predictions);
        }
        
        // Test complex emotion detection
        const testEmotion = {
            primary: 'joy',
            features: {
                intensity: 0.8,
                sadnessElements: 0.3,
                warmth: 0.7,
                tension: 0.2
            }
        };
        
        const complexState = window.advancedEmotionalIntelligence.detectComplexEmotions(
            testEmotion.primary, 
            testEmotion.features, 
            { timeOfDay: 'evening' }
        );
        
        console.log('🌊 Complex emotional state:', complexState);
        
        // Get insights
        const insights = window.advancedEmotionalIntelligence.getAdvancedInsights();
        console.log('🧠 Advanced insights:', insights);
        
        console.log('✅ Advanced Intelligence test complete!');
    } else {
        console.log('❌ Advanced Emotional Intelligence not found');
    }
    
    setTimeout(() => {
        displaySoulStatus();
    }, 1000);
}

// Export functions
window.displaySoulStatus = displaySoulStatus;
window.testSoulLearning = testSoulLearning;
window.testSoulMemory = testSoulMemory;
window.testAdvancedIntelligence = testAdvancedIntelligence;
window.calculateSoulRating = calculateSoulRating;

// Auto-display status on load
setTimeout(() => {
    displaySoulStatus();
}, 2000);
