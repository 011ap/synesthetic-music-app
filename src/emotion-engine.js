/**
 * 🧠 EMOTION ENGINE - ADVANCED AI CONSCIOUSNESS
 * Revolutionary emotion detection using advanced audio analysis
 * The core intelligence that understands human emotional complexity
 */

class EmotionEngine {
    constructor(coreApp) {
        this.coreApp = coreApp;
        this.isInitialized = false;
        
        // Advanced audio analysis configuration
        this.audioFeatures = {
            spectralCentroid: 0,
            spectralRolloff: 0,
            spectralFlatness: 0,
            mfcc: new Array(13).fill(0),
            chroma: new Array(12).fill(0),
            tempo: 0,
            rms: 0,
            zcr: 0
        };
        
        // Emotional intelligence model
        this.emotionalModel = {
            valence: 0,      // Positive vs Negative emotion
            arousal: 0,      // High vs Low energy
            dominance: 0,    // Control vs Submission
            complexity: 0    // Emotional depth/sophistication
        };
        
        // Personal learning system
        this.personalModel = {
            emotionHistory: [],
            userCorrections: [],
            personalityProfile: null,
            adaptationRate: 0.1
        };
        
        // Emotion categories with sophisticated mapping
        this.emotionCategories = this.initializeEmotionCategories();
        
        console.log('🎭 Emotion Engine initialized - Ready for consciousness analysis');
        this.initialize();
    }

    /**
     * Initialize the emotion engine with advanced capabilities
     */
    async initialize() {
        try {
            // Initialize Meyda for advanced audio feature extraction
            if (typeof Meyda !== 'undefined') {
                this.meydaAnalyzer = Meyda.createMeydaAnalyzer({
                    audioContext: null, // Will be set when audio starts
                    source: null,       // Will be set when audio starts
                    bufferSize: 2048,
                    featureExtractors: [
                        'spectralCentroid',
                        'spectralRolloff', 
                        'spectralFlatness',
                        'mfcc',
                        'chroma',
                        'rms',
                        'zcr'
                    ],
                    callback: (features) => this.processAudioFeatures(features)
                });
                console.log('🔬 Advanced audio analysis initialized with Meyda');
            }
            
            // Load personal emotional model if available
            await this.loadPersonalModel();
            
            // Initialize TensorFlow.js model (optional - will work without it for basic functionality)
            this.initializeAIModel().catch(error => {
                console.warn('⚠️ TensorFlow.js model initialization failed - using rule-based analysis:', error);
                this.model = null;
                this.isModelTrained = false;
            });
            
            this.isInitialized = true;
            console.log('✨ Emotion Engine fully operational');
            
        } catch (error) {
            console.error('❌ Emotion Engine initialization failed:', error);
            this.isInitialized = false;
        }
    }

    /**
     * Initialize comprehensive emotion categories
     */
    initializeEmotionCategories() {
        return {
            // Primary emotions with advanced descriptors
            primary: {
                joy: {
                    name: 'Joy',
                    variants: ['Euphoria', 'Bliss', 'Delight', 'Elation', 'Exhilaration'],
                    colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4'],
                    arousal: 0.8,
                    valence: 0.9,
                    dominance: 0.7
                },
                sadness: {
                    name: 'Sadness', 
                    variants: ['Melancholy', 'Grief', 'Sorrow', 'Despair', 'Wistfulness'],
                    colors: ['#4169E1', '#6495ED', '#87CEEB', '#B0C4DE'],
                    arousal: 0.2,
                    valence: 0.1,
                    dominance: 0.3
                },
                anger: {
                    name: 'Anger',
                    variants: ['Rage', 'Fury', 'Irritation', 'Indignation', 'Wrath'],
                    colors: ['#DC143C', '#B22222', '#8B0000', '#FF0000'],
                    arousal: 0.9,
                    valence: 0.2,
                    dominance: 0.8
                },
                fear: {
                    name: 'Fear',
                    variants: ['Terror', 'Anxiety', 'Panic', 'Dread', 'Apprehension'],
                    colors: ['#2F4F4F', '#696969', '#778899', '#708090'],
                    arousal: 0.8,
                    valence: 0.2,
                    dominance: 0.2
                },
                surprise: {
                    name: 'Surprise',
                    variants: ['Astonishment', 'Wonder', 'Amazement', 'Bewilderment'],
                    colors: ['#FFD700', '#FFFF00', '#ADFF2F', '#7FFF00'],
                    arousal: 0.7,
                    valence: 0.6,
                    dominance: 0.5
                },
                disgust: {
                    name: 'Disgust',
                    variants: ['Revulsion', 'Loathing', 'Aversion', 'Repugnance'],
                    colors: ['#8FBC8F', '#9ACD32', '#6B8E23', '#556B2F'],
                    arousal: 0.5,
                    valence: 0.2,
                    dominance: 0.6
                }
            },
            
            // Complex emotional states (combinations)
            complex: {
                nostalgia: {
                    name: 'Nostalgic Longing',
                    description: 'Bittersweet remembrance of the past',
                    colors: ['#DDA0DD', '#D8BFD8', '#E6E6FA', '#F0E68C'],
                    components: ['sadness', 'joy'],
                    arousal: 0.4,
                    valence: 0.6,
                    dominance: 0.5
                },
                awe: {
                    name: 'Transcendent Awe',
                    description: 'Overwhelming wonder at something greater',
                    colors: ['#4169E1', '#1E90FF', '#87CEEB', '#F0F8FF'],
                    components: ['surprise', 'joy'],
                    arousal: 0.6,
                    valence: 0.8,
                    dominance: 0.3
                },
                determination: {
                    name: 'Fierce Determination',
                    description: 'Unwavering resolve and focused power',
                    colors: ['#DC143C', '#FF6347', '#FF4500', '#FF8C00'],
                    components: ['anger', 'joy'],
                    arousal: 0.9,
                    valence: 0.7,
                    dominance: 0.9
                },
                serenity: {
                    name: 'Serene Peace',
                    description: 'Perfect calm and inner tranquility',
                    colors: ['#98FB98', '#90EE90', '#87CEEB', '#E0FFFF'],
                    components: ['joy'],
                    arousal: 0.2,
                    valence: 0.8,
                    dominance: 0.6
                },
                passion: {
                    name: 'Passionate Fire',
                    description: 'Intense emotional and creative energy',
                    colors: ['#FF1493', '#DC143C', '#FF6347', '#FF4500'],
                    components: ['joy', 'anger'],
                    arousal: 0.95,
                    valence: 0.8,
                    dominance: 0.8
                },
                melancholy: {
                    name: 'Beautiful Melancholy',
                    description: 'Profound sadness with aesthetic beauty',
                    colors: ['#663399', '#9370DB', '#8A2BE2', '#9932CC'],
                    components: ['sadness'],
                    arousal: 0.3,
                    valence: 0.4,
                    dominance: 0.4
                }
            }
        };
    }

