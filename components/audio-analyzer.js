/**
 * 🎵 AUDIO ANALYZER - ADVANCED AUDIO PROCESSING
 * Sophisticated real-time audio analysis for emotional intelligence
 * Extracts meaningful features from audio for consciousness engine
 */

class AudioAnalyzer {
    constructor(coreApp) {
        this.coreApp = coreApp;
        this.isInitialized = false;
        this.isAnalyzing = false;
        
        // Audio processing components
        this.audioContext = null;
        this.analyser = null;
        this.mediaStream = null;
        this.sourceNode = null;
        
        // Analysis configuration
        this.config = {
            fftSize: 2048,
            smoothingTimeConstant: 0.8,
            minDecibels: -90,
            maxDecibels: -10,
            sampleRate: 44100,
            bufferSize: 4096
        };
        
        // Feature extraction buffers
        this.buffers = {
            frequency: null,
            time: null,
            magnitude: null,
            phase: null
        };
        
        // Advanced analysis features
        this.features = {
            spectral: {
                centroid: 0,
                rolloff: 0,
                flatness: 0,
                spread: 0,
                slope: 0,
                kurtosis: 0,
                skewness: 0
            },
            temporal: {
                rms: 0,
                zcr: 0,
                energy: 0,
                entropy: 0
            },
            harmonic: {
                harmonicity: 0,
                inharmonicity: 0,
                f0: 0,
                harmonics: []
            },
            rhythm: {
                tempo: 0,
                beat: 0,
                onset: false,
                complexity: 0
            },
            perceptual: {
                loudness: 0,
                sharpness: 0,
                roughness: 0,
                fluctuation: 0
            }
        };
        
        // Analysis history for temporal features
        this.analysisHistory = [];
        this.maxHistoryLength = 100;
        
        // Performance monitoring
        this.performance = {
            analysisTime: 0,
            frameRate: 0,
            lastFrameTime: 0
        };
        
        console.log('🎵 Audio Analyzer initializing...');
        this.initialize();
    }

    /**
     * Initialize the audio analyzer
     */
    async initialize() {
        try {
            // Check browser support
            this.checkBrowserSupport();
            
            // Initialize audio processing buffers
            this.initializeBuffers();
            
            // Set up real-time analysis loop
            this.setupAnalysisLoop();
            
            // Initialize Meyda integration if available
            this.initializeMeydaIntegration();
            
            this.isInitialized = true;
            console.log('✨ Audio Analyzer fully operational');
            
        } catch (error) {
            console.error('❌ Audio Analyzer initialization failed:', error);
            this.isInitialized = false;
        }
    }

    /**
     * Check browser support for required APIs
     */
    checkBrowserSupport() {
        const requiredAPIs = {
            'Web Audio API': window.AudioContext || window.webkitAudioContext,
            'getUserMedia': navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
            'AnalyserNode': window.AnalyserNode,
            'Float32Array': window.Float32Array
        };
        
        const unsupported = Object.entries(requiredAPIs)
            .filter(([name, api]) => !api)
            .map(([name]) => name);
        
        if (unsupported.length > 0) {
            throw new Error(`Unsupported APIs: ${unsupported.join(', ')}`);
        }
        
        console.log('✅ All required APIs supported');
    }

    /**
     * Initialize analysis buffers
     */
    initializeBuffers() {
        const bufferLength = this.config.fftSize / 2;
        
        this.buffers = {
            frequency: new Uint8Array(bufferLength),
            time: new Uint8Array(this.config.fftSize),
            magnitude: new Float32Array(bufferLength),
            phase: new Float32Array(bufferLength),
            previous: new Float32Array(bufferLength)
        };
        
        console.log(`📊 Analysis buffers initialized (${bufferLength} samples)`);
    }

    /**
     * Set up real-time analysis loop
     */
    setupAnalysisLoop() {
        this.analysisLoop = () => {
            if (!this.isAnalyzing) return;
            
            const startTime = performance.now();
            
            // Perform audio analysis
            this.performRealTimeAnalysis();
            
            // Update performance metrics
            this.updatePerformanceMetrics(startTime);
            
            // Continue loop
            requestAnimationFrame(this.analysisLoop);
        };
    }

