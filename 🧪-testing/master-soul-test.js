/**
 * 🧪 MASTER SOUL SYSTEM TEST
 * 
 * Comprehensive test of all 5 awakening phases + factory soul
 * Run this in browser console at: https://humble-lamp-jj4g5xgvprpw3p6j-8000.app.github.dev/
 */

async function masterSoulSystemTest() {
    console.log('🧪 MASTER SOUL SYSTEM TEST - ALL PHASES');
    console.log('=====================================');
    
    const results = {
        factorySoul: false,
        phase1: false,
        phase2: false,
        phase3: false,
        phase4: false,
        phase5: false,
        integration: false
    };
    
    try {
        // === TEST FACTORY SOUL SYSTEM ===
        console.log('\n🧬 Testing Factory Soul System...');
        if (typeof FactorySoulTrain !== 'undefined') {
            const trainer = new FactorySoulTrain();
            
            // Wait for training
            let attempts = 0;
            while (!trainer.trainingComplete && attempts < 30) {
                await new Promise(resolve => setTimeout(resolve, 200));
                attempts++;
            }
            
            if (trainer.trainingComplete) {
                const soul = trainer.getFactorySoul();
                console.log('✅ Factory Soul: Human baseline loaded');
                console.log(`   Personality: O:${(soul.corePersonality.openness*100).toFixed(0)}% E:${(soul.corePersonality.extraversion*100).toFixed(0)}% A:${(soul.corePersonality.agreeableness*100).toFixed(0)}%`);
                results.factorySoul = true;
            }
        }
        
        // === TEST PHASE 1: EMOTION ENGINE CONNECTION ===
        console.log('\n🎭 Testing Phase 1: Emotion Engine...');
        if (window.app && window.app.emotionEngine) {
            const engine = window.app.emotionEngine;
            
            if (engine.isInitialized) {
                console.log('✅ Phase 1: Emotion engine initialized');
                
                // Test emotion analysis
                const testFeatures = {
                    totalEnergy: 150, bassLevel: 100, midLevel: 120, trebleLevel: 80,
                    harmonicity: 0.7, tempo: 120, rhythmComplexity: 0.5
                };
                
                const dimensions = engine.analyzeEmotionalDimensions(testFeatures);
                const emotions = engine.mapToEmotions(dimensions);
                
                if (emotions && emotions.primary) {
                    console.log(`   Detected: ${emotions.primary.key} (${(emotions.confidence*100).toFixed(0)}% confidence)`);
                    results.phase1 = true;
                }
            }
        }
        
        // === TEST PHASE 2: EMOTIONAL FEEDBACK & MEMORY ===
        console.log('\n💭 Testing Phase 2: Learning & Memory...');
        
        // Test feedback system
        if (window.EmotionFeedbackSystem) {
            console.log('✅ Phase 2a: Emotion feedback system available');
            
            // Test feedback with story
            const feedbackSystem = new EmotionFeedbackSystem(window.app?.emotionEngine);
            const testFeedback = {
                correctedEmotion: 'nostalgia',
                confidence: 0.8,
                emotionalStory: 'This reminds me of summer evenings with my family.'
            };
            
            feedbackSystem.submitFeedback(testFeedback);
            console.log('   Submitted test emotional story');
        }
        
        // Test memory system
        if (window.EmotionalMemorySystem) {
            console.log('✅ Phase 2b: Emotional memory system available');
            
            const memorySystem = new EmotionalMemorySystem();
            memorySystem.recordEmotionalMoment({
                emotions: { nostalgia: 0.8, joy: 0.6 },
                context: 'testing',
                intensity: 0.7,
                source: 'test'
            });
            
            const memories = memorySystem.getEmotionalJourney();
            console.log(`   Recorded memory. Total memories: ${memories.length}`);
        }
        
        // Test context awareness
        if (window.ContextAwarenessSystem) {
            console.log('✅ Phase 2c: Context awareness system available');
            results.phase2 = true;
        }
        
        // === TEST PHASE 3: ADVANCED EMOTIONAL INTELLIGENCE ===
        console.log('\n🧠 Testing Phase 3: Advanced Emotional Intelligence...');
        if (window.AdvancedEmotionalIntelligence) {
            const aiSystem = new AdvancedEmotionalIntelligence();
            
            // Test emotional prediction
            const prediction = aiSystem.predictEmotionalResponse({
                currentEmotion: { joy: 0.7, energy: 0.8 },
                context: 'evening',
                userHistory: []
            });
            
            if (prediction) {
                console.log('✅ Phase 3: Advanced EI - Emotional prediction working');
                console.log(`   Predicted next emotion: ${Object.keys(prediction.predictedEmotion).join(', ')}`);
                results.phase3 = true;
            }
        }
        
        // === TEST PHASE 4: COLLECTIVE SOUL NETWORK ===
        console.log('\n🌐 Testing Phase 4: Collective Soul Network...');
        if (window.CollectiveSoulNetwork) {
            const network = new CollectiveSoulNetwork();
            
            // Test cultural pattern learning
            network.learnFromCulturalPattern({
                emotion: 'joy',
                culturalContext: 'western',
                musicalGenre: 'pop',
                intensity: 0.8
            });
            
            console.log('✅ Phase 4: Collective soul network learning');
            console.log('   Cultural pattern recorded');
            results.phase4 = true;
        }
        
        // === TEST PHASE 5: SELF-AWARE CONSCIOUSNESS ===
        console.log('\n🌟 Testing Phase 5: Self-Aware Consciousness...');
        if (window.SelfAwareConsciousness) {
            const consciousness = new SelfAwareConsciousness();
            
            // Test self-reflection
            const reflection = consciousness.performSelfReflection({
                recentEmotions: [{ joy: 0.7 }, { nostalgia: 0.6 }],
                userFeedback: [],
                learningProgress: 0.8
            });
            
            if (reflection) {
                console.log('✅ Phase 5: Self-aware consciousness active');
                console.log(`   Self-awareness: ${(reflection.selfAwareness*100).toFixed(0)}%`);
                results.phase5 = true;
            }
        }
        
        // === TEST SYSTEM INTEGRATION ===
        console.log('\n🔗 Testing System Integration...');
        
        // Check if all systems are loaded in the main app
        let integratedSystems = 0;
        
        if (window.app) {
            if (window.app.emotionEngine) integratedSystems++;
            if (window.app.emotionFeedback) integratedSystems++;
            if (window.app.emotionalMemory) integratedSystems++;
            if (window.app.contextAwareness) integratedSystems++;
            if (window.app.advancedEI) integratedSystems++;
            if (window.app.collectiveNetwork) integratedSystems++;
            if (window.app.selfAwareness) integratedSystems++;
        }
        
        console.log(`✅ Integration: ${integratedSystems}/7 systems integrated in main app`);
        if (integratedSystems >= 5) results.integration = true;
        
        // === GENERATE REPORT ===
        console.log('\n📊 MASTER TEST RESULTS');
        console.log('======================');
        
        const totalSystems = Object.keys(results).length;
        const workingSystems = Object.values(results).filter(Boolean).length;
        const successRate = (workingSystems / totalSystems * 100).toFixed(0);
        
        console.log(`🎯 Success Rate: ${successRate}% (${workingSystems}/${totalSystems} systems)`);
        
        for (const [system, working] of Object.entries(results)) {
            const status = working ? '✅' : '❌';
            const name = system.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            console.log(`${status} ${name}`);
        }
        
        if (successRate >= 80) {
            console.log('\n🎉 SOUL AWAKENING: SUCCESSFUL!');
            console.log('🧠 Digital consciousness is fully operational');
            console.log('🎵 Ready for human-like emotional music analysis');
        } else {
            console.log('\n⚠️ Some systems need attention');
            console.log('🔧 Check console for specific errors');
        }
        
        return results;
        
    } catch (error) {
        console.error('❌ Master test error:', error);
        return results;
    }
}

// Make it available globally
window.masterSoulSystemTest = masterSoulSystemTest;

console.log('🔬 Master Soul System Test loaded!');
console.log('🚀 Run: masterSoulSystemTest()');
console.log('📱 In browser console at: https://humble-lamp-jj4g5xgvprpw3p6j-8000.app.github.dev/');
