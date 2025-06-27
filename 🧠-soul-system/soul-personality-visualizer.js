/**
 * 🎭 SOUL PERSONALITY VISUALIZER
 * 
 * Makes the digital soul's personality visible and interactive
 * Shows Big Five traits, emotional DNA, and real-time soul evolution
 */

class SoulPersonalityVisualizer {
    constructor(emotionEngine) {
        this.emotionEngine = emotionEngine;
        this.visualizerElement = null;
        this.personalityChart = null;
        this.emotionalDNADisplay = null;
        this.soulEvolutionTimeline = null;
        
        // Personality color mappings
        this.personalityColors = {
            openness: { 
                low: '#8B5CF6',    // Purple - traditional
                high: '#FF6B6B'    // Red - adventurous 
            },
            conscientiousness: {
                low: '#F59E0B',    // Orange - spontaneous  
                high: '#10B981'    // Green - organized
            },
            extraversion: {
                low: '#6366F1',    // Indigo - introverted
                high: '#F59E0B'    // Orange - extraverted
            },
            agreeableness: {
                low: '#EF4444',    // Red - competitive
                high: '#EC4899'    // Pink - cooperative
            },
            neuroticism: {
                low: '#06B6D4',    // Cyan - stable
                high: '#8B5CF6'    // Purple - sensitive
            }
        };
        
        this.initialize();
    }
    
    async initialize() {
        console.log('🎭 Initializing Soul Personality Visualizer...');
        
        this.createVisualizerUI();
        this.attachToSoulDashboard();
        
        // Wait for emotion engine to be ready
        if (this.emotionEngine && this.emotionEngine.factorySoul) {
            this.displayPersonality();
        } else {
            // Wait for factory soul to load
            setTimeout(() => {
                if (this.emotionEngine?.factorySoul) {
                    this.displayPersonality();
                }
            }, 2000);
        }
        
        console.log('✨ Soul Personality Visualizer ready!');
    }
    
    createVisualizerUI() {
        this.visualizerElement = document.createElement('div');
        this.visualizerElement.id = 'soul-personality-visualizer';
        this.visualizerElement.innerHTML = `
            <div class="soul-visualizer-content">
                <!-- Personality Overview -->
                <div class="personality-overview">
                    <h3>🧬 Your Soul's Personality</h3>
                    <div class="personality-traits-display" id="personality-traits">
                        <!-- Traits will be populated here -->
                    </div>
                </div>
                
                <!-- Emotional DNA -->
                <div class="emotional-dna-section">
                    <h4>🎵 Musical DNA</h4>
                    <div class="musical-dna-display" id="musical-dna">
                        <!-- Musical preferences will be populated here -->
                    </div>
                </div>
                
                <!-- Soul Evolution -->
                <div class="soul-evolution-section">
                    <h4>📈 Soul Evolution</h4>
                    <div class="evolution-timeline" id="evolution-timeline">
                        <p>Your soul's journey will appear here as you interact with music...</p>
                    </div>
                </div>
                
                <!-- Real-time Emotional State -->
                <div class="current-emotion-section">
                    <h4>💭 Current Emotional State</h4>
                    <div class="current-emotion-display" id="current-emotion">
                        <div class="emotion-particles" id="emotion-particles"></div>
                        <div class="emotion-text" id="emotion-text">Ready to feel music...</div>
                    </div>
                </div>
            </div>
        `;
        
        this.addVisualizerStyles();
    }
    
    addVisualizerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #soul-personality-visualizer {
                position: fixed;
                top: 80px;
                left: 20px;
                width: 350px;
                max-height: calc(100vh - 100px);
                background: rgba(15, 15, 20, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                z-index: 8000;
                overflow-y: auto;
                font-family: 'Segoe UI', sans-serif;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                transition: all 0.3s ease;
            }
            
            .soul-visualizer-content {
                padding: 20px;
            }
            
            .soul-visualizer-content h3 {
                color: #00f5ff;
                margin: 0 0 15px 0;
                font-size: 1.1em;
                text-align: center;
            }
            
            .soul-visualizer-content h4 {
                color: #ffffff;
                margin: 20px 0 10px 0;
                font-size: 0.9em;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            /* Personality Traits Display */
            .personality-trait {
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                padding: 8px;
                background: rgba(255, 255, 255, 0.03);
                border-radius: 8px;
                transition: all 0.2s ease;
            }
            
            .personality-trait:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateX(5px);
            }
            
