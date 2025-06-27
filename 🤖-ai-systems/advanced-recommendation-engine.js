/**
 * 🤖 PHASE 3: ADVANCED AI RECOMMENDATION ENGINE
 * Creates intelligent music recommendations based on soul analysis
 */

class AdvancedAIRecommendationEngine {
    constructor() {
        this.musicDatabase = new Map();
        this.userProfile = null;
        this.recommendations = [];
        this.emotionalHistory = [];
        this.contextualPatterns = new Map();
        
        this.initialize();
    }
    
    async initialize() {
        console.log('🤖 Initializing Advanced AI Recommendation Engine...');
        
        // Load user emotional profile
        this.loadUserProfile();
        
        // Initialize music analysis patterns
        this.initializeMusicPatterns();
        
        // Setup recommendation algorithms
        this.setupRecommendationAlgorithms();
        
        // Connect to existing soul systems
        this.connectToSoulSystems();
        
        console.log('✨ AI Recommendation Engine ready!');
    }
    
    loadUserProfile() {
        // Get user profile from soul systems
        if (window.emotionalMemorySystem) {
            this.userProfile = {
                emotionalDNA: window.emotionalMemorySystem.emotionalDNA,
                preferences: window.emotionalMemorySystem.getPersonalizedProfile(),
                listeningHistory: window.emotionalMemorySystem.emotionalJourney
            };
        }
        
        // Supplement with factory soul baseline
        if (window.factorySoulTrain && window.factorySoulTrain.trainingComplete) {
            const factorySoul = window.factorySoulTrain.getFactorySoul();
            this.userProfile = {
                ...this.userProfile,
                factoryBaseline: factorySoul,
                musicalDNA: factorySoul.musicalDNA,
                personalityProfile: factorySoul.corePersonality
            };
        }
    }
    
    initializeMusicPatterns() {
        // Create a comprehensive music analysis pattern database
        this.musicPatterns = {
            // Genre emotional signatures
            genreSignatures: {
                classical: {
                    emotions: ['awe', 'sophistication', 'peace', 'melancholy'],
                    audioFeatures: { tempo: 0.4, energy: 0.3, valence: 0.6, complexity: 0.9 },
                    synestheticColors: ['#E6E6FA', '#9370DB', '#483D8B', '#191970']
                },
                jazz: {
                    emotions: ['sophistication', 'coolness', 'spontaneity', 'groove'],
                    audioFeatures: { tempo: 0.6, energy: 0.5, valence: 0.7, complexity: 0.8 },
                    synestheticColors: ['#B22222', '#FFD700', '#8B4513', '#2F4F4F']
                },
                electronic: {
                    emotions: ['futurism', 'energy', 'innovation', 'trance'],
                    audioFeatures: { tempo: 0.8, energy: 0.9, valence: 0.6, complexity: 0.7 },
                    synestheticColors: ['#00FFFF', '#FF1493', '#7FFF00', '#FF4500']
                },
                ambient: {
                    emotions: ['peace', 'spaciousness', 'meditation', 'flow'],
                    audioFeatures: { tempo: 0.2, energy: 0.2, valence: 0.8, complexity: 0.4 },
                    synestheticColors: ['#F0F8FF', '#E0FFFF', '#B0E0E6', '#87CEEB']
                },
                rock: {
                    emotions: ['power', 'rebellion', 'freedom', 'energy'],
                    audioFeatures: { tempo: 0.7, energy: 0.9, valence: 0.5, complexity: 0.6 },
                    synestheticColors: ['#FF0000', '#000000', '#FFA500', '#8B0000']
                }
            },
            
            // Contextual recommendations
            contextualMoods: {
                morning: {
                    recommended: ['uplifting', 'energetic', 'optimistic'],
                    avoid: ['melancholic', 'dark', 'heavy'],
                    genres: ['pop', 'folk', 'light-classical']
                },
                evening: {
                    recommended: ['relaxing', 'reflective', 'nostalgic'],
                    avoid: ['aggressive', 'chaotic'],
                    genres: ['ambient', 'jazz', 'soft-rock']
                },
                workout: {
                    recommended: ['energetic', 'powerful', 'motivating'],
                    avoid: ['slow', 'melancholic'],
                    genres: ['electronic', 'rock', 'hip-hop']
                },
                focus: {
                    recommended: ['calm', 'flowing', 'minimal'],
                    avoid: ['chaotic', 'distracting'],
                    genres: ['ambient', 'classical', 'lo-fi']
                }
            },
            
            // Emotional therapy patterns
            emotionalTherapy: {
                stress: {
                    progression: ['acknowledgment', 'gradual-calming', 'peace'],
                    musicFlow: [
                        { emotion: 'tension', duration: 0.2 },
                        { emotion: 'release', duration: 0.3 },
                        { emotion: 'calm', duration: 0.5 }
                    ]
                },
                sadness: {
                    progression: ['validation', 'gentle-lift', 'hope'],
                    musicFlow: [
                        { emotion: 'melancholy', duration: 0.3 },
                        { emotion: 'bittersweet', duration: 0.4 },
                        { emotion: 'hope', duration: 0.3 }
                    ]
                },
                energy: {
                    progression: ['awakening', 'building', 'peak-energy'],
                    musicFlow: [
                        { emotion: 'calm', duration: 0.2 },
                        { emotion: 'building', duration: 0.3 },
                        { emotion: 'energetic', duration: 0.5 }
                    ]
                }
            }
        };
    }
    