    /**
     * Main emotion analysis function
     */
    analyze(audioData) {
        if (!this.isInitialized || !audioData) {
            return this.getDefaultEmotionalState();
        }

        // Extract advanced audio features
        const features = this.extractAudioFeatures(audioData);
        
        // Update internal audio features
        this.updateAudioFeatures(features);
        
        // Analyze emotional dimensions
        const emotionalDimensions = this.analyzeEmotionalDimensions(features);
        
        // Map to specific emotions
        const detectedEmotions = this.mapToEmotions(emotionalDimensions);
        
        // Apply personal learning adjustments
        const personalizedEmotions = this.applyPersonalLearning(detectedEmotions);
        
        // Create final emotional state
        const emotionalState = this.createEmotionalState(personalizedEmotions, features);
        
        // Store for learning
        this.storeEmotionalDataPoint(emotionalState, features);
        
        return emotionalState;
    }

    /**
     * Extract comprehensive audio features
     */
    extractAudioFeatures(audioData) {
        const features = {
            // Basic frequency analysis
            bassLevel: this.calculateFrequencyRange(audioData, 0, 0.1),
            midLevel: this.calculateFrequencyRange(audioData, 0.1, 0.4), 
            trebleLevel: this.calculateFrequencyRange(audioData, 0.4, 1.0),
            totalEnergy: this.calculateTotalEnergy(audioData),
            
            // Advanced features
            spectralCentroid: this.calculateSpectralCentroid(audioData),
            spectralRolloff: this.calculateSpectralRolloff(audioData),
            spectralFlatness: this.calculateSpectralFlatness(audioData),
            zeroCrossingRate: this.calculateZeroCrossingRate(audioData),
            
            // Rhythm and tempo features
            tempo: this.estimateTempo(audioData),
            rhythmComplexity: this.calculateRhythmComplexity(audioData),
            
            // Harmonic features
            harmonicity: this.calculateHarmonicity(audioData),
            dissonance: this.calculateDissonance(audioData)
        };

        return features;
    }

    /**
     * Calculate frequency range energy
     */
    calculateFrequencyRange(audioData, startRatio, endRatio) {
        const startIndex = Math.floor(audioData.length * startRatio);
        const endIndex = Math.floor(audioData.length * endRatio);
        let sum = 0;
        
        for (let i = startIndex; i < endIndex; i++) {
            sum += audioData[i];
        }
        
        return sum / (endIndex - startIndex);
    }

    /**
     * Calculate total energy
     */
    calculateTotalEnergy(audioData) {
        let sum = 0;
        for (let i = 0; i < audioData.length; i++) {
            sum += audioData[i];
        }
        return sum / audioData.length;
    }

    /**
     * Calculate spectral centroid (brightness)
     */
    calculateSpectralCentroid(audioData) {
        let weightedSum = 0;
        let magnitudeSum = 0;
        
        for (let i = 0; i < audioData.length; i++) {
            weightedSum += i * audioData[i];
            magnitudeSum += audioData[i];
        }
        
        return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0;
    }

    /**
     * Calculate spectral rolloff
     */
    calculateSpectralRolloff(audioData) {
        const totalEnergy = this.calculateTotalEnergy(audioData);
        const threshold = totalEnergy * 0.85;
        let cumulativeEnergy = 0;
        
        for (let i = 0; i < audioData.length; i++) {
            cumulativeEnergy += audioData[i];
            if (cumulativeEnergy >= threshold) {
                return i / audioData.length;
            }
        }
        
        return 1.0;
    }

    /**
     * Calculate spectral flatness (noisiness)
     */
    calculateSpectralFlatness(audioData) {
        let geometricMean = 1;
        let arithmeticMean = 0;
        let validBins = 0;
        
        for (let i = 1; i < audioData.length; i++) {
            if (audioData[i] > 0) {
                geometricMean *= Math.pow(audioData[i], 1.0 / audioData.length);
                arithmeticMean += audioData[i];
                validBins++;
            }
        }
        
        arithmeticMean /= validBins;
        return arithmeticMean > 0 ? geometricMean / arithmeticMean : 0;
    }

