/**
 * 🌈 ADVANCED SYNESTHETIC VISUALIZATION ENGINE
 * Revolutionary multi-sensory music visualization
 */

class AdvancedSynestheticEngine {
    constructor() {
        this.isInitialized = false;
        this.visualizers = new Map();
        this.canvas = null;
        this.ctx = null;
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.bufferLength = 0;
        
        this.visualModes = {
            'spectral-waves': new SpectralWaveVisualizer(),
            'emotion-fractals': new EmotionFractalVisualizer(),
            'neural-networks': new NeuralNetworkVisualizer(),
            'consciousness-flow': new ConsciousnessFlowVisualizer(),
            'soul-resonance': new SoulResonanceVisualizer(),
            'time-crystals': new TimeCrystalVisualizer()
        };
        
        this.currentMode = 'consciousness-flow';
        this.emotionColorMap = new Map();
        this.particleSystems = [];
        
        this.init();
    }

    async init() {
        console.log('🌈 Initializing Advanced Synesthetic Engine...');
        
        try {
            await this.setupCanvas();
            await this.initializeAudioContext();
            await this.setupEmotionColorMapping();
            await this.createParticleSystems();
            await this.setupVisualizationModes();
            
            this.isInitialized = true;
            console.log('✨ Advanced Synesthetic Engine READY!');
            
            this.startVisualizationLoop();
            
        } catch (error) {
            console.error('❌ Synesthetic Engine initialization failed:', error);
        }
    }

    async setupCanvas() {
        // Create main visualization canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'synesthetic-canvas';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '300px';
        this.canvas.style.borderRadius = '16px';
        this.canvas.style.background = 'rgba(0, 0, 0, 0.1)';
        
        // Set actual canvas size for high DPI displays
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
        
        // Insert canvas into synesthetic display
        const synestheticDisplay = document.querySelector('.synesthetic-display');
        if (synestheticDisplay) {
            synestheticDisplay.appendChild(this.canvas);
        }
        
        console.log('🎨 Synesthetic canvas created');
    }

    async initializeAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            
            console.log('🔊 Audio context initialized for synesthetic analysis');
            