    /**
     * Initialize Meyda integration if available
     */
    initializeMeydaIntegration() {
        if (typeof Meyda !== 'undefined') {
            this.meydaExtractors = [
                'spectralCentroid',
                'spectralRolloff',
                'spectralFlatness',
                'spectralSpread',
                'spectralSlope',
                'spectralKurtosis',
                'spectralSkewness',
                'mfcc',
                'chroma',
                'rms',
                'zcr',
                'energy',
                'loudness'
            ];
            
            console.log('🔬 Meyda integration ready');
        } else {
            console.log('⚠️ Meyda not available - using fallback analysis');
        }
    }

    /**
     * Start audio analysis with media stream
     */
    async startAnalysis(mediaStream) {
        try {
            // Store media stream reference
            this.mediaStream = mediaStream;
            
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: this.config.sampleRate
            });
            
            // Create analyser node
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = this.config.fftSize;
            this.analyser.smoothingTimeConstant = this.config.smoothingTimeConstant;
            this.analyser.minDecibels = this.config.minDecibels;
            this.analyser.maxDecibels = this.config.maxDecibels;
            
            // Create source node from media stream
            this.sourceNode = this.audioContext.createMediaStreamSource(mediaStream);
            this.sourceNode.connect(this.analyser);
            
            // Initialize Meyda analyzer if available
            if (typeof Meyda !== 'undefined') {
                this.meydaAnalyzer = Meyda.createMeydaAnalyzer({
                    audioContext: this.audioContext,
                    source: this.sourceNode,
                    bufferSize: this.config.bufferSize,
                    featureExtractors: this.meydaExtractors,
                    callback: (features) => this.processMeydaFeatures(features)
                });
                
                this.meydaAnalyzer.start();
            }
            
            // Start analysis loop
            this.isAnalyzing = true;
            this.analysisLoop();
            