    setupRecommendationAlgorithms() {
        this.algorithms = {
            // Personality-based recommendations
            personalityMatch: (track, userProfile) => {
                if (!userProfile.personalityProfile) return 0.5;
                
                const personality = userProfile.personalityProfile;
                let score = 0;
                
                // Openness to experience
                if (personality.openness > 0.7 && track.genre === 'experimental') score += 0.3;
                if (personality.openness < 0.3 && track.genre === 'pop') score += 0.2;
                
                // Extraversion
                if (personality.extraversion > 0.6 && track.energy > 0.7) score += 0.2;
                if (personality.extraversion < 0.4 && track.energy < 0.4) score += 0.2;
                
                // Conscientiousness
                if (personality.conscientiousness > 0.7 && track.structure > 0.6) score += 0.1;
                
                // Agreeableness
                if (personality.agreeableness > 0.7 && track.harmony > 0.6) score += 0.1;
                
                // Neuroticism (emotional stability)
                if (personality.neuroticism < 0.3 && track.chaos < 0.3) score += 0.1;
                if (personality.neuroticism > 0.7 && track.emotionalIntensity > 0.6) score += 0.1;
                
                return Math.min(1.0, score);
            },
            
            // Emotional state matching
            emotionalMatch: (track, currentEmotion) => {
                if (!track.emotionalSignature || !currentEmotion) return 0.5;
                
                const emotionDistance = this.calculateEmotionalDistance(
                    track.emotionalSignature,
                    currentEmotion
                );
                
                return 1.0 - emotionDistance;
            },
            
            // Contextual appropriateness
            contextualMatch: (track, context) => {
                const contextPatterns = this.musicPatterns.contextualMoods[context.situation];
                if (!contextPatterns) return 0.5;
                
                let score = 0;
                
                // Check recommended emotions
                for (const emotion of contextPatterns.recommended) {
                    if (track.emotions.includes(emotion)) {
                        score += 0.2;
                    }
                }
                
                // Penalize avoided emotions
                for (const emotion of contextPatterns.avoid) {
                    if (track.emotions.includes(emotion)) {
                        score -= 0.3;
                    }
                }
                
                // Check genre appropriateness
                if (contextPatterns.genres.includes(track.genre)) {
                    score += 0.3;
                }
                
                return Math.max(0, Math.min(1.0, score + 0.5));
            },
            
            // Synesthetic color harmony
            synestheticMatch: (track, userColorPreferences) => {
                if (!track.synestheticColors || !userColorPreferences) return 0.5;
                
                let harmonyScore = 0;
                const trackColors = track.synestheticColors;
                
                for (const trackColor of trackColors) {
                    for (const userColor of userColorPreferences) {
                        const harmony = this.calculateColorHarmony(trackColor, userColor);
                        harmonyScore += harmony;
                    }
                }
                
                return harmonyScore / (trackColors.length * userColorPreferences.length);
            }
        };
    }
    
