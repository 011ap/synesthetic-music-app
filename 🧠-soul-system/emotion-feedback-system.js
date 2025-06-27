/**
 * 🧠 PHASE 2: USER FEEDBACK LEARNING SYSTEM
 * Allow users to correct emotion detection and train the soul
 */

class EmotionFeedbackSystem {
    constructor() {
        this.isActive = false;
        this.currentEmotion = null;
        this.feedbackUI = null;
        this.learningData = [];
        
        this.initializeFeedbackUI();
        console.log('🧠 Phase 2: Emotion Feedback Learning System initialized');
    }

    /**
     * Initialize the feedback UI overlay
     */
    initializeFeedbackUI() {
        // Create feedback overlay
        this.feedbackUI = document.createElement('div');
        this.feedbackUI.id = 'emotionFeedback';
        this.feedbackUI.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(15, 15, 20, 0.95), rgba(8, 8, 12, 0.95));
            border: 2px solid rgba(0, 245, 255, 0.3);
            border-radius: 15px;
            padding: 25px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            display: none;
            min-width: 350px;
            text-align: center;
            font-family: 'Arial', sans-serif;
            color: white;
        `;

        this.feedbackUI.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #00f5ff; font-size: 18px;">
                🧠 How does this music feel to you?
            </h3>
            <div id="currentEmotionDisplay" style="margin-bottom: 20px;">
                <div style="color: #ff69b4; font-size: 16px; margin-bottom: 5px;">
                    Soul detected: <span id="detectedEmotion">Processing...</span>
                </div>
                <div style="color: #ffd700; font-size: 14px;">
                    Confidence: <span id="detectedConfidence">0%</span>
                </div>
            </div>
            
            <div id="emotionOptions" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
                <button class="emotion-btn" data-emotion="joy">😊 Joy</button>
                <button class="emotion-btn" data-emotion="sadness">😢 Sad</button>
                <button class="emotion-btn" data-emotion="anger">😠 Angry</button>
                <button class="emotion-btn" data-emotion="fear">😨 Fear</button>
                <button class="emotion-btn" data-emotion="surprise">😲 Surprise</button>
                <button class="emotion-btn" data-emotion="serenity">😌 Serene</button>
                <button class="emotion-btn" data-emotion="passion">🔥 Passion</button>
                <button class="emotion-btn" data-emotion="nostalgia">🌅 Nostalgia</button>
                <button class="emotion-btn" data-emotion="awe">🌟 Awe</button>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="color: #00f5ff; font-size: 14px; margin-bottom: 8px; text-align: left;">
                    💭 Or tell me your story... (optional)
                </div>
                <textarea id="emotionalStory" placeholder="How does this music make you feel? Share your thoughts, memories, or what you're imagining... The soul learns from your stories too." 
                    style="
                        width: 100%;
                        height: 80px;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(0, 245, 255, 0.3);
                        border-radius: 8px;
                        color: white;
                        padding: 10px;
                        font-size: 12px;
                        resize: vertical;
                        font-family: inherit;
                    "></textarea>
                <div style="color: rgba(255, 255, 255, 0.6); font-size: 10px; margin-top: 4px;">
                    ✨ Share anything - a memory, feeling, story, or what you imagine. The soul learns from your words.
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="correctBtn" style="
                    background: linear-gradient(45deg, #00ff88, #00f5ff);
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    color: black;
                    font-weight: bold;
                    cursor: pointer;
                ">✅ Soul is Correct</button>
                
                <button id="submitCorrectionBtn" style="
                    background: linear-gradient(45deg, #ff006e, #ff6b00);
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    display: none;
                ">🧠 Submit Feedback</button>
                
                <button id="skipBtn" style="
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 10px 20px;
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                ">⏭️ Skip</button>
            </div>
        `;