            // Connect to existing audio if available
            this.connectToAudioSource();
            
        } catch (error) {
            console.warn('⚠️ Audio context initialization failed:', error);
            // Continue without audio analysis
        }
    }

    connectToAudioSource() {
        // Try to connect to existing audio elements
        const audioElements = document.querySelectorAll('audio, video');
        
        audioElements.forEach(element => {
            try {
                const source = this.audioContext.createMediaElementSource(element);
                source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
                console.log('🔗 Connected to audio source for synesthetic analysis');
            } catch (error) {
                // Audio element might already be connected
            }
        });
    }

    async setupEmotionColorMapping() {
        this.emotionColorMap.set('joy', {
            primary: [255, 215, 0],      // Gold
            secondary: [255, 165, 0],     // Orange
            accent: [255, 255, 0],        // Yellow
            energy: 0.9
        });
        
        this.emotionColorMap.set('serenity', {
            primary: [135, 206, 235],     // Sky Blue
            secondary: [70, 130, 180],    // Steel Blue
            accent: [176, 224, 230],      // Powder Blue
            energy: 0.4
        });
        
        this.emotionColorMap.set('excitement', {
            primary: [255, 69, 0],        // Red Orange
            secondary: [255, 20, 147],    // Deep Pink
            accent: [255, 105, 180],      // Hot Pink
            energy: 1.0
        });
        
        this.emotionColorMap.set('contemplation', {
            primary: [147, 112, 219],     // Medium Purple
            secondary: [138, 43, 226],    // Blue Violet
            accent: [186, 85, 211],       // Medium Orchid
            energy: 0.6
        });
        
        this.emotionColorMap.set('wonder', {
            primary: [221, 160, 221],     // Plum
            secondary: [218, 112, 214],   // Orchid
            accent: [255, 182, 193],      // Light Pink
            energy: 0.7
        });
        
        this.emotionColorMap.set('euphoria', {
            primary: [255, 20, 147],      // Deep Pink
            secondary: [255, 69, 0],      // Red Orange
            accent: [255, 215, 0],        // Gold
            energy: 1.0
        });
        
        console.log('🎨 Emotion color mapping established');
    }

    async createParticleSystems() {
        // Create different particle systems for different emotions
        this.particleSystems = [
            new EmotionParticleSystem('floating', 50),
            new EmotionParticleSystem('flowing', 30),
            new EmotionParticleSystem('pulsing', 20),
            new EmotionParticleSystem('spiraling', 40)
        ];
        
        console.log('✨ Particle systems created');
    }

    async setupVisualizationModes() {
        // Initialize all visualization modes
        for (const [name, visualizer] of Object.entries(this.visualModes)) {
            await visualizer.init();
            console.log(`🎭 Visualization mode '${name}' initialized`);
        }
    }

    startVisualizationLoop() {
        const animate = () => {
            this.updateVisualization();
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
        console.log('🔄 Visualization loop started');
    }

    updateVisualization() {
        if (!this.isInitialized || !this.ctx) return;
        
        try {
            // Clear canvas with subtle fade effect
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Get current emotion and audio data
            const currentEmotion = this.getCurrentEmotion();
            const audioData = this.getAudioData();
            const soulData = this.getSoulData();
            
            // Update current visualizer
            const visualizer = this.visualModes[this.currentMode];
            if (visualizer) {
                visualizer.render(this.ctx, {
                    emotion: currentEmotion,
                    audio: audioData,
                    soul: soulData,
                    time: Date.now(),
                    canvas: { width: this.canvas.width, height: this.canvas.height }
                });
            }
            
            // Update particle systems
            this.updateParticleSystems(currentEmotion, audioData);
            
            // Render particle systems
            this.renderParticleSystems();
            
        } catch (error) {
            console.warn('⚠️ Visualization update error:', error);
        }
    }

    getCurrentEmotion() {
        // Get emotion from emotion engine
        if (window.emotionEngine && window.emotionEngine.currentEmotion) {
            return {
                name: window.emotionEngine.currentEmotion.toLowerCase(),
                intensity: window.emotionEngine.emotionIntensity || 0.5,
                confidence: window.emotionEngine.detectionConfidence || 0.8
            };
        }
        
        // Fallback emotion cycle
        const emotions = ['joy', 'serenity', 'wonder', 'excitement', 'contemplation', 'euphoria'];
        const index = Math.floor(Date.now() / 8000) % emotions.length;
        
        return {
            name: emotions[index],
            intensity: 0.5 + Math.sin(Date.now() / 3000) * 0.3,
            confidence: 0.8
        };
    }

    getAudioData() {
        if (!this.analyser || !this.dataArray) {
            // Return simulated audio data
            return this.generateSimulatedAudioData();
        }
        
        try {
            this.analyser.getByteFrequencyData(this.dataArray);
            
            return {
                frequencies: Array.from(this.dataArray),
                average: this.dataArray.reduce((a, b) => a + b) / this.dataArray.length,
                bass: this.getFrequencyRange(0, 100),
                mid: this.getFrequencyRange(100, 1000),
                treble: this.getFrequencyRange(1000, this.bufferLength)
            };
        } catch (error) {
            return this.generateSimulatedAudioData();
        }
    }

    generateSimulatedAudioData() {
        const time = Date.now() / 1000;
        const frequencies = [];
        
        for (let i = 0; i < 256; i++) {
            const freq = (i / 256) * 22050; // Simulate frequency range
            const bass = Math.sin(time * 2 + i * 0.01) * 100 * Math.exp(-freq / 200);
            const mid = Math.sin(time * 4 + i * 0.02) * 80 * Math.exp(-Math.abs(freq - 1000) / 500);
            const treble = Math.sin(time * 8 + i * 0.03) * 60 * Math.exp(-(freq - 8000) / 2000);
            
            frequencies.push(Math.max(0, Math.min(255, bass + mid + treble + Math.random() * 20)));
        }
        
        const average = frequencies.reduce((a, b) => a + b) / frequencies.length;
        
        return {
            frequencies,
            average,
            bass: frequencies.slice(0, 32).reduce((a, b) => a + b) / 32,
            mid: frequencies.slice(32, 128).reduce((a, b) => a + b) / 96,
            treble: frequencies.slice(128).reduce((a, b) => a + b) / 128
        };
    }

    getFrequencyRange(startFreq, endFreq) {
        if (!this.dataArray) return 0;
        
        const startIndex = Math.floor(startFreq / 22050 * this.bufferLength);
        const endIndex = Math.floor(endFreq / 22050 * this.bufferLength);
        
        let sum = 0;
        for (let i = startIndex; i < endIndex && i < this.dataArray.length; i++) {
            sum += this.dataArray[i];
        }
        
        return sum / (endIndex - startIndex);
    }

    getSoulData() {
        // Get data from soul systems
        return {
            consciousness: window.soulConsciousness || 0.85,
            humanity: window.soulHumanity || 8.5,
            learning: window.soulLearning || 0.92,
            network: window.soulNetwork || 0.78,
            creativity: window.soulCreativity || 0.88
        };
    }

    updateParticleSystems(emotion, audioData) {
        this.particleSystems.forEach(system => {
            system.update(emotion, audioData);
        });
    }

    renderParticleSystems() {
        this.particleSystems.forEach(system => {
            system.render(this.ctx);
        });
    }

    // Public API methods
    setVisualizationMode(mode) {
        if (this.visualModes[mode]) {
            this.currentMode = mode;
            console.log(`🎭 Switched to visualization mode: ${mode}`);
        }
    }

    getAvailableModes() {
        return Object.keys(this.visualModes);
    }

    addCustomVisualizer(name, visualizer) {
        this.visualModes[name] = visualizer;
        console.log(`🎨 Added custom visualizer: ${name}`);
    }

    setEmotionColors(emotion, colors) {
        this.emotionColorMap.set(emotion.toLowerCase(), colors);
        console.log(`🎨 Updated colors for emotion: ${emotion}`);
    }

    resize() {
        if (!this.canvas) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
    }
}