            console.log('🎤 Audio analysis started');
            
        } catch (error) {
            console.error('❌ Failed to start audio analysis:', error);
            throw error;
        }
    }

    /**
     * Stop audio analysis
     */
    stopAnalysis() {
        this.isAnalyzing = false;
        
        if (this.meydaAnalyzer) {
            this.meydaAnalyzer.stop();
            this.meydaAnalyzer = null;
        }
        
        if (this.sourceNode) {
            this.sourceNode.disconnect();
            this.sourceNode = null;
        }
        
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.analyser = null;
        this.mediaStream = null;
        
        console.log('🛑 Audio analysis stopped');
    }

    /**
     * Start file analysis with audio URL
     */
    async startFileAnalysis(audioUrl, fileName) {
        try {
            console.log('[AudioAnalyzer] Starting file analysis for:', fileName);
            
            // Create audio element for file playback
            const audio = new Audio(audioUrl);
            audio.crossOrigin = 'anonymous';
            
            // Wait for audio to load metadata
            await new Promise((resolve, reject) => {
                audio.addEventListener('loadedmetadata', resolve);
                audio.addEventListener('error', reject);
                audio.load();
            });
            
            // Initialize audio context if needed
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // Create analyser
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = this.config.fftSize;
            this.analyser.smoothingTimeConstant = this.config.smoothingTimeConstant;
            
            // Create source from audio element
            this.sourceNode = this.audioContext.createMediaElementSource(audio);
            this.sourceNode.connect(this.analyser);
            this.sourceNode.connect(this.audioContext.destination);
            
            // Initialize buffers
            this.initializeBuffers();
            
            // Connect to the main player UI
            this.setupPlayerUI(audio, fileName);
            
            // Start analysis
            this.isAnalyzing = true;
            this.setupAnalysisLoop();
            
            // Play audio for analysis
            audio.play();
            
            // Create initial emotional response for file upload
            const fileEmotion = {
                primary: 'Processing',
                confidence: 90,
                depth: 70,
                intensity: 0.8,
                synestheticColors: ['#4ECDC4', '#44A08D', '#093637'],
                features: { energy: 0.8, bass: 60, mid: 70, treble: 50 }
            };
            
            // Trigger immediate visual feedback
            if (window.synestheticCore?.updateEmotionalConsciousness) {
                window.synestheticCore.updateEmotionalConsciousness(fileEmotion);
            }
            
            console.log('[AudioAnalyzer] File analysis started for:', fileName);
            
            // Handle audio end - keep connection alive for seeking
            audio.addEventListener('ended', () => {
                // Don't stop analysis - just pause it so seeking still works
                this.isAnalyzing = false;
                console.log('[AudioAnalyzer] File playback ended - analysis paused (seeking still available)');
            });
            
            // Store reference to audio for potential reconnection
            this.currentAudio = audio;
            
        } catch (error) {
            console.error('[AudioAnalyzer] Failed to start file analysis:', error);
            throw error;
        }
    }

    /**
     * Setup player UI for file playback
     */
    setupPlayerUI(audio, fileName) {
        // Set as main audio element
        const existingAudio = document.getElementById('audioElement');
        if (existingAudio) {
            existingAudio.remove();
        }
        
        audio.id = 'audioElement';
        audio.style.display = 'none';
        document.body.appendChild(audio);
        
        // Show and setup player UI
        const audioPlayer = document.getElementById('audioPlayer');
        const trackName = document.getElementById('trackName');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (audioPlayer) {
            audioPlayer.classList.add('active');
        }
        
        if (trackName) {
            trackName.textContent = fileName || 'Audio File';
        }
        
        if (playPauseBtn) {
            playPauseBtn.textContent = '⏸'; // Show pause since audio is playing
        }
        
        // Setup time updates
        audio.addEventListener('timeupdate', () => {
            if (window.app && window.app.updateTimeDisplay) {
                window.app.updateTimeDisplay();
            }
        });
        
        // Setup progress bar click
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.onclick = (event) => {
                if (window.app && window.app.seekTo) {
                    window.app.seekTo(event);
                }
            };
        }
        
        // Setup total time when metadata loads
        audio.addEventListener('loadedmetadata', () => {
            const totalTime = document.getElementById('totalTime');
            if (totalTime && window.app && window.app.formatTime) {
                totalTime.textContent = window.app.formatTime(audio.duration);
            }
        });
        
        // Setup player control event listeners
        if (playPauseBtn) {
            playPauseBtn.onclick = () => {
                if (window.app && window.app.togglePlayPause) {
                    window.app.togglePlayPause();
                }
            };
        }
        
        const loopBtn = document.getElementById('loopBtn');
        if (loopBtn) {
            loopBtn.onclick = () => {
                if (window.app && window.app.toggleLoop) {
                    window.app.toggleLoop();
                }
            };
        }
        
        const closePlayer = document.getElementById('closePlayer');
        if (closePlayer) {
            closePlayer.onclick = () => {
                if (window.app && window.app.closePlayer) {
                    window.app.closePlayer();
                }
                // Also stop analysis
                this.stopAnalysis();
            };
        }
        
        console.log('[AudioAnalyzer] Player UI setup complete for:', fileName);
    }

    /**
     * Perform real-time audio analysis
     */
    performRealTimeAnalysis() {
        if (!this.analyser) return;
        
        // Get frequency and time domain data
        this.analyser.getByteFrequencyData(this.buffers.frequency);
        this.analyser.getByteTimeDomainData(this.buffers.time);
        this.analyser.getFloatFrequencyData(this.buffers.magnitude);
        
        // Extract comprehensive audio features
        this.extractSpectralFeatures();
        this.extractTemporalFeatures();
        this.extractHarmonicFeatures();
        this.features.spectral.spread = this.calculateSpectralSpread(this.buffers.magnitude);
        
        // Spectral slope
        this.features.spectral.slope = this.calculateSpectralSlope(this.buffers.magnitude);
        
        // Spectral kurtosis (peakedness)
        this.features.spectral.kurtosis = this.calculateSpectralKurtosis(this.buffers.magnitude);
        
        // Spectral skewness (asymmetry)
        this.features.spectral.skewness = this.calculateSpectralSkewness(this.buffers.magnitude);
        
        // 🧠 PHASE 1: USE REAL EMOTION ENGINE FOR FILE ANALYSIS
        // Send frequency data to EmotionEngine for advanced analysis
        if (window.emotionEngine && window.emotionEngine.analyze && this.buffers.frequency) {
            try {
                const emotionalState = window.emotionEngine.analyze(this.buffers.frequency);
                if (emotionalState && window.synestheticCore?.updateEmotionalConsciousness) {
                    window.synestheticCore.updateEmotionalConsciousness(emotionalState);
                    console.log('[Soul Awakening] File analysis using EmotionEngine:', emotionalState.primary);
                }
            } catch (error) {
                console.warn('[Soul Awakening] EmotionEngine file analysis failed:', error);
            }
        }
    }

    /**
     * Calculate spectral centroid
     */
    calculateSpectralCentroid(magnitude) {
        let weightedSum = 0;
        let magnitudeSum = 0;
        
        for (let i = 0; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20); // Convert from dB
            weightedSum += i * mag;
            magnitudeSum += mag;
        }
        
        return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0;
    }

    /**
     * Calculate spectral rolloff
     */
    calculateSpectralRolloff(magnitude, threshold = 0.85) {
        let totalEnergy = 0;
        let cumulativeEnergy = 0;
        
        // Calculate total energy
        for (let i = 0; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20);
            totalEnergy += mag;
        }
        
        const energyThreshold = totalEnergy * threshold;
        
        // Find rolloff frequency
        for (let i = 0; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20);
            cumulativeEnergy += mag;
            
            if (cumulativeEnergy >= energyThreshold) {
                return i / magnitude.length;
            }
        }
        
        return 1.0;
    }

    /**
     * Calculate spectral flatness
     */
    calculateSpectralFlatness(magnitude) {
        let geometricMean = 0;
        let arithmeticMean = 0;
        let validBins = 0;
        
        for (let i = 1; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20);
            if (mag > 0) {
                geometricMean += Math.log(mag);
                arithmeticMean += mag;
                validBins++;
            }
        }
        
        if (validBins === 0) return 0;
        
        geometricMean = Math.exp(geometricMean / validBins);
        arithmeticMean /= validBins;
        
        return arithmeticMean > 0 ? geometricMean / arithmeticMean : 0;
    }

    /**
     * Calculate spectral spread
     */
    calculateSpectralSpread(magnitude) {
        const centroid = this.features.spectral.centroid;
        let weightedVariance = 0;
        let magnitudeSum = 0;
        
        for (let i = 0; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20);
            weightedVariance += Math.pow(i - centroid, 2) * mag;
            magnitudeSum += mag;
        }
        
        return magnitudeSum > 0 ? Math.sqrt(weightedVariance / magnitudeSum) : 0;
    }

    /**
     * Calculate spectral slope
     */
    calculateSpectralSlope(magnitude) {
        const n = magnitude.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        
        for (let i = 0; i < n; i++) {
            const x = i;
            const y = Math.pow(10, magnitude[i] / 20);
            
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += x * x;
        }
        
        const denominator = n * sumXX - sumX * sumX;
        return denominator !== 0 ? (n * sumXY - sumX * sumY) / denominator : 0;
    }

    /**
     * Calculate spectral kurtosis
     */
    calculateSpectralKurtosis(magnitude) {
        const centroid = this.features.spectral.centroid;
        const spread = this.features.spectral.spread;
        
        if (spread === 0) return 0;
        
        let weightedSum = 0;
        let magnitudeSum = 0;
        
        for (let i = 0; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20);
            weightedSum += Math.pow((i - centroid) / spread, 4) * mag;
            magnitudeSum += mag;
        }
        
        return magnitudeSum > 0 ? (weightedSum / magnitudeSum) - 3 : 0; // Subtract 3 for excess kurtosis
    }

    /**
     * Calculate spectral skewness
     */
    calculateSpectralSkewness(magnitude) {
        const centroid = this.features.spectral.centroid;
        const spread = this.features.spectral.spread;
        
        if (spread === 0) return 0;
        
        let weightedSum = 0;
        let magnitudeSum = 0;
        
        for (let i = 0; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20);
            weightedSum += Math.pow((i - centroid) / spread, 3) * mag;
            magnitudeSum += mag;
        }
        
        return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0;
    }

    /**
     * Extract temporal features
     */
    extractTemporalFeatures() {
        const timeData = this.buffers.time;
        
        // RMS energy
        this.features.temporal.rms = this.calculateRMS(timeData);
        
        // Zero crossing rate
        this.features.temporal.zcr = this.calculateZeroCrossingRate(timeData);
        
        // Total energy
        this.features.temporal.energy = this.calculateEnergy(timeData);
        
        // Spectral entropy
        this.features.temporal.entropy = this.calculateSpectralEntropy(this.buffers.magnitude);
    }

    /**
     * Calculate RMS energy
     */
    calculateRMS(timeData) {
        let sum = 0;
        for (let i = 0; i < timeData.length; i++) {
            const sample = (timeData[i] - 128) / 128; // Normalize to [-1, 1]
            sum += sample * sample;
        }
        return Math.sqrt(sum / timeData.length);
    }

    /**
     * Calculate zero crossing rate
     */
    calculateZeroCrossingRate(timeData) {
        let crossings = 0;
        const centerLine = 128;
        
        for (let i = 1; i < timeData.length; i++) {
            if ((timeData[i] >= centerLine && timeData[i-1] < centerLine) ||
                (timeData[i] < centerLine && timeData[i-1] >= centerLine)) {
                crossings++;
            }
        }
        
        return crossings / (timeData.length - 1);
    }

    /**
     * Calculate energy
     */
    calculateEnergy(timeData) {
        let energy = 0;
        for (let i = 0; i < timeData.length; i++) {
            const sample = (timeData[i] - 128) / 128;
            energy += sample * sample;
        }
        return energy / timeData.length;
    }

    /**
     * Calculate spectral entropy
     */
    calculateSpectralEntropy(magnitude) {
        let totalEnergy = 0;
        const probabilities = [];
        
        // Convert to linear scale and calculate total energy
        for (let i = 0; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20);
            probabilities[i] = mag;
            totalEnergy += mag;
        }
        
        // Normalize to probabilities and calculate entropy
        let entropy = 0;
        for (let i = 0; i < probabilities.length; i++) {
            if (totalEnergy > 0) {
                const p = probabilities[i] / totalEnergy;
                if (p > 0) {
                    entropy -= p * Math.log2(p);
                }
            }
        }
        
        return entropy;
    }

    /**
     * Extract harmonic features
     */
    extractHarmonicFeatures() {
        const magnitude = this.buffers.magnitude;
        
        // Find fundamental frequency
        this.features.harmonic.f0 = this.estimateFundamentalFrequency(magnitude);
        
        // Calculate harmonicity
        this.features.harmonic.harmonicity = this.calculateHarmonicity(magnitude);
        
        // Calculate inharmonicity
        this.features.harmonic.inharmonicity = 1 - this.features.harmonic.harmonicity;
        
        // Extract harmonic peaks
        this.features.harmonic.harmonics = this.extractHarmonics(magnitude);
    }

    /**
     * Estimate fundamental frequency
     */
    estimateFundamentalFrequency(magnitude) {
        // Simple peak-picking algorithm
        const peaks = this.findSpectralPeaks(magnitude, 0.1);
        
        if (peaks.length === 0) return 0;
        
        // Return frequency of strongest peak
        const strongestPeak = peaks.reduce((max, peak) => 
            peak.magnitude > max.magnitude ? peak : max
        );
        
        const nyquist = this.audioContext.sampleRate / 2;
        return (strongestPeak.bin / magnitude.length) * nyquist;
    }

    /**
     * Find spectral peaks
     */
    findSpectralPeaks(magnitude, threshold = 0.1) {
        const peaks = [];
        const minMagnitude = Math.max(...magnitude.map(m => Math.pow(10, m / 20))) * threshold;
        
        for (let i = 1; i < magnitude.length - 1; i++) {
            const current = Math.pow(10, magnitude[i] / 20);
            const prev = Math.pow(10, magnitude[i-1] / 20);
            const next = Math.pow(10, magnitude[i+1] / 20);
            
            if (current > prev && current > next && current > minMagnitude) {
                peaks.push({
                    bin: i,
                    magnitude: current,
                    frequency: (i / magnitude.length) * (this.audioContext.sampleRate / 2)
                });
            }
        }
        
        return peaks.sort((a, b) => b.magnitude - a.magnitude);
    }

    /**
     * Calculate harmonicity
     */
    calculateHarmonicity(magnitude) {
        const f0 = this.features.harmonic.f0;
        if (f0 === 0) return 0;
        
        const peaks = this.findSpectralPeaks(magnitude);
        if (peaks.length < 2) return 0;
        
        let harmonicEnergy = 0;
        let totalEnergy = 0;
        
        peaks.forEach(peak => {
            totalEnergy += peak.magnitude;
            
            // Check if peak is harmonic (within tolerance)
            const harmonicNumber = Math.round(peak.frequency / f0);
            const expectedFreq = harmonicNumber * f0;
            const tolerance = f0 * 0.1; // 10% tolerance
            
            if (Math.abs(peak.frequency - expectedFreq) < tolerance) {
                harmonicEnergy += peak.magnitude;
            }
        });
        
        return totalEnergy > 0 ? harmonicEnergy / totalEnergy : 0;
    }

    /**
     * Extract harmonic peaks
     */
    extractHarmonics(magnitude) {
        const f0 = this.features.harmonic.f0;
        const harmonics = [];
        
        if (f0 === 0) return harmonics;
        
        const nyquist = this.audioContext.sampleRate / 2;
        const binSize = nyquist / magnitude.length;
        
        // Look for first 10 harmonics
        for (let h = 1; h <= 10; h++) {
            const expectedFreq = h * f0;
            if (expectedFreq > nyquist) break;
            
            const expectedBin = Math.round(expectedFreq / binSize);
            const tolerance = Math.round(f0 * 0.1 / binSize);
            
            // Find peak within tolerance range
            let maxMagnitude = -Infinity;
            let peakBin = expectedBin;
            
            for (let i = Math.max(0, expectedBin - tolerance); 
                 i <= Math.min(magnitude.length - 1, expectedBin + tolerance); i++) {
                const mag = Math.pow(10, magnitude[i] / 20);
                if (mag > maxMagnitude) {
                    maxMagnitude = mag;
                    peakBin = i;
                }
            }
            
            harmonics.push({
                harmonic: h,
                frequency: peakBin * binSize,
                magnitude: maxMagnitude,
                bin: peakBin
            });
        }
        
        return harmonics;
    }

    /**
     * Extract rhythm features
     */
    extractRhythmFeatures() {
        // Onset detection
        this.features.rhythm.onset = this.detectOnset();
        
        // Tempo estimation (simplified)
        this.features.rhythm.tempo = this.estimateTempo();
        
        // Beat tracking
        this.features.rhythm.beat = this.trackBeat();
        
        // Rhythm complexity
        this.features.rhythm.complexity = this.calculateRhythmComplexity();
    }

    /**
     * Detect onset
     */
    detectOnset() {
        if (this.buffers.previous.length === 0) {
            this.buffers.previous.set(this.buffers.magnitude);
            return false;
        }
        
        // Calculate spectral flux
        let flux = 0;
        for (let i = 0; i < this.buffers.magnitude.length; i++) {
            const current = Math.pow(10, this.buffers.magnitude[i] / 20);
            const previous = Math.pow(10, this.buffers.previous[i] / 20);
            flux += Math.max(0, current - previous);
        }
        
        this.buffers.previous.set(this.buffers.magnitude);
        
        // Simple onset detection threshold
        return flux > 0.1;
    }

    /**
     * Estimate tempo (simplified)
     */
    estimateTempo() {
        // Use energy variations to estimate tempo
        const rms = this.features.temporal.rms;
        
        if (this.analysisHistory.length < 10) return 0;
        
        // Calculate energy variations over time
        const energyHistory = this.analysisHistory.map(a => a.temporal.rms);
        const variations = this.calculateAutocorrelation(energyHistory);
        
        // Find peak in autocorrelation (simplified tempo detection)
        let maxCorr = 0;
        let tempoIndex = 0;
        
        for (let i = 1; i < Math.min(variations.length, 60); i++) {
            if (variations[i] > maxCorr) {
                maxCorr = variations[i];
                tempoIndex = i;
            }
        }
        
        // Convert to BPM (rough estimation)
        const frameRate = 60; // Assuming 60 FPS analysis
        return tempoIndex > 0 ? (60 * frameRate) / tempoIndex : 0;
    }

    /**
     * Calculate autocorrelation
     */
    calculateAutocorrelation(signal) {
        const n = signal.length;
        const result = new Array(n);
        
        for (let lag = 0; lag < n; lag++) {
            let sum = 0;
            let count = 0;
            
            for (let i = 0; i < n - lag; i++) {
                sum += signal[i] * signal[i + lag];
                count++;
            }
            
            result[lag] = count > 0 ? sum / count : 0;
        }
        
        return result;
    }

    /**
     * Track beat
     */
    trackBeat() {
        // Simplified beat tracking based on onset detection
        return this.features.rhythm.onset ? 1 : 0;
    }

    /**
     * Calculate rhythm complexity
     */
    calculateRhythmComplexity() {
        if (this.analysisHistory.length < 20) return 0;
        
        // Measure variability in energy and onset patterns
        const energyHistory = this.analysisHistory.slice(-20).map(a => a.temporal.rms);
        const energyVariance = this.calculateVariance(energyHistory);
        
        return Math.min(1, energyVariance * 10); // Normalized complexity
    }

    /**
     * Calculate variance
     */
    calculateVariance(data) {
        const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
        const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
        return variance;
    }

    /**
     * Extract perceptual features
     */
    extractPerceptualFeatures() {
        // Loudness (using RMS as approximation)
        this.features.perceptual.loudness = this.features.temporal.rms;
        
        // Sharpness (high frequency content)
        this.features.perceptual.sharpness = this.calculateSharpness();
        
        // Roughness (amplitude modulation)
        this.features.perceptual.roughness = this.calculateRoughness();
        
        // Fluctuation strength (low frequency modulation)
        this.features.perceptual.fluctuation = this.calculateFluctuation();
    }

    /**
     * Calculate sharpness
     */
    calculateSharpness() {
        const magnitude = this.buffers.magnitude;
        let weightedSum = 0;
        let totalEnergy = 0;
        
        for (let i = 0; i < magnitude.length; i++) {
            const mag = Math.pow(10, magnitude[i] / 20);
            const weight = Math.pow(i / magnitude.length, 2); // Weight higher frequencies more
            weightedSum += mag * weight;
            totalEnergy += mag;
        }
        
        return totalEnergy > 0 ? weightedSum / totalEnergy : 0;
    }

    /**
     * Calculate roughness (simplified)
     */
    calculateRoughness() {
        // Simplified roughness calculation based on spectral irregularity
        const magnitude = this.buffers.magnitude;
        let roughness = 0;
        
        for (let i = 1; i < magnitude.length - 1; i++) {
            const current = Math.pow(10, magnitude[i] / 20);
            const prev = Math.pow(10, magnitude[i-1] / 20);
            const next = Math.pow(10, magnitude[i+1] / 20);
            
            roughness += Math.abs(current - (prev + next) / 2);
        }
        
        return roughness / (magnitude.length - 2);
    }

    /**
     * Calculate fluctuation strength (simplified)
     */
    calculateFluctuation() {
        if (this.analysisHistory.length < 5) return 0;
        
        // Measure fluctuations in loudness over time
        const recentLoudness = this.analysisHistory.slice(-5).map(a => a.perceptual.loudness);
        return this.calculateVariance(recentLoudness);
    }

    /**
     * Process Meyda features if available
     */
    processMeydaFeatures(features) {
        if (!features) return;
        
        // Update features with Meyda data
        if (features.spectralCentroid !== undefined) {
            this.features.spectral.centroid = features.spectralCentroid;
        }
        if (features.spectralRolloff !== undefined) {
            this.features.spectral.rolloff = features.spectralRolloff;
        }
        if (features.spectralFlatness !== undefined) {
            this.features.spectral.flatness = features.spectralFlatness;
        }
        if (features.rms !== undefined) {
            this.features.temporal.rms = features.rms;
        }
        if (features.zcr !== undefined) {
            this.features.temporal.zcr = features.zcr;
        }
        if (features.energy !== undefined) {
            this.features.temporal.energy = features.energy;
        }
        
        // Store additional Meyda features
        this.features.meyda = features;
    }

    /**
     * Store analysis in history
     */
    storeAnalysisHistory() {
        const analysisSnapshot = {
            timestamp: Date.now(),
            spectral: { ...this.features.spectral },
            temporal: { ...this.features.temporal },
            harmonic: { ...this.features.harmonic },
            rhythm: { ...this.features.rhythm },
            perceptual: { ...this.features.perceptual }
        };
        
        this.analysisHistory.push(analysisSnapshot);
        
        // Keep history within limits
        if (this.analysisHistory.length > this.maxHistoryLength) {
            this.analysisHistory = this.analysisHistory.slice(-this.maxHistoryLength);
        }
    }

    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(startTime) {
        const endTime = performance.now();
        this.performance.analysisTime = endTime - startTime;
        
        const now = endTime;
        if (this.performance.lastFrameTime > 0) {
            const frameTime = now - this.performance.lastFrameTime;
            this.performance.frameRate = 1000 / frameTime;
        }
        this.performance.lastFrameTime = now;
    }

    // ================================
    // PUBLIC API METHODS
    // ================================

    /**
     * Get current audio features
     */
    getCurrentFeatures() {
        return JSON.parse(JSON.stringify(this.features));
    }

    /**
     * Get analysis history
     */
    getAnalysisHistory(count = 10) {
        return this.analysisHistory.slice(-count);
    }

    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return { ...this.performance };
    }

    /**
     * Configure analysis parameters
     */
    configure(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        if (this.analyser) {
            this.analyser.fftSize = this.config.fftSize;
            this.analyser.smoothingTimeConstant = this.config.smoothingTimeConstant;
            this.analyser.minDecibels = this.config.minDecibels;
            this.analyser.maxDecibels = this.config.maxDecibels;
        }
        
        // Reinitialize buffers if FFT size changed
        if (newConfig.fftSize) {
            this.initializeBuffers();
        }
    }

    /**
     * Get frequency response data
     */
    getFrequencyResponse() {
        return {
            frequency: new Uint8Array(this.buffers.frequency),
            magnitude: new Float32Array(this.buffers.magnitude)
        };
    }

    /**
     * Get time domain data
     */
    getTimeDomainData() {
        return new Uint8Array(this.buffers.time);
    }

    /**
     * Export analysis data
     */
    exportAnalysisData() {
        return {
            config: this.config,
            features: this.features,
            history: this.analysisHistory,
            performance: this.performance,
            timestamp: Date.now()
        };
    }

    /**
     * Reset analysis state
     */
    reset() {
        this.analysisHistory = [];
        this.features = {
            spectral: { centroid: 0, rolloff: 0, flatness: 0, spread: 0, slope: 0, kurtosis: 0, skewness: 0 },
            temporal: { rms: 0, zcr: 0, energy: 0, entropy: 0 },
            harmonic: { harmonicity: 0, inharmonicity: 0, f0: 0, harmonics: [] },
            rhythm: { tempo: 0, beat: 0, onset: false, complexity: 0 },
            perceptual: { loudness: 0, sharpness: 0, roughness: 0, fluctuation: 0 }
        };
    }
}

// Make available globally
window.AudioAnalyzer = AudioAnalyzer;

// Create a global audio analyzer instance
window.audioAnalyzer = new AudioAnalyzer();

// Export standalone startFileAnalysis function for easy import
export async function startFileAnalysis(audioUrl, fileName) {
    if (!window.audioAnalyzer) {
        window.audioAnalyzer = new AudioAnalyzer();
    }
    return await window.audioAnalyzer.startFileAnalysis(audioUrl, fileName);
}

export default AudioAnalyzer;