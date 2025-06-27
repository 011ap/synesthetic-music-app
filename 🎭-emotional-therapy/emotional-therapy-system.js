/**
 * 🎭 PHASE 3: EMOTIONAL THERAPY SYSTEM
 * AI-powered music therapy for emotional healing and growth
 */

class EmotionalTherapySystem {
    constructor() {
        this.activeSession = null;
        this.therapyProtocols = new Map();
        this.userProgress = [];
        this.emergencyProtocols = new Map();
        
        this.initialize();
    }
    
    async initialize() {
        console.log('🎭 Initializing Emotional Therapy System...');
        
        // Load therapy protocols
        this.loadTherapyProtocols();
        
        // Setup emotional monitoring
        this.setupEmotionalMonitoring();
        
        // Initialize emergency detection
        this.initializeEmergencyDetection();
        
        // Connect to soul systems
        this.connectToSoulSystems();
        
        console.log('✨ Emotional Therapy System ready!');
    }
    
    loadTherapyProtocols() {
        // Evidence-based music therapy protocols
        this.therapyProtocols = new Map([
            ['anxiety_reduction', {
                name: 'Anxiety Reduction Protocol',
                duration: 20, // minutes
                phases: [
                    {
                        name: 'Recognition',
                        duration: 3,
                        musicCharacteristics: {
                            tempo: 'variable', // Matches current anxiety
                            key: 'minor',
                            dynamics: 'gentle',
                            instruments: ['piano', 'strings'],
                            emotions: ['acknowledging', 'understanding']
                        },
                        description: 'Acknowledge and validate current anxiety'
                    },
                    {
                        name: 'Grounding',
                        duration: 5,
                        musicCharacteristics: {
                            tempo: 'slow_steady',
                            key: 'major',
                            dynamics: 'calm',
                            instruments: ['nature_sounds', 'soft_synths'],
                            emotions: ['grounding', 'stability']
                        },
                        description: 'Ground yourself in the present moment'
                    },
                    {
                        name: 'Breathing_Sync',
                        duration: 7,
                        musicCharacteristics: {
                            tempo: '60_bpm', // Matches relaxed heart rate
                            key: 'major',
                            dynamics: 'flowing',
                            instruments: ['ambient', 'breathing_guides'],
                            emotions: ['calm', 'peaceful']
                        },
                        description: 'Synchronize breathing with calming rhythms'
                    },
                    {
                        name: 'Integration',
                        duration: 5,
                        musicCharacteristics: {
                            tempo: 'gentle_uplifting',
                            key: 'major',
                            dynamics: 'warm',
                            instruments: ['acoustic_guitar', 'soft_vocals'],
                            emotions: ['hope', 'strength', 'peace']
                        },
                        description: 'Integrate calm state and build confidence'
                    }
                ],
                expectedOutcome: 'Significant reduction in anxiety levels',
                contraindications: ['severe_panic_disorder'],
                followUp: 'breathing_mastery'
            }],
            
            ['depression_support', {
                name: 'Depression Support Protocol',
                duration: 25,
                phases: [
                    {
                        name: 'Emotional_Validation',
                        duration: 5,
                        musicCharacteristics: {
                            tempo: 'slow',
                            key: 'minor',
                            dynamics: 'gentle',
                            instruments: ['piano', 'cello'],
                            emotions: ['melancholy', 'understanding', 'companionship']
                        },
                        description: 'Validate and honor current emotional state'
                    },
                    {
                        name: 'Gentle_Lifting',
                        duration: 8,
                        musicCharacteristics: {
                            tempo: 'gradually_increasing',
                            key: 'minor_to_major',
                            dynamics: 'building',
                            instruments: ['piano', 'strings', 'soft_percussion'],
                            emotions: ['gentle_hope', 'warmth', 'support']
                        },
                        description: 'Gradual emotional lifting with support'
                    },
                    {
                        name: 'Strength_Building',
                        duration: 7,
                        musicCharacteristics: {
                            tempo: 'moderate',
                            key: 'major',
                            dynamics: 'empowering',
                            instruments: ['full_orchestra', 'inspiring_vocals'],
                            emotions: ['strength', 'courage', 'determination']
                        },
                        description: 'Build inner strength and resilience'
                    },
                    {
                        name: 'Future_Hope',
                        duration: 5,
                        musicCharacteristics: {
                            tempo: 'uplifting',
                            key: 'major',
                            dynamics: 'inspirational',
                            instruments: ['inspiring_orchestration'],
                            emotions: ['hope', 'possibility', 'joy']
                        },
                        description: 'Cultivate hope and vision for the future'
                    }
                ],
                expectedOutcome: 'Improved mood and emotional resilience',
                contraindications: ['severe_depression_with_suicidal_ideation'],
                followUp: 'resilience_building'
            }],
            
            ['stress_release', {
                name: 'Stress Release Protocol',
                duration: 15,
                phases: [
                    {
                        name: 'Tension_Acknowledgment',
                        duration: 2,
                        musicCharacteristics: {
                            tempo: 'fast', // Matches stress state
                            key: 'minor',
                            dynamics: 'intense_but_controlled',
                            instruments: ['electronic', 'percussion'],
                            emotions: ['tension', 'acknowledgment']
                        },
                        description: 'Acknowledge current stress and tension'
                    },
                    {
                        name: 'Progressive_Release',
                        duration: 8,
                        musicCharacteristics: {
                            tempo: 'gradually_slowing',
                            key: 'minor_to_major',
                            dynamics: 'releasing',
                            instruments: ['nature_sounds', 'flowing_synths'],
                            emotions: ['release', 'letting_go', 'flow']
                        },
                        description: 'Progressive muscle and mental tension release'
                    },
                    {
                        name: 'Deep_Relaxation',
                        duration: 5,
                        musicCharacteristics: {
                            tempo: 'very_slow',
                            key: 'major',
                            dynamics: 'minimal',
                            instruments: ['ambient', 'binaural_beats'],
                            emotions: ['deep_peace', 'restoration']
                        },
                        description: 'Deep relaxation and restoration'
                    }
                ],
                expectedOutcome: 'Significant stress reduction and relaxation',
                contraindications: [],
                followUp: 'stress_management'
            }],
            
            ['energy_boost', {
                name: 'Natural Energy Boost Protocol',
                duration: 12,
                phases: [
                    {
                        name: 'Gentle_Awakening',
                        duration: 3,
                        musicCharacteristics: {
                            tempo: 'slow_to_moderate',
                            key: 'major',
                            dynamics: 'gentle_building',
                            instruments: ['acoustic', 'light_percussion'],
                            emotions: ['awakening', 'gentle_energy']
                        },
                        description: 'Gentle awakening of natural energy'
                    },
                    {
                        name: 'Momentum_Building',
                        duration: 5,
                        musicCharacteristics: {
                            tempo: 'building_to_moderate',
                            key: 'major',
                            dynamics: 'energizing',
                            instruments: ['upbeat_acoustic', 'inspiring_melody'],
                            emotions: ['motivation', 'enthusiasm']
                        },
                        description: 'Build positive momentum and motivation'
                    },
                    {
                        name: 'Sustainable_Energy',
                        duration: 4,
                        musicCharacteristics: {
                            tempo: 'moderate_steady',
                            key: 'major',
                            dynamics: 'sustained_positive',
                            instruments: ['full_band', 'inspiring_vocals'],
                            emotions: ['sustained_energy', 'confidence', 'joy']
                        },
                        description: 'Establish sustainable, positive energy'
                    }
                ],
                expectedOutcome: 'Natural, sustainable energy increase',
                contraindications: ['anxiety_disorders'],
                followUp: 'energy_management'
            }]
        ]);
        
        // Emergency protocols for crisis situations
        this.emergencyProtocols = new Map([
            ['panic_attack', {
                name: 'Panic Attack Support',
                immediate: true,
                duration: 10,
                musicCharacteristics: {
                    tempo: '60_bpm', // Slow, steady
                    key: 'major',
                    dynamics: 'very_gentle',
                    instruments: ['breathing_guide', 'nature_sounds'],
                    emotions: ['safety', 'grounding', 'calm']
                },
                instructions: [
                    'Focus on the music and breathing',
                    'You are safe right now',
                    'This feeling will pass',
                    'Breathe with the rhythm'
                ],
                followUp: 'anxiety_reduction'
            }],
            
            ['severe_emotional_distress', {
                name: 'Emotional Crisis Support',
                immediate: true,
                duration: 8,
                musicCharacteristics: {
                    tempo: 'very_slow',
                    key: 'warm_major',
                    dynamics: 'extremely_gentle',
                    instruments: ['soft_piano', 'warm_strings'],
                    emotions: ['safety', 'comfort', 'support']
                },
                instructions: [
                    'You are not alone',
                    'These feelings are temporary',
                    'Focus on this moment',
                    'Breathe slowly and gently'
                ],
                professionalHelp: true,
                crisisResources: [
                    'National Suicide Prevention Lifeline: 988',
                    'Crisis Text Line: Text HOME to 741741',
                    'International Association for Suicide Prevention'
                ]
            }]
        ]);
    }
    