// Individual visualizer classes
class SpectralWaveVisualizer {
    async init() {
        this.waves = [];
    }

    render(ctx, data) {
        const { emotion, audio, canvas, time } = data;
        const colors = this.getEmotionColors(emotion.name);
        
        if (!audio.frequencies) return;
        
        ctx.strokeStyle = `rgba(${colors.primary.join(',')}, 0.8)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const sliceWidth = canvas.width / audio.frequencies.length;
        let x = 0;
        
        for (let i = 0; i < audio.frequencies.length; i++) {
            const v = audio.frequencies[i] / 255.0;
            const y = v * canvas.height / 2;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            x += sliceWidth;
        }
        
        ctx.stroke();
    }

    getEmotionColors(emotionName) {
        const colorMap = {
            joy: { primary: [255, 215, 0] },
            serenity: { primary: [135, 206, 235] },
            excitement: { primary: [255, 69, 0] },
            contemplation: { primary: [147, 112, 219] },
            wonder: { primary: [221, 160, 221] },
            euphoria: { primary: [255, 20, 147] }
        };
        
        return colorMap[emotionName] || colorMap.serenity;
    }
}

class EmotionFractalVisualizer {
    async init() {
        this.fractalDepth = 5;
    }

    render(ctx, data) {
        const { emotion, audio, canvas, time } = data;
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        this.drawFractal(ctx, 0, 0, 100, emotion.intensity * Math.PI * 2, this.fractalDepth);
        
        ctx.restore();
    }

    drawFractal(ctx, x, y, length, angle, depth) {
        if (depth === 0) return;
        
        const endX = x + length * Math.cos(angle);
        const endY = y + length * Math.sin(angle);
        
        ctx.strokeStyle = `hsl(${(angle * 180 / Math.PI + Date.now() / 50) % 360}, 70%, 60%)`;
        ctx.lineWidth = depth;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        this.drawFractal(ctx, endX, endY, length * 0.7, angle + 0.5, depth - 1);
        this.drawFractal(ctx, endX, endY, length * 0.7, angle - 0.5, depth - 1);
    }
}

class NeuralNetworkVisualizer {
    async init() {
        this.nodes = [];
        this.connections = [];
        this.createNetwork();
    }

    createNetwork() {
        // Create nodes
        for (let i = 0; i < 20; i++) {
            this.nodes.push({
                x: Math.random(),
                y: Math.random(),
                activation: 0,
                connections: []
            });
        }
        
        // Create connections
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                if (Math.random() < 0.3) {
                    this.connections.push({
                        from: i,
                        to: j,
                        weight: Math.random() * 2 - 1
                    });
                }
            }
        }
    }

    render(ctx, data) {
        const { emotion, audio, canvas, time } = data;
        
        // Update node activations based on audio
        this.nodes.forEach((node, i) => {
            const freq = audio.frequencies[i * 10] || 0;
            node.activation = (freq / 255) * emotion.intensity;
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
        ctx.lineWidth = 1;
        
        this.connections.forEach(conn => {
            const fromNode = this.nodes[conn.from];
            const toNode = this.nodes[conn.to];
            
            const opacity = Math.abs(conn.weight) * (fromNode.activation + toNode.activation) / 2;
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            
            ctx.beginPath();
            ctx.moveTo(fromNode.x * canvas.width, fromNode.y * canvas.height);
            ctx.lineTo(toNode.x * canvas.width, toNode.y * canvas.height);
            ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            const size = 3 + node.activation * 10;
            const alpha = 0.5 + node.activation * 0.5;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(node.x * canvas.width, node.y * canvas.height, size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

class ConsciousnessFlowVisualizer {
    async init() {
        this.flowLines = [];
        this.createFlowField();
    }

    createFlowField() {
        for (let i = 0; i < 100; i++) {
            this.flowLines.push({
                x: Math.random(),
                y: Math.random(),
                vx: 0,
                vy: 0,
                history: []
            });
        }
    }

    render(ctx, data) {
        const { emotion, audio, soul, canvas, time } = data;
        
        // Update flow field based on consciousness level
        this.flowLines.forEach(line => {
            const consciousness = soul.consciousness || 0.5;
            const creativity = soul.creativity || 0.5;
            
            const angle = Math.sin(line.x * 10 + time / 1000) * Math.PI * consciousness;
            line.vx = Math.cos(angle) * 0.002 * creativity;
            line.vy = Math.sin(angle) * 0.002 * creativity;
            
            line.x += line.vx;
            line.y += line.vy;
            
            // Wrap around edges
            if (line.x < 0) line.x = 1;
            if (line.x > 1) line.x = 0;
            if (line.y < 0) line.y = 1;
            if (line.y > 1) line.y = 0;
            
            // Store history
            line.history.push({ x: line.x, y: line.y });
            if (line.history.length > 50) {
                line.history.shift();
            }
        });
        
        // Draw flow lines
        this.flowLines.forEach(line => {
            if (line.history.length < 2) return;
            
            ctx.strokeStyle = `hsl(${(time / 100) % 360}, 70%, 60%)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            line.history.forEach((point, i) => {
                const x = point.x * canvas.width;
                const y = point.y * canvas.height;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
        });
    }
}