        // Style emotion buttons
        const style = document.createElement('style');
        style.textContent = `
            .emotion-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s ease;
            }
            .emotion-btn:hover {
                background: rgba(0, 245, 255, 0.2);
                border-color: #00f5ff;
                transform: scale(1.05);
            }
            .emotion-btn.selected {
                background: linear-gradient(45deg, #ff006e, #00f5ff);
                border-color: #ff006e;
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(this.feedbackUI);
        this.setupEventListeners();
    }

    /**
     * Setup event listeners for feedback UI
     */
    setupEventListeners() {
        // Emotion button selection
        this.feedbackUI.querySelectorAll('.emotion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove previous selection
                this.feedbackUI.querySelectorAll('.emotion-btn').forEach(b => b.classList.remove('selected'));
                // Add selection to clicked button
                btn.classList.add('selected');
                this.selectedCorrection = btn.dataset.emotion;
                
                // Show submit button when emotion is selected
                this.showSubmitButton();
            });
        });

        // Emotional story text area - show submit button when user types
        const storyTextarea = this.feedbackUI.querySelector('#emotionalStory');
        storyTextarea.addEventListener('input', () => {
            if (storyTextarea.value.trim().length > 0 || this.selectedCorrection) {
                this.showSubmitButton();
            } else {
                this.hideSubmitButton();
            }
        });

        // Correct button - soul was right
        this.feedbackUI.querySelector('#correctBtn').addEventListener('click', () => {
            this.submitFeedback(true, this.currentEmotion.primary);
        });

        // Submit correction button - soul was wrong, user provides correction
        this.feedbackUI.querySelector('#submitCorrectionBtn').addEventListener('click', () => {
            const storyText = this.feedbackUI.querySelector('#emotionalStory').value.trim();
            
            if (this.selectedCorrection) {
                // User selected an emotion correction
                this.submitFeedback(false, this.selectedCorrection);
            } else if (storyText.length > 0) {
                // User only provided a story, let them know they need to select an emotion
                this.showEmotionSelectionPrompt();
            } else {
                // No correction provided
                alert('Please select what emotion you felt, or click "Soul is Correct" if it was right!');
            }
        });

        // Skip button
        this.feedbackUI.querySelector('#skipBtn').addEventListener('click', () => {
            this.hideFeedback();
        });
    }

    /**
     * Show the submit button when user provides feedback
     */
    showSubmitButton() {
        const submitBtn = this.feedbackUI.querySelector('#submitCorrectionBtn');
        const correctBtn = this.feedbackUI.querySelector('#correctBtn');
        
        submitBtn.style.display = 'block';
        correctBtn.textContent = '✅ Correct';
        
        // Update button text based on what user has provided
        const hasEmotion = this.selectedCorrection;
        const hasStory = this.feedbackUI.querySelector('#emotionalStory').value.trim().length > 0;
        
        if (hasEmotion && hasStory) {
            submitBtn.textContent = '🧠 Submit Correction + Story';
        } else if (hasEmotion) {
            submitBtn.textContent = '🧠 Submit Correction';
        } else if (hasStory) {
            submitBtn.textContent = '💭 Submit Story';
        }
    }

    /**
     * Hide the submit button
     */
    hideSubmitButton() {
        const submitBtn = this.feedbackUI.querySelector('#submitCorrectionBtn');
        const correctBtn = this.feedbackUI.querySelector('#correctBtn');
        
        submitBtn.style.display = 'none';
        correctBtn.textContent = '✅ Soul is Correct';
    }

    /**
     * Show prompt for emotion selection when user only provided story
     */
    showEmotionSelectionPrompt() {
        const emotionOptions = this.feedbackUI.querySelector('#emotionOptions');
        emotionOptions.style.border = '2px solid #ff006e';
        emotionOptions.style.background = 'rgba(255, 0, 110, 0.1)';
        
        // Add temporary message
        const message = document.createElement('div');
        message.style.cssText = 'color: #ff006e; font-size: 12px; text-align: center; margin: 5px 0; font-weight: bold;';
        message.textContent = '👆 Please select which emotion you felt!';
        emotionOptions.parentNode.insertBefore(message, emotionOptions.nextSibling);
        
        // Remove highlighting after 3 seconds
        setTimeout(() => {
            emotionOptions.style.border = '';
            emotionOptions.style.background = '';
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    /**
     * Show feedback UI for current emotion
     */
    showFeedback(emotionState) {
        this.currentEmotion = emotionState;
        this.selectedCorrection = null;
        
        // Update display
        this.feedbackUI.querySelector('#detectedEmotion').textContent = emotionState.primary;
        this.feedbackUI.querySelector('#detectedConfidence').textContent = emotionState.confidence + '%';
        
        // Clear previous selections and inputs
        this.feedbackUI.querySelectorAll('.emotion-btn').forEach(btn => btn.classList.remove('selected'));
        this.feedbackUI.querySelector('#emotionalStory').value = '';
        
        // Reset button states
        this.hideSubmitButton();
        
        // Show UI
        this.feedbackUI.style.display = 'block';
        this.isActive = true;
        
        console.log('🧠 Phase 2: Showing feedback UI for emotion:', emotionState.primary);
    }

    /**
     * Hide feedback UI
     */
    hideFeedback() {
        this.feedbackUI.style.display = 'none';
        this.isActive = false;
    }

    /**
     * Submit user feedback for learning
     */
    submitFeedback(wasCorrect, correctedEmotion = null) {
        const emotionalStory = this.feedbackUI.querySelector('#emotionalStory').value.trim();
        
        const feedbackData = {
            timestamp: Date.now(),
            detected: this.currentEmotion.primary,
            wasCorrect: wasCorrect,
            correctedTo: wasCorrect ? this.currentEmotion.primary : (this.selectedCorrection || correctedEmotion),
            confidence: this.currentEmotion.confidence,
            audioFeatures: this.currentEmotion.audioFeatures || this.currentEmotion.features,
            // 💭 PHASE 2.5: EMOTIONAL STORYTELLING
            emotionalStory: emotionalStory,
            storyAnalysis: emotionalStory ? this.analyzeEmotionalStory(emotionalStory) : null,
            hasStory: emotionalStory.length > 0
        };

        // Store learning data
        this.learningData.push(feedbackData);
        
        // Send to EmotionEngine for learning
        if (window.emotionEngine && window.emotionEngine.learnFromUserFeedback) {
            window.emotionEngine.learnFromUserFeedback(feedbackData);
            console.log('🧠 Phase 2.5: Soul learned from feedback + story:', feedbackData);
        }

        // Save to localStorage for persistence
        this.saveLearningData();

        this.hideFeedback();
        
        // Show thank you message
        this.showThankYou(wasCorrect, emotionalStory.length > 0);
    }

    /**
     * 💭 PHASE 2.5: Analyze emotional story using basic NLP
     */
    analyzeEmotionalStory(story) {
        if (!story || story.length < 5) return null;
        
        const analysis = {
            wordCount: story.split(' ').length,
            sentiment: this.analyzeSentiment(story),
            emotionalKeywords: this.extractEmotionalKeywords(story),
            themes: this.identifyThemes(story),
            intensity: this.calculateEmotionalIntensity(story),
            imagery: this.extractImagery(story),
            memories: this.detectMemoryReferences(story)
        };
        
        console.log('💭 Story Analysis:', analysis);
        return analysis;
    }

    /**
     * Basic sentiment analysis
     */
    analyzeSentiment(text) {
        const positiveWords = ['happy', 'joy', 'love', 'beautiful', 'amazing', 'wonderful', 'good', 'great', 'fantastic', 'brilliant', 'peaceful', 'calm', 'excited', 'thrilled'];
        const negativeWords = ['sad', 'angry', 'hate', 'terrible', 'awful', 'bad', 'horrible', 'depressed', 'anxious', 'scared', 'worried', 'frustrated'];
        
        const words = text.toLowerCase().split(/\W+/);
        let positiveScore = 0;
        let negativeScore = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveScore++;
            if (negativeWords.includes(word)) negativeScore++;
        });
        
        const totalWords = words.length;
        return {
            positive: positiveScore / totalWords,
            negative: negativeScore / totalWords,
            neutral: 1 - ((positiveScore + negativeScore) / totalWords),
            overall: positiveScore > negativeScore ? 'positive' : negativeScore > positiveScore ? 'negative' : 'neutral'
        };
    }

    /**
     * Extract emotional keywords
     */
    extractEmotionalKeywords(text) {
        const emotionWords = {
            joy: ['happy', 'joyful', 'elated', 'cheerful', 'blissful', 'euphoric'],
            sadness: ['sad', 'melancholy', 'depressed', 'gloomy', 'sorrowful', 'blue'],
            anger: ['angry', 'furious', 'rage', 'annoyed', 'frustrated', 'mad'],
            fear: ['scared', 'afraid', 'anxious', 'worried', 'nervous', 'terrified'],
            love: ['love', 'affection', 'romance', 'caring', 'tender', 'devoted'],
            peace: ['calm', 'peaceful', 'serene', 'tranquil', 'relaxed', 'zen'],
            energy: ['energetic', 'pumped', 'excited', 'thrilled', 'dynamic', 'vibrant'],
            nostalgia: ['remember', 'memories', 'childhood', 'past', 'nostalgic', 'reminds']
        };
        
        const words = text.toLowerCase().split(/\W+/);
        const foundEmotions = {};
        
        Object.entries(emotionWords).forEach(([emotion, keywords]) => {
            const matches = keywords.filter(keyword => words.includes(keyword));
            if (matches.length > 0) {
                foundEmotions[emotion] = matches;
            }
        });
        
        return foundEmotions;
    }

    /**
     * Identify story themes
     */
    identifyThemes(text) {
        const themes = {
            nature: ['sky', 'ocean', 'mountain', 'forest', 'tree', 'flower', 'sun', 'moon', 'stars'],
            relationships: ['friend', 'family', 'mother', 'father', 'love', 'partner', 'relationship'],
            memories: ['remember', 'childhood', 'school', 'growing up', 'used to', 'back then'],
            journey: ['travel', 'road', 'journey', 'adventure', 'exploring', 'destination'],
            time: ['time', 'moment', 'future', 'past', 'present', 'now', 'forever'],
            music: ['song', 'melody', 'rhythm', 'beat', 'music', 'sound', 'voice']
        };
        
        const words = text.toLowerCase().split(/\W+/);
        const foundThemes = [];
        
        Object.entries(themes).forEach(([theme, keywords]) => {
            const matchCount = keywords.filter(keyword => words.includes(keyword)).length;
            if (matchCount > 0) {
                foundThemes.push({ theme, matches: matchCount });
            }
        });
        
        return foundThemes.sort((a, b) => b.matches - a.matches);
    }

    /**
     * Calculate emotional intensity from text
     */
    calculateEmotionalIntensity(text) {
        const intensifiers = ['very', 'extremely', 'incredibly', 'absolutely', 'totally', 'completely', 'deeply', 'profoundly'];
        const emotionalPunctuation = text.match(/[!?]{2,}/g);
        const capsWords = text.match(/\b[A-Z]{2,}\b/g);
        
        const words = text.toLowerCase().split(/\W+/);
        const intensifierCount = intensifiers.filter(word => words.includes(word)).length;
        
        let intensity = 0.5; // Base intensity
        intensity += intensifierCount * 0.15;
        intensity += (emotionalPunctuation ? emotionalPunctuation.length : 0) * 0.1;
        intensity += (capsWords ? capsWords.length : 0) * 0.1;
        
        return Math.min(1.0, intensity);
    }

    /**
     * Extract imagery and visual elements
     */
    extractImagery(text) {
        const visualWords = ['see', 'bright', 'dark', 'light', 'color', 'red', 'blue', 'green', 'golden', 'purple', 'black', 'white', 'rainbow', 'shining', 'glow'];
        const sensoryWords = ['hear', 'feel', 'touch', 'warm', 'cold', 'soft', 'rough', 'smooth', 'loud', 'quiet'];
        
        const words = text.toLowerCase().split(/\W+/);
        const visual = visualWords.filter(word => words.includes(word));
        const sensory = sensoryWords.filter(word => words.includes(word));
        
        return { visual, sensory };
    }

    /**
     * Detect memory references
     */
    detectMemoryReferences(text) {
        const memoryIndicators = ['remember', 'childhood', 'when i was', 'back then', 'used to', 'reminds me', 'takes me back', 'memories'];
        const words = text.toLowerCase();
        
        return memoryIndicators.filter(indicator => words.includes(indicator));
    }

    /**
     * Show thank you message
     */
    showThankYou(wasCorrect, hadStory = false) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #00ff88, #00f5ff);
            color: black;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10001;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        let messageText = '';
        if (hadStory) {
            messageText = wasCorrect ? 
                '💭 Soul learned: I was right + your beautiful story!' : 
                '💭 Soul learned: Thanks for the correction + story!';
        } else {
            messageText = wasCorrect ? 
                '🎉 Soul learned: I was correct!' : 
                '🧠 Soul learned: Thanks for teaching me!';
        }
        
        message.textContent = messageText;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 4000);
    }

    /**
     * Save learning data to localStorage
     */
    saveLearningData() {
        localStorage.setItem('soulLearningData', JSON.stringify(this.learningData));
    }

    /**
     * Load learning data from localStorage
     */
    loadLearningData() {
        const saved = localStorage.getItem('soulLearningData');
        if (saved) {
            this.learningData = JSON.parse(saved);
            console.log('🧠 Phase 2: Loaded', this.learningData.length, 'learning examples from memory');
        }
    }

    /**
     * Auto-show feedback (randomly 30% of the time during music)
     */
    maybeShowFeedback(emotionState) {
        // Only show if not already active and randomly
        if (!this.isActive && Math.random() < 0.3) {
            // Wait a bit, then show feedback
            setTimeout(() => {
                if (!this.isActive) {  // Check again in case user did something
                    this.showFeedback(emotionState);
                }
            }, 2000);
        }
    }

    /**
     * Get learning statistics
     */
    getLearningStats() {
        const total = this.learningData.length;
        const correct = this.learningData.filter(d => d.wasCorrect).length;
        const accuracy = total > 0 ? (correct / total * 100).toFixed(1) : 0;
        
        return {
            totalFeedback: total,
            correctPredictions: correct,
            accuracy: accuracy + '%',
            improvements: total - correct
        };
    }

    /**
     * Get feedback statistics (alias for getLearningStats for compatibility)
     */
    getFeedbackStats() {
        return this.getLearningStats();
    }
}

// Add slideIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize the feedback system
window.emotionFeedbackSystem = new EmotionFeedbackSystem();

// Load existing learning data
window.emotionFeedbackSystem.loadLearningData();

console.log('🧠 Phase 2: User Feedback Learning System ready!');
