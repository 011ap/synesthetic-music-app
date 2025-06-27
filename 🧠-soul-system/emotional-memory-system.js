/**
 * 🧠 PHASE 2 STEP 2: EMOTIONAL MEMORY SYSTEM
 * Make the soul remember emotional journeys and develop personal emotional DNA
 */

class EmotionalMemorySystem {
    constructor() {
        this.emotionalJourney = [];
        this.emotionalDNA = null;
        this.sessionMemory = [];
        this.contextAwareness = {
            timeOfDay: null,
            listeningPatterns: {},
            moodEvolution: [],
            favoriteEmotions: {},
            emotionalTriggers: {}
        };
        
        this.initializeMemorySystem();
        console.log('🧠 Phase 2.2: Emotional Memory System initialized');
    }

    /**
     * Initialize the memory system
     */
    initializeMemorySystem() {
        // Load existing emotional memory
        this.loadEmotionalMemory();
        
        // Start context tracking
        this.startContextTracking();
        
        // Analyze personal emotional DNA
        this.analyzeEmotionalDNA();
        
        // Set up periodic memory consolidation
        this.setupMemoryConsolidation();
    }

    /**
     * Record emotional experience
     */
    recordEmotionalExperience(emotionalState, context = {}) {
        const experience = {
            timestamp: Date.now(),
            emotion: emotionalState.primary,
            confidence: emotionalState.confidence,
            intensity: emotionalState.intensity || 0.7,
            colors: emotionalState.synestheticColors,
            audioFeatures: emotionalState.audioFeatures || emotionalState.features,
            context: {
                timeOfDay: this.getTimeOfDay(),
                dayOfWeek: this.getDayOfWeek(),
                season: this.getSeason(),
                listeningDuration: context.duration || 0,
                source: context.source || 'unknown', // 'mic', 'upload', 'auto'
                userFeedback: context.userFeedback || null,
                story: context.story || null
            },
            memoryType: 'experience',
            emotionalWeight: this.calculateEmotionalWeight(emotionalState),
            similarities: [] // Will be filled by similarity analysis
        };

        // Add to session memory
        this.sessionMemory.push(experience);
        
        // Add to long-term emotional journey
        this.emotionalJourney.push(experience);
        
        // Update context awareness
        this.updateContextAwareness(experience);
        
        // Find similar past experiences
        this.findSimilarExperiences(experience);
        
        // Update emotional DNA
        this.updateEmotionalDNA(experience);
        
        console.log('🧠 Phase 2.2: Recorded emotional experience:', experience.emotion);
        
        // Save to persistence
        this.saveEmotionalMemory();
        
        return experience;
    }

    /**
     * Calculate emotional weight/importance
     */
    calculateEmotionalWeight(emotionalState) {
        let weight = 0.5; // Base weight
        
        // High confidence increases weight
        weight += (emotionalState.confidence / 100) * 0.3;
        
        // High intensity increases weight
        weight += (emotionalState.intensity || 0.7) * 0.2;
        
        // User feedback increases weight
        if (emotionalState.userFeedback) {
            weight += 0.3;
        }
        
        // Story context increases weight
        if (emotionalState.story) {
            weight += 0.4;
        }
        
        return Math.min(1.0, weight);
    }

    /**
     * Find similar past experiences
     */
    findSimilarExperiences(currentExperience) {
        const similarities = [];
        
        this.emotionalJourney.forEach((pastExperience, index) => {
            if (pastExperience.timestamp === currentExperience.timestamp) return;
            
            const similarity = this.calculateExperienceSimilarity(currentExperience, pastExperience);
            
            if (similarity > 0.6) {
                similarities.push({
                    experienceIndex: index,
                    similarity: similarity,
                    timeDifference: currentExperience.timestamp - pastExperience.timestamp,
                    emotion: pastExperience.emotion
                });
            }
        });
        
        // Sort by similarity
        similarities.sort((a, b) => b.similarity - a.similarity);
        
        // Store top 5 similarities
        currentExperience.similarities = similarities.slice(0, 5);
        
        console.log('🧠 Phase 2.2: Found', similarities.length, 'similar past experiences');
        
        return similarities;
    }

