/**
 * 🌈 COLOR VISUALIZER - VISUAL EMOTION DISPLAY ENGINE
 * Creates beautiful, meaningful visual representations of emotions
 * Transforms emotional data into synesthetic color experiences
 */

class ColorVisualizer {
    constructor(coreApp) {
        this.coreApp = coreApp;
        this.isInitialized = false;
        
        // Canvas and rendering context
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        
        // Visualization state
        this.currentColors = [];
        this.targetColors = [];
        this.colorTransitionSpeed = 0.02;
        this.lastRenderTime = 0;
        
        // Visual effects configuration
        this.effects = {
            particles: {
                enabled: true,
                count: 50,
                particles: [],
                maxSpeed: 2,
                size: { min: 2, max: 8 }
            },
            waves: {
                enabled: true,
                amplitude: 50,
                frequency: 0.01,
                phase: 0,
                speed: 0.02
            },
            gradients: {
                enabled: true,
                type: 'radial', // 'linear', 'radial', 'conic'
                angle: 0,
                center: { x: 0.5, y: 0.5 }
            },
            breathing: {
                enabled: false,
                intensity: 0.1,
                speed: 0.01,
                phase: 0
            },
            flow: {
                enabled: true,
                direction: { x: 1, y: 0.5 },
                speed: 0.5,
                turbulence: 0.1
            }
        };
        
        // Color harmony and theory
        this.colorTheory = {
            complementaryAngle: 180,
            triadicAngle: 120,
            tetradicAngle: 90,
            analogousRange: 30
        };
        
        // Synesthetic mappings
        this.synestheticMappings = {
            emotions: new Map(),
            personalMappings: new Map(),
            culturalMappings: new Map()
        };
        
        // Performance optimization
        this.performance = {
            targetFPS: 60,
            frameCount: 0,
            lastFPSCheck: 0,
            currentFPS: 60,
            qualityLevel: 'high' // 'low', 'medium', 'high', 'ultra'
        };
        
        console.log('🌈 Color Visualizer initializing...');
        this.initialize();
    }

    /**
     * Initialize the color visualizer
     */
    async initialize() {
        try {
            // Set up canvas and rendering context
            this.setupCanvas();
            
            // Initialize color mappings
            await this.initializeColorMappings();
            
            // Initialize visual effects
            this.initializeVisualEffects();
            
            // Start rendering loop
            this.startRenderLoop();
            
            // Set up event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✨ Color Visualizer fully operational');
            
        } catch (error) {
            console.error('❌ Color Visualizer initialization failed:', error);
            this.isInitialized = false;
        }
    }

    /**
     * Set up canvas and rendering context
     */
    setupCanvas() {
        // Find or create canvas element
        this.canvas = document.getElementById('emotionCanvas');
        
        if (!this.canvas) {
            // Create canvas if it doesn't exist
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'emotionCanvas';
            this.canvas.className = 'emotion-canvas';
            document.body.appendChild(this.canvas);
        }
        
        // Get 2D rendering context
        this.ctx = this.canvas.getContext('2d');
        
        // Set up high DPI support
        this.setupHighDPI();
        
        // Initial resize
        this.handleResize();
        
        console.log('🎨 Canvas rendering context initialized');
    }