    /**
     * Calculate zero crossing rate
     */
    calculateZeroCrossingRate(audioData) {
        let crossings = 0;
        for (let i = 1; i < audioData.length; i++) {
            if ((audioData[i] >= 128 && audioData[i-1] < 128) || 
                (audioData[i] < 128 && audioData[i-1] >= 128)) {
                crossings++;
            }
        }
        return crossings / (audioData.length - 1);
    }

    /**
     * Estimate tempo (simplified)
     */
    estimateTempo(audioData) {
        // Simplified tempo estimation based on energy fluctuations
        const energyDifferences = [];
        for (let i = 1; i < audioData.length; i++) {
            energyDifferences.push(Math.abs(audioData[i] - audioData[i-1]));
        }
        
        // Find dominant periodicity (simplified)
        const avgDifference = energyDifferences.reduce((a, b) => a + b, 0) / energyDifferences.length;
        return Math.min(200, Math.max(60, avgDifference * 2)); // BPM range 60-200
    }

    /**
     * Calculate rhythm complexity
     */
    calculateRhythmComplexity(audioData) {
        // Measure variability in energy levels
        const energyVariance = this.calculateVariance(audioData);
        return Math.min(1.0, energyVariance / 10000); // Normalized complexity
    }

    /**
     * Calculate harmonicity
     */
    calculateHarmonicity(audioData) {
        // Simplified harmonicity based on spectral regularity
        const peaks = this.findSpectralPeaks(audioData);
        return peaks.length > 0 ? Math.min(1.0, peaks.length / 10) : 0;
    }

    /**
     * Calculate dissonance
     */
    calculateDissonance(audioData) {
        // Simplified dissonance calculation
        const spectralFlatness = this.calculateSpectralFlatness(audioData);
        return spectralFlatness; // Higher flatness = more dissonant
    }

    /**
     * Find spectral peaks
     */
    findSpectralPeaks(audioData) {
        const peaks = [];
        const threshold = this.calculateTotalEnergy(audioData) * 0.5;
        
        for (let i = 1; i < audioData.length - 1; i++) {
            if (audioData[i] > threshold && 
                audioData[i] > audioData[i-1] && 
                audioData[i] > audioData[i+1]) {
                peaks.push(i);
            }
        }
        
        return peaks;
    }

    /**
     * Calculate variance
     */
    calculateVariance(data) {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
        return variance;
    }

    /**
     * Analyze emotional dimensions from audio features
     */
    analyzeEmotionalDimensions(features) {
        // Valence (positive vs negative emotion)
        const valence = this.calculateValence(features);
        
        // Arousal (high vs low energy)
        const arousal = this.calculateArousal(features);
        
        // Dominance (control vs submission)
        const dominance = this.calculateDominance(features);
        
        // Complexity (emotional sophistication)
        const complexity = this.calculateComplexity(features);
        
        return { valence, arousal, dominance, complexity };
    }

    /**
     * Calculate valence (emotional positivity)
     */
    calculateValence(features) {
        // Higher harmonicity, mid-range energy = more positive
        let valence = 0.5; // Start neutral
        
        // Harmonicity contribution
        valence += features.harmonicity * 0.3;
        
        // Energy balance contribution
        const energyBalance = 1 - Math.abs(features.totalEnergy / 255 - 0.5);
        valence += energyBalance * 0.2;
        
        // Spectral brightness contribution
        const brightness = features.spectralCentroid / features.totalEnergy;
        if (brightness > 0.3 && brightness < 0.8) {
            valence += 0.2;
        }
        
        // Rhythm complexity (moderate complexity = positive)
        if (features.rhythmComplexity > 0.3 && features.rhythmComplexity < 0.7) {
            valence += 0.1;
        }
        
        return Math.min(1.0, Math.max(0.0, valence));
    }

    /**
     * Calculate arousal (emotional energy)
     */
    calculateArousal(features) {
        let arousal = 0;
        
        // Total energy contribution
        arousal += (features.totalEnergy / 255) * 0.4;
        
        // Tempo contribution
        arousal += Math.min(1.0, features.tempo / 160) * 0.3;
        
        // High frequency energy contribution
        arousal += (features.trebleLevel / 255) * 0.2;
        
        // Rhythm complexity contribution
        arousal += features.rhythmComplexity * 0.1;
        
        return Math.min(1.0, Math.max(0.0, arousal));
    }

    /**
     * Calculate dominance (sense of control)
     */
    calculateDominance(features) {
        let dominance = 0.5; // Start neutral
        
        // Bass energy contribution (more bass = more dominant)
        dominance += (features.bassLevel / 255) * 0.3;
        
        // Low dissonance = more controlled
        dominance += (1 - features.dissonance) * 0.2;
        
        // Spectral centroid in mid-range = balanced control
        const centroidNormalized = features.spectralCentroid / 255;
        if (centroidNormalized > 0.3 && centroidNormalized < 0.7) {
            dominance += 0.2;
        }
        
        // Rhythmic regularity = control
        if (features.rhythmComplexity < 0.5) {
            dominance += 0.1;
        }
        
        return Math.min(1.0, Math.max(0.0, dominance));
    }

    /**
     * Calculate emotional complexity
     */
    calculateComplexity(features) {
        let complexity = 0;
        
        // Spectral complexity
        complexity += features.spectralFlatness * 0.3;
        
        // Rhythm complexity
        complexity += features.rhythmComplexity * 0.3;
        
        // Harmonic complexity (moderate harmonicity = complex)
        if (features.harmonicity > 0.3 && features.harmonicity < 0.8) {
            complexity += 0.2;
        }
        
        // Frequency range distribution
        const frequencySpread = this.calculateFrequencySpread(features);
        complexity += frequencySpread * 0.2;
        
        return Math.min(1.0, Math.max(0.0, complexity));
    }