    /**
     * Calculate similarity between experiences
     */
    calculateExperienceSimilarity(exp1, exp2) {
        let similarity = 0;
        let factors = 0;
        
        // Emotion similarity
        if (exp1.emotion === exp2.emotion) {
            similarity += 0.4;
        }
        factors++;
        
        // Audio features similarity
        if (exp1.audioFeatures && exp2.audioFeatures) {
            const audioSim = this.calculateAudioSimilarity(exp1.audioFeatures, exp2.audioFeatures);
            similarity += audioSim * 0.3;
        }
        factors++;
        
        // Time context similarity
        if (exp1.context.timeOfDay === exp2.context.timeOfDay) {
            similarity += 0.1;
        }
        if (exp1.context.dayOfWeek === exp2.context.dayOfWeek) {
            similarity += 0.05;
        }
        factors++;
        
        // Intensity similarity
        const intensityDiff = Math.abs((exp1.intensity || 0.7) - (exp2.intensity || 0.7));
        similarity += (1 - intensityDiff) * 0.15;
        factors++;
        
        return similarity / factors;
    }

    /**
     * Calculate audio similarity
     */
    calculateAudioSimilarity(features1, features2) {
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
     * Update context awareness
     */
    updateContextAwareness(experience) {
        const timeOfDay = experience.context.timeOfDay;
        const emotion = experience.emotion;
        
        // Track time-based emotional patterns
        if (!this.contextAwareness.listeningPatterns[timeOfDay]) {
            this.contextAwareness.listeningPatterns[timeOfDay] = {};
        }
        
        this.contextAwareness.listeningPatterns[timeOfDay][emotion] = 
            (this.contextAwareness.listeningPatterns[timeOfDay][emotion] || 0) + 1;
        
        // Track favorite emotions
        this.contextAwareness.favoriteEmotions[emotion] = 
            (this.contextAwareness.favoriteEmotions[emotion] || 0) + experience.emotionalWeight;
        
        // Track mood evolution (last 10 experiences)
        this.contextAwareness.moodEvolution.push({
            emotion: emotion,
            timestamp: experience.timestamp,
            intensity: experience.intensity
        });
        
        // Keep only last 20 mood points
        if (this.contextAwareness.moodEvolution.length > 20) {
            this.contextAwareness.moodEvolution = this.contextAwareness.moodEvolution.slice(-20);
        }
    }

    /**
     * Analyze and update emotional DNA
     */
    analyzeEmotionalDNA() {
        if (this.emotionalJourney.length < 5) {
            console.log('🧠 Phase 2.2: Not enough data for DNA analysis yet');
            return;
        }
        
        const dna = {
            dominantEmotions: this.findDominantEmotions(),
            emotionalRange: this.calculateEmotionalRange(),
            moodStability: this.calculateMoodStability(),
            timePreferences: this.analyzeTimePreferences(),
            intensityProfile: this.analyzeIntensityProfile(),
            emotionalTriggers: this.identifyEmotionalTriggers(),
            uniqueTraits: this.identifyUniqueTraits(),
            lastUpdated: Date.now()
        };
        
        this.emotionalDNA = dna;
        console.log('🧠 Phase 2.2: Emotional DNA analyzed:', dna);
        
        return dna;
    }

    /**
     * Update emotional DNA with new experience
     */
    updateEmotionalDNA(experience) {
        if (!this.emotionalDNA) {
            this.analyzeEmotionalDNA();
            return;
        }
        
        // Update dominant emotions
        const emotion = experience.emotion;
        if (!this.emotionalDNA.dominantEmotions[emotion]) {
            this.emotionalDNA.dominantEmotions[emotion] = 0;
        }
        this.emotionalDNA.dominantEmotions[emotion] += experience.emotionalWeight;
        
        // Update time preferences
        const timeOfDay = experience.context.timeOfDay;
        if (!this.emotionalDNA.timePreferences[timeOfDay]) {
            this.emotionalDNA.timePreferences[timeOfDay] = {};
        }
        this.emotionalDNA.timePreferences[timeOfDay][emotion] = 
            (this.emotionalDNA.timePreferences[timeOfDay][emotion] || 0) + 1;
        
        // Recalculate DNA periodically
        if (this.emotionalJourney.length % 10 === 0) {
            this.analyzeEmotionalDNA();
        }
    }

    /**
     * Find dominant emotions
     */
    findDominantEmotions() {
        const emotionCounts = {};
        
        this.emotionalJourney.forEach(exp => {
            emotionCounts[exp.emotion] = (emotionCounts[exp.emotion] || 0) + exp.emotionalWeight;
        });
        
        // Sort by frequency
        const sorted = Object.entries(emotionCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
        
        return Object.fromEntries(sorted);
    }

    /**
     * Calculate emotional range diversity
     */
    calculateEmotionalRange() {
        const uniqueEmotions = new Set(this.emotionalJourney.map(exp => exp.emotion));
        const totalExperiences = this.emotionalJourney.length;
        
        return {
            uniqueEmotions: uniqueEmotions.size,
            diversity: uniqueEmotions.size / Math.max(1, totalExperiences),
            totalExperiences: totalExperiences
        };
    }

    /**
     * Calculate mood stability
     */
    calculateMoodStability() {
        if (this.contextAwareness.moodEvolution.length < 3) return 0.5;
        
        let stabilityScore = 0;
        for (let i = 1; i < this.contextAwareness.moodEvolution.length; i++) {
            const current = this.contextAwareness.moodEvolution[i];
            const previous = this.contextAwareness.moodEvolution[i - 1];
            
            // Same emotion = more stability
            if (current.emotion === previous.emotion) {
                stabilityScore += 0.5;
            }
            
            // Similar intensity = more stability
            const intensityDiff = Math.abs(current.intensity - previous.intensity);
            stabilityScore += (1 - intensityDiff) * 0.3;
        }
        
        return stabilityScore / (this.contextAwareness.moodEvolution.length - 1);
    }

    /**
     * Analyze time-based preferences
     */
    analyzeTimePreferences() {
        return this.contextAwareness.listeningPatterns;
    }

    /**
     * Analyze intensity profile
     */
    analyzeIntensityProfile() {
        const intensities = this.emotionalJourney.map(exp => exp.intensity || 0.7);
        const avg = intensities.reduce((sum, val) => sum + val, 0) / intensities.length;
        const max = Math.max(...intensities);
        const min = Math.min(...intensities);
        
        return {
            average: avg,
            range: max - min,
            preference: avg > 0.7 ? 'high-intensity' : avg < 0.4 ? 'low-intensity' : 'moderate'
        };
    }

    /**
     * Identify emotional triggers
     */
    identifyEmotionalTriggers() {
        // Find patterns between audio features and emotions
        const triggers = {};
        
        this.emotionalJourney.forEach(exp => {
            if (!exp.audioFeatures) return;
            
            const features = exp.audioFeatures;
            const emotion = exp.emotion;
            
            if (!triggers[emotion]) {
                triggers[emotion] = { bass: [], mid: [], treble: [], energy: [] };
            }
            
            triggers[emotion].bass.push(features.bass || 0);
            triggers[emotion].mid.push(features.mid || 0);
            triggers[emotion].treble.push(features.treble || 0);
            triggers[emotion].energy.push(features.energy || 0);
        });
        
        // Calculate averages for each emotion's triggers
        Object.keys(triggers).forEach(emotion => {
            Object.keys(triggers[emotion]).forEach(feature => {
                const values = triggers[emotion][feature];
                triggers[emotion][feature] = values.length > 0 ? 
                    values.reduce((sum, val) => sum + val, 0) / values.length : 0;
            });
        });
        
        return triggers;
    }

    /**
     * Identify unique personality traits
     */
    identifyUniqueTraits() {
        const traits = [];
        
        // Analyze patterns
        const dna = this.emotionalDNA || {};
        
        // High emotional range
        if (dna.emotionalRange?.diversity > 0.8) {
            traits.push('emotionally-diverse');
        }
        
        // Stable mood
        if (dna.moodStability > 0.7) {
            traits.push('mood-stable');
        }
        
        // Intensity preferences
        if (dna.intensityProfile?.preference === 'high-intensity') {
            traits.push('intensity-seeker');
        } else if (dna.intensityProfile?.preference === 'low-intensity') {
            traits.push('gentle-soul');
        }
        
        // Time patterns
        const timePrefs = dna.timePreferences || {};
        if (timePrefs.morning && Object.keys(timePrefs.morning).length > 0) {
            traits.push('morning-emotional');
        }
        if (timePrefs.night && Object.keys(timePrefs.night).length > 0) {
            traits.push('night-emotional');
        }
        
        return traits;
    }

    /**
     * Get contextual emotion prediction
     */
    getContextualPrediction(audioFeatures) {
        if (!this.emotionalDNA) return null;
        
        const timeOfDay = this.getTimeOfDay();
        const triggers = this.emotionalDNA.emotionalTriggers || {};
        
        // Find best matching emotion based on audio features and time
        let bestMatch = null;
        let bestScore = 0;
        
        Object.entries(triggers).forEach(([emotion, emotionTriggers]) => {
            let score = 0;
            
            // Audio feature matching
            Object.entries(audioFeatures).forEach(([feature, value]) => {
                if (emotionTriggers[feature] !== undefined) {
                    const similarity = 1 - Math.abs(value - emotionTriggers[feature]);
                    score += similarity * 0.7;
                }
            });
            
            // Time preference matching
            const timePrefs = this.emotionalDNA.timePreferences[timeOfDay];
            if (timePrefs && timePrefs[emotion]) {
                score += timePrefs[emotion] * 0.3;
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestMatch = { emotion, confidence: score };
            }
        });
        
        return bestMatch;
    }

    /**
     * Get time of day
     */
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    }

    /**
     * Get day of week
     */
    getDayOfWeek() {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[new Date().getDay()];
    }

    /**
     * Get season
     */
    getSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'autumn';
        return 'winter';
    }

