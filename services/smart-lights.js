/**
 * 💡 SMART LIGHTS - SMART HOME LIGHTING INTEGRATION
 * Controls various smart lighting systems to create immersive emotional environments
 * Supports Philips Hue, generic WiFi bulbs, and DIY Arduino solutions
 */

class SmartLights {
    constructor(coreApp) {
        this.coreApp = coreApp;
        this.isInitialized = false;
        this.isEnabled = false;
        
        // Supported light systems
        this.lightSystems = new Map();
        this.connectedDevices = new Map();
        this.deviceGroups = new Map();
        
        // Current lighting state
        this.currentColors = [];
        this.currentBrightness = 0.8;
        this.transitionDuration = 1000; // ms
        
        // Light system configurations
        this.configs = {
            philipsHue: {
                enabled: false,
                bridgeIP: null,
                username: null,
                lights: new Map()
            },
            wifiLights: {
                enabled: false,
                devices: new Map()
            },
            arduino: {
                enabled: false,
                devices: new Map()
            },
            simulation: {
                enabled: true,
                devices: new Map()
            }
        };
        
        // Discovery and connection
        this.discoveryInterval = null;
        this.connectionTimeout = 5000;
        
        // Performance and optimization
        this.updateThrottle = 500; // ms
        this.lastUpdateTime = 0;
        this.pendingUpdates = false;
        
        // Effect presets
        this.effectPresets = new Map();
        this.initializeEffectPresets();
        
        console.log('💡 Smart Lights initializing...');
        this.initialize();
    }

    /**
     * Initialize smart lights system
     */
    async initialize() {
        try {
            // Load saved configurations
            this.loadConfigurations();
            
            // Initialize light systems
            await this.initializeLightSystems();
            
            // Start device discovery
            this.startDeviceDiscovery();
            
            // Set up update throttling
            this.setupUpdateThrottling();
            
            this.isInitialized = true;
            console.log('✨ Smart Lights system fully operational');
            
        } catch (error) {
            console.error('❌ Smart Lights initialization failed:', error);
            this.isInitialized = false;
        }
    }

    /**
     * Load configurations from storage
     */
    loadConfigurations() {
        try {
            const stored = localStorage.getItem('smartLightsConfig');
            if (stored) {
                const config = JSON.parse(stored);
                this.configs = { ...this.configs, ...config };
                console.log('🔧 Smart lights configuration loaded');
            }
        } catch (error) {
            console.error('Error loading smart lights config:', error);
        }
    }

    /**
     * Save configurations to storage
     */
    saveConfigurations() {
        try {
            localStorage.setItem('smartLightsConfig', JSON.stringify(this.configs));
            console.log('💾 Smart lights configuration saved');
        } catch (error) {
            console.error('Error saving smart lights config:', error);
        }
    }

    /**
     * Initialize effect presets
     */
    initializeEffectPresets() {
        this.effectPresets.set('joy', {
            colors: ['#FFD700', '#FFA500', '#FF6347'],
            pattern: 'breathing',
            speed: 'medium',
            brightness: 0.9
        });
        
        this.effectPresets.set('sadness', {
            colors: ['#4169E1', '#6495ED', '#87CEEB'],
            pattern: 'fade',
            speed: 'slow',
            brightness: 0.5
        });
        
        this.effectPresets.set('anger', {
            colors: ['#DC143C', '#B22222', '#FF0000'],
            pattern: 'pulse',
            speed: 'fast',
            brightness: 0.8
        });
        
        this.effectPresets.set('serenity', {
            colors: ['#98FB98', '#90EE90', '#87CEEB'],
            pattern: 'static',
            speed: 'slow',
            brightness: 0.6
        });
        
        this.effectPresets.set('passion', {
            colors: ['#FF1493', '#DC143C', '#FF6347'],
            pattern: 'wave',
            speed: 'medium',
            brightness: 0.85
        });
    }