    setupEmotionalMonitoring() {
        // Monitor for emotional distress patterns
        this.emotionalThresholds = {
            anxiety: 0.8,
            depression: 0.7,
            stress: 0.85,
            panic: 0.9
        };
        
        this.monitoringActive = true;
    }
    
    initializeEmergencyDetection() {
        // Set up patterns that indicate need for immediate intervention
        this.emergencyPatterns = {
            panic_attack: {
                triggers: ['rapid_heart_rate', 'high_anxiety', 'breathing_difficulty'],
                duration: 300000, // 5 minutes
                confidence_threshold: 0.85
            },
            severe_distress: {
                triggers: ['extreme_sadness', 'hopelessness', 'isolation'],
                duration: 900000, // 15 minutes
                confidence_threshold: 0.9
            }
        };
    }
    
    connectToSoulSystems() {
        // Listen for emotional updates
        window.addEventListener('emotionUpdate', (event) => {
            this.processEmotionalUpdate(event.detail);
        });
        
        // Connect to emotional memory system
        if (window.emotionalMemorySystem) {
            this.emotionalHistory = window.emotionalMemorySystem.emotionalJourney;
        }
    }
    
    processEmotionalUpdate(emotionalState) {
        // Check for emergency situations
        this.checkForEmergency(emotionalState);
        
        // Monitor ongoing therapy session
        if (this.activeSession) {
            this.updateTherapySession(emotionalState);
        }
        
        // Check if therapy might be beneficial
        this.assessTherapyNeed(emotionalState);
    }
    