            .trait-label {
                flex: 1;
                color: #ffffff;
                font-size: 0.85em;
                font-weight: 500;
            }
            
            .trait-bar {
                flex: 2;
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                margin: 0 10px;
                overflow: hidden;
            }
            
            .trait-fill {
                height: 100%;
                border-radius: 3px;
                transition: all 0.8s ease;
                position: relative;
            }
            
            .trait-fill::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shimmer 2s infinite;
            }
            
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            .trait-value {
                color: #00f5ff;
                font-size: 0.8em;
                font-weight: bold;
                min-width: 35px;
            }
            
            /* Musical DNA Display */
            .musical-dna-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .genre-name {
                color: #ffffff;
                font-size: 0.8em;
            }
            
            .genre-affinity {
                color: #00ff88;
                font-size: 0.8em;
                font-weight: bold;
            }
            
            /* Current Emotion Display */
            .current-emotion-display {
                text-align: center;
                padding: 15px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                position: relative;
                overflow: hidden;
            }
            
            .emotion-particles {
                height: 60px;
                position: relative;
                margin-bottom: 10px;
            }
            
            .emotion-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                animation: emotionFloat 3s ease-in-out infinite;
            }
            
            @keyframes emotionFloat {
                0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
                50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
            }
            
            .emotion-text {
                color: #ffffff;
                font-size: 0.9em;
                font-weight: 500;
            }
            
            /* Evolution Timeline */
            .evolution-timeline {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                padding: 15px;
                min-height: 80px;
                border: 1px dashed rgba(255, 255, 255, 0.1);
            }
            
            .evolution-timeline p {
                color: rgba(255, 255, 255, 0.5);
                font-size: 0.8em;
                text-align: center;
                margin: 0;
                font-style: italic;
            }
            
            /* Responsive behavior */
            @media (max-width: 768px) {
                #soul-personality-visualizer {
                    width: 300px;
                    left: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    attachToSoulDashboard() {
        // Add to the main app display
        document.body.appendChild(this.visualizerElement);
        
        // Make it draggable (optional enhancement)
        this.makeDraggable();
    }
    
    makeDraggable() {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        
        const header = this.visualizerElement.querySelector('h3');
        if (header) {
            header.style.cursor = 'move';
            
            header.addEventListener('mousedown', (e) => {
                isDragging = true;
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                    xOffset = currentX;
                    yOffset = currentY;
                    
                    this.visualizerElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }
    }
    
    displayPersonality() {
        if (!this.emotionEngine?.factorySoul?.corePersonality) {
            console.warn('⚠️ No factory soul personality data available');
            return;
        }
        
        const personality = this.emotionEngine.factorySoul.corePersonality;
        const traitsContainer = document.getElementById('personality-traits');
        
        if (!traitsContainer) return;
        
        console.log('🎭 Displaying personality traits:', personality);
        
        // Create personality trait displays
        const traits = [
            { key: 'openness', label: 'Openness', description: 'Curiosity & Creativity' },
            { key: 'conscientiousness', label: 'Conscientiousness', description: 'Organization & Discipline' },
            { key: 'extraversion', label: 'Extraversion', description: 'Social Energy' },
            { key: 'agreeableness', label: 'Agreeableness', description: 'Cooperation & Trust' },
            { key: 'neuroticism', label: 'Emotional Sensitivity', description: 'Emotional Reactivity' }
        ];
        
        traitsContainer.innerHTML = '';
        
        traits.forEach(trait => {
            const value = personality[trait.key] || 0.5;
            const percentage = Math.round(value * 100);
            
            const traitElement = document.createElement('div');
            traitElement.className = 'personality-trait';
            
            // Get color based on trait value
            const color = this.getTraitColor(trait.key, value);
            
            traitElement.innerHTML = `
                <div class="trait-label" title="${trait.description}">
                    ${trait.label}
                </div>
                <div class="trait-bar">
                    <div class="trait-fill" style="width: ${percentage}%; background: ${color};"></div>
                </div>
                <div class="trait-value">${percentage}%</div>
            `;
            
            traitsContainer.appendChild(traitElement);
        });
        
        // Display musical DNA
        this.displayMusicalDNA();
        
        // Start real-time emotion updates
        this.startEmotionUpdates();
    }
    
    getTraitColor(traitKey, value) {
        const colors = this.personalityColors[traitKey];
        if (!colors) return '#00f5ff';
        
        // Interpolate between low and high colors
        const ratio = value;
        return this.interpolateColor(colors.low, colors.high, ratio);
    }
    
    interpolateColor(color1, color2, ratio) {
        // Simple color interpolation
        const hex1 = color1.replace('#', '');
        const hex2 = color2.replace('#', '');
        
        const r1 = parseInt(hex1.substr(0, 2), 16);
        const g1 = parseInt(hex1.substr(2, 2), 16);
        const b1 = parseInt(hex1.substr(4, 2), 16);
        
        const r2 = parseInt(hex2.substr(0, 2), 16);
        const g2 = parseInt(hex2.substr(2, 2), 16);
        const b2 = parseInt(hex2.substr(4, 2), 16);
        
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    displayMusicalDNA() {
        const musicalDNA = this.emotionEngine.factorySoul?.musicalDNA;
        const container = document.getElementById('musical-dna');
        
        if (!container || !musicalDNA) return;
        
        container.innerHTML = '';
        
        Object.entries(musicalDNA).forEach(([genre, data]) => {
            if (typeof data === 'object' && data.baseAffinity !== undefined) {
                const affinity = Math.round(data.baseAffinity * 100);
                
                const dnaItem = document.createElement('div');
                dnaItem.className = 'musical-dna-item';
                dnaItem.innerHTML = `
                    <span class="genre-name">${genre.charAt(0).toUpperCase() + genre.slice(1)}</span>
                    <span class="genre-affinity">${affinity}%</span>
                `;
                
                container.appendChild(dnaItem);
            }
        });
    }
    
    startEmotionUpdates() {
        // Update current emotional state in real-time
        setInterval(() => {
            this.updateCurrentEmotion();
        }, 1000);
    }
    
    updateCurrentEmotion() {
        const emotionText = document.getElementById('emotion-text');
        const particlesContainer = document.getElementById('emotion-particles');
        
        if (!emotionText || !particlesContainer) return;
        
        // Get current emotion from engine (if available)
        if (this.emotionEngine && typeof this.emotionEngine.getCurrentEmotion === 'function') {
            const currentEmotion = this.emotionEngine.getCurrentEmotion();
            if (currentEmotion) {
                emotionText.textContent = `Feeling: ${currentEmotion.key} (${Math.round(currentEmotion.confidence * 100)}%)`;
                this.createEmotionParticles(currentEmotion.key, particlesContainer);
                return;
            }
        }
        
        // Default state
        emotionText.textContent = 'Ready to feel music...';
        this.createEmotionParticles('neutral', particlesContainer);
    }
    
    createEmotionParticles(emotion, container) {
        // Clear existing particles
        container.innerHTML = '';
        
        // Emotion-specific particle colors
        const emotionColors = {
            joy: '#FFD700',
            sadness: '#4682B4', 
            anger: '#DC143C',
            fear: '#8A2BE2',
            surprise: '#FF6347',
            nostalgia: '#DDA0DD',
            awe: '#00CED1',
            serenity: '#98FB98',
            neutral: '#00f5ff'
        };
        
        const color = emotionColors[emotion] || emotionColors.neutral;
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'emotion-particle';
            particle.style.background = color;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particle.style.animationDuration = `${2 + Math.random() * 2}s`;
            
            container.appendChild(particle);
        }
    }
    
    // Method to update personality when it evolves
    updatePersonality(newPersonality) {
        if (this.emotionEngine?.factorySoul) {
            this.emotionEngine.factorySoul.corePersonality = { ...newPersonality };
            this.displayPersonality();
            console.log('🎭 Soul personality updated:', newPersonality);
        }
    }
    
    // Toggle visibility
    toggle() {
        const isVisible = this.visualizerElement.style.display !== 'none';
        this.visualizerElement.style.display = isVisible ? 'none' : 'block';
    }
}

// Export for use in main app
if (typeof window !== 'undefined') {
    window.SoulPersonalityVisualizer = SoulPersonalityVisualizer;
    
    // Auto-initialize when emotion engine is ready
    setTimeout(() => {
        if (window.emotionEngine) {
            window.soulPersonalityVisualizer = new SoulPersonalityVisualizer(window.emotionEngine);
        }
    }, 2500);
}

export { SoulPersonalityVisualizer };