    /**
     * Initialize light systems
     */
    async initializeLightSystems() {
        // Initialize Philips Hue
        await this.initializePhilipsHue();
        
        // Initialize WiFi lights
        await this.initializeWiFiLights();
        
        // Initialize Arduino lights
        await this.initializeArduinoLights();
        
        // Initialize simulation (always available)
        this.initializeSimulation();
    }

    /**
     * Initialize Philips Hue system
     */
    async initializePhilipsHue() {
        try {
            const hueConfig = this.configs.philipsHue;
            
            if (!hueConfig.enabled || !hueConfig.bridgeIP) {
                console.log('💡 Philips Hue not configured - attempting discovery');
                await this.discoverPhilipsHueBridge();
                return;
            }
            
            // Test connection to bridge
            const bridgeURL = `http://${hueConfig.bridgeIP}/api/${hueConfig.username}/lights`;
            const response = await this.makeHTTPRequest(bridgeURL, 'GET');
            
            if (response && !response.error) {
                // Parse lights
                Object.entries(response).forEach(([id, light]) => {
                    this.configs.philipsHue.lights.set(id, {
                        id: id,
                        name: light.name,
                        type: light.type,
                        state: light.state,
                        reachable: light.state.reachable
                    });
                });
                
                this.lightSystems.set('philipsHue', {
                    name: 'Philips Hue',
                    connected: true,
                    deviceCount: this.configs.philipsHue.lights.size
                });
                
                console.log(`💡 Philips Hue connected: ${this.configs.philipsHue.lights.size} lights found`);
            }
            
        } catch (error) {
            console.error('Error initializing Philips Hue:', error);
        }
    }

    /**
     * Discover Philips Hue bridge
     */
    async discoverPhilipsHueBridge() {
        try {
            // Try UPnP discovery (simplified)
            const discoveryURL = 'https://discovery.meethue.com/';
            const response = await this.makeHTTPRequest(discoveryURL, 'GET');
            
            if (response && response.length > 0) {
                const bridge = response[0];
                this.configs.philipsHue.bridgeIP = bridge.internalipaddress;
                
                console.log(`🔍 Philips Hue bridge discovered at ${bridge.internalipaddress}`);
                
                // Try to authenticate (user needs to press bridge button)
                await this.authenticatePhilipsHue();
            }
            
        } catch (error) {
            console.log('🔍 Philips Hue bridge not found - manual setup required');
        }
    }

    /**
     * Authenticate with Philips Hue bridge
     */
    async authenticatePhilipsHue() {
        if (!this.configs.philipsHue.bridgeIP) return;
        
        try {
            const authURL = `http://${this.configs.philipsHue.bridgeIP}/api`;
            const authData = {
                devicetype: 'synesthetic_app#browser'
            };
            
            const response = await this.makeHTTPRequest(authURL, 'POST', authData);
            
            if (response && response[0] && response[0].success) {
                this.configs.philipsHue.username = response[0].success.username;
                this.configs.philipsHue.enabled = true;
                this.saveConfigurations();
                
                console.log('✅ Philips Hue authentication successful');
                
                // Initialize lights
                await this.initializePhilipsHue();
            } else if (response && response[0] && response[0].error) {
                console.log('⏳ Please press the button on your Philips Hue bridge and try again');
                this.notifyUser('Please press the button on your Philips Hue bridge to connect');
            }
            
        } catch (error) {
            console.error('Error authenticating with Philips Hue:', error);
        }
    }