    /**
     * Calculate frequency spread
     */
    calculateFrequencySpread(features) {
        const total = features.bassLevel + features.midLevel + features.trebleLevel;
        if (total === 0) return 0;
        
        const bassRatio = features.bassLevel / total;
        const midRatio = features.midLevel / total;
        const trebleRatio = features.trebleLevel / total;
        
        // More even distribution = higher spread
        const variance = Math.pow(bassRatio - 0.33, 2) + 
                        Math.pow(midRatio - 0.33, 2) + 
                        Math.pow(trebleRatio - 0.33, 2);
        
        return 1 - (variance / 0.67); // Normalized
    }

    /**
     * Map emotional dimensions to specific emotions
     */
    mapToEmotions(dimensions) {
        const { valence, arousal, dominance, complexity } = dimensions;
        
        // Find best matching primary emotion
        let bestMatch = null;
        let bestScore = 0;
        
        Object.entries(this.emotionCategories.primary).forEach(([key, emotion]) => {
            const score = this.calculateEmotionMatchScore(dimensions, emotion);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = { key, emotion, type: 'primary' };
            }
        });
        
        // Check complex emotions if complexity is high
        if (complexity > 0.6) {
            Object.entries(this.emotionCategories.complex).forEach(([key, emotion]) => {
                const score = this.calculateEmotionMatchScore(dimensions, emotion);
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = { key, emotion, type: 'complex' };
                }
            });
        }
        
        return {
            primary: bestMatch,
            confidence: bestScore,
            dimensions: dimensions,
            alternativeMatches: this.findAlternativeMatches(dimensions, bestMatch)
        };
    }

    /**
     * Calculate emotion match score
     */
    calculateEmotionMatchScore(dimensions, emotion) {
        const valenceDiff = Math.abs(dimensions.valence - emotion.valence);
        const arousalDiff = Math.abs(dimensions.arousal - emotion.arousal);
        const dominanceDiff = Math.abs(dimensions.dominance - emotion.dominance);
        
        // Calculate similarity (lower difference = higher similarity)
        const similarity = 1 - ((valenceDiff + arousalDiff + dominanceDiff) / 3);
        
        return Math.max(0, similarity);
    }

    /**
     * Find alternative emotion matches
     */
    findAlternativeMatches(dimensions, bestMatch) {
        const alternatives = [];
        const allEmotions = {
            ...this.emotionCategories.primary,
            ...this.emotionCategories.complex
        };
        
        Object.entries(allEmotions).forEach(([key, emotion]) => {
            if (bestMatch && key !== bestMatch.key) {
                const score = this.calculateEmotionMatchScore(dimensions, emotion);
                if (score > 0.5) {
                    alternatives.push({ key, emotion, score });
                }
            }
        });
        
        return alternatives.sort((a, b) => b.score - a.score).slice(0, 3);
    }

    /**
     * Apply personal learning adjustments
     */
    applyPersonalLearning(detectedEmotions) {
        if (!this.personalModel.emotionCorrections || this.personalModel.emotionCorrections.length === 0) {
            return detectedEmotions;
        }
        
        console.log('🧠 Phase 2: Applying personal learning with', this.personalModel.emotionCorrections.length, 'corrections');
        
        // Find similar audio patterns in corrections
        const similarCorrections = this.findSimilarCorrections(detectedEmotions);
        
        if (similarCorrections.length > 0) {
            console.log('🧠 Phase 2: Found', similarCorrections.length, 'similar corrections');
            
            // Apply the most relevant correction
            const mostRelevant = similarCorrections[0];
            const correctedEmotion = this.emotionCategories.primary[mostRelevant.correctEmotion] || 
                                   this.emotionCategories.complex[mostRelevant.correctEmotion];
            
            if (correctedEmotion) {
                console.log('🧠 Phase 2: Applying learned correction:', mostRelevant.correctEmotion);
                
                // Blend original detection with learned correction
                const blendFactor = this.personalModel.adaptationRate * mostRelevant.weight;
                
                return {
                    primary: { 
                        key: mostRelevant.correctEmotion, 
                        emotion: correctedEmotion, 
                        type: correctedEmotion.components ? 'complex' : 'primary' 
                    },
                    confidence: Math.min(1.0, detectedEmotions.confidence + blendFactor),
                    dimensions: detectedEmotions.dimensions,
                    alternativeMatches: detectedEmotions.alternativeMatches,
                    learnedFromUser: true  // Mark as user-learned
                };
            }
        }
        
        return detectedEmotions;
    }

    /**
     * Find similar audio corrections
     */
    findSimilarCorrections(detectedEmotions) {
        if (!this.personalModel.emotionCorrections) return [];
        
        const audioFeatures = detectedEmotions.primary?.emotion?.features || {};
        
        const similarities = this.personalModel.emotionCorrections.map(correction => {
            const similarity = this.calculateAudioSimilarity(audioFeatures, correction.features);
            return {
                ...correction,
                similarity: similarity
            };
        });
        
        // Sort by similarity and return top matches
        return similarities
            .filter(item => item.similarity > 0.6)  // Minimum similarity threshold
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 3);  // Top 3 matches
    }

    /**
     * Calculate audio feature similarity
     */
    calculateAudioSimilarity(features1, features2) {
        if (!features1 || !features2) return 0;
        
        const keys = ['energy', 'bass', 'mid', 'treble'];
        let similarity = 0;
        let validKeys = 0;
        
        keys.forEach(key => {
            if (features1[key] !== undefined && features2[key] !== undefined) {
                const diff = Math.abs(features1[key] - features2[key]);
                similarity += Math.max(0, 1 - diff);
                validKeys++;
            }
        });
        
        return validKeys > 0 ? similarity / validKeys : 0;
    }

    /**
     * Find relevant user corrections
     */
    findRelevantCorrections(detectedEmotions) {
        return this.personalModel.userCorrections.filter(correction => {
            // Find corrections for similar emotional states
            return this.calculateEmotionSimilarity(correction.original, detectedEmotions) > 0.7;
        });
    }

    /**
     * Calculate similarity between two emotional states
     */
    calculateEmotionSimilarity(emotion1, emotion2) {
        if (!emotion1.dimensions || !emotion2.dimensions) return 0;
        
        const valenceDiff = Math.abs(emotion1.dimensions.valence - emotion2.dimensions.valence);
        const arousalDiff = Math.abs(emotion1.dimensions.arousal - emotion2.dimensions.arousal);
        const dominanceDiff = Math.abs(emotion1.dimensions.dominance - emotion2.dimensions.dominance);
        
        return 1 - ((valenceDiff + arousalDiff + dominanceDiff) / 3);
    }

    /**
     * Create final emotional state object
     */
    createEmotionalState(emotions, features) {
        const primaryEmotion = emotions.primary;
        
        if (!primaryEmotion) {
            return this.getDefaultEmotionalState();
        }
        
        return {
            primary: primaryEmotion.emotion.name,
            confidence: Math.round(emotions.confidence * 100),
            depth: Math.round(emotions.dimensions.complexity * 100),
            memoryResonance: this.calculateMemoryResonance(primaryEmotion, features),
            synestheticColors: this.generateSynestheticColors(primaryEmotion, emotions.dimensions),
            intensity: emotions.dimensions.arousal,
            valence: emotions.dimensions.valence,
            dominance: emotions.dimensions.dominance,
            complexity: emotions.dimensions.complexity,
            alternatives: emotions.alternativeMatches,
            audioFeatures: features,
            // Legacy compatibility features for existing visualizations
            features: {
                energy: emotions.dimensions.arousal,
                bass: features.bassLevel / 255,
                mid: features.midLevel / 255,
                treble: features.trebleLevel / 255
            },
            timestamp: Date.now()
        };
    }

    /**
     * Calculate memory resonance based on personal history
     */
    calculateMemoryResonance(emotion, features) {
        // Check if this emotion/context has been experienced before
        const similarExperiences = this.personalModel.emotionHistory.filter(exp => 
            exp.primary === emotion.emotion.name
        );
        
        if (similarExperiences.length === 0) {
            return Math.round(Math.random() * 30); // New experience, low resonance
        }
        
        // Calculate resonance based on frequency and recency of similar experiences
        const avgResonance = similarExperiences.reduce((sum, exp) => sum + exp.memoryResonance, 0) / similarExperiences.length;
        const recencyBonus = this.calculateRecencyBonus(similarExperiences);
        
        return Math.round(Math.min(100, avgResonance + recencyBonus));
    }

    /**
     * Calculate recency bonus for memory resonance
     */
    calculateRecencyBonus(experiences) {
        const now = Date.now();
        const recentExperiences = experiences.filter(exp => 
            (now - exp.timestamp) < (24 * 60 * 60 * 1000) // Within 24 hours
        );
        
        return recentExperiences.length * 10; // 10 points per recent experience
    }

    /**
     * Generate synesthetic colors based on emotion and dimensions
     */
    generateSynestheticColors(emotion, dimensions) {
        let colors = [...emotion.emotion.colors];
        
        // Adjust colors based on emotional dimensions
        if (dimensions.arousal > 0.7) {
            // High arousal - add more vibrant colors
            colors = this.intensifyColors(colors);
        }
        
        if (dimensions.valence > 0.7) {
            // High valence - add warmer colors
            colors = this.addWarmColors(colors);
        } else if (dimensions.valence < 0.3) {
            // Low valence - add cooler colors  
            colors = this.addCoolColors(colors);
        }
        
        if (dimensions.complexity > 0.6) {
            // High complexity - blend more colors
            colors = this.blendComplexColors(colors);
        }
        
        // Apply personal color preferences if available
        if (this.coreApp.personalEmotionalDNA.emotionColorMap[emotion.emotion.name]) {
            colors.unshift(this.coreApp.personalEmotionalDNA.emotionColorMap[emotion.emotion.name]);
        }
        
        return colors.slice(0, 5); // Limit to 5 colors max
    }

    /**
     * Intensify colors for high arousal
     */
    intensifyColors(colors) {
        return colors.map(color => this.adjustColorIntensity(color, 1.2));
    }

    /**
     * Add warm colors for positive valence
     */
    addWarmColors(colors) {
        const warmColors = ['#FFD700', '#FFA500', '#FF6347', '#FF69B4'];
        return [...colors, ...warmColors.slice(0, 2)];
    }

    /**
     * Add cool colors for negative valence
     */
    addCoolColors(colors) {
        const coolColors = ['#4169E1', '#6495ED', '#87CEEB', '#B0C4DE'];
        return [...colors, ...coolColors.slice(0, 2)];
    }

    /**
     * Blend complex colors for high complexity
     */
    blendComplexColors(colors) {
        const complexColors = ['#9370DB', '#8A2BE2', '#9932CC', '#BA55D3'];
        return [...colors, ...complexColors.slice(0, 2)];
    }

    /**
     * Adjust color intensity
     */
    adjustColorIntensity(hexColor, factor) {
        // Simple color intensity adjustment (placeholder)
        return hexColor; // Would implement actual color manipulation
    }

    /**
     * Store emotional data point for learning
     */
    storeEmotionalDataPoint(emotionalState, features) {
        // Add to emotion history
        this.personalModel.emotionHistory.push({
            ...emotionalState,
            features: features
        });
        
        // Keep only last 1000 entries
        if (this.personalModel.emotionHistory.length > 1000) {
            this.personalModel.emotionHistory = this.personalModel.emotionHistory.slice(-1000);
        }
        
        // Save to localStorage periodically
        if (this.personalModel.emotionHistory.length % 10 === 0) {
            this.savePersonalModel();
        }
    }

    /**
     * Process audio features from Meyda (if available)
     */
    processAudioFeatures(features) {
        if (features && this.isInitialized) {
            this.audioFeatures = { ...this.audioFeatures, ...features };
        }
    }

    /**
     * Update internal audio features
     */
    updateAudioFeatures(features) {
        this.audioFeatures = { ...this.audioFeatures, ...features };
    }

    /**
     * Load personal emotional model
     */
    async loadPersonalModel() {
        try {
            const stored = localStorage.getItem('emotionEnginePersonalModel');
            if (stored) {
                this.personalModel = { ...this.personalModel, ...JSON.parse(stored) };
                console.log('📚 Personal emotional model loaded');
            }
        } catch (error) {
            console.error('Error loading personal model:', error);
        }
    }

    /**
     * Save personal emotional model
     */
    savePersonalModel() {
        try {
            localStorage.setItem('emotionEnginePersonalModel', JSON.stringify(this.personalModel));
        } catch (error) {
            console.error('Error saving personal model:', error);
        }
    }

    /**
     * Get all emotion keys (primary + complex)
     */
    getAllEmotionKeys() {
        const primary = Object.keys(this.emotionCategories.primary);
        const complex = Object.keys(this.emotionCategories.complex);
        return [...primary, ...complex];
    }

    /**
     * Initialize AI model (TensorFlow.js neural network) with dynamic output size
     */
    async initializeAIModel() {
        try {
            if (typeof tf === 'undefined') {
                // Load TensorFlow.js if not loaded
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.15.0/dist/tf.min.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                    
                    // Timeout after 10 seconds
                    setTimeout(() => reject(new Error('TensorFlow.js load timeout')), 10000);
                });
            }
            
            // Dynamically determine output size
            this.emotionKeys = this.getAllEmotionKeys();
            const outputSize = this.emotionKeys.length;
            this.model = tf.sequential();
            this.model.add(tf.layers.dense({ inputShape: [8], units: 24, activation: 'relu' }));
            this.model.add(tf.layers.dense({ units: 24, activation: 'relu' }));
            this.model.add(tf.layers.dense({ units: outputSize, activation: 'softmax' }));
            this.model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });
            this.isModelTrained = false;
            console.log('🤖 Neural network model initialized with', outputSize, 'emotions');
            
        } catch (error) {
            console.warn('⚠️ Neural network initialization failed - using rule-based analysis:', error);
            this.model = null;
            this.isModelTrained = false;
        }
    }

    /**
     * Train the neural network on labeled audio features
     * @param {Array} featureArray - Array of feature arrays
     * @param {Array} labelArray - Array of one-hot emotion labels
     */
    async trainNeuralNetwork(featureArray, labelArray, epochs = 30) {
        if (!this.model) await this.initializeAIModel();
        const xs = tf.tensor2d(featureArray);
        const ys = tf.tensor2d(labelArray);
        await this.model.fit(xs, ys, { epochs });
        this.isModelTrained = true;
        xs.dispose();
        ys.dispose();
        console.log('🧠 Neural network trained on emotion data');
    }

    /**
     * Predict emotion using the neural network
     * @param {Object} features - Extracted audio features
     * @returns {Object} - Predicted emotion info
     */
    async predictEmotionWithNN(features) {
        if (!this.model || !this.isModelTrained) return null;
        // Prepare input: [bass, mid, treble, spectralCentroid, spectralRolloff, spectralFlatness, tempo, energy]
        const input = tf.tensor2d([
            [
                features.bassLevel || features.bass || 0,
                features.midLevel || features.mid || 0,
                features.trebleLevel || features.treble || 0,
                features.spectralCentroid || 0,
                features.spectralRolloff || 0,
                features.spectralFlatness || 0,
                features.tempo || 0,
                features.totalEnergy || features.energy || 0
            ]
        ]);
        const prediction = this.model.predict(input);
        const data = await prediction.data();
        input.dispose();
        prediction.dispose();
        // Map output to emotion keys
        const emotionKeys = this.emotionKeys;
        const maxIdx = data.indexOf(Math.max(...data));
        const key = emotionKeys[maxIdx];
        // Find emotion info
        let emotion = this.emotionCategories.primary[key] || this.emotionCategories.complex[key] || { name: key };
        emotion = { ...emotion, key, confidence: Math.round(data[maxIdx] * 100) };
        return emotion;
    }

    /**
     * Get default emotional state
     */
    getDefaultEmotionalState() {
        return {
            primary: 'Awakening',
            confidence: 0,
            depth: 0,
            memoryResonance: 0,
            synestheticColors: ['#1a1a2e', '#16213e', '#0f3460'],
            intensity: 0,
            valence: 0.5,
            dominance: 0.5,
            complexity: 0,
            alternatives: [],
            timestamp: Date.now()
        };
    }

    /**
     * Public method to add user correction for learning
     */
    addUserCorrection(originalEmotion, correctedEmotion, context) {
        this.personalModel.userCorrections.push({
            original: originalEmotion,
            corrected: correctedEmotion,
            context: context,
            timestamp: Date.now()
        });
        
        // Limit corrections history
        if (this.personalModel.userCorrections.length > 500) {
            this.personalModel.userCorrections = this.personalModel.userCorrections.slice(-500);
        }
        
        this.savePersonalModel();
        console.log('📝 User correction recorded for learning');
    }

    /**
     * Learn from user feedback/correction (called from sidebar)
     * @param {Object} feedback - {correct: boolean, correctLabel?: string}
     */
    learnFromCorrection(feedback) {
        if (feedback.correct) {
            // Optionally reinforce last prediction as correct
            // For now, just log and increment a counter
            this.personalModel.correctCount = (this.personalModel.correctCount || 0) + 1;
            console.log('✅ User confirmed emotion prediction was correct.');
        } else if (feedback.correctLabel) {
            // Save correction for learning
            const lastEmotion = this.personalModel.emotionHistory[this.personalModel.emotionHistory.length - 1];
            this.addUserCorrection(lastEmotion?.primary, feedback.correctLabel, lastEmotion);
            this.personalModel.correctionCount = (this.personalModel.correctionCount || 0) + 1;
            console.log('📝 User provided correction:', feedback.correctLabel);
        }
        // Optionally: update personality profile, retrain, etc.
        this.savePersonalModel();
    }

    /**
     * PHASE 2.5: Learn from user feedback + emotional stories
     */
    learnFromUserFeedback(feedbackData) {
        console.log('🧠 Phase 2.5: Learning from user feedback + story:', feedbackData);
        
        // Add to user corrections for immediate learning
        this.personalModel.userCorrections.push({
            original: feedbackData.detected,
            corrected: feedbackData.correctedTo,
            wasCorrect: feedbackData.wasCorrect,
            audioFeatures: feedbackData.audioFeatures,
            timestamp: feedbackData.timestamp,
            confidence: feedbackData.confidence,
            // 💭 PHASE 2.5: EMOTIONAL STORYTELLING DATA
            emotionalStory: feedbackData.emotionalStory,
            storyAnalysis: feedbackData.storyAnalysis,
            hasStory: feedbackData.hasStory
        });
        
        // If user provided a story, learn from the narrative context
        if (feedbackData.hasStory && feedbackData.storyAnalysis) {
            this.learnFromEmotionalStory(feedbackData);
        }
        
        // If soul was wrong, adjust future predictions
        if (!feedbackData.wasCorrect) {
            console.log('🧠 Phase 2.5: Soul was wrong - learning correction from', 
                       feedbackData.detected, 'to', feedbackData.correctedTo);
            
            // Store feature-emotion correction mapping
            this.addEmotionCorrection(feedbackData.audioFeatures, feedbackData.correctedTo, feedbackData.storyAnalysis);
        } else {
            console.log('🧠 Phase 2.5: Soul was correct - reinforcing', feedbackData.detected);
            
            // Reinforce correct prediction
            this.reinforceCorrectPrediction(feedbackData.audioFeatures, feedbackData.detected, feedbackData.storyAnalysis);
        }
        
        // Update adaptation rate based on learning progress
        this.updateAdaptationRate();
        
        // Save personal model
        this.savePersonalModel();
    }

    /**
     * 💭 PHASE 2.5: Learn from emotional storytelling
     */
    learnFromEmotionalStory(feedbackData) {
        const { storyAnalysis, correctedTo, audioFeatures } = feedbackData;
        
        if (!storyAnalysis) return;
        
        console.log('💭 Learning from emotional story:', storyAnalysis);
        
        // Create story-emotion associations
        if (!this.personalModel.storyEmotionMappings) {
            this.personalModel.storyEmotionMappings = [];
        }
        
        // Store story context with emotion
        this.personalModel.storyEmotionMappings.push({
            emotion: correctedTo,
            sentiment: storyAnalysis.sentiment,
            keywords: storyAnalysis.emotionalKeywords,
            themes: storyAnalysis.themes,
            intensity: storyAnalysis.intensity,
            imagery: storyAnalysis.imagery,
            memories: storyAnalysis.memories,
            audioFeatures: audioFeatures,
            timestamp: Date.now(),
            storyLength: storyAnalysis.wordCount
        });
        
        // Keep only last 50 story mappings to prevent memory bloat
        if (this.personalModel.storyEmotionMappings.length > 50) {
            this.personalModel.storyEmotionMappings = this.personalModel.storyEmotionMappings.slice(-50);
        }
        
        // Learn patterns between story elements and emotions
        this.identifyStoryEmotionPatterns();
    }

    /**
     * Identify patterns between stories and emotions
     */
    identifyStoryEmotionPatterns() {
        if (!this.personalModel.storyEmotionMappings || this.personalModel.storyEmotionMappings.length < 3) {
            return;
        }
        
        // Group by emotion
        const emotionGroups = {};
        this.personalModel.storyEmotionMappings.forEach(mapping => {
            if (!emotionGroups[mapping.emotion]) {
                emotionGroups[mapping.emotion] = [];
            }
            emotionGroups[mapping.emotion].push(mapping);
        });
        
        // Find patterns for each emotion
        const patterns = {};
        Object.entries(emotionGroups).forEach(([emotion, mappings]) => {
            if (mappings.length >= 2) {
                patterns[emotion] = this.analyzeEmotionStoryPattern(mappings);
            }
        });
        
        this.personalModel.storyPatterns = patterns;
        console.log('💭 Story-emotion patterns identified:', patterns);
    }

    /**
     * Analyze story patterns for specific emotion
     */
    analyzeEmotionStoryPattern(mappings) {
        const pattern = {
            commonKeywords: {},
            commonThemes: {},
            avgSentiment: { positive: 0, negative: 0, neutral: 0 },
            avgIntensity: 0,
            memoryTriggers: [],
            visualElements: []
        };
        
        // Analyze common keywords
        mappings.forEach(mapping => {
            Object.entries(mapping.keywords).forEach(([emotion, words]) => {
                if (!pattern.commonKeywords[emotion]) {
                    pattern.commonKeywords[emotion] = {};
                }
                words.forEach(word => {
                    pattern.commonKeywords[emotion][word] = (pattern.commonKeywords[emotion][word] || 0) + 1;
                });
            });
            
            // Analyze themes
            mapping.themes.forEach(theme => {
                pattern.commonThemes[theme.theme] = (pattern.commonThemes[theme.theme] || 0) + theme.matches;
            });
            
            // Average sentiment
            pattern.avgSentiment.positive += mapping.sentiment.positive;
            pattern.avgSentiment.negative += mapping.sentiment.negative;
            pattern.avgSentiment.neutral += mapping.sentiment.neutral;
            
            // Average intensity
            pattern.avgIntensity += mapping.intensity;
            
            // Collect memory triggers and visual elements
            pattern.memoryTriggers.push(...mapping.memories);
            pattern.visualElements.push(...mapping.imagery.visual);
        });
        
        // Calculate averages
        const count = mappings.length;
        pattern.avgSentiment.positive /= count;
        pattern.avgSentiment.negative /= count;
        pattern.avgSentiment.neutral /= count;
        pattern.avgIntensity /= count;
        
        return pattern;
    }

    /**
     * Add emotion correction mapping with story context
     */
    addEmotionCorrection(audioFeatures, correctEmotion, storyAnalysis = null) {
        if (!this.personalModel.emotionCorrections) {
            this.personalModel.emotionCorrections = [];
        }
        
        this.personalModel.emotionCorrections.push({
            features: audioFeatures,
            correctEmotion: correctEmotion,
            timestamp: Date.now(),
            weight: 1.0,
            // 💭 PHASE 2.5: Include story context
            storyContext: storyAnalysis
        });
        
        // Keep only last 100 corrections to prevent memory bloat
        if (this.personalModel.emotionCorrections.length > 100) {
            this.personalModel.emotionCorrections = this.personalModel.emotionCorrections.slice(-100);
        }
    }

    /**
     * Reinforce correct prediction with story context
     */
    reinforceCorrectPrediction(audioFeatures, emotion, storyAnalysis = null) {
        if (!this.personalModel.reinforcements) {
            this.personalModel.reinforcements = [];
        }
        
        this.personalModel.reinforcements.push({
            features: audioFeatures,
            emotion: emotion,
            timestamp: Date.now(),
            weight: 0.5,  // Lower weight than corrections
            // 💭 PHASE 2.5: Include story context
            storyContext: storyAnalysis
        });
        
        // Keep only last 50 reinforcements
        if (this.personalModel.reinforcements.length > 50) {
            this.personalModel.reinforcements = this.personalModel.reinforcements.slice(-50);
        }
    }

    /**
     * Update adaptation rate based on learning progress
     */
    updateAdaptationRate() {
        const totalFeedback = this.personalModel.userCorrections.length;
        const recentFeedback = this.personalModel.userCorrections.filter(
            correction => Date.now() - correction.timestamp < 24 * 60 * 60 * 1000 // Last 24 hours
        );
        
        // Increase adaptation rate if getting frequent corrections
        if (recentFeedback.length > 5) {
            this.personalModel.adaptationRate = Math.min(0.3, this.personalModel.adaptationRate + 0.05);
        } else {
            // Decrease adaptation rate if predictions are stable
            this.personalModel.adaptationRate = Math.max(0.05, this.personalModel.adaptationRate - 0.01);
        }
        
        console.log('🧠 Phase 2: Adaptation rate updated to', this.personalModel.adaptationRate);
    }

    /**
     * Get emotion analysis statistics
     */
    getAnalysisStatistics() {
        return {
            totalAnalyses: this.personalModel.emotionHistory.length,
            uniqueEmotions: new Set(this.personalModel.emotionHistory.map(e => e.primary)).size,
            averageConfidence: this.personalModel.emotionHistory.reduce((sum, e) => sum + e.confidence, 0) / this.personalModel.emotionHistory.length || 0,
            mostFrequentEmotion: this.getMostFrequentEmotion(),
            learningProgress: this.calculateLearningProgress()
        };
    }

    /**
     * Get most frequent emotion
     */
    getMostFrequentEmotion() {
        const emotionCounts = {};
        this.personalModel.emotionHistory.forEach(e => {
            emotionCounts[e.primary] = (emotionCounts[e.primary] || 0) + 1;
        });
        
        return Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
    }

    /**
     * Calculate learning progress
     */
    calculateLearningProgress() {
        if (this.personalModel.emotionHistory.length < 10) return 0;
        
        const recent = this.personalModel.emotionHistory.slice(-50);
        const avgRecentConfidence = recent.reduce((sum, e) => sum + e.confidence, 0) / recent.length;
        
        return Math.min(100, avgRecentConfidence);
    }
}

// Make available globally
window.EmotionEngine = EmotionEngine;
export default EmotionEngine;