    connectToSoulSystems() {
        // Listen for emotional updates
        if (window.emotionEngine) {
            window.addEventListener('emotionUpdate', (event) => {
                this.processEmotionalUpdate(event.detail);
            });
        }
        
        // Connect to context awareness
        if (window.contextAwarenessSystem) {
            this.contextualPatterns = window.contextAwarenessSystem.contextData;
        }
        
        // Connect to collective soul network
        if (window.collectiveSoulNetwork) {
            this.collectiveInsights = window.collectiveSoulNetwork.collectiveData;
        }
    }
    
    processEmotionalUpdate(emotionalState) {
        // Add to emotional history
        this.emotionalHistory.push({
            timestamp: Date.now(),
            emotion: emotionalState.primary,
            intensity: emotionalState.intensity,
            confidence: emotionalState.confidence,
            context: this.getCurrentContext()
        });
        
        // Keep only recent history (last 100 emotions)
        if (this.emotionalHistory.length > 100) {
            this.emotionalHistory.shift();
        }
        
        // Generate new recommendations based on current state
        this.generateRecommendations(emotionalState);
    }
    
    generateRecommendations(currentEmotion = null, context = null, options = {}) {
        const {
            count = 10,
            diversity = 0.3,
            therapeutic = false,
            adventurous = 0.1
        } = options;
        
        console.log('🤖 Generating AI recommendations...');
        
        // Get current context if not provided
        if (!context) {
            context = this.getCurrentContext();
        }
        
        // Generate candidate tracks (simulated database)
        const candidates = this.generateCandidateTracks();
        
        // Score each candidate
        const scoredCandidates = candidates.map(track => {
            let totalScore = 0;
            let weights = {
                personality: 0.3,
                emotional: 0.3,
                contextual: 0.2,
                synesthetic: 0.1,
                novelty: adventurous
            };
            
            // Adjust weights for therapeutic mode
            if (therapeutic) {
                weights = {
                    personality: 0.2,
                    emotional: 0.5,
                    contextual: 0.2,
                    synesthetic: 0.05,
                    therapeutic: 0.25
                };
            }
            
            // Calculate weighted score
            totalScore += this.algorithms.personalityMatch(track, this.userProfile) * weights.personality;
            totalScore += this.algorithms.emotionalMatch(track, currentEmotion) * weights.emotional;
            totalScore += this.algorithms.contextualMatch(track, context) * weights.contextual;
            totalScore += this.algorithms.synestheticMatch(track, this.userProfile?.synestheticPreferences) * weights.synesthetic;
            
            // Add therapeutic score if applicable
            if (therapeutic && weights.therapeutic) {
                totalScore += this.calculateTherapeuticScore(track, currentEmotion) * weights.therapeutic;
            }
            
            // Add novelty bonus
            const noveltyScore = this.calculateNoveltyScore(track);
            totalScore += noveltyScore * weights.novelty;
            
            return {
                ...track,
                score: totalScore,
                reasoning: this.generateRecommendationReasoning(track, totalScore, weights)
            };
        });
        
        // Sort by score and apply diversity
        const sortedCandidates = scoredCandidates.sort((a, b) => b.score - a.score);
        this.recommendations = this.applyDiversityFilter(sortedCandidates, count, diversity);
        
        console.log(`✨ Generated ${this.recommendations.length} AI recommendations`);
        return this.recommendations;
    }
    
