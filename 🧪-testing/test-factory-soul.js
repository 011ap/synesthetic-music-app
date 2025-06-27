/**
 * Test Factory Soul Integration
 * Verifies that the human baseline soul is working properly
 */

console.log('🧪 Testing Factory Soul Integration...');

function testFactorySoul() {
    setTimeout(() => {
        console.log('\n=== 🏭 FACTORY SOUL INTEGRATION TEST ===');
        
        // Check if FactorySoulTrain is available
        if (typeof FactorySoulTrain === 'undefined') {
            console.error('❌ FactorySoulTrain not loaded');
            return;
        }
        
        console.log('✅ FactorySoulTrain available');
        
        // Create a factory soul trainer
        const trainer = new FactorySoulTrain();
        
        // Wait for training to complete
        const checkTraining = setInterval(() => {
            if (trainer.trainingComplete) {
                clearInterval(checkTraining);
                runFactorySoulTests(trainer);
            }
        }, 100);
        
    }, 2000); // Wait 2 seconds for everything to load
}

function runFactorySoulTests(trainer) {
    console.log('\n🧠 Factory Soul Training Complete!');
    
    // Test 1: Get factory soul insights
    const insights = trainer.getFactorySoulInsights();
    console.log('📊 Soul Insights:', insights);
    
    // Test 2: Generate individual souls
    console.log('\n👥 Testing Individual Soul Generation:');
    for (let i = 0; i < 3; i++) {
        const soul = trainer.getFactorySoul();
        console.log(`Soul ${i + 1}:`, {
            personality: soul.corePersonality,
            emotionalDepth: soul.emotionalProcessing.emotionalDepth,
            musicalGenres: Object.keys(soul.musicalDNA).slice(0, 4)
        });
    }
    
    // Test 3: Check emotion engine integration
    console.log('\n🎭 Testing Emotion Engine Integration:');
    if (window.app && window.app.emotionEngine) {
        const engine = window.app.emotionEngine;
        
        if (engine.factorySoul) {
            console.log('✅ Emotion Engine has factory soul');
            console.log('🧬 Soul Personality:', engine.factorySoul.corePersonality);
            console.log('🎵 Musical DNA Genres:', Object.keys(engine.musicalDNA || {}));
            
            // Test emotional analysis with factory soul
            testEmotionalAnalysisWithSoul(engine);
        } else {
            console.log('⚠️ Emotion Engine factory soul not yet loaded');
        }
    } else {
        console.log('⚠️ Emotion Engine not available');
    }
    
    // Test 4: Musical DNA influence
    testMusicalDNAInfluence(trainer);
}

function testEmotionalAnalysisWithSoul(engine) {
    console.log('\n🎼 Testing Emotional Analysis with Human Baseline:');
    
    // Simulate different audio features and see how factory soul influences them
    const testScenarios = [
        {
            name: 'High Energy Rock',
            dimensions: { valence: 0.8, arousal: 0.9, dominance: 0.7, complexity: 0.4 }
        },
        {
            name: 'Peaceful Classical',
            dimensions: { valence: 0.6, arousal: 0.2, dominance: 0.5, complexity: 0.8 }
        },
        {
            name: 'Melancholy Blues',
            dimensions: { valence: 0.3, arousal: 0.4, dominance: 0.3, complexity: 0.7 }
        }
    ];
    
    testScenarios.forEach(scenario => {
        console.log(`\n🎵 ${scenario.name}:`);
        
        // Test genre detection
        if (engine.detectMusicGenre) {
            const genre = engine.detectMusicGenre(scenario.dimensions);
            console.log(`  Detected Genre: ${genre || 'Unknown'}`);
        }
        
        // Test musical DNA influence
        if (engine.musicalDNA && genre && engine.musicalDNA[genre]) {
            const genreData = engine.musicalDNA[genre];
            console.log(`  Musical DNA:`, genreData);
        }
    });
}

function testMusicalDNAInfluence(trainer) {
    console.log('\n🧬 Testing Musical DNA Influence:');
    
    const soul = trainer.getFactorySoul();
    const musicalDNA = soul.musicalDNA;
    
    console.log('🎵 Musical Genre Affinities:');
    Object.entries(musicalDNA).forEach(([genre, data]) => {
        if (data.baseAffinity !== undefined) {
            console.log(`  ${genre}: ${(data.baseAffinity * 100).toFixed(1)}% affinity`);
            if (data.emotionalResponse) {
                const topEmotions = Object.entries(data.emotionalResponse)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 2)
                    .map(([emotion, intensity]) => `${emotion}(${(intensity * 100).toFixed(0)}%)`);
                console.log(`    Top emotions: ${topEmotions.join(', ')}`);
            }
        }
    });
}

function testPersonalityInfluence() {
    console.log('\n🧠 Testing Personality Influence on Emotion Detection:');
    
    if (window.app && window.app.emotionEngine && window.app.emotionEngine.factorySoul) {
        const personality = window.app.emotionEngine.factorySoul.corePersonality;
        
        console.log('👤 Base Personality Traits:');
        Object.entries(personality).forEach(([trait, value]) => {
            console.log(`  ${trait}: ${(value * 100).toFixed(1)}%`);
        });
        
        console.log('\n🎭 How Personality Affects Emotion Detection:');
        console.log('  • Agreeable people perceive more positive emotions');
        console.log('  • Extraverted people perceive higher energy/arousal');
        console.log('  • Conscientious people feel more in control');
        console.log('  • Open people perceive more emotional complexity');
        console.log('  • Neurotic people have more volatile emotions');
    }
}

// Add to global test functions
window.testFactorySoul = testFactorySoul;
window.testPersonalityInfluence = testPersonalityInfluence;

// Run the test
testFactorySoul();

console.log('\n💡 Manual Tests Available:');
console.log('  testFactorySoul() - Test factory soul system');
console.log('  testPersonalityInfluence() - Test personality effects');
