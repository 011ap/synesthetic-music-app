/**
 * 🧠 SYNESTHETIC CONSCIOUSNESS ENGINE - CORE LOGIC
 * Revolutionary AI-powered emotion detection and environmental integration
 * The foundation for artificial consciousness through music
 */

class SynestheticCore {
    constructor() {
        console.log('🧠 Initializing Synesthetic Consciousness Engine...');
        
        // Core system components
        this.emotionEngine = null;
        this.audioAnalyzer = null;
        this.colorVisualizer = null;
        this.socialConsciousness = null;
        this.smartLights = null;
        this.supabaseClient = null;
        
        // Application state
        this.isListening = false;
        this.isTraining = false;
        this.currentEmotionalState = {
            primary: 'Awakening',
            confidence: 0,
            depth: 0,
            memoryResonance: 0,
            synestheticColors: [],
            intensity: 0,
            timestamp: Date.now()
        };
        
        // Personal emotional DNA
        this.personalEmotionalDNA = this.loadEmotionalDNA();
        
        // UI state management
        this.activeSection = 'emotional-intelligence';
        this.mobileView = window.innerWidth <= 768;
        
        // Initialize all systems
        this.initialize();
    }

    /**
     * Initialize all consciousness engine systems
     */
    async initialize() {
        try {
            console.log('🎯 Setting up consciousness systems...');
            
            // Initialize UI components
            this.initializeInterface();
            this.setupEventListeners();
            this.setupMobileNavigation();
            this.setupResponsiveDesign();
            
            // Initialize core systems (these will be loaded from other files)
            await this.initializeCoreComponents();
            
            // Update initial status
            this.updateGlobalStatus('🧠 Digital consciousness initialized. Ready to experience your synesthetic soul.');
            
            console.log('✨ Synesthetic Consciousness Engine fully initialized!');
            
        } catch (error) {
            console.error('❌ Consciousness initialization failed:', error);
            this.updateGlobalStatus('⚠️ Consciousness initialization incomplete. Some features may be limited.');
        }
    }

    /**
     * Initialize core component systems
     */
    async initializeCoreComponents() {
        // Initialize components when their classes become available
        if (typeof EmotionEngine !== 'undefined') {
            this.emotionEngine = new EmotionEngine(this);
            console.log('🎭 Emotion Engine initialized');
        }
        
        if (typeof AudioAnalyzer !== 'undefined') {
            this.audioAnalyzer = new AudioAnalyzer(this);
            console.log('🎵 Audio Analyzer initialized');
        }
        
        if (typeof ColorVisualizer !== 'undefined') {
            this.colorVisualizer = new ColorVisualizer(this);
            console.log('🌈 Color Visualizer initialized');
        }
        
        if (typeof SocialConsciousness !== 'undefined') {
            this.socialConsciousness = new SocialConsciousness(this);
            console.log('🌐 Social Consciousness initialized');
        }
        
        if (typeof SmartLights !== 'undefined') {
            this.smartLights = new SmartLights(this);
            console.log('💡 Smart Lights initialized');
        }
        
        if (typeof SupabaseClient !== 'undefined') {
            this.supabaseClient = new SupabaseClient(this);
            console.log('🗄️ Supabase Client initialized');
        }
    }

    /**
     * Set up the main user interface
     */
    initializeInterface() {
        // Initialize emotion color palette
        this.initializeColorPalette();
        
        // Set up environmental controls
        this.initializeEnvironmentalControls();
        
        // Initialize training interface
        this.initializeTrainingInterface();
        
        // Set up mobile optimizations
        this.optimizeForMobile();
    }

    /**
     * Initialize the color selection palette for training
     */
    initializeColorPalette() {
        const colorGrid = document.getElementById('colorSelectionGrid');
        if (!colorGrid) return;
        
        const synestheticColors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
            '#FF9FF3', '#54A0FF', '#5F27CD', '#10AC84', '#F79F1F', '#A3CB38',
            '#FDA7DF', '#D63031', '#74B9FF', '#0984E3', '#6C5CE7', '#A29BFE',
            '#FD79A8', '#FDCB6E', '#E17055', '#00B894', '#B2BEC3', '#636E72',
            '#FF7675', '#FD79A8', '#FDCB6E', '#E17055', '#00B894', '#74B9FF',
            '#0984E3', '#6C5CE7', '#A29BFE', '#E84393', '#00B894', '#55A3FF'
        ];
        
