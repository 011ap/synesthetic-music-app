/**
 * 🧠 PHASE 3: ADVANCED EMOTIONAL INTELLIGENCE
 * Making the soul predict, anticipate, and understand complex emotions
 */

class AdvancedEmotionalIntelligence {
    constructor() {
        this.emotionalPredictions = [];
        this.emotionalTransitions = [];
        this.complexEmotionalStates = new Map();
        this.empathyModel = {
            userPersonality: null,
            emotionalPatterns: {},
            triggers: {},
            preferences: {}
        };
        
        this.initialize();
        console.log('🧠 Phase 3: Advanced Emotional Intelligence initialized');
    }

    /**
     * Initialize advanced emotional intelligence
     */
    initialize() {
        this.loadAdvancedModel();
        this.setupEmotionalPrediction();
        this.setupComplexEmotionHandling();
        this.setupEmpathySystem();
        
        // Start advanced processing
        this.startAdvancedProcessing();
    }

    /**
     * 🔮 PHASE 3.1: EMOTIONAL PREDICTION AND ANTICIPATION
     */
    
    /**
     * Predict likely emotional states based on context and history
     */
    predictEmotionalStates(currentContext) {
        const predictions = [];
        
        // Get context from awareness system
        const contextData = window.contextAwarenessSystem ? 
            window.contextAwarenessSystem.getContextualInsights() : null;
            
        // Get emotional memory
        const memoryData = window.emotionalMemorySystem ? {
            recentJourney: window.emotionalMemorySystem.getEmotionalJourney ? 
                window.emotionalMemorySystem.getEmotionalJourney() : [],
            emotionalDNA: window.emotionalMemorySystem.emotionalDNA
        } : null;

        if (!contextData || !memoryData) {
            return this.getBasicPredictions(currentContext);
        }

        // Analyze temporal patterns
        const timeBasedPredictions = this.predictFromTimePatterns(currentContext, contextData);
        
        // Analyze sequence patterns
        const sequencePredictions = this.predictFromSequencePatterns(memoryData.recentJourney);
        
        // Analyze personal DNA patterns
        const dnaPredictions = this.predictFromEmotionalDNA(memoryData.emotionalDNA);
        
        // Combine and weight predictions
        const combinedPredictions = this.combinePredictions([
            { predictions: timeBasedPredictions, weight: 0.3 },
            { predictions: sequencePredictions, weight: 0.4 },
            { predictions: dnaPredictions, weight: 0.3 }
        ]);

        console.log('🔮 Phase 3.1: Emotional predictions:', combinedPredictions);
        return combinedPredictions;
    }

    /**
     * Predict emotions based on time patterns
     */
    predictFromTimePatterns(currentContext, contextData) {
        const timeKey = `${currentContext.timeOfDay}_${currentContext.dayOfWeek}`;
        const patterns = contextData.behavioralPatterns[timeKey] || {};
        
        // Convert activity patterns to emotional predictions
        const predictions = [];
        Object.entries(patterns).forEach(([activity, count]) => {
            const emotionProbs = this.activityToEmotionMapping(activity, count);
            predictions.push(...emotionProbs);
        });

        return this.normalizePredictions(predictions);
    }

    /**
     * Predict emotions based on recent emotional sequence
     */
    predictFromSequencePatterns(recentJourney) {
        if (!recentJourney || recentJourney.length < 3) {
            return [];
        }

        const sequence = recentJourney.slice(-3).map(exp => exp.emotion);
        const predictions = [];

        // Look for transition patterns
        const lastTransition = `${sequence[sequence.length-2]}_to_${sequence[sequence.length-1]}`;
        const possibleNext = this.getCommonTransitions(lastTransition);
        
        predictions.push(...possibleNext);

        // Detect emotional cycles
        const cyclePredictions = this.detectEmotionalCycles(sequence);
        predictions.push(...cyclePredictions);

        return this.normalizePredictions(predictions);
    }