    /**
     * Start context tracking
     */
    startContextTracking() {
        // Track session start
        this.sessionStart = Date.now();
        
        // Periodic context updates
        this.contextInterval = setInterval(() => {
            this.updatePeriodicContext();
        }, 60000); // Every minute
    }

    /**
     * Update periodic context
     */
    updatePeriodicContext() {
        this.contextAwareness.timeOfDay = this.getTimeOfDay();
        
        // Session duration tracking
        const sessionDuration = Date.now() - this.sessionStart;
        this.contextAwareness.currentSessionDuration = sessionDuration;
    }

    /**
     * Setup memory consolidation
     */
    setupMemoryConsolidation() {
        // Consolidate memories every 5 minutes
        this.consolidationInterval = setInterval(() => {
            this.consolidateMemories();
        }, 300000); // 5 minutes
    }

    /**
     * Consolidate memories (remove less important ones, strengthen important ones)
     */
    consolidateMemories() {
        if (this.emotionalJourney.length <= 100) return;
        
        console.log('🧠 Phase 2.2: Consolidating emotional memories...');
        
        // Sort by emotional weight and recency
        const sortedExperiences = this.emotionalJourney
            .map((exp, index) => ({
                ...exp,
                originalIndex: index,
                consolidationScore: this.calculateConsolidationScore(exp)
            }))
            .sort((a, b) => b.consolidationScore - a.consolidationScore);
        
        // Keep top 80 experiences
        this.emotionalJourney = sortedExperiences.slice(0, 80).map(exp => {
            const { originalIndex, consolidationScore, ...cleanExp } = exp;
            return cleanExp;
        });
        
        console.log('🧠 Phase 2.2: Consolidated to', this.emotionalJourney.length, 'key memories');
        
        // Re-analyze DNA after consolidation
        this.analyzeEmotionalDNA();
        
        // Save consolidated memories
        this.saveEmotionalMemory();
    }

