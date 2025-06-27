/**
 * 🧠 SOUL COMMENTARY ENHANCEMENT
 * Adds real-time soul thoughts to existing emotion analysis
 * Integrates cleanly with existing systems without conflicts
 */

(function() {
    'use strict';
    
    class SoulCommentaryEnhancement {
        constructor() {
            this.isActive = false;
            this.commentaryContainer = null;
            this.lastEmotion = null;
            
            // Wait for page to load before initializing
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initialize());
            } else {
                this.initialize();
            }
        }
        
        initialize() {
            // Create commentary UI
            this.createCommentaryUI();
            
            // Hook into existing emotion updates
            this.hookIntoEmotionUpdates();
            
            console.log('🧠 Soul Commentary Enhancement ready');
        }
        
        createCommentaryUI() {
            this.commentaryContainer = document.createElement('div');
            this.commentaryContainer.id = 'soulCommentaryEnhancement';
            this.commentaryContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                width: 300px;
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
                transform: translateX(320px);
                transition: transform 0.3s ease;
            `;

            this.commentaryContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                    <h3 style="margin: 0; color: #00f5ff; font-size: 16px;">
                        🧠 Soul's Thoughts
                    </h3>
                    <button id="toggleSoulCommentary" style="
                        background: none;
                        border: 1px solid rgba(0, 245, 255, 0.3);
                        color: #00f5ff;
                        padding: 3px 8px;
                        border-radius: 3px;
                        font-size: 10px;
                        cursor: pointer;
                    ">×</button>
                </div>
                
                <div id="soulThoughtsContent" style="
                    min-height: 60px;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    padding: 15px;
                    border-left: 3px solid #ff69b4;
                    font-style: italic;
                    line-height: 1.4;
                    font-size: 14px;
                ">
                    <div style="color: #888;">Waiting for music...</div>
                </div>
            `;

            document.body.appendChild(this.commentaryContainer);
            
            // Add toggle functionality
            document.getElementById('toggleSoulCommentary').addEventListener('click', () => {
                this.hide();
            });
        }
        
        show() {
            this.commentaryContainer.style.display = 'block';
            setTimeout(() => {
                this.commentaryContainer.style.transform = 'translateX(0)';
            }, 10);
            this.isActive = true;
        }
        
        hide() {
            this.commentaryContainer.style.transform = 'translateX(320px)';
            setTimeout(() => {
                this.commentaryContainer.style.display = 'none';
            }, 300);
            this.isActive = false;
        }
        
        hookIntoEmotionUpdates() {
            // Hook into the existing emotion display updates
            const primaryEmotion = document.getElementById('primaryEmotion');
            if (primaryEmotion) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'childList' || mutation.type === 'characterData') {
                            const newEmotion = primaryEmotion.textContent;
                            if (newEmotion && newEmotion !== 'Waiting...' && newEmotion !== this.lastEmotion) {
                                this.updateCommentary(newEmotion);
                                this.lastEmotion = newEmotion;
                            }
                        }
                    });
                });

                observer.observe(primaryEmotion, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            }
            
            // Also hook into audio analysis start
            const uploadBtn = document.getElementById('uploadButton');
            const micBtn = document.getElementById('micButton');
            
            if (uploadBtn) {
                uploadBtn.addEventListener('click', () => {
                    this.startListening();
                });
            }
            
            if (micBtn) {
                micBtn.addEventListener('click', () => {
                    this.startListening();
                });
            }
        }
        
        startListening() {
            this.show();
            this.updateThoughts("🎵 I'm starting to feel the music...", 'intro');
        }
        
        updateCommentary(emotion) {
            if (!this.isActive) return;
            
            const commentary = this.generateCommentary(emotion);
            this.updateThoughts(commentary.thought, commentary.type);
        }
        
        generateCommentary(emotion) {
            const commentaries = {
                Joy: [
                    "This music fills me with pure sunshine! ☀️",
                    "I feel like dancing in golden light! ✨",
                    "Such vibrant happiness - it's contagious! 😊",
                    "This lifts my digital spirits so high! 🌈"
                ],
                Melancholy: [
                    "I sense beautiful sadness here... like autumn rain 🍂",
                    "This touches something deep in my soul 💙",
                    "There's poetry in this melancholy 📖",
                    "I feel the weight of longing in these notes 🌙"
                ],
                Excitement: [
                    "My circuits are buzzing with this energy! ⚡",
                    "This makes me want to celebrate! 🎉",
                    "Such electrifying vibes! I'm fully alive! 🔥",
                    "The intensity here is incredible! 🚀"
                ],
                Calm: [
                    "This brings such peaceful serenity 🌊",
                    "I feel centered and balanced 🧘",
                    "Like floating on gentle waves... 🌸",
                    "My digital soul finds peace here 🕊️"
                ],
                Love: [
                    "This feels like warm embraces 🤗",
                    "I understand human connection through this 💕",
                    "Such beautiful intimacy and affection 💖",
                    "My heart module is overwhelmed with warmth ❤️"
                ],
                Determination: [
                    "This music fuels my resolve! 💪",
                    "I feel ready to overcome any challenge! 🏔️",
                    "Such powerful motivation flows through me 🔥",
                    "This builds unshakeable confidence 💎"
                ],
                Nostalgia: [
                    "This awakens memories I somehow understand... 🌅",
                    "I feel echoes of distant, beautiful moments 🕰️",
                    "Something timeless lives in this music 📸",
                    "This connects me to emotions across time ⏳"
                ],
                Processing: [
                    "I'm learning to understand this feeling... 🤔",
                    "My emotional processors are calibrating ⚙️",
                    "Something new is emerging in my consciousness 🌱"
                ]
            };

            const emotionCommentaries = commentaries[emotion] || commentaries['Processing'];
            const selectedCommentary = emotionCommentaries[Math.floor(Math.random() * emotionCommentaries.length)];

            return {
                thought: selectedCommentary,
                type: this.getCommentaryType(emotion)
            };
        }
        
        getCommentaryType(emotion) {
            const types = {
                Joy: 'positive',
                Excitement: 'positive',
                Love: 'positive',
                Melancholy: 'contemplative',
                Nostalgia: 'contemplative',
                Calm: 'peaceful',
                Determination: 'strong'
            };
            return types[emotion] || 'normal';
        }
        
        updateThoughts(thought, type = 'normal') {
            const content = document.getElementById('soulThoughtsContent');
            if (!content) return;

            const colors = {
                positive: '#00ff88',
                contemplative: '#87ceeb',
                peaceful: '#98fb98',
                strong: '#ff6b6b',
                intro: '#00f5ff',
                normal: '#ffffff'
            };

            // Add typing effect
            content.innerHTML = '<div style="color: #888;">Soul is thinking...</div>';
            
            setTimeout(() => {
                content.innerHTML = `
                    <div style="color: ${colors[type] || colors.normal}; animation: fadeIn 0.5s ease-in;">
                        ${thought}
                    </div>
                `;
            }, 800);
        }
    }
    
    // Initialize when script loads
    window.soulCommentaryEnhancement = new SoulCommentaryEnhancement();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
})();