    /**
     * Initialize WiFi lights
     */
    async initializeWiFiLights() {
        try {
            // WiFi lights would typically be discovered via network scanning
            // For demo purposes, we'll simulate some generic WiFi bulbs
            
            const simulatedWiFiLights = [
                { ip: '192.168.1.100', name: 'Living Room WiFi Bulb', type: 'RGB' },
                { ip: '192.168.1.101', name: 'Bedroom WiFi Bulb', type: 'RGB' },
                { ip: '192.168.1.102', name: 'Kitchen WiFi Strip', type: 'RGBW' }
            ];
            
            for (const light of simulatedWiFiLights) {
                // Test connection (in real implementation)
                const isReachable = await this.testWiFiLightConnection(light.ip);
                
                if (isReachable) {
                    this.configs.wifiLights.devices.set(light.ip, {
                        ...light,
                        connected: true,
                        lastSeen: Date.now()
                    });
                }
            }
            
            if (this.configs.wifiLights.devices.size > 0) {
                this.lightSystems.set('wifiLights', {
                    name: 'WiFi Lights',
                    connected: true,
                    deviceCount: this.configs.wifiLights.devices.size
                });
                
                console.log(`💡 WiFi Lights found: ${this.configs.wifiLights.devices.size} devices`);
            }
            
        } catch (error) {
            console.error('Error initializing WiFi lights:', error);
        }
    }

    /**
     * Test WiFi light connection
     */
    async testWiFiLightConnection(ip) {
        try {
            // In a real implementation, this would ping the device or make a test API call
            // For demo, we'll simulate connectivity based on IP range
            return ip.startsWith('192.168.1.');
        } catch (error) {
            return false;
        }
    }

    /**
     * Initialize Arduino lights
     */
    async initializeArduinoLights() {
        try {
            // Arduino lights would typically connect via WebSerial or WebUSB
            // For demo purposes, we'll check if WebSerial is available
            
            if ('serial' in navigator) {
                this.lightSystems.set('arduino', {
                    name: 'Arduino/DIY Lights',
                    connected: false,
                    deviceCount: 0,
                    setupRequired: true
                });
                
                console.log('🔌 Arduino support available - setup required');
            }
            
        } catch (error) {
            console.error('Error initializing Arduino lights:', error);
        }
    }

    /**
     * Initialize simulation system
     */
    initializeSimulation() {
        // Create virtual lights for demonstration
        const virtualLights = [
            { id: 'sim_1', name: 'Virtual Living Room', type: 'RGB' },
            { id: 'sim_2', name: 'Virtual Bedroom', type: 'RGB' },
            { id: 'sim_3', name: 'Virtual Ambient', type: 'RGBW' }
        ];
        
        virtualLights.forEach(light => {
            this.configs.simulation.devices.set(light.id, {
                ...light,
                connected: true,
                state: {
                    on: true,
                    brightness: 128,
                    hue: 0,
                    saturation: 0
                }
            });
        });
        
        this.lightSystems.set('simulation', {
            name: 'Simulation Mode',
            connected: true,
            deviceCount: virtualLights.length
        });
        
        console.log('🎭 Light simulation mode initialized');
    }

    /**
     * Start device discovery
     */
    startDeviceDiscovery() {
        this.discoveryInterval = setInterval(async () => {
            await this.discoverDevices();
        }, 30000); // Discovery every 30 seconds
    }

    /**
     * Discover devices
     */
    async discoverDevices() {
        if (!this.isEnabled) return;
        
        // Discover Philips Hue if not connected
        if (!this.lightSystems.has('philipsHue')) {
            await this.discoverPhilipsHueBridge();
        }
        
        // Scan for WiFi lights
        await this.scanForWiFiLights();
        
        console.log('🔍 Device discovery completed');
    }

    /**
     * Scan for WiFi lights
     */
    async scanForWiFiLights() {
        // In a real implementation, this would scan the local network
        // For demo, we'll simulate finding devices
        console.log('🔍 Scanning for WiFi lights...');
    }

    /**
     * Set up update throttling
     */
    setupUpdateThrottling() {
        this.throttledUpdate = this.throttle(() => {
            if (this.pendingUpdates) {
                this.applyPendingUpdates();
                this.pendingUpdates = false;
            }
        }, this.updateThrottle);
    }

    /**
     * Throttle function
     */
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ================================
    // PUBLIC API METHODS
    // ================================