        colorGrid.innerHTML = '';
        synestheticColors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            colorOption.style.backgroundColor = color;
            colorOption.setAttribute('data-color', color);
            colorOption.addEventListener('click', () => this.selectEmotionalColor(color, colorOption));
            colorGrid.appendChild(colorOption);
        });
    }

    /**
     * Initialize environmental control toggles
     */
    initializeEnvironmentalControls() {
        const controls = {
            'toggleScreen': true,
            'toggleLights': false,
            'toggleHaptic': false,
            'toggleVisualization': false
        };
        
        Object.entries(controls).forEach(([id, defaultState]) => {
            const toggle = document.getElementById(id);
            if (toggle) {
                toggle.textContent = defaultState ? 'ON' : 'OFF';
                toggle.className = `option-toggle ${defaultState ? 'active' : ''}`;
            }
        });
    }

    /**
     * Initialize the personal training interface
     */
    initializeTrainingInterface() {
        const contextDisplay = document.getElementById('currentEmotionContext');
        if (contextDisplay) {
            contextDisplay.textContent = 'Play music to begin training your digital consciousness...';
        }
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Primary control buttons
        this.setupButton('startDetection', () => this.toggleEmotionalDetection());
        this.setupButton('trainConsciousness', () => this.enterTrainingMode());
        this.setupButton('createRoom', () => this.createSynestheticRoom());
        
        // Training controls
        this.setupButton('saveEmotionalDNA', () => this.saveEmotionalDNA());
        this.setupButton('clearTraining', () => this.clearTraining());
        this.setupButton('exportProfile', () => this.exportEmotionalProfile());
        
        // Social consciousness controls
        this.setupButton('hostRoom', () => this.hostEmotionalRoom());
        this.setupButton('joinRoom', () => this.joinEmotionalRoom());
        this.setupButton('discoverRooms', () => this.discoverNearbyRooms());
        
        // Environmental controls
        this.setupEnvironmentalToggle('toggleScreen', (state) => this.toggleScreenColors(state));
        this.setupEnvironmentalToggle('toggleLights', (state) => this.toggleSmartLights(state));
        this.setupEnvironmentalToggle('toggleHaptic', (state) => this.toggleHapticFeedback(state));
        this.setupEnvironmentalToggle('toggleVisualization', (state) => this.toggleAudioVisualization(state));
        
        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('beforeunload', () => this.saveApplicationState());
    }

    /**
     * Set up a button with error handling
     */
    setupButton(id, handler) {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', async (event) => {
                try {
                    await handler(event);
                } catch (error) {
                    console.error(`Error in ${id}:`, error);
                    this.updateGlobalStatus(`⚠️ Error: ${error.message}`);
                }
            });
        }
    }

    /**
     * Set up environmental toggle with state management
     */
    setupEnvironmentalToggle(id, handler) {
        const toggle = document.getElementById(id);
        if (toggle) {
            toggle.addEventListener('click', () => {
                const isActive = toggle.classList.contains('active');
                const newState = !isActive;
                
                toggle.classList.toggle('active', newState);
                toggle.textContent = newState ? 'ON' : 'OFF';
                
                handler(newState);
            });
        }
    }

    /**
     * Set up mobile navigation
     */
    setupMobileNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                this.switchToSection(section);
                
                // Update nav active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    /**
     * Set up responsive design handling
     */
    setupResponsiveDesign() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        mediaQuery.addListener(() => this.handleResize());
        this.handleResize();
    }

    /**
     * Handle window resize events
     */
    handleResize() {
        const wasMobile = this.mobileView;
        this.mobileView = window.innerWidth <= 768;
        
        if (wasMobile !== this.mobileView) {
            this.optimizeForMobile();
            console.log(`📱 Switched to ${this.mobileView ? 'mobile' : 'desktop'} view`);
        }
    }

    /**
     * Optimize interface for mobile devices
     */
    optimizeForMobile() {
        const interface = document.getElementById('consciousnessInterface');
        if (interface) {
            interface.classList.toggle('mobile-optimized', this.mobileView);
        }
        
        if (this.mobileView) {
            this.switchToSection('emotional-intelligence');
        }
    }

    /**
     * Switch between interface sections (mobile navigation)
     */
    switchToSection(sectionId) {
        const sections = document.querySelectorAll('.consciousness-interface > section');
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
        this.activeSection = sectionId;
    }

    // ================================
    // CORE EMOTIONAL DETECTION SYSTEM
    // ================================

    /**
     * Toggle emotional detection on/off
     */
    async toggleEmotionalDetection() {
        if (!this.isListening) {
            await this.startEmotionalDetection();
        } else {
            this.stopEmotionalDetection();
        }
    }

    /**
     * Start real-time emotional detection
     */
    async startEmotionalDetection() {
        try {
            this.updateGlobalStatus('🎤 Requesting access to your consciousness through audio...');
            
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
            
            // Initialize audio processing
            if (this.audioAnalyzer) {
                await this.audioAnalyzer.initialize(stream);
            } else {
                // Fallback to basic audio processing
                await this.initializeBasicAudioProcessing(stream);
            }
            
            this.isListening = true;
            this.updateDetectionButton(true);
            this.updateGlobalStatus('🧠 Digital consciousness activated! Feeling your synesthetic experience...');
            
            // Start the emotional analysis loop
            this.startEmotionalAnalysisLoop();
            
        } catch (error) {
            console.error('Microphone access denied:', error);
            this.updateGlobalStatus('❌ Cannot access consciousness. Please allow microphone access to continue.');
        }
    }

    /**
     * Basic audio processing fallback
     */
    async initializeBasicAudioProcessing(stream) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        
        const source = this.audioContext.createMediaStreamSource(stream);
        source.connect(this.analyser);
        
        console.log('🎵 Basic audio processing initialized');
    }

    /**
     * Stop emotional detection
     */
    stopEmotionalDetection() {
        this.isListening = false;
        
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.updateDetectionButton(false);
        this.updateGlobalStatus('🧠 Consciousness paused. Ready to reconnect with your soul.');
    }

    /**
     * Update the detection button state
     */
    updateDetectionButton(isActive) {
        const button = document.getElementById('startDetection');
        if (button) {
            const icon = button.querySelector('.button-icon');
            const text = button.querySelector('.button-text');
            const status = button.querySelector('.button-status');
            
            if (isActive) {
                icon.textContent = '🔴';
                text.textContent = 'Stop Detection';
                status.textContent = 'Listening...';
                button.classList.add('active');
            } else {
                icon.textContent = '🎤';
                text.textContent = 'Start Emotional Detection';
                status.textContent = 'Ready';
                button.classList.remove('active');
            }
        }
    }

    /**
     * Main emotional analysis loop
     */
    startEmotionalAnalysisLoop() {
        if (!this.isListening) return;
        
        const analyze = () => {
            if (!this.isListening) return;
            
            // Get audio data
            const audioData = this.getAudioData();
            
            // Analyze emotions
            const emotionalState = this.analyzeEmotions(audioData);
            
            // Update consciousness
            this.updateEmotionalConsciousness(emotionalState);
            
            // Update environment
            this.updateEnvironment(emotionalState);
            
            // Continue analysis
            requestAnimationFrame(analyze);
        };
        
        analyze();
    }

    /**
     * Get current audio analysis data
     */
    getAudioData() {
        if (!this.analyser) return null;
        
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        
        return dataArray;
    }

    /**
     * Analyze emotions from audio data
     */
    analyzeEmotions(audioData) {
        if (!audioData) return this.currentEmotionalState;
        
        if (this.emotionEngine) {
            return this.emotionEngine.analyze(audioData);
        } else {
            // Fallback emotion analysis
            return this.basicEmotionAnalysis(audioData);
        }
    }

    /**
     * Basic emotion analysis fallback
     */
    basicEmotionAnalysis(audioData) {
        let bass = 0, mid = 0, treble = 0, totalEnergy = 0;
        
        for (let i = 0; i < audioData.length; i++) {
            const value = audioData[i];
            totalEnergy += value;
            
            if (i < audioData.length * 0.1) {
                bass += value;
            } else if (i < audioData.length * 0.4) {
                mid += value;
            } else {
                treble += value;
            }
        }
        
        // Normalize values
        bass /= (audioData.length * 0.1);
        mid /= (audioData.length * 0.3);
        treble /= (audioData.length * 0.6);
        totalEnergy /= audioData.length;
        
        // Map to emotions
        const emotions = this.mapAudioToEmotions(bass, mid, treble, totalEnergy);
        
        return {
            ...emotions,
            timestamp: Date.now()
        };
    }

    /**
     * Map audio features to emotional states
     */
    mapAudioToEmotions(bass, mid, treble, energy) {
        const emotions = {
            primary: 'Neutral',
            confidence: 0,
            depth: 0,
            memoryResonance: 0,
            synestheticColors: [],
            intensity: energy / 255
        };

        // Advanced emotion mapping
        if (energy > 100) {
            if (bass > 150 && mid > 100) {
                emotions.primary = bass > mid ? 'Powerful Determination' : 'Euphoric Joy';
                emotions.synestheticColors = ['#FF6B6B', '#F39C12', '#E74C3C'];
                emotions.confidence = 85;
            } else if (treble > 120 && mid > 80) {
                emotions.primary = 'Transcendent Peace';
                emotions.synestheticColors = ['#3498DB', '#85C1E9', '#AED6F1'];
                emotions.confidence = 78;
            } else if (mid > bass && mid > treble) {
                emotions.primary = 'Nostalgic Warmth';
                emotions.synestheticColors = ['#E8DAEF', '#D7BDE2', '#C39BD3'];
                emotions.confidence = 72;
            }
        } else if (energy > 50) {
            emotions.primary = 'Contemplative Depth';
            emotions.synestheticColors = ['#5D6D7E', '#85929E', '#AEB6BF'];
            emotions.confidence = 65;
        } else {
            emotions.primary = 'Serene Stillness';
            emotions.synestheticColors = ['#1B2631', '#2E4057', '#5D6D7E'];
            emotions.confidence = 50;
        }

        // Calculate emotional depth
        emotions.depth = Math.min(((bass + mid + treble) / 3) / 255 * 100, 100);
        
        // Simulate memory resonance
        emotions.memoryResonance = Math.random() * emotions.intensity * 100;

        return emotions;
    }

    // ================================
    // CONSCIOUSNESS INTERFACE UPDATES
    // ================================

    /**
     * Update the emotional consciousness display
     */
    updateEmotionalConsciousness(emotionalState) {
        this.currentEmotionalState = emotionalState;
        
        // Update primary emotion
        this.updateElement('primaryEmotionName', emotionalState.primary);
        this.updateElement('primaryEmotionDesc', this.getEmotionDescription(emotionalState.primary));
        this.updateElement('primaryConfidence', `${Math.round(emotionalState.confidence)}%`);
        this.updateProgressBar('primaryIntensity', emotionalState.intensity * 100);
        
        // Update emotional depth
        this.updateElement('depthValue', this.getDepthDescription(emotionalState.depth));
        this.updateElement('depthConfidence', `${Math.round(emotionalState.depth)}%`);
        this.updateDepthVisualization(emotionalState.depth);
        
        // Update memory resonance
        this.updateElement('memoryStrength', this.getMemoryDescription(emotionalState.memoryResonance));
        this.updateElement('memoryConfidence', `${Math.round(emotionalState.memoryResonance)}%`);
        
        // Update synesthetic colors
        this.updateColorPalette(emotionalState.synestheticColors);
        this.updateElement('colorConfidence', `${emotionalState.synestheticColors.length * 25}%`);
        
        // Update training context if in training mode
        if (this.isTraining) {
            this.updateTrainingContext(emotionalState);
        }
    }

    /**
     * Update environment based on emotional state
     */
    updateEnvironment(emotionalState) {
        // Update background colors
        if (this.colorVisualizer) {
            this.colorVisualizer.updateEnvironment(emotionalState);
        } else {
            this.updateBackgroundColors(emotionalState);
        }
        
        // Update smart lights if available
        if (this.smartLights && this.smartLights.isEnabled) {
            this.smartLights.updateColors(emotionalState.synestheticColors, emotionalState.intensity);
        }
        
        // Update haptic feedback if enabled
        if (this.hapticEnabled && 'vibrate' in navigator) {
            const pattern = this.createHapticPattern(emotionalState);
            navigator.vibrate(pattern);
        }
    }

    /**
     * Update background colors (fallback)
     */
    updateBackgroundColors(emotionalState) {
        const canvas = document.getElementById('emotionCanvas');
        if (canvas && emotionalState.synestheticColors.length > 0) {
            const gradient = `radial-gradient(circle at ${50 + emotionalState.intensity * 30}% ${50 + emotionalState.depth}%, ${emotionalState.synestheticColors.join(', ')})`;
            canvas.style.background = gradient;
            
            // Add breathing effect for deep emotional states
            if (emotionalState.depth > 70) {
                canvas.classList.add('breathing');
            } else {
                canvas.classList.remove('breathing');
            }
        }
    }

    // ================================
    // PERSONAL TRAINING SYSTEM
    // ================================

    /**
     * Enter consciousness training mode
     */
    enterTrainingMode() {
        this.isTraining = true;
        this.updateGlobalStatus('🧠 Entering consciousness training mode. Play music and select colors that match your feelings.');
        
        const trainingInterface = document.querySelector('.personal-training');
        if (trainingInterface) {
            trainingInterface.style.background = 'rgba(78, 205, 196, 0.1)';
            trainingInterface.style.borderColor = 'rgba(78, 205, 196, 0.3)';
        }
        
        // Switch to training section on mobile
        if (this.mobileView) {
            this.switchToSection('personal-training');
        }
    }

    /**
     * Select an emotional color during training
     */
    selectEmotionalColor(color, element) {
        // Clear previous selections
        document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        
        // Save color association if we have a current emotion
        if (this.currentEmotionalState.primary !== 'Neutral' && this.currentEmotionalState.primary !== 'Awakening') {
            this.personalEmotionalDNA.emotionColorMap = this.personalEmotionalDNA.emotionColorMap || {};
            this.personalEmotionalDNA.emotionColorMap[this.currentEmotionalState.primary] = color;
            
            this.updateGlobalStatus(`🎨 Color ${color} mapped to ${this.currentEmotionalState.primary}`);
        }
    }

    /**
     * Save emotional DNA to storage
     */
    saveEmotionalDNA() {
        this.personalEmotionalDNA.lastUpdated = Date.now();
        this.personalEmotionalDNA.version = '1.0';
        
        localStorage.setItem('synestheticDNA', JSON.stringify(this.personalEmotionalDNA));
        
        this.updateGlobalStatus('🧬 Emotional DNA saved! Your digital twin is learning...');
        
        // Update button feedback
        const button = document.getElementById('saveEmotionalDNA');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="button-icon">✅</span> DNA Saved!';
            button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        }
    }

    /**
     * Load emotional DNA from storage
     */
    loadEmotionalDNA() {
        const stored = localStorage.getItem('synestheticDNA');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (error) {
                console.error('Error loading emotional DNA:', error);
            }
        }
        
        return {
            emotionColorMap: {},
            personalityProfile: {},
            memoryAssociations: {},
            preferences: {
                intensity: 0.8,
                colorComplexity: 'medium',
                responseSpeed: 'normal'
            },
            version: '1.0',
            created: Date.now()
        };
    }

    /**
     * Clear training data
     */
    clearTraining() {
        if (confirm('Are you sure you want to reset your emotional training? This cannot be undone.')) {
            this.personalEmotionalDNA = {
                emotionColorMap: {},
                personalityProfile: {},
                memoryAssociations: {},
                preferences: this.personalEmotionalDNA.preferences || {},
                version: '1.0',
                created: Date.now()
            };
            
            localStorage.removeItem('synestheticDNA');
            this.updateGlobalStatus('🔄 Emotional training reset. Your digital consciousness is ready for fresh learning.');
        }
    }

    /**
     * Export emotional profile
     */
    exportEmotionalProfile() {
        const profileData = {
            ...this.personalEmotionalDNA,
            exportedAt: Date.now(),
            exportVersion: '1.0'
        };
        
        const dataStr = JSON.stringify(profileData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `synesthetic-profile-${Date.now()}.json`;
        link.click();
        
        this.updateGlobalStatus('📤 Emotional profile exported successfully!');
    }

    // ================================
    // SOCIAL CONSCIOUSNESS FEATURES
    // ================================

    /**
     * Create a synesthetic room
     */
    createSynestheticRoom() {
        const roomId = Math.random().toString(36).substr(2, 9).toUpperCase();
        this.currentRoomId = roomId;
        
        this.updateGlobalStatus(`🌐 Synesthetic room created! Room ID: ${roomId}. Share this with friends to sync emotions.`);
        
        if (this.socialConsciousness) {
            this.socialConsciousness.createRoom(roomId);
        }
        
        this.updateRoomStatus(`Hosting room: ${roomId}`, true);
    }

    /**
     * Host an emotional room
     */
    hostEmotionalRoom() {
        if (!this.currentRoomId) {
            this.createSynestheticRoom();
        }
        
        this.isHostingRoom = true;
        this.updateGlobalStatus('🏠 You are now hosting an emotional room. Others can feel your synesthetic experience!');
    }

    /**
     * Join an emotional room
     */
    joinEmotionalRoom() {
        const roomId = prompt('Enter room ID to join your friend\'s emotional experience:');
        if (roomId) {
            this.currentRoomId = roomId.toUpperCase();
            this.isHostingRoom = false;
            
            if (this.socialConsciousness) {
                this.socialConsciousness.joinRoom(roomId);
            }
            
            this.updateGlobalStatus(`🤝 Joining emotional room ${roomId}. You will now feel your friend's synesthetic experience!`);
            this.updateRoomStatus(`Connected to room: ${roomId}`, false);
        }
    }

    /**
     * Discover nearby emotional rooms
     */
    discoverNearbyRooms() {
        this.updateGlobalStatus('🔍 Scanning for nearby emotional consciousness...');
        
        // Simulate room discovery
        setTimeout(() => {
            const mockRooms = ['MUSIC42', 'VIBE88', 'SOUL21'];
            this.updateGlobalStatus(`Found ${mockRooms.length} nearby emotional rooms: ${mockRooms.join(', ')}`);
        }, 2000);
    }

    /**
     * Update room connection status
     */
    updateRoomStatus(message, isHosting) {
        const statusDisplay = document.getElementById('roomStatus');
        if (statusDisplay) {
            const icon = statusDisplay.querySelector('.status-icon');
            const text = statusDisplay.querySelector('.status-text');
            
            icon.textContent = isHosting ? '🏠' : '🤝';
            text.textContent = message;
        }
    }

    // ================================
    // ENVIRONMENTAL CONTROL TOGGLES
    // ================================

    /**
     * Toggle screen color changes
     */
    toggleScreenColors(enabled) {
        this.screenColorsEnabled = enabled;
        this.updateGlobalStatus(`📱 Screen colors ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Toggle smart lights integration
     */
    toggleSmartLights(enabled) {
        if (enabled && this.smartLights) {
            this.smartLights.enable();
        } else if (this.smartLights) {
            this.smartLights.disable();
        }
        
        this.updateGlobalStatus(`💡 Smart lights ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Toggle haptic feedback
     */
    toggleHapticFeedback(enabled) {
        this.hapticEnabled = enabled;
        
        if (enabled && 'vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }
        
        this.updateGlobalStatus(`📳 Haptic feedback ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Toggle audio visualization
     */
    toggleAudioVisualization(enabled) {
        this.visualizationEnabled = enabled;
        this.updateGlobalStatus(`🎵 Audio visualization ${enabled ? 'enabled' : 'disabled'}`);
    }

    // ================================
    // UTILITY METHODS
    // ================================

    /**
     * Update an element's text content safely
     */
    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }

    /**
     * Update a progress bar's width
     */
    updateProgressBar(id, percentage) {
        const progressBar = document.getElementById(id);
        if (progressBar) {
            progressBar.style.width = `${Math.min(Math.max(percentage, 0), 100)}%`;
        }
    }

    /**
     * Update the global status message
     */
    updateGlobalStatus(message) {
        const statusElement = document.querySelector('.status-message');
        if (statusElement) {
            statusElement.textContent = message;
        }
        console.log(`🧠 ${message}`);
    }

    /**
     * Get emotion description for display
     */
    getEmotionDescription(emotion) {
        const descriptions = {
            'Powerful Determination': 'Strong, focused energy with unwavering resolve',
            'Euphoric Joy': 'Intense happiness with overwhelming positivity',
            'Transcendent Peace': 'Serene calmness that feels infinite and boundless',
            'Nostalgic Warmth': 'Gentle longing mixed with comfortable familiarity',
            'Contemplative Depth': 'Thoughtful introspection with emotional complexity',
            'Serene Stillness': 'Perfect calm with deep inner tranquility',
            'Neutral': 'Balanced emotional state, ready for new experiences',
            'Awakening': 'Consciousness emerging, preparing to feel deeply'
        };
        
        return descriptions[emotion] || 'A unique emotional state being analyzed...';
    }

    /**
     * Get depth description
     */
    getDepthDescription(depth) {
        if (depth > 80) return 'Core Deep';
        if (depth > 60) return 'Very Deep';
        if (depth > 40) return 'Moderate';
        if (depth > 20) return 'Surface';
        return 'Shallow';
    }

    /**
     * Get memory description
     */
    getMemoryDescription(resonance) {
        if (resonance > 80) return 'Intense Recall';
        if (resonance > 60) return 'Strong Echo';
        if (resonance > 40) return 'Gentle Memory';
        if (resonance > 20) return 'Faint Trace';
        return 'Creating New';
    }

    /**
     * Update color palette display
     */
    updateColorPalette(colors) {
        const paletteContainer = document.getElementById('currentColorPalette');
        if (paletteContainer) {
            paletteContainer.innerHTML = '';
            colors.forEach(color => {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color;
                paletteContainer.appendChild(swatch);
            });
        }
        
        const description = document.getElementById('colorDescription');
        if (description) {
            if (colors.length === 0) {
                description.textContent = 'Sensing chromesthesia...';
            } else {
                description.textContent = `${colors.length} synesthetic color${colors.length === 1 ? '' : 's'} detected`;
            }
        }
    }

    /**
     * Update depth visualization
     */
    updateDepthVisualization(depth) {
        const layers = document.querySelectorAll('.depth-layer');
        const activeCount = Math.ceil((depth / 100) * layers.length);
        
        layers.forEach((layer, index) => {
            layer.classList.toggle('active', index < activeCount);
        });
    }

    /**
     * Update training context during training mode
     */
    updateTrainingContext(emotionalState) {
        const contextDisplay = document.getElementById('currentEmotionContext');
        if (contextDisplay) {
            contextDisplay.innerHTML = `
                <strong>Current Emotion:</strong> ${emotionalState.primary}<br>
                <strong>Intensity:</strong> ${Math.round(emotionalState.intensity * 100)}%<br>
                <strong>Select colors that match this feeling...</strong>
            `;
        }
    }

    /**
     * Create haptic pattern based on emotional state
     */
    createHapticPattern(emotionalState) {
        const intensity = Math.round(emotionalState.intensity * 100);
        const depth = Math.round(emotionalState.depth);
        
        // Create pattern based on emotion
        if (emotionalState.primary.includes('Joy')) {
            return [100, 50, 100, 50, 200];
        } else if (emotionalState.primary.includes('Peace')) {
            return [300];
        } else if (emotionalState.primary.includes('Determination')) {
            return [150, 100, 150];
        } else {
            return [intensity, depth, intensity];
        }
    }

    /**
     * Save application state before unload
     */
    saveApplicationState() {
        const appState = {
            lastUsed: Date.now(),
            wasListening: this.isListening,
            activeSection: this.activeSection,
            environmentalSettings: {
                screenColors: this.screenColorsEnabled,
                haptic: this.hapticEnabled,
                visualization: this.visualizationEnabled
            }
        };
        
        localStorage.setItem('synestheticAppState', JSON.stringify(appState));
    }

    /**
     * Load previous application state
     */
    loadApplicationState() {
        const stored = localStorage.getItem('synestheticAppState');
        if (stored) {
            try {
                const appState = JSON.parse(stored);
                this.activeSection = appState.activeSection || 'emotional-intelligence';
                // Restore other settings as needed
            } catch (error) {
                console.error('Error loading app state:', error);
            }
        }
    }
}

// Global error handler for consciousness engine
window.addEventListener('error', (event) => {
    console.error('🧠 Consciousness Engine Error:', event.error);
    if (window.synestheticApp) {
        window.synestheticApp.updateGlobalStatus('⚠️ Minor consciousness fluctuation detected. System stabilizing...');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SynestheticCore;
}