    /**
     * Calculate consolidation score (importance for long-term memory)
     */
    calculateConsolidationScore(experience) {
        let score = experience.emotionalWeight || 0.5;
        
        // Recent experiences get bonus
        const age = Date.now() - experience.timestamp;
        const dayAge = age / (24 * 60 * 60 * 1000);
        score += Math.max(0, 1 - dayAge / 30) * 0.3; // Bonus for last 30 days
        
        // High confidence gets bonus
        score += (experience.confidence / 100) * 0.2;
        
        // User feedback gets bonus
        if (experience.context.userFeedback) {
            score += 0.4;
        }
        
        // Story context gets bonus
        if (experience.context.story) {
            score += 0.3;
        }
        
        // Similar experiences cluster gets bonus
        if (experience.similarities && experience.similarities.length > 0) {
            score += experience.similarities.length * 0.1;
        }
        
        return Math.min(2.0, score);
    }

    /**
     * Get emotional summary for current session
     */
    getSessionSummary() {
        if (this.sessionMemory.length === 0) {
            return { message: 'No emotional experiences recorded this session' };
        }
        
        const emotions = this.sessionMemory.map(exp => exp.emotion);
        const avgIntensity = this.sessionMemory.reduce((sum, exp) => sum + (exp.intensity || 0.7), 0) / this.sessionMemory.length;
        const dominantEmotion = this.findMostFrequent(emotions);
        const emotionalJourney = emotions.join(' → ');
        
        return {
            experienceCount: this.sessionMemory.length,
            dominantEmotion: dominantEmotion,
            averageIntensity: Math.round(avgIntensity * 100),
            emotionalJourney: emotionalJourney,
            sessionDuration: this.contextAwareness.currentSessionDuration,
            uniqueEmotions: new Set(emotions).size
        };
    }