    /**
     * Enable smart lights system
     */
    enable() {
        this.isEnabled = true;
        console.log('💡 Smart lights system enabled');
    }

    /**
     * Disable smart lights system
     */
    disable() {
        this.isEnabled = false;
        this.turnOffAllLights();
        console.log('💡 Smart lights system disabled');
    }

    /**
     * Update colors based on emotional state
     */
    updateColors(colors, intensity = 0.8) {
        if (!this.isEnabled || !colors || colors.length === 0) return;
        
        this.currentColors = colors;
        this.currentBrightness = intensity;
        
        // Throttle updates to prevent overwhelming the lights
        this.pendingUpdates = true;
        this.throttledUpdate();
    }

    /**
     * Apply pending updates to all light systems
     */
    applyPendingUpdates() {
        const lightData = {
            colors: this.currentColors,
            brightness: this.currentBrightness,
            transition: this.transitionDuration
        };
        
        // Update each light system
        this.lightSystems.forEach((system, key) => {
            if (system.connected) {
                this.updateLightSystem(key, lightData);
            }
        });
        
        this.lastUpdateTime = Date.now();
    }

    /**
     * Update specific light system
     */
    async updateLightSystem(systemKey, lightData) {
        switch (systemKey) {
            case 'philipsHue':
                await this.updatePhilipsHueLights(lightData);
                break;
            case 'wifiLights':
                await this.updateWiFiLights(lightData);
                break;
            case 'arduino':
                await this.updateArduinoLights(lightData);
                break;
            case 'simulation':
                this.updateSimulationLights(lightData);
                break;
        }
    }

    /**
     * Update Philips Hue lights
     */
    async updatePhilipsHueLights(lightData) {
        if (!this.configs.philipsHue.enabled) return;
        
        const { colors, brightness, transition } = lightData;
        const primaryColor = colors[0];
        
        if (!primaryColor) return;
        
        // Convert color to Hue format
        const { hue, saturation } = this.convertColorToHueSat(primaryColor);
        const hueBrightness = Math.round(brightness * 254);
        
        // Update each light
        for (const [lightId, light] of this.configs.philipsHue.lights) {
            if (!light.reachable) continue;
            
            const lightState = {
                on: true,
                hue: hue,
                sat: saturation,
                bri: hueBrightness,
                transitiontime: Math.round(transition / 100) // Hue uses deciseconds
            };
            
            try {
                const url = `http://${this.configs.philipsHue.bridgeIP}/api/${this.configs.philipsHue.username}/lights/${lightId}/state`;
                await this.makeHTTPRequest(url, 'PUT', lightState);
            } catch (error) {
                console.error(`Error updating Hue light ${lightId}:`, error);
            }
        }
    }

    /**
     * Update WiFi lights
     */
    async updateWiFiLights(lightData) {
        const { colors, brightness } = lightData;
        const primaryColor = colors[0];
        
        if (!primaryColor) return;
        
        // Convert hex color to RGB
        const rgb = this.hexToRgb(primaryColor);
        if (!rgb) return;
        
        // Apply brightness
        const adjustedRgb = {
            r: Math.round(rgb.r * brightness),
            g: Math.round(rgb.g * brightness),
            b: Math.round(rgb.b * brightness)
        };
        
        // Update each WiFi light
        for (const [ip, device] of this.configs.wifiLights.devices) {
            if (!device.connected) continue;
            
            try {
                // Generic WiFi light API call (varies by manufacturer)
                await this.updateGenericWiFiLight(ip, adjustedRgb);
            } catch (error) {
                console.error(`Error updating WiFi light ${ip}:`, error);
            }
        }
    }

    /**
     * Update generic WiFi light
     */
    async updateGenericWiFiLight(ip, rgb) {
        // This would vary based on the WiFi light protocol
        // Common protocols: LIFX, TPLink Kasa, Yeelight, etc.
        
        // Example for a generic REST API
        const lightCommand = {
            power: 'on',
            color: {
                r: rgb.r,
                g: rgb.g,
                b: rgb.b
            }
        };
        
        // In a real implementation, this would make an actual HTTP request
        console.log(`📡 WiFi Light ${ip}:`, lightCommand);
    }