    /**
     * Set up high DPI support for crisp visuals
     */
    setupHighDPI() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        // Set actual size in memory (scaled up for high DPI)
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        // Scale back down using CSS
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Scale the drawing context to match device pixel ratio
        this.ctx.scale(dpr, dpr);
    }

    /**
     * Handle canvas resize
     */
    handleResize() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(dpr, dpr);
        
        // Update effect parameters for new size
        this.updateEffectsForSize(rect.width, rect.height);
    }

    /**
     * Update effects for canvas size
     */
    updateEffectsForSize(width, height) {
        // Update particle system for new canvas size
        this.effects.particles.particles.forEach(particle => {
            if (particle.x > width) particle.x = width * Math.random();
            if (particle.y > height) particle.y = height * Math.random();
        });
        
        // Update wave parameters
        this.effects.waves.amplitude = Math.min(width, height) * 0.1;
        
        // Update gradient center
        this.effects.gradients.center = { x: width / 2, y: height / 2 };
    }

    /**
     * Initialize color mappings and synesthetic relationships
     */
    async initializeColorMappings() {
        // Load emotion-color mappings
        await this.loadEmotionColorMappings();
        
        // Load personal mappings from storage
        this.loadPersonalMappings();
        
        // Initialize cultural mappings
        this.initializeCulturalMappings();
        
        console.log('🎭 Color mappings initialized');
    }

    /**
     * Load emotion-color mappings
     */
    async loadEmotionColorMappings() {
        const emotionMappings = {
            // Primary emotions with rich color palettes
            'joy': {
                primary: '#FFD700',
                palette: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#FFFF00'],
                mood: 'bright',
                saturation: 0.8,
                brightness: 0.9
            },
            'sadness': {
                primary: '#4169E1',
                palette: ['#4169E1', '#6495ED', '#87CEEB', '#B0C4DE', '#1E90FF'],
                mood: 'cool',
                saturation: 0.6,
                brightness: 0.5
            },
            'anger': {
                primary: '#DC143C',
                palette: ['#DC143C', '#B22222', '#8B0000', '#FF0000', '#CD5C5C'],
                mood: 'intense',
                saturation: 0.9,
                brightness: 0.7
            },
            'fear': {
                primary: '#2F4F4F',
                palette: ['#2F4F4F', '#696969', '#778899', '#708090', '#483D8B'],
                mood: 'dark',
                saturation: 0.4,
                brightness: 0.3
            },
            'surprise': {
                primary: '#ADFF2F',
                palette: ['#ADFF2F', '#7FFF00', '#32CD32', '#00FF00', '#98FB98'],
                mood: 'electric',
                saturation: 0.8,
                brightness: 0.8
            },
            'disgust': {
                primary: '#8FBC8F',
                palette: ['#8FBC8F', '#9ACD32', '#6B8E23', '#556B2F', '#8B7355'],
                mood: 'muted',
                saturation: 0.5,
                brightness: 0.6
            },
            
            // Complex emotional states
            'nostalgia': {
                primary: '#DDA0DD',
                palette: ['#DDA0DD', '#D8BFD8', '#E6E6FA', '#F0E68C', '#EEE8AA'],
                mood: 'vintage',
                saturation: 0.4,
                brightness: 0.7
            },
            'awe': {
                primary: '#4169E1',
                palette: ['#4169E1', '#1E90FF', '#87CEEB', '#F0F8FF', '#B0E0E6'],
                mood: 'transcendent',
                saturation: 0.7,
                brightness: 0.8
            },
            'determination': {
                primary: '#DC143C',
                palette: ['#DC143C', '#FF6347', '#FF4500', '#FF8C00', '#FFA500'],
                mood: 'powerful',
                saturation: 0.9,
                brightness: 0.8
            },
            'serenity': {
                primary: '#98FB98',
                palette: ['#98FB98', '#90EE90', '#87CEEB', '#E0FFFF', '#F0FFFF'],
                mood: 'peaceful',
                saturation: 0.3,
                brightness: 0.9
            },
            'passion': {
                primary: '#FF1493',
                palette: ['#FF1493', '#DC143C', '#FF6347', '#FF4500', '#FF69B4'],
                mood: 'intense',
                saturation: 1.0,
                brightness: 0.8
            },
            'melancholy': {
                primary: '#663399',
                palette: ['#663399', '#9370DB', '#8A2BE2', '#9932CC', '#BA55D3'],
                mood: 'deep',
                saturation: 0.6,
                brightness: 0.4
            }
        };
        
        // Store mappings
        Object.entries(emotionMappings).forEach(([emotion, mapping]) => {
            this.synestheticMappings.emotions.set(emotion.toLowerCase(), mapping);
        });
    }

    /**
     * Load personal color mappings from user preferences
     */
    loadPersonalMappings() {
        try {
            const stored = localStorage.getItem('personalColorMappings');
            if (stored) {
                const mappings = JSON.parse(stored);
                Object.entries(mappings).forEach(([emotion, colors]) => {
                    this.synestheticMappings.personalMappings.set(emotion, colors);
                });
                console.log('📚 Personal color mappings loaded');
            }
        } catch (error) {
            console.error('Error loading personal mappings:', error);
        }
    }

    /**
     * Initialize cultural color mappings
     */
    initializeCulturalMappings() {
        const culturalMappings = {
            western: {
                happiness: ['#FFD700', '#FFA500', '#FFFF00'],
                sadness: ['#4169E1', '#1E90FF', '#87CEEB'],
                anger: ['#DC143C', '#FF0000', '#B22222'],
                nature: ['#228B22', '#32CD32', '#98FB98']
            },
            eastern: {
                happiness: ['#FF69B4', '#FF1493', '#FFB6C1'],
                sadness: ['#8A2BE2', '#9370DB', '#DDA0DD'],
                anger: ['#8B0000', '#A0522D', '#D2691E'],
                nature: ['#006400', '#228B22', '#32CD32']
            }
        };
        
        // Store cultural mappings (could be expanded based on user location/preference)
        this.synestheticMappings.culturalMappings.set('default', culturalMappings.western);
    }

    /**
     * Initialize visual effects
     */
    initializeVisualEffects() {
        // Initialize particle system
        this.initializeParticles();
        
        // Set initial colors
        this.currentColors = ['#1a1a2e', '#16213e', '#0f3460'];
        this.targetColors = [...this.currentColors];
    }

    /**
     * Initialize particle system
     */
    initializeParticles() {
        const count = this.getOptimalParticleCount();
        this.effects.particles.particles = [];
        
        for (let i = 0; i < count; i++) {
            this.effects.particles.particles.push(this.createParticle());
        }
    }

    /**
     * Get optimal particle count based on performance
     */
    getOptimalParticleCount() {
        const baseCount = this.effects.particles.count;
        
        switch (this.performance.qualityLevel) {
            case 'low': return Math.floor(baseCount * 0.3);
            case 'medium': return Math.floor(baseCount * 0.6);
            case 'high': return baseCount;
            case 'ultra': return Math.floor(baseCount * 1.5);
            default: return baseCount;
        }
    }

    /**
     * Create a single particle
     */
    createParticle() {
        const canvas = this.canvas;
        const effects = this.effects.particles;
        
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * effects.maxSpeed,
            vy: (Math.random() - 0.5) * effects.maxSpeed,
            size: effects.size.min + Math.random() * (effects.size.max - effects.size.min),
            life: Math.random(),
            maxLife: 0.5 + Math.random() * 0.5,
            color: this.getRandomEmotionColor(),
            alpha: 0.3 + Math.random() * 0.4
        };
    }

    /**
     * Get random emotion color
     */
    getRandomEmotionColor() {
        if (this.currentColors.length > 0) {
            return this.currentColors[Math.floor(Math.random() * this.currentColors.length)];
        }
        return '#4ECDC4';
    }

    /**
     * Start the rendering loop
     */
    startRenderLoop() {
        const render = (timestamp) => {
            this.render(timestamp);
            this.animationId = requestAnimationFrame(render);
        };
        
        this.animationId = requestAnimationFrame(render);
    }

    /**
     * Main render function
     */
    render(timestamp) {
        if (!this.ctx || !this.isInitialized) return;
        
        // Calculate delta time
        const deltaTime = timestamp - this.lastRenderTime;
        this.lastRenderTime = timestamp;
        
        // Update performance metrics
        this.updatePerformance(timestamp);
        
        // Clear canvas
        this.clearCanvas();
        
        // Update colors
        this.updateColorTransitions();
        
        // Render background
        this.renderBackground();
        
        // Render visual effects
        if (this.effects.particles.enabled) this.renderParticles(deltaTime);
        if (this.effects.waves.enabled) this.renderWaves(deltaTime);
        if (this.effects.flow.enabled) this.renderFlow(deltaTime);
        
        // Apply breathing effect if enabled
        if (this.effects.breathing.enabled) this.applyBreathingEffect(deltaTime);
    }

    /**
     * Clear canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Update color transitions
     */
    updateColorTransitions() {
        for (let i = 0; i < this.currentColors.length; i++) {
            if (this.targetColors[i] && this.currentColors[i] !== this.targetColors[i]) {
                this.currentColors[i] = this.interpolateColors(
                    this.currentColors[i],
                    this.targetColors[i],
                    this.colorTransitionSpeed
                );
            }
        }
    }

    /**
     * Interpolate between two colors
     */
    interpolateColors(color1, color2, factor) {
        if (!color1 || !color2) return color1 || color2;
        
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        
        if (!c1 || !c2) return color1;
        
        const r = Math.round(c1.r + (c2.r - c1.r) * factor);
        const g = Math.round(c1.g + (c2.g - c1.g) * factor);
        const b = Math.round(c1.b + (c2.b - c1.b) * factor);
        
        return this.rgbToHex(r, g, b);
    }

    /**
     * Convert hex color to RGB
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Convert RGB to hex
     */
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * Render background gradient
     */
    renderBackground() {
        if (this.currentColors.length === 0) return;
        
        const ctx = this.ctx;
        const canvas = this.canvas;
        
        let gradient;
        
        switch (this.effects.gradients.type) {
            case 'linear':
                gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                break;
            case 'radial':
                const centerX = this.effects.gradients.center.x;
                const centerY = this.effects.gradients.center.y;
                const radius = Math.max(canvas.width, canvas.height) * 0.8;
                gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
                break;
            case 'conic':
                // Fallback to radial if conic not supported
                gradient = ctx.createRadialGradient(
                    canvas.width / 2, canvas.height / 2, 0,
                    canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
                );
                break;
            default:
                gradient = ctx.createRadialGradient(
                    canvas.width / 2, canvas.height / 2, 0,
                    canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
                );
        }
        
        // Add color stops
        const colorCount = this.currentColors.length;
        this.currentColors.forEach((color, index) => {
            gradient.addColorStop(index / (colorCount - 1) || 0, color);
        });
        
        // Fill background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Render particle system
     */
    renderParticles(deltaTime) {
        const ctx = this.ctx;
        const particles = this.effects.particles.particles;
        
        particles.forEach(particle => {
            // Update particle
            this.updateParticle(particle, deltaTime);
            
            // Render particle
            ctx.save();
            ctx.globalAlpha = particle.alpha * particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    /**
     * Update individual particle
     */
    updateParticle(particle, deltaTime) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update life
        particle.life -= 0.005;
        
        // Respawn if dead
        if (particle.life <= 0) {
            particle.x = Math.random() * this.canvas.width;
            particle.y = Math.random() * this.canvas.height;
            particle.life = particle.maxLife;
            particle.color = this.getRandomEmotionColor();
        }
        
        // Wrap around edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
        
        // Add subtle attraction to mouse (if available)
        if (this.mousePosition) {
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }
        }
    }

    /**
     * Render wave effects
     */
    renderWaves(deltaTime) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        const waves = this.effects.waves;
        
        // Update wave phase
        waves.phase += waves.speed;
        
        // Create wave gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        this.currentColors.forEach((color, index) => {
            gradient.addColorStop(index / (this.currentColors.length - 1) || 0, color + '80'); // Add transparency
        });
        
        // Draw wave
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 5) {
            const y = canvas.height / 2 + 
                     Math.sin(x * waves.frequency + waves.phase) * waves.amplitude +
                     Math.sin(x * waves.frequency * 2 + waves.phase * 1.5) * waves.amplitude * 0.5;
            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    /**
     * Render flow effects
     */
    renderFlow(deltaTime) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        const flow = this.effects.flow;
        
        // Create flow lines
        ctx.save();
        ctx.strokeStyle = this.currentColors[0] + '40'; // Semi-transparent
        ctx.lineWidth = 2;
        
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            
            const startX = (i / 10) * canvas.width;
            const startY = canvas.height / 2;
            
            ctx.moveTo(startX, startY);
            
            for (let x = startX; x < canvas.width; x += 10) {
                const y = startY + 
                         Math.sin(x * 0.01 + time + i) * 50 +
                         Math.sin(x * 0.02 + time * 1.5) * 20;
                ctx.lineTo(x, y);
            }
            
            ctx.stroke();
        }
        
        ctx.restore();
    }

    /**
     * Apply breathing effect
     */
    applyBreathingEffect(deltaTime) {
        const breathing = this.effects.breathing;
        breathing.phase += breathing.speed;
        
        const scale = 1 + Math.sin(breathing.phase) * breathing.intensity;
        this.canvas.style.transform = `scale(${scale})`;
    }

    /**
     * Update performance metrics
     */
    updatePerformance(timestamp) {
        this.performance.frameCount++;
        
        if (timestamp - this.performance.lastFPSCheck > 1000) {
            this.performance.currentFPS = this.performance.frameCount;
            this.performance.frameCount = 0;
            this.performance.lastFPSCheck = timestamp;
            
            // Adjust quality based on performance
            this.adjustQuality();
        }
    }

    /**
     * Adjust quality based on performance
     */
    adjustQuality() {
        const fps = this.performance.currentFPS;
        
        if (fps < 30 && this.performance.qualityLevel !== 'low') {
            this.performance.qualityLevel = 'low';
            this.adjustEffectsForQuality();
            console.log('🔧 Reduced visual quality for better performance');
        } else if (fps > 50 && this.performance.qualityLevel === 'low') {
            this.performance.qualityLevel = 'medium';
            this.adjustEffectsForQuality();
            console.log('🔧 Increased visual quality');
        }
    }

    /**
     * Adjust effects for quality level
     */
    adjustEffectsForQuality() {
        const count = this.getOptimalParticleCount();
        
        // Adjust particle count
        if (this.effects.particles.particles.length > count) {
            this.effects.particles.particles = this.effects.particles.particles.slice(0, count);
        } else {
            while (this.effects.particles.particles.length < count) {
                this.effects.particles.particles.push(this.createParticle());
            }
        }
        
        // Adjust other effects based on quality
        switch (this.performance.qualityLevel) {
            case 'low':
                this.effects.waves.enabled = false;
                this.effects.flow.enabled = false;
                break;
            case 'medium':
                this.effects.waves.enabled = true;
                this.effects.flow.enabled = false;
                break;
            case 'high':
            case 'ultra':
                this.effects.waves.enabled = true;
                this.effects.flow.enabled = true;
                break;
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Handle resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Track mouse for particle interaction
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mousePosition = null;
        });
        
        // Handle visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseRendering();
            } else {
                this.resumeRendering();
            }
        });
    }

    /**
     * Pause rendering when not visible
     */
    pauseRendering() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Resume rendering
     */
    resumeRendering() {
        if (!this.animationId) {
            this.startRenderLoop();
        }
    }

    // ================================
    // PUBLIC API METHODS
    // ================================

    /**
     * Update environment based on emotional state
     */
    updateEnvironment(emotionalState) {
        if (!emotionalState || !this.isInitialized) return;
        
        // Get colors for this emotion
        const colors = this.getColorsForEmotion(emotionalState);
        
        // Update target colors
        this.setTargetColors(colors);
        
        // Update effects based on emotion properties
        this.updateEffectsForEmotion(emotionalState);
        
        // Update canvas background (fallback)
        this.updateCanvasBackground(colors, emotionalState);
    }

    /**
     * Get colors for specific emotion
     */
    getColorsForEmotion(emotionalState) {
        const emotionName = emotionalState.primary.toLowerCase();
        
        // Check personal mappings first
        if (this.synestheticMappings.personalMappings.has(emotionName)) {
            return this.synestheticMappings.personalMappings.get(emotionName);
        }
        
        // Check emotion mappings
        if (this.synestheticMappings.emotions.has(emotionName)) {
            const mapping = this.synestheticMappings.emotions.get(emotionName);
            return mapping.palette || [mapping.primary];
        }
        
        // Use provided colors or defaults
        if (emotionalState.synestheticColors && emotionalState.synestheticColors.length > 0) {
            return emotionalState.synestheticColors;
        }
        
        // Generate colors based on emotional dimensions
        return this.generateColorsFromDimensions(emotionalState);
    }

    /**
     * Generate colors from emotional dimensions
     */
    generateColorsFromDimensions(emotionalState) {
        const { valence = 0.5, intensity = 0.5, depth = 0.5 } = emotionalState;
        
        // Base hue on emotional valence
        const baseHue = valence * 360; // 0-360 degrees
        
        // Saturation based on intensity
        const saturation = 0.3 + intensity * 0.7; // 30-100%
        
        // Lightness based on depth
        const lightness = 0.2 + depth * 0.6; // 20-80%
        
        // Generate color palette
        const colors = [];
        for (let i = 0; i < 5; i++) {
            const hue = (baseHue + i * 30) % 360;
            const color = this.hslToHex(hue, saturation, lightness);
            colors.push(color);
        }
        
        return colors;
    }

    /**
     * Convert HSL to hex
     */
    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    /**
     * Set target colors for transition
     */
    setTargetColors(colors) {
        if (colors && colors.length > 0) {
            this.targetColors = [...colors];
            
            // Ensure we have enough current colors
            while (this.currentColors.length < this.targetColors.length) {
                this.currentColors.push(this.currentColors[0] || '#1a1a2e');
            }
        }
    }

    /**
     * Update effects based on emotion
     */
    updateEffectsForEmotion(emotionalState) {
        const { intensity = 0.5, depth = 0.5 } = emotionalState;
        
        // Update particle speed based on intensity
        this.effects.particles.maxSpeed = 0.5 + intensity * 2;
        
        // Update wave amplitude based on depth
        this.effects.waves.amplitude = (depth * 100) + 20;
        
        // Update breathing intensity
        this.effects.breathing.intensity = depth * 0.2;
        this.effects.breathing.enabled = depth > 0.7;
        
        // Update flow based on intensity
        this.effects.flow.speed = 0.2 + intensity * 0.8;
    }

    /**
     * Update canvas background (fallback method)
     */
    updateCanvasBackground(colors, emotionalState) {
        if (!colors || colors.length === 0) return;
        
        const { intensity = 0.5, depth = 0.5 } = emotionalState;
        
        // Create gradient
        const gradient = `radial-gradient(circle at ${50 + intensity * 30}% ${50 + depth * 30}%, ${colors.join(', ')})`;
        
        // Apply to canvas element
        this.canvas.style.background = gradient;
        
        // Add breathing class for deep emotions
        if (depth > 0.7) {
            this.canvas.classList.add('breathing');
        } else {
            this.canvas.classList.remove('breathing');
        }
    }

    /**
     * Save personal color mapping
     */
    savePersonalMapping(emotion, colors) {
        this.synestheticMappings.personalMappings.set(emotion.toLowerCase(), colors);
        
        // Save to localStorage
        const mappings = {};
        this.synestheticMappings.personalMappings.forEach((colors, emotion) => {
            mappings[emotion] = colors;
        });
        
        try {
            localStorage.setItem('personalColorMappings', JSON.stringify(mappings));
            console.log(`💾 Personal mapping saved for ${emotion}`);
        } catch (error) {
            console.error('Error saving personal mapping:', error);
        }
    }

    /**
     * Get current visualization state
     */
    getVisualizationState() {
        return {
            currentColors: [...this.currentColors],
            targetColors: [...this.targetColors],
            effects: JSON.parse(JSON.stringify(this.effects)),
            performance: { ...this.performance }
        };
    }

    /**
     * Configure visualizer settings
     */
    configure(settings) {
        if (settings.quality) {
            this.performance.qualityLevel = settings.quality;
            this.adjustEffectsForQuality();
        }
        
        if (settings.effects) {
            this.effects = { ...this.effects, ...settings.effects };
        }
        
        if (settings.colorTransitionSpeed) {
            this.colorTransitionSpeed = settings.colorTransitionSpeed;
        }
    }

    /**
     * Export current settings
     */
    exportSettings() {
        return {
            effects: this.effects,
            performance: this.performance,
            colorTransitionSpeed: this.colorTransitionSpeed,
            personalMappings: Object.fromEntries(this.synestheticMappings.personalMappings)
        };
    }

    /**
     * Clean up resources
     */
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.isInitialized = false;
        console.log('🌈 Color Visualizer destroyed');
    }
}

// Make available globally
window.ColorVisualizer = ColorVisualizer;
export default ColorVisualizer;