    /**
     * Predict emotions based on emotional DNA
     */
    predictFromEmotionalDNA(emotionalDNA) {
        if (!emotionalDNA) return [];

        const predictions = [];

        // Use dominant emotions as base probability
        if (emotionalDNA.dominantEmotions) {
            emotionalDNA.dominantEmotions.forEach((emotion, index) => {
                predictions.push({
                    emotion: emotion,
                    probability: 0.8 - (index * 0.2),
                    source: 'personality'
                });
            });
        }

        // Factor in emotional complexity
        if (emotionalDNA.emotionalComplexity > 0.7) {
            // High complexity users are more likely to feel complex emotions
            predictions.push(
                { emotion: 'bittersweet', probability: 0.6, source: 'complexity' },
                { emotion: 'melancholy', probability: 0.5, source: 'complexity' },
                { emotion: 'contemplation', probability: 0.4, source: 'complexity' }
            );
        }

        return predictions;
    }

    /**
     * 🌊 PHASE 3.2: COMPLEX EMOTIONAL LAYERING
     */
    
    /**
     * Detect and handle complex, multi-layered emotions
     */
    detectComplexEmotions(primaryEmotion, audioFeatures, context) {
        const complexState = {
            primary: primaryEmotion,
            secondary: [],
            layers: [],
            conflicts: [],
            intensity: audioFeatures.intensity || 0.7,
            complexity: 0
        };

        // Detect secondary emotions
        complexState.secondary = this.detectSecondaryEmotions(primaryEmotion, audioFeatures);
        
        // Detect emotional layers (depth, background emotions)
        complexState.layers = this.detectEmotionalLayers(primaryEmotion, context);
        
        // Detect conflicting emotions (bittersweet, etc.)
        complexState.conflicts = this.detectEmotionalConflicts(primaryEmotion, audioFeatures);
        
        // Calculate overall complexity
        complexState.complexity = this.calculateEmotionalComplexity(complexState);

        console.log('🌊 Phase 3.2: Complex emotional state detected:', complexState);
        return complexState;
    }

    /**
     * Detect secondary emotions that layer with the primary
     */
    detectSecondaryEmotions(primaryEmotion, audioFeatures) {
        const secondaryMap = {
            'joy': ['excitement', 'gratitude', 'love'],
            'sadness': ['longing', 'nostalgia', 'empathy'],
            'anger': ['frustration', 'passion', 'determination'],
            'fear': ['anxiety', 'anticipation', 'vigilance'],
            'surprise': ['curiosity', 'wonder', 'confusion'],
            'serenity': ['peace', 'contentment', 'harmony'],
            'melancholy': ['reflection', 'beauty', 'depth']
        };

        const possibleSecondary = secondaryMap[primaryEmotion] || [];
        const detected = [];

        possibleSecondary.forEach(emotion => {
            const probability = this.calculateSecondaryProbability(emotion, audioFeatures);
            if (probability > 0.3) {
                detected.push({ emotion, probability });
            }
        });

        return detected.sort((a, b) => b.probability - a.probability);
    }

    /**
     * Detect emotional layers (background, contextual emotions)
     */
    detectEmotionalLayers(primaryEmotion, context) {
        const layers = [];

        // Time-based emotional layers
        if (context.timeOfDay === 'night') {
            layers.push({ type: 'temporal', emotion: 'introspection', intensity: 0.4 });
        } else if (context.timeOfDay === 'morning') {
            layers.push({ type: 'temporal', emotion: 'anticipation', intensity: 0.3 });
        }

        // Memory-based layers
        if (window.emotionalMemorySystem) {
            const recentMemories = window.emotionalMemorySystem.getRecentEmotionalJourney(5);
            if (recentMemories.length > 0) {
                const memoryEmotion = this.extractMemoryEmotion(recentMemories);
                layers.push({ type: 'memory', emotion: memoryEmotion, intensity: 0.2 });
            }
        }

        return layers;
    }

