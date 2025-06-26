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
            
            <div id="emotionOptions" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
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
            });
        });

        // Correct button - soul was right
        this.feedbackUI.querySelector('#correctBtn').addEventListener('click', () => {
            this.submitFeedback(true, this.currentEmotion.primary);
        });

        // Skip button
        this.feedbackUI.querySelector('#skipBtn').addEventListener('click', () => {
            this.hideFeedback();
        });
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
        
        // Clear previous selections
        this.feedbackUI.querySelectorAll('.emotion-btn').forEach(btn => btn.classList.remove('selected'));
        
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
        const feedbackData = {
            timestamp: Date.now(),
            detected: this.currentEmotion.primary,
            wasCorrect: wasCorrect,
            correctedTo: wasCorrect ? this.currentEmotion.primary : (this.selectedCorrection || correctedEmotion),
            confidence: this.currentEmotion.confidence,
            audioFeatures: this.currentEmotion.audioFeatures || this.currentEmotion.features
        };

        // Store learning data
        this.learningData.push(feedbackData);
        
        // Send to EmotionEngine for learning
        if (window.emotionEngine && window.emotionEngine.learnFromUserFeedback) {
            window.emotionEngine.learnFromUserFeedback(feedbackData);
            console.log('🧠 Phase 2: Soul learned from feedback:', feedbackData);
        }

        // Save to localStorage for persistence
        this.saveLearningData();

        this.hideFeedback();
        
        // Show thank you message
        this.showThankYou(wasCorrect);
    }

    /**
     * Show thank you message
     */
    showThankYou(wasCorrect) {
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
        `;
        message.textContent = wasCorrect ? 
            '🎉 Soul learned: I was correct!' : 
            '🧠 Soul learned: Thanks for teaching me!';

        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
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
