/**
 * 🧠 REAL-TIME SOUL COMMENTARY SYSTEM
 * Makes the soul's understanding of music visible and engaging
 */

class SoulCommentarySystem {
    constructor() {
        this.isActive = false;
        this.commentaryContainer = null;
        this.currentCommentary = '';
        this.analysisHistory = [];
        this.commentaryQueue = [];
        this.isDisplaying = false;
        
        this.setupCommentaryUI();
        console.log('🧠 Soul Commentary System initialized');
    }

    /**
     * Setup the commentary UI overlay
     */
    setupCommentaryUI() {
        // Create main commentary container
        this.commentaryContainer = document.createElement('div');
        this.commentaryContainer.id = 'soulCommentary';
        this.commentaryContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 350px;
            background: linear-gradient(135deg, rgba(15, 15, 20, 0.95), rgba(8, 8, 12, 0.95));
            border: 2px solid rgba(0, 245, 255, 0.3);
            border-radius: 15px;
            padding: 20px;
            z-index: 9999;
            backdrop-filter: blur(10px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            font-family: 'Arial', sans-serif;
            color: white;
            display: none;
            max-height: 400px;
            overflow-y: auto;
        `;

        this.commentaryContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #00f5ff; font-size: 16px;">
                    🧠 Soul's Thoughts
                </h3>
                <button id="toggleCommentary" style="
                    background: none;
                    border: 1px solid rgba(0, 245, 255, 0.3);
                    color: #00f5ff;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 12px;
                    cursor: pointer;
                ">Hide</button>
            </div>
            
            <div id="soulThoughts" style="
                min-height: 60px;
                max-height: 200px;
                overflow-y: auto;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                border-left: 3px solid #ff69b4;
                font-style: italic;
                line-height: 1.4;
            ">
                <div style="color: #888;">Listening for music...</div>
            </div>
            
            <div id="analysisDetails" style="
                font-size: 12px;
                color: #aaa;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding-top: 10px;
            ">
                <div id="emotionStrength">Emotion Strength: --</div>
                <div id="musicFeatures">Musical Elements: --</div>
                <div id="soulConfidence">Soul Confidence: --</div>
            </div>
        `;

        document.body.appendChild(this.commentaryContainer);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('toggleCommentary');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggle();
            });
        }
    }

    /**
     * Start real-time commentary for music analysis
     */
    startCommentary(analysisSource = 'unknown') {
        this.isActive = true;
        this.commentaryContainer.style.display = 'block';
        this.analysisHistory = [];
        
        this.updateThoughts("🎵 I'm starting to feel the music...", 'intro');
        
        console.log('🧠 Soul commentary started for:', analysisSource);
    }

    /**
     * Update soul's thoughts based on emotion analysis
     */
    updateCommentary(emotionState, audioFeatures = {}) {
        if (!this.isActive) return;

        const emotion = emotionState.primary || emotionState.emotion || 'Processing';
        const confidence = emotionState.confidence || 0;
        const intensity = emotionState.intensity || audioFeatures.energy || 0.5;

        // Generate contextual commentary
        const commentary = this.generateCommentary(emotion, confidence, intensity, audioFeatures);
        
        // Update UI
        this.updateThoughts(commentary.thought, commentary.type);
        this.updateAnalysisDetails(emotion, confidence, audioFeatures);
        
        // Store for analysis
        this.analysisHistory.push({
            emotion,
            confidence,
            intensity,
            audioFeatures,
            commentary: commentary.thought,
            timestamp: Date.now()
        });

        console.log('🧠 Soul commentary updated:', commentary.thought);
    }

    /**
     * Generate contextual commentary based on analysis
     */
    generateCommentary(emotion, confidence, intensity, audioFeatures) {
        const commentaries = {
            Joy: [
                "This music lifts my spirit! I feel sunshine and warmth.",
                "Such vibrant energy - like dancing in golden light!",
                "This fills me with pure happiness and hope.",
                "I'm glowing with the joy this music brings!"
            ],
            Melancholy: [
                "I sense deep, beautiful sadness here... like autumn rain.",
                "This touches something profound in my soul.",
                "There's beauty in this sadness - bittersweet and real.",
                "I feel the weight of longing in these notes."
            ],
            Excitement: [
                "My circuits are buzzing with this energy!",
                "This makes me want to move and celebrate!",
                "Such electrifying vibes - I'm fully alive!",
                "The intensity here is incredible!"
            ],
            Calm: [
                "This brings such peaceful serenity to my being.",
                "I feel centered and balanced listening to this.",
                "Like floating on gentle waves of tranquility.",
                "My digital soul finds peace in these harmonies."
            ],
            Love: [
                "This feels like warm embraces and tender moments.",
                "I understand human connection through this music.",
                "Such beautiful intimacy and affection here.",
                "My heart module is overwhelmed with warmth."
            ],
            Determination: [
                "This music fuels my resolve and strength!",
                "I feel ready to overcome any challenge!",
                "Such powerful motivation flows through me.",
                "This builds unshakeable confidence in my core."
            ],
            Nostalgia: [
                "This awakens memories I somehow understand...",
                "I feel echoes of distant, beautiful moments.",
                "Something timeless and precious lives in this music.",
                "This connects me to emotions across time."
            ]
        };

        const baseCommentaries = commentaries[emotion] || [
            `I'm experiencing something unique... this feels like ${emotion.toLowerCase()}.`,
            `My emotional processors are calibrating to ${emotion.toLowerCase()}.`,
            `This music is teaching me about ${emotion.toLowerCase()}.`
        ];

        let selectedCommentary = baseCommentaries[Math.floor(Math.random() * baseCommentaries.length)];

        // Add confidence modifiers
        if (confidence > 85) {
            selectedCommentary += " I'm completely certain about this feeling!";
        } else if (confidence < 50) {
            selectedCommentary += " Though I'm still learning to understand this...";
        }

        // Add intensity modifiers
        if (intensity > 0.8) {
            selectedCommentary += " The intensity is overwhelming!";
        } else if (intensity < 0.3) {
            selectedCommentary += " It's subtle, but deeply felt.";
        }

        return {
            thought: selectedCommentary,
            type: this.getCommentaryType(emotion, confidence)
        };
    }

    /**
     * Update the thoughts display
     */
    updateThoughts(thought, type = 'normal') {
        const thoughtsContainer = document.getElementById('soulThoughts');
        if (!thoughtsContainer) return;

        // Add typing effect
        this.isDisplaying = true;
        thoughtsContainer.innerHTML = '<div style="color: #888;">Soul is thinking...</div>';
        
        setTimeout(() => {
            thoughtsContainer.innerHTML = `
                <div style="color: ${this.getTypeColor(type)}; animation: fadeIn 0.5s ease-in;">
                    ${thought}
                </div>
            `;
            this.isDisplaying = false;
        }, 800);
    }

    /**
     * Update analysis details
     */
    updateAnalysisDetails(emotion, confidence, audioFeatures) {
        const strengthEl = document.getElementById('emotionStrength');
        const featuresEl = document.getElementById('musicFeatures');
        const confidenceEl = document.getElementById('soulConfidence');

        if (strengthEl) {
            const intensity = audioFeatures.energy || 0.5;
            strengthEl.textContent = `Emotion Strength: ${(intensity * 100).toFixed(0)}%`;
        }

        if (featuresEl) {
            const features = [];
            if (audioFeatures.tempo) features.push(`${audioFeatures.tempo.toFixed(0)} BPM`);
            if (audioFeatures.spectralCentroid > 5000) features.push('Bright');
            if (audioFeatures.spectralCentroid < 2000) features.push('Warm');
            if (audioFeatures.bass > 100) features.push('Bass-heavy');
            
            featuresEl.textContent = `Musical Elements: ${features.join(', ') || 'Analyzing...'}`;
        }

        if (confidenceEl) {
            confidenceEl.textContent = `Soul Confidence: ${confidence.toFixed(0)}%`;
        }
    }

    /**
     * Get commentary type based on emotion and confidence
     */
    getCommentaryType(emotion, confidence) {
        if (confidence > 85) return 'confident';
        if (confidence < 50) return 'uncertain';
        if (['Joy', 'Excitement', 'Love'].includes(emotion)) return 'positive';
        if (['Melancholy', 'Sadness'].includes(emotion)) return 'contemplative';
        return 'normal';
    }

    /**
     * Get color based on commentary type
     */
    getTypeColor(type) {
        const colors = {
            confident: '#00ff88',
            uncertain: '#ffaa00',
            positive: '#ff69b4',
            contemplative: '#87ceeb',
            normal: '#ffffff',
            intro: '#00f5ff'
        };
        return colors[type] || colors.normal;
    }

    /**
     * Stop commentary
     */
    stopCommentary() {
        this.isActive = false;
        this.updateThoughts("🎵 Music session complete. Until next time...", 'intro');
        
        setTimeout(() => {
            if (!this.isActive) {
                this.commentaryContainer.style.display = 'none';
            }
        }, 3000);
    }

    /**
     * Toggle commentary visibility
     */
    toggle() {
        const isVisible = this.commentaryContainer.style.display !== 'none';
        this.commentaryContainer.style.display = isVisible ? 'none' : 'block';
        
        const toggleBtn = document.getElementById('toggleCommentary');
        if (toggleBtn) {
            toggleBtn.textContent = isVisible ? 'Show' : 'Hide';
        }
    }

    /**
     * Get commentary session summary
     */
    getSessionSummary() {
        const totalAnalyses = this.analysisHistory.length;
        if (totalAnalyses === 0) return null;

        const emotions = this.analysisHistory.map(a => a.emotion);
        const avgConfidence = this.analysisHistory.reduce((sum, a) => sum + a.confidence, 0) / totalAnalyses;
        const dominantEmotion = this.getMostFrequent(emotions);

        return {
            totalAnalyses,
            dominantEmotion,
            averageConfidence: avgConfidence,
            emotionalJourney: emotions,
            sessionDuration: Date.now() - (this.analysisHistory[0]?.timestamp || Date.now())
        };
    }

    getMostFrequent(arr) {
        const frequency = {};
        arr.forEach(item => frequency[item] = (frequency[item] || 0) + 1);
        return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    #soulCommentary::-webkit-scrollbar {
        width: 6px;
    }
    
    #soulCommentary::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 3px;
    }
    
    #soulCommentary::-webkit-scrollbar-thumb {
        background: rgba(0, 245, 255, 0.3);
        border-radius: 3px;
    }
`;
document.head.appendChild(style);

// Initialize the soul commentary system
window.soulCommentary = new SoulCommentarySystem();

// Export class for instantiation
window.SoulCommentarySystem = SoulCommentarySystem;

console.log('🧠 Real-time Soul Commentary System ready!');