    /**
     * Detect conflicting or complex emotions (bittersweet, etc.)
     */
    detectEmotionalConflicts(primaryEmotion, audioFeatures) {
        const conflicts = [];

        // Check for bittersweet combinations
        if (primaryEmotion === 'joy' && audioFeatures.sadnessElements > 0.3) {
            conflicts.push({ type: 'bittersweet', emotions: ['joy', 'sadness'], intensity: 0.6 });
        }

        // Check for nostalgic combinations
        if (primaryEmotion === 'melancholy' && audioFeatures.warmth > 0.5) {
            conflicts.push({ type: 'nostalgia', emotions: ['melancholy', 'warmth'], intensity: 0.7 });
        }

        // Check for anticipatory anxiety
        if (primaryEmotion === 'excitement' && audioFeatures.tension > 0.4) {
            conflicts.push({ type: 'anticipatory_anxiety', emotions: ['excitement', 'anxiety'], intensity: 0.5 });
        }

        return conflicts;
    }

    /**
     * 💕 PHASE 3.3: EMOTIONAL EMPATHY AND MIRRORING
     */
    
    /**
     * Develop empathetic understanding of user's emotional patterns
     */
    developEmpathy(emotionalHistory, userFeedback) {
        if (!emotionalHistory || emotionalHistory.length < 5) return;

        // Analyze user's emotional personality
        this.empathyModel.userPersonality = this.analyzeEmotionalPersonality(emotionalHistory);
        
        // Learn emotional triggers
        this.empathyModel.triggers = this.learnEmotionalTriggers(emotionalHistory);
        
        // Understand preferences
        this.empathyModel.preferences = this.learnEmotionalPreferences(userFeedback);
        
        console.log('💕 Phase 3.3: Empathy model updated:', this.empathyModel);
    }

    /**
     * Analyze user's emotional personality from their history
     */
    analyzeEmotionalPersonality(history) {
        const personality = {
            emotionalRange: this.calculateEmotionalRange(history),
            intensityPreference: this.calculateIntensityPreference(history),
            complexityTolerance: this.calculateComplexityTolerance(history),
            emotionalStability: this.calculateEmotionalStability(history),
            openness: this.calculateEmotionalOpenness(history)
        };

        return personality;
    }

    /**
     * Generate empathetic response based on user's emotional state
     */
    generateEmpathicResponse(currentEmotion, userContext) {
        if (!this.empathyModel.userPersonality) return null;

        const response = {
            understanding: this.generateUnderstanding(currentEmotion),
            support: this.generateSupport(currentEmotion, userContext),
            prediction: this.generateEmpatheticPrediction(currentEmotion),
            recommendation: this.generateRecommendation(currentEmotion, userContext)
        };

        console.log('💕 Phase 3.3: Empathetic response generated:', response);
        return response;
    }

    /**
     * Setup advanced processing loops
     */
    startAdvancedProcessing() {
        // Emotional prediction updates every 30 seconds
        setInterval(() => {
            if (window.contextAwarenessSystem) {
                const currentContext = window.contextAwarenessSystem.currentContext;
                const predictions = this.predictEmotionalStates(currentContext);
                this.emotionalPredictions = predictions;
            }
        }, 30000);

        // Complex emotion analysis for each new emotional experience
        if (window.emotionalMemorySystem) {
            const originalRecord = window.emotionalMemorySystem.recordEmotionalExperience.bind(window.emotionalMemorySystem);
            window.emotionalMemorySystem.recordEmotionalExperience = (emotionalState, context) => {
                // Call original function
                const result = originalRecord(emotionalState, context);
                
                // Add complex emotion analysis
                const complexState = this.detectComplexEmotions(
                    emotionalState.primary, 
                    emotionalState.features || emotionalState, 
                    context
                );
                
                // Store complex state
                this.complexEmotionalStates.set(result.timestamp, complexState);
                
                return result;
            };
        }

        // Empathy development every minute
        setInterval(() => {
            if (window.emotionalMemorySystem && window.emotionFeedbackSystem) {
                this.developEmpathy(
                    window.emotionalMemorySystem.emotionalJourney,
                    window.emotionFeedbackSystem.learningData
                );
            }
        }, 60000);
    }