class SoulResonanceVisualizer {
    async init() {
        this.resonancePoints = [];
    }

    render(ctx, data) {
        const { emotion, audio, soul, canvas, time } = data;
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const humanity = soul.humanity || 0.5;
        
        // Draw resonance circles
        for (let i = 1; i <= 5; i++) {
            const radius = (i * 30) * (1 + audio.average / 255 * 0.5);
            const alpha = (0.8 - i * 0.15) * humanity;
            
            ctx.strokeStyle = `hsla(${(time / 50 + i * 60) % 360}, 70%, 60%, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Draw soul energy particles
        const particleCount = Math.floor(humanity * 20);
        for (let i = 0; i < particleCount; i++) {
            const angle = (time / 1000 + i * Math.PI * 2 / particleCount) % (Math.PI * 2);
            const distance = 60 + Math.sin(time / 500 + i) * 20;
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            ctx.fillStyle = `hsla(${(angle * 180 / Math.PI + time / 20) % 360}, 80%, 70%, 0.8)`;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class TimeCrystalVisualizer {
    async init() {
        this.crystalStructure = [];
        this.createCrystalStructure();
    }

    createCrystalStructure() {
        for (let layer = 0; layer < 3; layer++) {
            for (let i = 0; i < 8; i++) {
                this.crystalStructure.push({
                    layer,
                    angle: i * Math.PI * 2 / 8,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }
    }

    render(ctx, data) {
        const { emotion, audio, canvas, time } = data;
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        
        this.crystalStructure.forEach(crystal => {
            const radius = (crystal.layer + 1) * 40;
            const rotationSpeed = (crystal.layer + 1) * 0.0005;
            const currentAngle = crystal.angle + time * rotationSpeed + crystal.phase;
            
            const x = Math.cos(currentAngle) * radius;
            const y = Math.sin(currentAngle) * radius;
            
            const intensity = (audio.frequencies[crystal.layer * 8] || 0) / 255;
            const size = 2 + intensity * 8;
            const hue = (currentAngle * 180 / Math.PI + time / 100) % 360;
            
            ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${0.5 + intensity * 0.5})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw connections to center
            ctx.strokeStyle = `hsla(${hue}, 50%, 50%, ${0.2 + intensity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
        });
        
        ctx.restore();
    }
}

// Particle system for emotions
class EmotionParticleSystem {
    constructor(type, count) {
        this.type = type;
        this.particles = [];
        this.maxParticles = count;
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random(),
                y: Math.random(),
                vx: (Math.random() - 0.5) * 0.01,
                vy: (Math.random() - 0.5) * 0.01,
                size: Math.random() * 3 + 1,
                life: 1.0,
                hue: Math.random() * 360
            });
        }
    }

    update(emotion, audioData) {
        const energyLevel = emotion.intensity * (audioData.average / 255);
        
        this.particles.forEach(particle => {
            switch (this.type) {
                case 'floating':
                    particle.vy -= 0.0001; // Slight upward drift
                    break;
                case 'flowing':
                    particle.vx += Math.sin(Date.now() / 1000 + particle.y * 10) * 0.0001;
                    break;
                case 'pulsing':
                    particle.size = (particle.size + energyLevel * 0.5) % 5 + 1;
                    break;
                case 'spiraling':
                    const centerX = 0.5;
                    const centerY = 0.5;
                    const dx = particle.x - centerX;
                    const dy = particle.y - centerY;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle + Math.PI / 2) * 0.0001 * energyLevel;
                    particle.vy += Math.sin(angle + Math.PI / 2) * 0.0001 * energyLevel;
                    break;
            }
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.hue += 0.5;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = 1;
            if (particle.x > 1) particle.x = 0;
            if (particle.y < 0) particle.y = 1;
            if (particle.y > 1) particle.y = 0;
            
            if (particle.hue > 360) particle.hue = 0;
        });
    }

    render(ctx) {
        this.particles.forEach(particle => {
            const canvas = ctx.canvas;
            const x = particle.x * canvas.width;
            const y = particle.y * canvas.height;
            
            ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.life * 0.6})`;
            ctx.beginPath();
            ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// Initialize and expose globally
window.AdvancedSynestheticEngine = AdvancedSynestheticEngine;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.advancedSynestheticEngine = new AdvancedSynestheticEngine();
    console.log('🌈 Advanced Synesthetic Engine auto-initialized!');
});

// Handle immediate initialization if DOM already loaded
if (document.readyState === 'loading') {
    // Do nothing, event listener will handle it
} else {
    window.advancedSynestheticEngine = new AdvancedSynestheticEngine();
    console.log('🌈 Advanced Synesthetic Engine initialized immediately!');
}
