/**
 * 🧠 PHASE 2 STEP 3: CONTEXT AWARENESS SYSTEM
 * Advanced contextual understanding for human-like emotional intelligence
 */

class ContextAwarenessSystem {
    constructor() {
        this.contextData = {
            timePatterns: {},
            listeningHabits: {},
            moodEvolution: [],
            environmentalFactors: {},
            behavioralPatterns: {},
            emotionalTriggers: {}
        };
        
        this.currentContext = {
            timeOfDay: this.getTimeOfDay(),
            dayOfWeek: this.getDayOfWeek(),
            season: this.getSeason(),
            weatherData: null,
            userActivity: 'unknown',
            listeningMode: null, // 'focused', 'background', 'discovery'
            emotionalState: null,
            lastInteraction: null
        };
        
        this.initializeContextTracking();
        console.log('🧠 Phase 2.3: Context Awareness System initialized');
    }

    /**
     * Initialize context tracking
     */
    initializeContextTracking() {
        // Load existing context data
        this.loadContextData();
        
        // Start real-time context monitoring
        this.startContextMonitoring();
        
        // Analyze existing patterns
        this.analyzeContextPatterns();
        
        // Set up periodic context updates
        this.setupContextUpdates();
    }

    /**
     * Get current time of day category
     */
    getTimeOfDay() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    }

    /**
     * Get current day of week
     */
    getDayOfWeek() {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[new Date().getDay()];
    }

    /**
     * Get current season
     */
    getSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'autumn';
        return 'winter';
    }

    /**
     * Start real-time context monitoring
     */
    startContextMonitoring() {
        // Update context every minute
        this.contextInterval = setInterval(() => {
            this.updateCurrentContext();
        }, 60000);

        // Track user activity patterns
        this.trackUserActivity();
        
        // Monitor emotional state changes
        this.monitorEmotionalChanges();
        
        console.log('🧠 Phase 2.3: Real-time context monitoring started');
    }

    /**
     * Update current context
     */
    updateCurrentContext() {
        const oldContext = { ...this.currentContext };
        
        this.currentContext = {
            ...this.currentContext,
            timeOfDay: this.getTimeOfDay(),
            dayOfWeek: this.getDayOfWeek(),
            season: this.getSeason(),
            timestamp: Date.now()
        };

        // Detect context changes
        const changes = this.detectContextChanges(oldContext, this.currentContext);
        if (changes.length > 0) {
            console.log('🧠 Phase 2.3: Context changed:', changes);
            this.handleContextChange(changes);
        }
    }

    /**
     * Track user activity patterns
     */
    trackUserActivity() {
        let interactionCount = 0;
        let lastInteractionTime = Date.now();

        // Monitor clicks and interactions
        document.addEventListener('click', () => {
            interactionCount++;
            lastInteractionTime = Date.now();
            this.updateUserActivity('active');
        });

        // Monitor music playback state
        if (window.app && window.app.audioPlayer) {
            const checkPlaybackState = () => {
                if (window.app.currentAudio && !window.app.currentAudio.paused) {
                    this.updateUserActivity('listening');
                } else {
                    this.updateUserActivity('browsing');
                }
            };
            
            setInterval(checkPlaybackState, 5000);
        }

        // Detect inactivity
        setInterval(() => {
            const timeSinceLastInteraction = Date.now() - lastInteractionTime;
            if (timeSinceLastInteraction > 300000) { // 5 minutes
                this.updateUserActivity('inactive');
            } else if (timeSinceLastInteraction > 60000) { // 1 minute
                this.updateUserActivity('idle');
            }
        }, 30000);
    }

    /**
     * Update user activity state
     */
    updateUserActivity(activity) {
        if (this.currentContext.userActivity !== activity) {
            console.log('🧠 Phase 2.3: User activity changed to:', activity);
            
            this.currentContext.userActivity = activity;
            this.currentContext.lastInteraction = Date.now();
            
            // Record activity pattern
            this.recordActivityPattern(activity);
        }
    }

    /**
     * Record activity pattern for learning
     */
    recordActivityPattern(activity) {
        const timeKey = `${this.currentContext.timeOfDay}_${this.currentContext.dayOfWeek}`;
        
        if (!this.contextData.behavioralPatterns[timeKey]) {
            this.contextData.behavioralPatterns[timeKey] = {};
        }
        
        if (!this.contextData.behavioralPatterns[timeKey][activity]) {
            this.contextData.behavioralPatterns[timeKey][activity] = 0;
        }
        
        this.contextData.behavioralPatterns[timeKey][activity]++;
        
        // Save context data
        this.saveContextData();
    }

    /**
     * Monitor emotional state changes
     */
    monitorEmotionalChanges() {
        let lastEmotionalState = null;

        // Check for emotional state updates every 10 seconds
        setInterval(() => {
            if (window.emotionalMemorySystem && window.emotionalMemorySystem.sessionMemory.length > 0) {
                const latestExperience = window.emotionalMemorySystem.sessionMemory[
                    window.emotionalMemorySystem.sessionMemory.length - 1
                ];
                
                if (latestExperience && latestExperience.emotion !== lastEmotionalState) {
                    this.handleEmotionalStateChange(lastEmotionalState, latestExperience.emotion);
                    lastEmotionalState = latestExperience.emotion;
                }
            }
        }, 10000);
    }

    /**
     * Handle emotional state changes
     */
    handleEmotionalStateChange(previousEmotion, newEmotion) {
        console.log('🧠 Phase 2.3: Emotional state transition:', previousEmotion, '→', newEmotion);
        
        // Record emotional transition
        this.recordEmotionalTransition(previousEmotion, newEmotion);
        
        // Update current emotional context
        this.currentContext.emotionalState = newEmotion;
        
        // Analyze emotional triggers
        this.analyzeEmotionalTrigger(newEmotion);
    }

    /**
     * Record emotional transition for pattern analysis
     */
    recordEmotionalTransition(from, to) {
        if (!from || !to) return;
        
        const transitionKey = `${from}_to_${to}`;
        const contextKey = `${this.currentContext.timeOfDay}_${this.currentContext.userActivity}`;
        
        if (!this.contextData.emotionalTriggers[contextKey]) {
            this.contextData.emotionalTriggers[contextKey] = {};
        }
        
        if (!this.contextData.emotionalTriggers[contextKey][transitionKey]) {
            this.contextData.emotionalTriggers[contextKey][transitionKey] = 0;
        }
        
        this.contextData.emotionalTriggers[contextKey][transitionKey]++;
    }

    /**
     * Analyze what might have triggered an emotional change
     */
    analyzeEmotionalTrigger(emotion) {
        const context = {
            timeOfDay: this.currentContext.timeOfDay,
            activity: this.currentContext.userActivity,
            dayOfWeek: this.currentContext.dayOfWeek,
            recentInteractions: this.getRecentInteractions()
        };

        console.log('🧠 Phase 2.3: Analyzing emotional trigger for', emotion, 'in context:', context);
        
        // This could be expanded to use machine learning to predict emotional triggers
        return context;
    }

    /**
     * Get recent user interactions
     */
    getRecentInteractions() {
        // This would track recent user interactions like button clicks, song changes, etc.
        return {
            lastAction: this.currentContext.lastInteraction,
            timeSinceLastAction: Date.now() - (this.currentContext.lastInteraction || Date.now())
        };
    }

    /**
     * Detect context changes
     */
    detectContextChanges(oldContext, newContext) {
        const changes = [];
        
        if (oldContext.timeOfDay !== newContext.timeOfDay) {
            changes.push(`timeOfDay: ${oldContext.timeOfDay} → ${newContext.timeOfDay}`);
        }
        
        if (oldContext.dayOfWeek !== newContext.dayOfWeek) {
            changes.push(`dayOfWeek: ${oldContext.dayOfWeek} → ${newContext.dayOfWeek}`);
        }
        
        if (oldContext.userActivity !== newContext.userActivity) {
            changes.push(`userActivity: ${oldContext.userActivity} → ${newContext.userActivity}`);
        }
        
        return changes;
    }

    /**
     * Handle context changes
     */
    handleContextChange(changes) {
        console.log('🧠 Phase 2.3: Handling context changes:', changes);
        
        // Predict likely emotional states based on context
        const predictedEmotions = this.predictEmotionsForContext(this.currentContext);
        
        if (predictedEmotions.length > 0) {
            console.log('🧠 Phase 2.3: Predicted emotions for new context:', predictedEmotions);
        }
        
        // Notify emotion engine of context change
        if (window.emotionEngine && window.emotionEngine.updateContext) {
            window.emotionEngine.updateContext(this.currentContext);
        }
    }

    /**
     * Predict likely emotions for current context
     */
    predictEmotionsForContext(context) {
        const contextKey = `${context.timeOfDay}_${context.dayOfWeek}_${context.userActivity}`;
        
        // Look for historical patterns
        const patterns = this.contextData.timePatterns[contextKey];
        if (patterns) {
            return Object.entries(patterns)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([emotion]) => emotion);
        }
        
        return [];
    }

    /**
     * Analyze existing context patterns
     */
    analyzeContextPatterns() {
        console.log('🧠 Phase 2.3: Analyzing context patterns...');
        
        // This would analyze historical data to find patterns
        // For now, we'll implement basic pattern recognition
        
        if (this.contextData.behavioralPatterns) {
            const mostActiveTime = this.findMostActiveTime();
            const commonEmotionalStates = this.findCommonEmotionalStates();
            
            console.log('🧠 Phase 2.3: Most active time:', mostActiveTime);
            console.log('🧠 Phase 2.3: Common emotional states:', commonEmotionalStates);
        }
    }

    /**
     * Find most active time period
     */
    findMostActiveTime() {
        let maxActivity = 0;
        let mostActiveTime = null;
        
        Object.entries(this.contextData.behavioralPatterns).forEach(([timeKey, activities]) => {
            const totalActivity = Object.values(activities).reduce((sum, count) => sum + count, 0);
            if (totalActivity > maxActivity) {
                maxActivity = totalActivity;
                mostActiveTime = timeKey;
            }
        });
        
        return mostActiveTime;
    }

    /**
     * Find common emotional states by context
     */
    findCommonEmotionalStates() {
        const emotionCounts = {};
        
        Object.values(this.contextData.emotionalTriggers).forEach(contextTriggers => {
            Object.keys(contextTriggers).forEach(transitionKey => {
                // Extract emotions from transition keys like "joy_to_calm"
                const emotions = transitionKey.split('_to_');
                emotions.forEach(emotion => {
                    emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
                });
            });
        });
        
        return Object.entries(emotionCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([emotion]) => emotion);
    }

    /**
     * Setup periodic context updates
     */
    setupContextUpdates() {
        // Save context data every 5 minutes
        setInterval(() => {
            this.saveContextData();
        }, 300000);
        
        // Analyze patterns every hour
        setInterval(() => {
            this.analyzeContextPatterns();
        }, 3600000);
    }

    /**
     * Get contextual insights for the user
     */
    getContextualInsights() {
        return {
            currentContext: this.currentContext,
            mostActiveTime: this.findMostActiveTime(),
            commonEmotions: this.findCommonEmotionalStates(),
            emotionalTriggers: this.contextData.emotionalTriggers,
            behavioralPatterns: this.contextData.behavioralPatterns,
            predictedEmotions: this.predictEmotionsForContext(this.currentContext)
        };
    }

    /**
     * Save context data to localStorage
     */
    saveContextData() {
        try {
            const contextData = {
                contextData: this.contextData,
                currentContext: this.currentContext,
                lastUpdated: Date.now()
            };
            
            localStorage.setItem('soulContextAwareness', JSON.stringify(contextData));
            
        } catch (error) {
            console.warn('⚠️ Failed to save context data:', error);
        }
    }

    /**
     * Load context data from localStorage
     */
    loadContextData() {
        try {
            const saved = localStorage.getItem('soulContextAwareness');
            if (saved) {
                const data = JSON.parse(saved);
                this.contextData = data.contextData || this.contextData;
                
                console.log('🧠 Phase 2.3: Loaded context data');
                console.log('  - Behavioral patterns:', Object.keys(this.contextData.behavioralPatterns).length);
                console.log('  - Emotional triggers:', Object.keys(this.contextData.emotionalTriggers).length);
            }
        } catch (error) {
            console.warn('⚠️ Failed to load context data:', error);
        }
    }

    /**
     * Cleanup when system shuts down
     */
    destroy() {
        if (this.contextInterval) {
            clearInterval(this.contextInterval);
        }
        
        this.saveContextData();
        console.log('🧠 Phase 2.3: Context Awareness System shut down');
    }
}

// Initialize the context awareness system
console.log('🧠 Phase 2.3: Initializing Context Awareness System...');
window.contextAwarenessSystem = new ContextAwarenessSystem();

// Export for testing
window.ContextAwarenessSystem = ContextAwarenessSystem;