    /**
     * Helper functions for calculations
     */
    calculateEmotionalRange(history) {
        const uniqueEmotions = new Set(history.map(exp => exp.emotion));
        return uniqueEmotions.size / 12; // Normalize by max possible emotions
    }

    calculateIntensityPreference(history) {
        const avgIntensity = history.reduce((sum, exp) => sum + (exp.intensity || 0.5), 0) / history.length;
        return avgIntensity;
    }

    calculateComplexityTolerance(history) {
        // Users who provide stories have higher complexity tolerance
        const storiesCount = history.filter(exp => exp.context && exp.context.story).length;
        return storiesCount / history.length;
    }

    calculateEmotionalStability(history) {
        if (history.length < 2) return 0.5;
        
        let changes = 0;
        for (let i = 1; i < history.length; i++) {
            if (history[i].emotion !== history[i-1].emotion) {
                changes++;
            }
        }
        
        return 1 - (changes / (history.length - 1)); // Lower changes = higher stability
    }

    calculateEmotionalOpenness(history) {
        // Users who provide feedback and stories are more open
        const feedbackCount = history.filter(exp => exp.context && exp.context.userFeedback).length;
        return feedbackCount / history.length;
    }

    /**
     * Get current advanced intelligence insights
     */
    getAdvancedInsights() {
        return {
            currentPredictions: this.emotionalPredictions,
            complexEmotions: Array.from(this.complexEmotionalStates.entries()).slice(-5),
            empathyModel: this.empathyModel,
            processingStatus: {
                predictionActive: this.emotionalPredictions.length > 0,
                complexityDetection: this.complexEmotionalStates.size > 0,
                empathyDeveloped: this.empathyModel.userPersonality !== null
            }
        };
    }

    /**
     * Save advanced model
     */
    saveAdvancedModel() {
        try {
            const modelData = {
                empathyModel: this.empathyModel,
                emotionalTransitions: this.emotionalTransitions,
                lastUpdated: Date.now()
            };
            
            localStorage.setItem('soulAdvancedIntelligence', JSON.stringify(modelData));
        } catch (error) {
            console.warn('⚠️ Failed to save advanced model:', error);
        }
    }

    /**
     * Load advanced model
     */
    loadAdvancedModel() {
        try {
            const saved = localStorage.getItem('soulAdvancedIntelligence');
            if (saved) {
                const data = JSON.parse(saved);
                this.empathyModel = data.empathyModel || this.empathyModel;
                this.emotionalTransitions = data.emotionalTransitions || [];
                
                console.log('🧠 Phase 3: Loaded advanced intelligence model');
            }
        } catch (error) {
            console.warn('⚠️ Failed to load advanced model:', error);
        }
    }

    // Placeholder helper functions (would be fully implemented)
    getBasicPredictions(context) { return []; }
    combinePredictions(predictionSets) { return []; }
    normalizePredictions(predictions) { return predictions; }
    activityToEmotionMapping(activity, count) { return []; }
    getCommonTransitions(transition) { return []; }
    detectEmotionalCycles(sequence) { return []; }
    calculateSecondaryProbability(emotion, features) { return Math.random() * 0.8; }
    extractMemoryEmotion(memories) { return 'reflection'; }
    calculateEmotionalComplexity(state) { 
        return (state.secondary.length + state.layers.length + state.conflicts.length) / 10; 
    }
    generateUnderstanding(emotion) { return `I understand you're feeling ${emotion}`; }
    generateSupport(emotion, context) { return `That's natural given your context`; }
    generateEmpatheticPrediction(emotion) { return `You might feel ${emotion} transitioning soon`; }
    generateRecommendation(emotion, context) { return `Try focusing on the positive aspects`; }
    setupEmotionalPrediction() {}
    setupComplexEmotionHandling() {}
    setupEmpathySystem() {}
    
