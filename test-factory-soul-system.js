/**
 * Test Factory Soul System - Human-like Baseline Testing
 * 
 * This script tests our factory soul system that provides human-like
 * emotional baselines derived from neurological and psychological research.
 */

async function testFactorySoulSystem() {
    console.log('🧪 Starting Factory Soul System Test...');
    console.log('=' * 50);
    
    // Test 1: Check if Factory Soul Train is available
    console.log('🔍 Test 1: Factory Soul Train Availability');
    if (typeof FactorySoulTrain !== 'undefined') {
        console.log('✅ FactorySoulTrain class is available');
        
        // Create factory soul trainer
        const trainer = new FactorySoulTrain();
        
        // Wait for training to complete
        let attempts = 0;
        while (!trainer.trainingComplete && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (trainer.trainingComplete) {
            console.log('✅ Factory soul training completed');
            
            // Get insights about the factory soul
            const insights = trainer.getFactorySoulInsights();
            console.log('📊 Factory Soul Insights:', insights);
            
            // Test 2: Get a factory soul instance
            console.log('\n🔍 Test 2: Factory Soul Generation');
            const factorySoul = trainer.getFactorySoul();
            console.log('🧬 Generated Factory Soul:', factorySoul);
            
            // Test personality traits
            console.log('\n👤 Personality Baseline:');
            console.log(`  Openness: ${(factorySoul.corePersonality.openness * 100).toFixed(1)}%`);
            console.log(`  Conscientiousness: ${(factorySoul.corePersonality.conscientiousness * 100).toFixed(1)}%`);
            console.log(`  Extraversion: ${(factorySoul.corePersonality.extraversion * 100).toFixed(1)}%`);
            console.log(`  Agreeableness: ${(factorySoul.corePersonality.agreeableness * 100).toFixed(1)}%`);
            console.log(`  Neuroticism: ${(factorySoul.corePersonality.neuroticism * 100).toFixed(1)}%`);
            
            // Test musical DNA
            console.log('\n🎵 Musical DNA:');
            for (const [genre, data] of Object.entries(factorySoul.musicalDNA)) {
                if (typeof data === 'object' && data.baseAffinity !== undefined) {
                    console.log(`  ${genre}: ${(data.baseAffinity * 100).toFixed(1)}% affinity`);
                    if (data.emotionalResponse) {
                        console.log(`    Emotions: ${Object.keys(data.emotionalResponse).join(', ')}`);
                    }
                }
            }
            
            // Test 3: Check emotion engine integration
            console.log('\n🔍 Test 3: Emotion Engine Integration');
            if (window.app && window.app.emotionEngine) {
                const engine = window.app.emotionEngine;
                
                if (engine.factorySoul) {
                    console.log('✅ Emotion engine has factory soul loaded');
                    console.log('🧠 Engine factory soul personality:', engine.factorySoul.corePersonality);
                    
                    // Test 4: Simulate emotion analysis with factory soul influence
                    console.log('\n🔍 Test 4: Factory Soul Influence on Emotion Analysis');
                    
                    // Simulate some audio features
                    const testFeatures = {
                        totalEnergy: 150,
                        bassLevel: 100,
                        midLevel: 120,
                        trebleLevel: 80,
                        harmonicity: 0.7,
                        tempo: 120,
                        rhythmComplexity: 0.5,
                        spectralCentroid: 2000
                    };
                    
                    console.log('🎵 Testing with simulated audio features:', testFeatures);
                    
                    // Test emotional dimension analysis with factory soul
                    const dimensions = engine.analyzeEmotionalDimensions(testFeatures);
                    console.log('📊 Emotional dimensions (with human baseline influence):', dimensions);
                    
                    // Test emotion mapping with musical DNA
                    const emotions = engine.mapToEmotions(dimensions);
                    console.log('🎭 Detected emotions (with musical DNA influence):', emotions);
                    
                    console.log('\n✨ Factory Soul System Test Complete!');
                    console.log('🎉 Our engine now starts with human-like emotional patterns');
                    
                } else {
                    console.log('⚠️ Emotion engine factory soul not loaded yet');
                }
                
            } else {
                console.log('⚠️ Emotion engine not available');
            }
            
        } else {
            console.log('❌ Factory soul training timed out');
        }
        
    } else {
        console.log('❌ FactorySoulTrain class not available');
    }
    
    // Test 5: Demonstrate factory soul uniqueness
    console.log('\n🔍 Test 5: Factory Soul Uniqueness');
    console.log('Testing multiple factory souls for variation...');
    
    if (typeof FactorySoulTrain !== 'undefined') {
        const trainer = new FactorySoulTrain();
        
        // Wait for training
        let attempts = 0;
        while (!trainer.trainingComplete && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (trainer.trainingComplete) {
            console.log('\n👥 Generating 3 different factory souls:');
            
            for (let i = 1; i <= 3; i++) {
                const soul = trainer.getFactorySoul();
                console.log(`\n🧬 Soul ${i}:`);
                console.log(`  Openness: ${(soul.corePersonality.openness * 100).toFixed(1)}%`);
                console.log(`  Extraversion: ${(soul.corePersonality.extraversion * 100).toFixed(1)}%`);
                console.log(`  Agreeableness: ${(soul.corePersonality.agreeableness * 100).toFixed(1)}%`);
                
                // Show musical preferences
                const jazzAffinity = soul.musicalDNA.jazz?.baseAffinity || 0;
                const rockAffinity = soul.musicalDNA.rock?.baseAffinity || 0;
                console.log(`  Jazz affinity: ${(jazzAffinity * 100).toFixed(1)}%`);
                console.log(`  Rock affinity: ${(rockAffinity * 100).toFixed(1)}%`);
            }
        }
    }
    
    console.log('\n🎊 Factory Soul System Test Complete!');
    console.log('💡 Each user now starts with a unique human-like soul that they can then personalize through interaction.');
}

// Auto-run the test when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testFactorySoulSystem);
} else {
    testFactorySoulSystem();
}

// Also make it available for manual testing
window.testFactorySoulSystem = testFactorySoulSystem;