    generateCandidateTracks() {
        // Simulated music database - in real implementation, this would query a real database
        const genres = ['classical', 'jazz', 'electronic', 'ambient', 'rock', 'pop', 'folk'];
        const tracks = [];
        
        for (let i = 0; i < 100; i++) {
            const genre = genres[Math.floor(Math.random() * genres.length)];
            const pattern = this.musicPatterns.genreSignatures[genre] || this.musicPatterns.genreSignatures.pop;
            
            tracks.push({
                id: `track_${i}`,
                title: `AI Track ${i + 1}`,
                artist: `Artist ${Math.floor(i / 10) + 1}`,
                genre,
                emotions: pattern.emotions,
                audioFeatures: {
                    ...pattern.audioFeatures,
                    // Add some variation
                    tempo: Math.max(0, Math.min(1, pattern.audioFeatures.tempo + (Math.random() - 0.5) * 0.2)),
                    energy: Math.max(0, Math.min(1, pattern.audioFeatures.energy + (Math.random() - 0.5) * 0.2)),
                    valence: Math.max(0, Math.min(1, pattern.audioFeatures.valence + (Math.random() - 0.5) * 0.2))
                },
                synestheticColors: pattern.synestheticColors,
                emotionalSignature: pattern.emotions[0],
                structure: Math.random(),
                harmony: Math.random(),
                chaos: Math.random(),
                emotionalIntensity: Math.random(),
                novelty: Math.random()
            });
        }
        
        return tracks;
    }
    
    getCurrentContext() {
        const now = new Date();
        const hour = now.getHours();
        
        let timeOfDay = 'morning';
        if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
        else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
        else if (hour >= 21 || hour < 6) timeOfDay = 'night';
        
        return {
            timeOfDay,
            dayOfWeek: now.toLocaleLowerCase().substring(0, 3),
            situation: this.inferSituation(),
            userActivity: window.contextAwarenessSystem?.currentContext?.userActivity || 'unknown'
        };
    }
    
    inferSituation() {
        const hour = new Date().getHours();
        
        if (hour >= 6 && hour < 9) return 'morning';
        if (hour >= 9 && hour < 12) return 'focus';
        if (hour >= 12 && hour < 14) return 'midday';
        if (hour >= 17 && hour < 19) return 'evening';
        if (hour >= 21 || hour < 6) return 'relaxing';
        
        return 'general';
    }
    
    calculateEmotionalDistance(emotion1, emotion2) {
        // Simplified emotional distance calculation
        const emotionMap = {
            happy: [1, 1], joy: [1, 1], excited: [1, 0.8],
            sad: [-1, -0.5], melancholy: [-0.5, -0.3], nostalgic: [-0.3, 0.2],
            angry: [-0.8, 0.9], aggressive: [-1, 1],
            calm: [0, -0.8], peaceful: [0.5, -1], serene: [0.3, -0.9],
            energetic: [0.5, 1], dynamic: [0.3, 0.9],
            mysterious: [-0.2, 0.3], sophisticated: [0.2, 0.1]
        };
        
        const pos1 = emotionMap[emotion1?.toLowerCase()] || [0, 0];
        const pos2 = emotionMap[emotion2?.toLowerCase()] || [0, 0];
        
        const distance = Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
        
        return Math.min(1, distance / 2.83); // Normalize to 0-1
    }
    
    calculateColorHarmony(color1, color2) {
        // Simplified color harmony calculation
        // In real implementation, this would use proper color theory
        return Math.random() * 0.5 + 0.5; // Placeholder
    }
    
    calculateTherapeuticScore(track, currentEmotion) {
        if (!currentEmotion || !track.emotions) return 0.5;
        
        const therapeuticPatterns = this.musicPatterns.emotionalTherapy;
        const emotionKey = currentEmotion.primary?.toLowerCase();
        
        if (therapeuticPatterns[emotionKey]) {
            const pattern = therapeuticPatterns[emotionKey];
            const targetEmotion = pattern.progression[0]; // First step in therapy
            
            if (track.emotions.includes(targetEmotion)) {
                return 0.9;
            }
        }
        
        return 0.3;
    }
    