    checkForEmergency(emotionalState) {
        if (!this.monitoringActive) return;
        
        const { primary, intensity, confidence } = emotionalState;
        
        // Check for panic attack indicators
        if ((primary?.toLowerCase().includes('panic') || 
             primary?.toLowerCase().includes('terror') ||
             intensity > 0.9) && confidence > 0.8) {
            this.triggerEmergencyProtocol('panic_attack');
            return;
        }
        
        // Check for severe emotional distress
        if ((primary?.toLowerCase().includes('despair') ||
             primary?.toLowerCase().includes('hopeless') ||
             (primary?.toLowerCase().includes('sad') && intensity > 0.85)) &&
             confidence > 0.8) {
            this.triggerEmergencyProtocol('severe_emotional_distress');
            return;
        }
    }
    
    triggerEmergencyProtocol(protocolName) {
        const protocol = this.emergencyProtocols.get(protocolName);
        if (!protocol) return;
        
        console.log(`🚨 Emergency protocol activated: ${protocol.name}`);
        
        // Create emergency therapy session
        this.activeSession = {
            id: `emergency_${Date.now()}`,
            type: 'emergency',
            protocol: protocolName,
            startTime: Date.now(),
            phase: 0,
            isEmergency: true
        };
        
        // Show emergency support UI
        this.showEmergencySupport(protocol);
        
        // Start emergency music therapy
        this.startEmergencyMusic(protocol);
        
        // Log for professional follow-up if needed
        this.logEmergencyEvent(protocolName);
    }
    