    /**
     * Update Arduino lights
     */
    async updateArduinoLights(lightData) {
        const { colors, brightness } = lightData;
        
        // Convert colors to Arduino-compatible format
        const colorData = colors.map(color => {
            const rgb = this.hexToRgb(color);
            return rgb ? {
                r: Math.round(rgb.r * brightness),
                g: Math.round(rgb.g * brightness),
                b: Math.round(rgb.b * brightness)
            } : null;
        }).filter(Boolean);
        
        // Send to Arduino via WebSerial
        if ('serial' in navigator && this.serialPort) {
            try {
                const command = JSON.stringify({
                    type: 'color_update',
                    colors: colorData,
                    brightness: brightness
                });
                
                await this.sendToArduino(command);
            } catch (error) {
                console.error('Error updating Arduino lights:', error);
            }
        }
    }

    /**
     * Update simulation lights
     */
    updateSimulationLights(lightData) {
        const { colors, brightness } = lightData;
        
        // Update virtual light states
        this.configs.simulation.devices.forEach((device, id) => {
            if (colors.length > 0) {
                const color = colors[0];
                const rgb = this.hexToRgb(color);
                
                if (rgb) {
                    device.state = {
                        on: true,
                        brightness: Math.round(brightness * 255),
                        color: {
                            r: rgb.r,
                            g: rgb.g,
                            b: rgb.b
                        }
                    };
                }
            }
        });
        
        // Update simulation UI if available
        this.updateSimulationUI(lightData);
    }