    calculateNoveltyScore(track) {
        // Check if user has heard similar tracks recently
        const recentEmotions = this.emotionalHistory.slice(-20);
        const similarity = recentEmotions.filter(e => 
            track.emotions.includes(e.emotion)
        ).length / recentEmotions.length;
        
        return 1.0 - similarity; // Higher score for novel tracks
    }
    
    applyDiversityFilter(candidates, count, diversityFactor) {
        const selected = [];
        const used = new Set();
        
        for (const candidate of candidates) {
            if (selected.length >= count) break;
            
            // Check diversity constraints
            const genreKey = candidate.genre;
            const emotionKey = candidate.emotions[0];
            
            const genreCount = selected.filter(t => t.genre === genreKey).length;
            const emotionCount = selected.filter(t => t.emotions[0] === emotionKey).length;
            
            const maxSameGenre = Math.max(1, Math.floor(count * (1 - diversityFactor)));
            const maxSameEmotion = Math.max(1, Math.floor(count * (1 - diversityFactor * 0.7)));
            
            if (genreCount < maxSameGenre && emotionCount < maxSameEmotion) {
                selected.push(candidate);
            }
        }
        
        return selected;
    }
    
    generateRecommendationReasoning(track, score, weights) {
        const reasons = [];
        
        if (score > 0.8) {
            reasons.push('Perfect match for your soul');
        } else if (score > 0.6) {
            reasons.push('Strong emotional resonance');
        } else if (score > 0.4) {
            reasons.push('Good contextual fit');
        }
        
        if (track.genre && this.userProfile?.musicalDNA?.[track.genre]?.baseAffinity > 0.7) {
            reasons.push(`You love ${track.genre}`);
        }
        
        if (track.emotions.includes('peaceful') && new Date().getHours() > 20) {
            reasons.push('Perfect for evening relaxation');
        }
        
        return reasons.join(' • ');
    }
    
    // Public API methods
    getRecommendations(options = {}) {
        return this.recommendations;
    }
    
    generatePlaylist(options = {}) {
        const {
            theme = 'personal',
            duration = 60, // minutes
            therapeutic = false,
            adventurous = 0.1
        } = options;
        
        const recommendations = this.generateRecommendations(null, null, {
            count: Math.ceil(duration / 3.5), // Assume average 3.5 min per song
            therapeutic,
            adventurous
        });
        
        return {
            id: `playlist_${Date.now()}`,
            name: `AI ${theme} Playlist`,
            tracks: recommendations,
            theme,
            createdAt: new Date().toISOString(),
            description: this.generatePlaylistDescription(theme, recommendations)
        };
    }
    
    generatePlaylistDescription(theme, tracks) {
        const genres = [...new Set(tracks.map(t => t.genre))];
        const emotions = [...new Set(tracks.flatMap(t => t.emotions))].slice(0, 3);
        
        return `A ${theme} journey through ${genres.join(', ')} designed to evoke ${emotions.join(', ')}. Crafted by AI based on your unique emotional fingerprint.`;
    }
    
    explainRecommendation(trackId) {
        const track = this.recommendations.find(t => t.id === trackId);
        if (!track) return null;
        
        return {
            track,
            reasoning: track.reasoning,
            score: track.score,
            factors: {
                personalityMatch: this.algorithms.personalityMatch(track, this.userProfile),
                emotionalMatch: this.algorithms.emotionalMatch(track, this.getCurrentEmotion()),
                contextualFit: this.algorithms.contextualMatch(track, this.getCurrentContext())
            }
        };
    }
}

// Export and initialize
if (typeof window !== 'undefined') {
    window.AdvancedAIRecommendationEngine = AdvancedAIRecommendationEngine;
    
    // Auto-initialize when dependencies are ready
    setTimeout(() => {
        if (!window.aiRecommendationEngine) {
            window.aiRecommendationEngine = new AdvancedAIRecommendationEngine();
        }
    }, 5000);
}

export { AdvancedAIRecommendationEngine };