    showEmergencySupport(protocol) {
        // Create emergency support overlay
        const emergencyOverlay = document.createElement('div');
        emergencyOverlay.id = 'emergencySupport';
        emergencyOverlay.innerHTML = `
            <div class="emergency-overlay">
                <div class="emergency-content">
                    <div class="emergency-icon">🆘</div>
                    <h2 class="emergency-title">${protocol.name}</h2>
                    <div class="emergency-instructions">
                        ${protocol.instructions.map(instruction => 
                            `<p class="instruction">${instruction}</p>`
                        ).join('')}
                    </div>
                    ${protocol.professionalHelp ? `
                        <div class="crisis-resources">
                            <h3>Need immediate help?</h3>
                            ${protocol.crisisResources.map(resource => 
                                `<div class="crisis-resource">${resource}</div>`
                            ).join('')}
                        </div>
                    ` : ''}
                    <div class="emergency-actions">
                        <button class="emergency-btn primary" id="continueTherapy">
                            Continue Guided Support
                        </button>
                        <button class="emergency-btn secondary" id="pauseTherapy">
                            Pause
                        </button>
                    </div>
                    <div class="therapy-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="emergencyProgress"></div>
                        </div>
                        <div class="progress-text">Emergency support in progress...</div>
                    </div>
                </div>
            </div>
        `;
        
        // Add emergency styles
        const emergencyStyles = `
            .emergency-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                z-index: 15000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: emergencyFadeIn 0.3s ease;
            }
            
            .emergency-content {
                background: linear-gradient(135deg, rgba(255, 0, 50, 0.1), rgba(0, 0, 0, 0.8));
                border: 2px solid rgba(255, 0, 50, 0.3);
                border-radius: 20px;
                padding: 40px;
                max-width: 500px;
                text-align: center;
                color: white;
            }
            
            .emergency-icon {
                font-size: 4rem;
                margin-bottom: 20px;
                animation: emergencyPulse 1s infinite;
            }
            
            .emergency-title {
                font-size: 1.8rem;
                margin-bottom: 20px;
                color: #ff3333;
            }
            
            .emergency-instructions {
                margin-bottom: 30px;
            }
            
            .instruction {
                font-size: 1.1rem;
                margin: 10px 0;
                opacity: 0;
                animation: instructionFadeIn 0.5s ease forwards;
            }
            
            .instruction:nth-child(1) { animation-delay: 0.2s; }
            .instruction:nth-child(2) { animation-delay: 0.4s; }
            .instruction:nth-child(3) { animation-delay: 0.6s; }
            .instruction:nth-child(4) { animation-delay: 0.8s; }
            
            .crisis-resources {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
            }
            
            .crisis-resource {
                font-weight: bold;
                margin: 5px 0;
                color: #ffff99;
            }
            
            .emergency-actions {
                display: flex;
                gap: 15px;
                margin: 20px 0;
            }
            
            .emergency-btn {
                flex: 1;
                padding: 15px;
                border-radius: 10px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
            }
            
            .emergency-btn.primary {
                background: linear-gradient(135deg, #ff6b6b, #ff3333);
                color: white;
            }
            
            .emergency-btn.secondary {
                background: rgba(255, 255, 255, 0.2);
                color: white;
            }
            
            .therapy-progress {
                margin-top: 20px;
            }
            
            .progress-bar {
                width: 100%;
                height: 6px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6b6b, #ff3333);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            @keyframes emergencyFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes emergencyPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes instructionFadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        
        // Add styles if not already added
        if (!document.getElementById('emergencyStyles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'emergencyStyles';
            styleSheet.textContent = emergencyStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(emergencyOverlay);
        
        // Set up event listeners
        document.getElementById('continueTherapy')?.addEventListener('click', () => {
            this.continueEmergencyTherapy();
        });
        
        document.getElementById('pauseTherapy')?.addEventListener('click', () => {
            this.pauseTherapy();
        });
    }
    
    startEmergencyMusic(protocol) {
        // Generate calming, therapeutic music immediately
        const musicConfig = protocol.musicCharacteristics;
        
        // In a real implementation, this would trigger actual music playback
        console.log(`🎵 Starting emergency therapeutic music: ${JSON.stringify(musicConfig)}`);
        
        // Simulate music therapy progression
        this.updateEmergencyProgress(0);
        const progressInterval = setInterval(() => {
            if (!this.activeSession || !this.activeSession.isEmergency) {
                clearInterval(progressInterval);
                return;
            }
            
            const elapsed = Date.now() - this.activeSession.startTime;
            const progress = Math.min(100, (elapsed / (protocol.duration * 60000)) * 100);
            this.updateEmergencyProgress(progress);
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                this.completeEmergencyTherapy();
            }
        }, 1000);
    }
    
    updateEmergencyProgress(percentage) {
        const progressFill = document.getElementById('emergencyProgress');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
    }
    
    continueEmergencyTherapy() {
        if (this.activeSession && this.activeSession.isEmergency) {
            const protocol = this.emergencyProtocols.get(this.activeSession.protocol);
            if (protocol.followUp) {
                this.startTherapySession(protocol.followUp);
            }
        }
    }
    
    completeEmergencyTherapy() {
        const emergencyOverlay = document.getElementById('emergencySupport');
        if (emergencyOverlay) {
            emergencyOverlay.remove();
        }
        
        // Offer follow-up therapy
        this.offerFollowUpTherapy();
        
        this.activeSession = null;
    }
    
    assessTherapyNeed(emotionalState) {
        if (this.activeSession) return; // Already in therapy
        
        const { primary, intensity } = emotionalState;
        const emotion = primary?.toLowerCase() || '';
        
        // Check if current emotion would benefit from therapy
        const therapyRecommendations = [];
        
        if ((emotion.includes('anxious') || emotion.includes('worried')) && intensity > 0.6) {
            therapyRecommendations.push('anxiety_reduction');
        }
        
        if ((emotion.includes('sad') || emotion.includes('depressed')) && intensity > 0.5) {
            therapyRecommendations.push('depression_support');
        }
        
        if ((emotion.includes('stress') || emotion.includes('overwhelmed')) && intensity > 0.7) {
            therapyRecommendations.push('stress_release');
        }
        
        if ((emotion.includes('tired') || emotion.includes('low')) && intensity > 0.6) {
            therapyRecommendations.push('energy_boost');
        }
        
        if (therapyRecommendations.length > 0) {
            this.suggestTherapy(therapyRecommendations, emotionalState);
        }
    }
    
    suggestTherapy(recommendations, emotionalState) {
        // Don't spam suggestions
        if (this.lastSuggestion && Date.now() - this.lastSuggestion < 300000) return; // 5 minutes
        
        console.log(`💡 Therapy suggestions available: ${recommendations.join(', ')}`);
        
        // Show gentle therapy suggestion
        this.showTherapySuggestion(recommendations[0], emotionalState);
        this.lastSuggestion = Date.now();
    }
    
    showTherapySuggestion(protocolName, emotionalState) {
        const protocol = this.therapyProtocols.get(protocolName);
        if (!protocol) return;
        
        // Create suggestion notification
        const suggestion = document.createElement('div');
        suggestion.id = 'therapySuggestion';
        suggestion.innerHTML = `
            <div class="therapy-suggestion">
                <div class="suggestion-content">
                    <div class="suggestion-icon">🎭</div>
                    <div class="suggestion-text">
                        <div class="suggestion-title">Feeling ${emotionalState.primary}?</div>
                        <div class="suggestion-description">
                            Try our ${protocol.name} (${protocol.duration} min)
                        </div>
                    </div>
                    <div class="suggestion-actions">
                        <button class="suggestion-btn primary" data-protocol="${protocolName}">
                            Start Session
                        </button>
                        <button class="suggestion-btn secondary" id="dismissSuggestion">
                            Not Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add suggestion styles
        const suggestionStyles = `
            .therapy-suggestion {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid rgba(0, 245, 255, 0.3);
                border-radius: 15px;
                padding: 20px;
                max-width: 350px;
                z-index: 5000;
                animation: suggestionSlideIn 0.5s ease;
            }
            
            .suggestion-content {
                display: flex;
                align-items: center;
                gap: 15px;
                color: white;
            }
            
            .suggestion-icon {
                font-size: 2rem;
            }
            
            .suggestion-text {
                flex: 1;
            }
            
            .suggestion-title {
                font-weight: bold;
                margin-bottom: 5px;
            }
            
            .suggestion-description {
                font-size: 0.9rem;
                opacity: 0.8;
            }
            
            .suggestion-actions {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .suggestion-btn {
                padding: 8px 16px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                font-size: 0.85rem;
                transition: all 0.3s ease;
            }
            
            .suggestion-btn.primary {
                background: linear-gradient(135deg, #00f5ff, #0080ff);
                color: white;
            }
            
            .suggestion-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            @keyframes suggestionSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        if (!document.getElementById('suggestionStyles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'suggestionStyles';
            styleSheet.textContent = suggestionStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(suggestion);
        
        // Set up event listeners
        suggestion.querySelector('.suggestion-btn.primary')?.addEventListener('click', (e) => {
            const protocol = e.target.getAttribute('data-protocol');
            this.startTherapySession(protocol);
            suggestion.remove();
        });
        
        document.getElementById('dismissSuggestion')?.addEventListener('click', () => {
            suggestion.remove();
        });
        
        // Auto-dismiss after 30 seconds
        setTimeout(() => {
            if (suggestion.parentNode) {
                suggestion.remove();
            }
        }, 30000);
    }
    
    startTherapySession(protocolName, options = {}) {
        const protocol = this.therapyProtocols.get(protocolName);
        if (!protocol) {
            console.error(`Therapy protocol not found: ${protocolName}`);
            return null;
        }
        
        console.log(`🎭 Starting therapy session: ${protocol.name}`);
        
        // Create therapy session
        this.activeSession = {
            id: `therapy_${Date.now()}`,
            type: 'therapy',
            protocol: protocolName,
            startTime: Date.now(),
            phase: 0,
            totalPhases: protocol.phases.length,
            options,
            progress: []
        };
        
        // Show therapy interface
        this.showTherapyInterface(protocol);
        
        // Start first phase
        this.startTherapyPhase(0);
        
        return this.activeSession.id;
    }
    
    showTherapyInterface(protocol) {
        // Create therapy session interface
        const therapyInterface = document.createElement('div');
        therapyInterface.id = 'therapyInterface';
        therapyInterface.innerHTML = `
            <div class="therapy-overlay">
                <div class="therapy-content">
                    <div class="therapy-header">
                        <h2 class="therapy-title">${protocol.name}</h2>
                        <div class="therapy-duration">${protocol.duration} minutes</div>
                        <button class="therapy-close" id="closeTherapy">×</button>
                    </div>
                    
                    <div class="therapy-progress-container">
                        <div class="therapy-progress-bar">
                            <div class="therapy-progress-fill" id="therapyProgressFill"></div>
                        </div>
                        <div class="therapy-phase-info" id="therapyPhaseInfo">
                            Preparing session...
                        </div>
                    </div>
                    
                    <div class="therapy-main">
                        <div class="therapy-visual" id="therapyVisual">
                            <!-- Therapy visualization -->
                        </div>
                        
                        <div class="therapy-instructions" id="therapyInstructions">
                            <!-- Current phase instructions -->
                        </div>
                    </div>
                    
                    <div class="therapy-controls">
                        <button class="therapy-btn secondary" id="pauseTherapyBtn">
                            ⏸️ Pause
                        </button>
                        <button class="therapy-btn primary" id="continueTherapyBtn">
                            ▶️ Continue
                        </button>
                        <button class="therapy-btn secondary" id="skipPhaseBtn">
                            ⏭️ Skip Phase
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add therapy interface styles
        const therapyStyles = `
            .therapy-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(15px);
                z-index: 12000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: therapyFadeIn 0.5s ease;
            }
            
            .therapy-content {
                background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(0, 0, 0, 0.8));
                border: 2px solid rgba(0, 245, 255, 0.3);
                border-radius: 25px;
                padding: 40px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                color: white;
            }
            
            .therapy-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
            }
            
            .therapy-title {
                font-size: 1.5rem;
                margin: 0;
                background: linear-gradient(135deg, #00f5ff, #0080ff);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .therapy-duration {
                font-size: 0.9rem;
                opacity: 0.8;
            }
            
            .therapy-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .therapy-close:hover {
                opacity: 1;
            }
            
            .therapy-progress-container {
                margin-bottom: 30px;
            }
            
            .therapy-progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .therapy-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00f5ff, #0080ff);
                width: 0%;
                transition: width 0.5s ease;
            }
            
            .therapy-phase-info {
                text-align: center;
                font-size: 0.9rem;
                opacity: 0.9;
            }
            
            .therapy-main {
                margin-bottom: 30px;
                min-height: 200px;
            }
            
            .therapy-visual {
                height: 150px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 15px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
            }
            
            .therapy-instructions {
                text-align: center;
                font-size: 1.1rem;
                line-height: 1.6;
            }
            
            .therapy-controls {
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            .therapy-btn {
                padding: 12px 24px;
                border-radius: 12px;
                border: none;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .therapy-btn.primary {
                background: linear-gradient(135deg, #00f5ff, #0080ff);
                color: white;
            }
            
            .therapy-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .therapy-btn:hover {
                transform: translateY(-2px);
            }
            
            @keyframes therapyFadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        
        if (!document.getElementById('therapyStyles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'therapyStyles';
            styleSheet.textContent = therapyStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(therapyInterface);
        
        // Set up event listeners
        document.getElementById('closeTherapy')?.addEventListener('click', () => {
            this.endTherapySession();
        });
        
        document.getElementById('pauseTherapyBtn')?.addEventListener('click', () => {
            this.pauseTherapy();
        });
        
        document.getElementById('continueTherapyBtn')?.addEventListener('click', () => {
            this.resumeTherapy();
        });
        
        document.getElementById('skipPhaseBtn')?.addEventListener('click', () => {
            this.nextTherapyPhase();
        });
    }
    
    startTherapyPhase(phaseIndex) {
        if (!this.activeSession) return;
        
        const protocol = this.therapyProtocols.get(this.activeSession.protocol);
        const phase = protocol.phases[phaseIndex];
        
        if (!phase) {
            this.completeTherapySession();
            return;
        }
        
        console.log(`🎭 Starting therapy phase: ${phase.name}`);
        
        this.activeSession.phase = phaseIndex;
        this.activeSession.phaseStartTime = Date.now();
        
        // Update UI
        this.updateTherapyUI(phase, phaseIndex, protocol.phases.length);
        
        // Start phase music
        this.playTherapyMusic(phase.musicCharacteristics);
        
        // Set timer for phase duration
        this.phaseTimer = setTimeout(() => {
            this.nextTherapyPhase();
        }, phase.duration * 60000); // Convert minutes to milliseconds
    }
    
    updateTherapyUI(phase, phaseIndex, totalPhases) {
        const progressFill = document.getElementById('therapyProgressFill');
        const phaseInfo = document.getElementById('therapyPhaseInfo');
        const visual = document.getElementById('therapyVisual');
        const instructions = document.getElementById('therapyInstructions');
        
        // Update progress
        const progress = ((phaseIndex + 1) / totalPhases) * 100;
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        // Update phase info
        if (phaseInfo) {
            phaseInfo.textContent = `Phase ${phaseIndex + 1} of ${totalPhases}: ${phase.name}`;
        }
        
        // Update visual
        if (visual) {
            const emoji = this.getPhaseEmoji(phase.name);
            visual.innerHTML = `<div style="animation: therapyPulse 2s infinite;">${emoji}</div>`;
        }
        
        // Update instructions
        if (instructions) {
            instructions.innerHTML = `
                <h3>${phase.name}</h3>
                <p>${phase.description}</p>
                <div style="margin-top: 20px; font-size: 0.9rem; opacity: 0.8;">
                    Duration: ${phase.duration} minutes
                </div>
            `;
        }
    }
    
    getPhaseEmoji(phaseName) {
        const emojiMap = {
            'Recognition': '👁️',
            'Grounding': '🌱',
            'Breathing_Sync': '🫁',
            'Integration': '🤝',
            'Emotional_Validation': '❤️',
            'Gentle_Lifting': '🌅',
            'Strength_Building': '💪',
            'Future_Hope': '🌟',
            'Tension_Acknowledgment': '⚡',
            'Progressive_Release': '🌊',
            'Deep_Relaxation': '🧘',
            'Gentle_Awakening': '☀️',
            'Momentum_Building': '🚀',
            'Sustainable_Energy': '⚡'
        };
        
        return emojiMap[phaseName] || '🎭';
    }
    
    playTherapyMusic(musicCharacteristics) {
        // In a real implementation, this would control actual music playback
        console.log(`🎵 Playing therapy music: ${JSON.stringify(musicCharacteristics)}`);
        
        // Simulate music therapy
        if (window.updateSynestheticDisplay) {
            const synestheticState = {
                primary: musicCharacteristics.emotions[0] || 'Peaceful',
                intensity: 0.6,
                confidence: 0.9,
                synestheticColors: this.generateTherapyColors(musicCharacteristics)
            };
            
            window.updateSynestheticDisplay(synestheticState);
        }
    }
    
    generateTherapyColors(musicCharacteristics) {
        const colorMaps = {
            peaceful: ['#87CEEB', '#E0FFFF', '#F0F8FF'],
            calming: ['#B0E0E6', '#87CEFA', '#ADD8E6'],
            energizing: ['#FFD700', '#FFA500', '#FF8C00'],
            grounding: ['#8FBC8F', '#90EE90', '#98FB98'],
            uplifting: ['#FFCCCB', '#FFA07A', '#FF7F50']
        };
        
        const emotion = musicCharacteristics.emotions[0]?.toLowerCase() || 'peaceful';
        return colorMaps[emotion] || colorMaps.peaceful;
    }
    
    nextTherapyPhase() {
        if (!this.activeSession) return;
        
        clearTimeout(this.phaseTimer);
        
        const protocol = this.therapyProtocols.get(this.activeSession.protocol);
        const nextPhase = this.activeSession.phase + 1;
        
        if (nextPhase >= protocol.phases.length) {
            this.completeTherapySession();
        } else {
            this.startTherapyPhase(nextPhase);
        }
    }
    
    pauseTherapy() {
        if (this.phaseTimer) {
            clearTimeout(this.phaseTimer);
        }
        console.log('⏸️ Therapy session paused');
    }
    
    resumeTherapy() {
        if (!this.activeSession) return;
        
        const protocol = this.therapyProtocols.get(this.activeSession.protocol);
        const currentPhase = protocol.phases[this.activeSession.phase];
        
        if (currentPhase) {
            const elapsed = Date.now() - this.activeSession.phaseStartTime;
            const remaining = (currentPhase.duration * 60000) - elapsed;
            
            if (remaining > 0) {
                this.phaseTimer = setTimeout(() => {
                    this.nextTherapyPhase();
                }, remaining);
            } else {
                this.nextTherapyPhase();
            }
        }
        
        console.log('▶️ Therapy session resumed');
    }
    
    completeTherapySession() {
        console.log('✨ Therapy session completed');
        
        const sessionId = this.activeSession?.id;
        const protocol = this.therapyProtocols.get(this.activeSession?.protocol);
        
        // Record therapy session
        this.userProgress.push({
            sessionId,
            protocol: this.activeSession?.protocol,
            completedAt: Date.now(),
            duration: Date.now() - this.activeSession?.startTime,
            outcome: protocol?.expectedOutcome
        });
        
        // Show completion message
        this.showTherapyCompletion(protocol);
        
        // Clean up
        this.endTherapySession();
    }
    
    showTherapyCompletion(protocol) {
        const therapyInterface = document.getElementById('therapyInterface');
        if (therapyInterface) {
            const content = therapyInterface.querySelector('.therapy-content');
            if (content) {
                content.innerHTML = `
                    <div class="therapy-completion">
                        <div class="completion-icon">✨</div>
                        <h2>Session Complete!</h2>
                        <p>You've completed the ${protocol.name}</p>
                        <div class="expected-outcome">
                            <strong>Expected benefit:</strong><br>
                            ${protocol.expectedOutcome}
                        </div>
                        <div class="completion-actions">
                            <button class="therapy-btn primary" id="rateSession">
                                Rate This Session
                            </button>
                            <button class="therapy-btn secondary" id="closeCompletion">
                                Close
                            </button>
                        </div>
                    </div>
                `;
                
                // Set up completion event listeners
                document.getElementById('rateSession')?.addEventListener('click', () => {
                    this.showSessionRating();
                });
                
                document.getElementById('closeCompletion')?.addEventListener('click', () => {
                    therapyInterface.remove();
                });
            }
        }
    }
    
    endTherapySession() {
        if (this.phaseTimer) {
            clearTimeout(this.phaseTimer);
        }
        
        const therapyInterface = document.getElementById('therapyInterface');
        if (therapyInterface) {
            therapyInterface.remove();
        }
        
        this.activeSession = null;
        console.log('🎭 Therapy session ended');
    }
    
    // Public API methods
    getAvailableProtocols() {
        return Array.from(this.therapyProtocols.keys());
    }
    
    getProtocolInfo(protocolName) {
        return this.therapyProtocols.get(protocolName);
    }
    
    getUserProgress() {
        return this.userProgress;
    }
    
    isSessionActive() {
        return this.activeSession !== null;
    }
    
    getCurrentSession() {
        return this.activeSession;
    }
}

// Export and initialize
if (typeof window !== 'undefined') {
    window.EmotionalTherapySystem = EmotionalTherapySystem;
    
    // Auto-initialize when dependencies are ready
    setTimeout(() => {
        if (!window.emotionalTherapySystem) {
            window.emotionalTherapySystem = new EmotionalTherapySystem();
        }
    }, 6000);
}

export { EmotionalTherapySystem };