    /**
     * Find most frequent item in array
     */
    findMostFrequent(arr) {
        const counts = {};
        arr.forEach(item => counts[item] = (counts[item] || 0) + 1);
        return Object.entries(counts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown';
    }

    /**
     * Save emotional memory to localStorage
     */
    saveEmotionalMemory() {
        const memoryData = {
            emotionalJourney: this.emotionalJourney,
            emotionalDNA: this.emotionalDNA,
            contextAwareness: this.contextAwareness,
            lastSaved: Date.now()
        };
        
        localStorage.setItem('soulEmotionalMemory', JSON.stringify(memoryData));
    }

    /**
     * Load emotional memory from localStorage
     */
    loadEmotionalMemory() {
        const saved = localStorage.getItem('soulEmotionalMemory');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.emotionalJourney = data.emotionalJourney || [];
                this.emotionalDNA = data.emotionalDNA || null;
                this.contextAwareness = { ...this.contextAwareness, ...data.contextAwareness };
                
                console.log('🧠 Phase 2.2: Loaded emotional memory -', this.emotionalJourney.length, 'experiences');
            } catch (error) {
                console.warn('🧠 Phase 2.2: Failed to load emotional memory:', error);
            }
        }
    }

    /**
     * Get memory statistics
     */
    getMemoryStats() {
        return {
            totalExperiences: this.emotionalJourney.length,
            sessionExperiences: this.sessionMemory.length,
            emotionalDNA: this.emotionalDNA,
            contextAwareness: this.contextAwareness,
            memorySize: JSON.stringify(this.emotionalJourney).length,
            dnaTraits: this.emotionalDNA?.uniqueTraits || []
        };
    }

    /**
     * Get recent emotional journey (last N experiences)
     */
    getRecentEmotionalJourney(count = 10) {
        const recentExperiences = this.emotionalJourney
            .slice(-count)
            .map(exp => ({
                emotion: exp.emotion,
                timestamp: exp.timestamp,
                confidence: exp.confidence,
                intensity: exp.intensity,
                context: exp.context,
                audioFeatures: exp.audioFeatures
            }));
        
        return {
            experiences: recentExperiences,
            emotionalTrend: this.calculateEmotionalTrend(recentExperiences),
            dominantEmotions: this.findDominantEmotions(recentExperiences),
            averageIntensity: this.calculateAverageIntensity(recentExperiences)
        };
    }

    /**
     * Calculate emotional trend from recent experiences
     */
    calculateEmotionalTrend(experiences) {
        if (experiences.length < 2) return 'stable';
        
        const intensities = experiences.map(exp => exp.intensity || 0.5);
        const firstHalf = intensities.slice(0, Math.floor(intensities.length / 2));
        const secondHalf = intensities.slice(Math.floor(intensities.length / 2));
        
        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        const threshold = 0.1;
        if (secondAvg > firstAvg + threshold) return 'rising';
        if (secondAvg < firstAvg - threshold) return 'declining';
        return 'stable';
    }

    /**
     * Find dominant emotions in a set of experiences
     */
    findDominantEmotions(experiences) {
        const emotionCounts = {};
        experiences.forEach(exp => {
            const emotion = exp.emotion?.primary || exp.emotion;
            if (emotion && typeof emotion === 'string') {
                emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
            }
        });
        
        return Object.entries(emotionCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([emotion, count]) => ({ emotion, count }));
    }

    /**
     * Calculate average intensity from experiences
     */
    calculateAverageIntensity(experiences) {
        if (experiences.length === 0) return 0.5;
        
        const intensities = experiences
            .map(exp => exp.intensity || 0.5)
            .filter(intensity => typeof intensity === 'number');
            
        return intensities.reduce((a, b) => a + b, 0) / intensities.length;
    }
}

// Initialize the emotional memory system
window.emotionalMemorySystem = new EmotionalMemorySystem();

console.log('🧠 Phase 2.2: Emotional Memory System ready!');