    /**
     * Update simulation UI
     */
    updateSimulationUI(lightData) {
        // Create or update simulation indicators in the interface
        let simContainer = document.getElementById('lightSimulation');
        
        if (!simContainer) {
            simContainer = document.createElement('div');
            simContainer.id = 'lightSimulation';
            simContainer.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                display: flex;
                gap: 10px;
                z-index: 1000;
            `;
            document.body.appendChild(simContainer);
        }
        
        // Clear existing indicators
        simContainer.innerHTML = '';
        
        // Create light indicators
        this.configs.simulation.devices.forEach((device, id) => {
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid #fff;
                background: ${lightData.colors[0] || '#000'};
                opacity: ${lightData.brightness};
                transition: all 0.5s ease;
                box-shadow: 0 0 10px ${lightData.colors[0] || '#000'};
            `;
            indicator.title = device.name;
            simContainer.appendChild(indicator);
        });
    }

    /**
     * Apply emotion preset
     */
    applyEmotionPreset(emotion) {
        const preset = this.effectPresets.get(emotion.toLowerCase());
        
        if (preset) {
            this.updateColors(preset.colors, preset.brightness);
            console.log(`🎭 Applied ${emotion} preset to lights`);
        }
    }

    /**
     * Turn off all lights
     */
    async turnOffAllLights() {
        // Turn off Philips Hue lights
        if (this.configs.philipsHue.enabled) {
            for (const [lightId] of this.configs.philipsHue.lights) {
                try {
                    const url = `http://${this.configs.philipsHue.bridgeIP}/api/${this.configs.philipsHue.username}/lights/${lightId}/state`;
                    await this.makeHTTPRequest(url, 'PUT', { on: false });
                } catch (error) {
                    console.error(`Error turning off Hue light ${lightId}:`, error);
                }
            }
        }
        
        // Turn off WiFi lights
        for (const [ip] of this.configs.wifiLights.devices) {
            try {
                await this.updateGenericWiFiLight(ip, { r: 0, g: 0, b: 0 });
            } catch (error) {
                console.error(`Error turning off WiFi light ${ip}:`, error);
            }
        }
        
        // Turn off simulation
        this.updateSimulationLights({ colors: ['#000000'], brightness: 0 });
        
        console.log('💡 All lights turned off');
    }

    // ================================
    // UTILITY METHODS
    // ================================

    /**
     * Make HTTP request
     */
    async makeHTTPRequest(url, method = 'GET', data = null) {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            if (data && (method === 'POST' || method === 'PUT')) {
                options.body = JSON.stringify(data);
            }
            
            const response = await fetch(url, options);
            return await response.json();
            
        } catch (error) {
            console.error('HTTP request failed:', error);
            return null;
        }
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
     * Convert color to Hue hue/saturation
     */
    convertColorToHueSat(hexColor) {
        const rgb = this.hexToRgb(hexColor);
        if (!rgb) return { hue: 0, saturation: 0 };
        
        // Convert RGB to HSV
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        let hue = 0;
        if (diff !== 0) {
            if (max === r) {
                hue = ((g - b) / diff) % 6;
            } else if (max === g) {
                hue = (b - r) / diff + 2;
            } else {
                hue = (r - g) / diff + 4;
            }
        }
        
        hue = Math.round(hue * 60);
        if (hue < 0) hue += 360;
        
        const saturation = max === 0 ? 0 : diff / max;
        
        // Convert to Hue format (0-65535 for hue, 0-254 for saturation)
        return {
            hue: Math.round((hue / 360) * 65535),
            saturation: Math.round(saturation * 254)
        };
    }

    /**
     * Send command to Arduino
     */
    async sendToArduino(command) {
        if (!this.serialPort) return;
        
        try {
            const writer = this.serialPort.writable.getWriter();
            await writer.write(new TextEncoder().encode(command + '\n'));
            writer.releaseLock();
        } catch (error) {
            console.error('Error sending to Arduino:', error);
        }
    }

    /**
     * Connect to Arduino via WebSerial
     */
    async connectArduino() {
        if (!('serial' in navigator)) {
            console.error('WebSerial not supported');
            return false;
        }
        
        try {
            this.serialPort = await navigator.serial.requestPort();
            await this.serialPort.open({ baudRate: 9600 });
            
            console.log('🔌 Arduino connected via WebSerial');
            return true;
            
        } catch (error) {
            console.error('Error connecting to Arduino:', error);
            return false;
        }
    }

    /**
     * Notify user
     */
    notifyUser(message) {
        if (this.coreApp && this.coreApp.updateGlobalStatus) {
            this.coreApp.updateGlobalStatus(`💡 ${message}`);
        }
    }

    /**
     * Get system status
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            isEnabled: this.isEnabled,
            connectedSystems: Array.from(this.lightSystems.entries()),
            deviceCount: Array.from(this.lightSystems.values()).reduce((sum, system) => sum + system.deviceCount, 0),
            lastUpdateTime: this.lastUpdateTime
        };
    }

    /**
     * Configure light system
     */
    async configure(system, config) {
        if (this.configs[system]) {
            this.configs[system] = { ...this.configs[system], ...config };
            this.saveConfigurations();
            
            // Reinitialize the system
            switch (system) {
                case 'philipsHue':
                    await this.initializePhilipsHue();
                    break;
                case 'wifiLights':
                    await this.initializeWiFiLights();
                    break;
                case 'arduino':
                    await this.initializeArduinoLights();
                    break;
            }
            
            console.log(`🔧 ${system} configuration updated`);
        }
    }

    /**
     * Clean up resources
     */
    destroy() {
        // Stop discovery
        if (this.discoveryInterval) {
            clearInterval(this.discoveryInterval);
        }
        
        // Turn off all lights
        this.turnOffAllLights();
        
        // Close serial connection
        if (this.serialPort) {
            this.serialPort.close();
        }
        
        // Remove simulation UI
        const simContainer = document.getElementById('lightSimulation');
        if (simContainer) {
            simContainer.remove();
        }
        
        this.isInitialized = false;
        console.log('💡 Smart Lights system destroyed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartLights;
}