    /**
     * Learn emotional triggers from user's emotional history
     */
    learnEmotionalTriggers(emotionalHistory) {
        const triggers = {
            audioFeatures: {},
            timeOfDay: {},
            contextual: {},
            patterns: []
        };

        // Analyze audio feature triggers
        emotionalHistory.forEach(experience => {
            const emotion = experience.emotion?.primary || experience.emotion;
            const features = experience.audioFeatures;
            
            if (emotion && features) {
                if (!triggers.audioFeatures[emotion]) {
                    triggers.audioFeatures[emotion] = {
                        avgEnergy: 0,
                        avgTempo: 0,
                        avgSpectralCentroid: 0,
                        count: 0
                    };
                }
                
                const trigger = triggers.audioFeatures[emotion];
                trigger.avgEnergy = (trigger.avgEnergy * trigger.count + (features.energy || 0.5)) / (trigger.count + 1);
                trigger.avgTempo = (trigger.avgTempo * trigger.count + (features.tempo || 120)) / (trigger.count + 1);
                trigger.avgSpectralCentroid = (trigger.avgSpectralCentroid * trigger.count + (features.spectralCentroid || 1000)) / (trigger.count + 1);
                trigger.count++;
            }
        });

        // Analyze time-based triggers
        emotionalHistory.forEach(experience => {
            const emotion = experience.emotion?.primary || experience.emotion;
            const hour = new Date(experience.timestamp).getHours();
            const timeSlot = hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
            
            if (!triggers.timeOfDay[timeSlot]) triggers.timeOfDay[timeSlot] = {};
            if (!triggers.timeOfDay[timeSlot][emotion]) triggers.timeOfDay[timeSlot][emotion] = 0;
            triggers.timeOfDay[timeSlot][emotion]++;
        });

        return triggers;
    }

    /**
     * Learn emotional preferences from user feedback
     */
    learnEmotionalPreferences(userFeedback) {
        const preferences = {
            favoriteEmotions: {},
            correctionPatterns: {},
            feedbackStyle: 'neutral'
        };

        if (!userFeedback || userFeedback.length === 0) {
            return preferences;
        }

        // Analyze correction patterns
        userFeedback.forEach(feedback => {
            const detected = feedback.detectedEmotion;
            const corrected = feedback.correctedEmotion;
            
            if (detected && corrected && detected !== corrected) {
                const pattern = `${detected}->${corrected}`;
                preferences.correctionPatterns[pattern] = (preferences.correctionPatterns[pattern] || 0) + 1;
            }
            
            // Track favorite emotions (what users correct TO)
            if (corrected) {
                preferences.favoriteEmotions[corrected] = (preferences.favoriteEmotions[corrected] || 0) + 1;
            }
        });

        // Determine feedback style based on correction frequency
        const totalFeedback = userFeedback.length;
        const corrections = userFeedback.filter(f => !f.wasCorrect).length;
        const correctionRate = corrections / totalFeedback;
        
        if (correctionRate > 0.5) {
            preferences.feedbackStyle = 'frequent_corrector';
        } else if (correctionRate > 0.2) {
            preferences.feedbackStyle = 'occasional_corrector';
        } else {
            preferences.feedbackStyle = 'trusting';
        }

        return preferences;
    }
}

// Initialize Phase 3
console.log('🧠 Phase 3: Initializing Advanced Emotional Intelligence...');
window.advancedEmotionalIntelligence = new AdvancedEmotionalIntelligence();

// Export for testing
window.AdvancedEmotionalIntelligence = AdvancedEmotionalIntelligence;
