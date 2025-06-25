/**
 * 🌐 SOCIAL CONSCIOUSNESS - EMOTIONAL SHARING ENGINE
 * Enables real-time emotional sharing and group synesthetic experiences
 * Creates deep emotional connections between users through music
 */

class SocialConsciousness {
    constructor(coreApp) {
        this.coreApp = coreApp;
        this.isInitialized = false;
        
        // Connection state
        this.isConnected = false;
        this.isHosting = false;
        this.currentRoomId = null;
        this.connectionStatus = 'disconnected';
        
        // Room management
        this.hostedRooms = new Map();
        this.joinedRooms = new Map();
        this.nearbyRooms = new Map();
        this.roomParticipants = new Map();
        
        // Real-time communication
        this.broadcastChannel = null;
        this.webrtcConnections = new Map();
        this.emotionalBroadcast = null;
        
        // Emotional sharing
        this.sharedEmotions = new Map();
        this.emotionalHistory = [];
        this.groupEmotionalState = null;
        
        // Peer-to-peer networking
        this.peerId = this.generatePeerId();
        this.peers = new Map();
        this.signallingChannel = null;
        
        // Social features
        this.emotionalRecommendations = [];
        this.friendsList = new Map();
        this.emotionalCompatibility = new Map();
        
        // Privacy and permissions
        this.privacySettings = {
            shareEmotions: true,
            allowDiscovery: true,
            shareHistory: false,
            anonymousMode: false
        };
        
        // Performance and optimization
        this.broadcastInterval = 1000; // 1 second
        this.maxParticipants = 10;
        this.maxHistoryLength = 100;
        
        console.log('🌐 Social Consciousness initializing...');
        this.initialize();
    }

    /**
     * Initialize social consciousness system
     */
    async initialize() {
        try {
            // Load privacy settings
            this.loadPrivacySettings();
            
            // Initialize peer-to-peer communication
            await this.initializePeerToPeer();
            
            // Set up broadcast channels
            this.setupBroadcastChannels();
            
            // Initialize discovery system
            this.initializeDiscoverySystem();
            
            // Set up emotional sharing
            this.setupEmotionalSharing();
            
            // Load social data
            await this.loadSocialData();
            
            this.isInitialized = true;
            console.log('✨ Social Consciousness fully operational');
            
        } catch (error) {
            console.error('❌ Social Consciousness initialization failed:', error);
            this.isInitialized = false;
        }
    }

    /**
     * Load privacy settings from storage
     */
    loadPrivacySettings() {
        try {
            const stored = localStorage.getItem('socialPrivacySettings');
            if (stored) {
                this.privacySettings = { ...this.privacySettings, ...JSON.parse(stored) };
                console.log('🔒 Privacy settings loaded');
            }
        } catch (error) {
            console.error('Error loading privacy settings:', error);
        }
    }

    /**
     * Initialize peer-to-peer communication
     */
    async initializePeerToPeer() {
        // Use BroadcastChannel for same-origin communication
        if (typeof BroadcastChannel !== 'undefined') {
            this.broadcastChannel = new BroadcastChannel('synesthetic-consciousness');
            this.broadcastChannel.addEventListener('message', (event) => {
                this.handleBroadcastMessage(event.data);
            });
            console.log('📡 BroadcastChannel initialized');
        }
        
        // Initialize WebRTC for cross-domain communication
        await this.initializeWebRTC();
        
        // Set up signalling for room discovery
        this.setupSignalling();
    }

    /**
     * Initialize WebRTC for real-time communication
     */
    async initializeWebRTC() {
        try {
            // Check WebRTC support
            if (!window.RTCPeerConnection) {
                console.warn('⚠️ WebRTC not supported - using fallback communication');
                return;
            }
            
            // Configure ICE servers (using free STUN servers)
            this.rtcConfig = {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' }
                ]
            };
            
            console.log('🌐 WebRTC support initialized');
            
        } catch (error) {
            console.error('WebRTC initialization failed:', error);
        }
    }

    /**
     * Set up signalling for peer discovery
     */
    setupSignalling() {
        // Use localStorage for simple same-device signalling
        this.signallingChannel = {
            send: (message) => {
                const signals = JSON.parse(localStorage.getItem('synesthetic-signals') || '[]');
                signals.push({
                    ...message,
                    peerId: this.peerId,
                    timestamp: Date.now()
                });
                
                // Keep only recent signals
                const recent = signals.filter(s => Date.now() - s.timestamp < 30000);
                localStorage.setItem('synesthetic-signals', JSON.stringify(recent));
            },
            
            listen: () => {
                setInterval(() => {
                    try {
                        const signals = JSON.parse(localStorage.getItem('synesthetic-signals') || '[]');
                        signals.forEach(signal => {
                            if (signal.peerId !== this.peerId && !signal.processed) {
                                this.handleSignallingMessage(signal);
                                signal.processed = true;
                            }
                        });
                        localStorage.setItem('synesthetic-signals', JSON.stringify(signals));
                    } catch (error) {
                        // Silent error handling for signalling
                    }
                }, 2000);
            }
        };
        
        this.signallingChannel.listen();
    }

    /**
     * Set up broadcast channels for real-time communication
     */
    setupBroadcastChannels() {
        // Create emotional broadcast system
        this.emotionalBroadcast = {
            interval: null,
            
            start: () => {
                if (this.emotionalBroadcast.interval) return;
                
                this.emotionalBroadcast.interval = setInterval(() => {
                    if (this.isHosting || this.currentRoomId) {
                        this.broadcastEmotionalState();
                    }
                }, this.broadcastInterval);
            },
            
            stop: () => {
                if (this.emotionalBroadcast.interval) {
                    clearInterval(this.emotionalBroadcast.interval);
                    this.emotionalBroadcast.interval = null;
                }
            }
        };
    }

    /**
     * Initialize room discovery system
     */
    initializeDiscoverySystem() {
        // Local discovery using localStorage
        this.discoverySystem = {
            advertise: (roomInfo) => {
                const rooms = JSON.parse(localStorage.getItem('synesthetic-rooms') || '{}');
                rooms[roomInfo.id] = {
                    ...roomInfo,
                    lastSeen: Date.now(),
                    peerId: this.peerId
                };
                localStorage.setItem('synesthetic-rooms', JSON.stringify(rooms));
            },
            
            discover: () => {
                try {
                    const rooms = JSON.parse(localStorage.getItem('synesthetic-rooms') || '{}');
                    const nearbyRooms = new Map();
                    
                    Object.entries(rooms).forEach(([id, room]) => {
                        // Only show rooms from last 30 seconds and not our own
                        if (Date.now() - room.lastSeen < 30000 && room.peerId !== this.peerId) {
                            nearbyRooms.set(id, room);
                        }
                    });
                    
                    this.nearbyRooms = nearbyRooms;
                    this.updateDiscoveryUI();
                    
                } catch (error) {
                    console.error('Discovery error:', error);
                }
            }
        };
        
        // Start discovery polling
        setInterval(() => {
            if (this.privacySettings.allowDiscovery) {
                this.discoverySystem.discover();
            }
        }, 3000);
    }

    /**
     * Set up emotional sharing system
     */
    setupEmotionalSharing() {
        // Listen for emotional state changes from core app
        if (this.coreApp) {
            // Create emotional state observer
            this.emotionalStateObserver = {
                lastState: null,
                
                check: () => {
                    const currentState = this.coreApp.currentEmotionalState;
                    if (currentState && JSON.stringify(currentState) !== JSON.stringify(this.emotionalStateObserver.lastState)) {
                        this.emotionalStateObserver.lastState = { ...currentState };
                        this.onEmotionalStateChange(currentState);
                    }
                }
            };
            
            // Poll for emotional state changes
            setInterval(() => {
                this.emotionalStateObserver.check();
            }, 500);
        }
    }

    /**
     * Load social data from storage
     */
    async loadSocialData() {
        try {
            // Load friends list
            const friends = localStorage.getItem('synesthetic-friends');
            if (friends) {
                const friendsData = JSON.parse(friends);
                Object.entries(friendsData).forEach(([id, data]) => {
                    this.friendsList.set(id, data);
                });
            }
            
            // Load emotional compatibility data
            const compatibility = localStorage.getItem('synesthetic-compatibility');
            if (compatibility) {
                const compData = JSON.parse(compatibility);
                Object.entries(compData).forEach(([id, score]) => {
                    this.emotionalCompatibility.set(id, score);
                });
            }
            
            console.log('📚 Social data loaded');
            
        } catch (error) {
            console.error('Error loading social data:', error);
        }
    }

    /**
     * Generate unique peer ID
     */
    generatePeerId() {
        return 'peer_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    // ================================
    // ROOM MANAGEMENT
    // ================================

    /**
     * Create a new synesthetic room
     */
    createRoom(roomName = null) {
        const roomId = this.generateRoomId();
        const roomInfo = {
            id: roomId,
            name: roomName || `Room ${roomId}`,
            host: this.peerId,
            created: Date.now(),
            participants: [this.peerId],
            emotionalState: null,
            isPublic: true,
            maxParticipants: this.maxParticipants
        };
        
        // Store room locally
        this.hostedRooms.set(roomId, roomInfo);
        this.currentRoomId = roomId;
        this.isHosting = true;
        this.connectionStatus = 'hosting';
        
        // Advertise room for discovery
        if (this.privacySettings.allowDiscovery) {
            this.discoverySystem.advertise(roomInfo);
        }
        
        // Start emotional broadcasting
        this.emotionalBroadcast.start();
        
        // Update UI
        this.updateConnectionUI();
        
        console.log(`🏠 Created synesthetic room: ${roomId}`);
        return roomId;
    }

    /**
     * Join an existing room
     */
    async joinRoom(roomId) {
        try {
            // Check if room exists in discovery
            if (!this.nearbyRooms.has(roomId)) {
                throw new Error('Room not found');
            }
            
            const roomInfo = this.nearbyRooms.get(roomId);
            
            // Check room capacity
            if (roomInfo.participants && roomInfo.participants.length >= roomInfo.maxParticipants) {
                throw new Error('Room is full');
            }
            
            // Join room
            this.currentRoomId = roomId;
            this.isHosting = false;
            this.connectionStatus = 'connected';
            
            // Add to joined rooms
            this.joinedRooms.set(roomId, roomInfo);
            
            // Send join request
            this.sendMessage(roomId, {
                type: 'join_request',
                peerId: this.peerId,
                timestamp: Date.now()
            });
            
            // Start listening for emotional broadcasts
            this.emotionalBroadcast.start();
            
            // Update UI
            this.updateConnectionUI();
            
            console.log(`🤝 Joined synesthetic room: ${roomId}`);
            return true;
            
        } catch (error) {
            console.error('Failed to join room:', error);
            this.updateConnectionStatus(`Failed to join room: ${error.message}`);
            return false;
        }
    }

    /**
     * Leave current room
     */
    leaveRoom() {
        if (!this.currentRoomId) return;
        
        const roomId = this.currentRoomId;
        
        // Send leave message
        this.sendMessage(roomId, {
            type: 'leave',
            peerId: this.peerId,
            timestamp: Date.now()
        });
        
        // Clean up
        if (this.isHosting) {
            this.hostedRooms.delete(roomId);
            this.destroyRoom(roomId);
        } else {
            this.joinedRooms.delete(roomId);
        }
        
        // Reset state
        this.currentRoomId = null;
        this.isHosting = false;
        this.connectionStatus = 'disconnected';
        
        // Stop broadcasting
        this.emotionalBroadcast.stop();
        
        // Update UI
        this.updateConnectionUI();
        
        console.log(`👋 Left synesthetic room: ${roomId}`);
    }

    /**
     * Destroy a hosted room
     */
    destroyRoom(roomId) {
        // Remove from discovery
        try {
            const rooms = JSON.parse(localStorage.getItem('synesthetic-rooms') || '{}');
            delete rooms[roomId];
            localStorage.setItem('synesthetic-rooms', JSON.stringify(rooms));
        } catch (error) {
            console.error('Error removing room from discovery:', error);
        }
        
        // Notify participants
        this.sendMessage(roomId, {
            type: 'room_destroyed',
            reason: 'Host left',
            timestamp: Date.now()
        });
        
        console.log(`🏚️ Destroyed synesthetic room: ${roomId}`);
    }

    /**
     * Generate room ID
     */
    generateRoomId() {
        const adjectives = ['Dreamy', 'Cosmic', 'Ethereal', 'Mystic', 'Serene', 'Vibrant', 'Blissful', 'Infinite'];
        const nouns = ['Waves', 'Flows', 'Vibes', 'Dreams', 'Souls', 'Hearts', 'Minds', 'Spirits'];
        
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const num = Math.floor(Math.random() * 1000);
        
        return `${adj}${noun}${num}`;
    }

    // ================================
    // EMOTIONAL SHARING
    // ================================

    /**
     * Handle emotional state change
     */
    onEmotionalStateChange(newState) {
        if (!this.privacySettings.shareEmotions) return;
        
        // Store in history
        this.emotionalHistory.push({
            ...newState,
            timestamp: Date.now(),
            peerId: this.peerId
        });
        
        // Keep history within limits
        if (this.emotionalHistory.length > this.maxHistoryLength) {
            this.emotionalHistory = this.emotionalHistory.slice(-this.maxHistoryLength);
        }
        
        // Share with room if connected
        if (this.currentRoomId) {
            this.shareEmotionalState(newState);
        }
    }

    /**
     * Share emotional state with room
     */
    shareEmotionalState(emotionalState) {
        if (!this.currentRoomId || !emotionalState) return;
        
        const message = {
            type: 'emotional_state',
            peerId: this.peerId,
            roomId: this.currentRoomId,
            emotionalState: emotionalState,
            timestamp: Date.now()
        };
        
        this.sendMessage(this.currentRoomId, message);
    }

    /**
     * Broadcast emotional state to all connections
     */
    broadcastEmotionalState() {
        if (!this.coreApp || !this.coreApp.currentEmotionalState) return;
        
        const emotionalState = this.coreApp.currentEmotionalState;
        
        // Update group emotional state if hosting
        if (this.isHosting) {
            this.updateGroupEmotionalState(emotionalState);
        }
        
        this.shareEmotionalState(emotionalState);
    }

    /**
     * Update group emotional state (for hosts)
     */
    updateGroupEmotionalState(hostEmotionalState) {
        const participants = this.roomParticipants.get(this.currentRoomId) || [];
        const allEmotions = [hostEmotionalState];
        
        // Collect emotions from all participants
        participants.forEach(participant => {
            if (this.sharedEmotions.has(participant.peerId)) {
                allEmotions.push(this.sharedEmotions.get(participant.peerId));
            }
        });
        
        // Calculate group emotional state
        this.groupEmotionalState = this.calculateGroupEmotion(allEmotions);
        
        // Broadcast group state
        this.sendMessage(this.currentRoomId, {
            type: 'group_emotional_state',
            groupState: this.groupEmotionalState,
            timestamp: Date.now()
        });
    }

    /**
     * Calculate group emotional state from individual emotions
     */
    calculateGroupEmotion(emotions) {
        if (emotions.length === 0) return null;
        
        // Calculate average emotional dimensions
        let totalValence = 0;
        let totalIntensity = 0;
        let totalDepth = 0;
        let colorFrequency = new Map();
        
        emotions.forEach(emotion => {
            totalValence += emotion.valence || 0.5;
            totalIntensity += emotion.intensity || 0.5;
            totalDepth += emotion.depth || 0;
            
            // Count color frequency
            if (emotion.synestheticColors) {
                emotion.synestheticColors.forEach(color => {
                    colorFrequency.set(color, (colorFrequency.get(color) || 0) + 1);
                });
            }
        });
        
        const count = emotions.length;
        
        // Find dominant emotion
        const emotionCounts = new Map();
        emotions.forEach(emotion => {
            const primary = emotion.primary || 'Neutral';
            emotionCounts.set(primary, (emotionCounts.get(primary) || 0) + 1);
        });
        
        const dominantEmotion = Array.from(emotionCounts.entries())
            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Collective Harmony';
        
        // Get most frequent colors
        const dominantColors = Array.from(colorFrequency.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([color]) => color);
        
        return {
            primary: dominantEmotion,
            valence: totalValence / count,
            intensity: totalIntensity / count,
            depth: totalDepth / count,
            synestheticColors: dominantColors,
            participantCount: count,
            harmony: this.calculateEmotionalHarmony(emotions)
        };
    }

    /**
     * Calculate emotional harmony score
     */
    calculateEmotionalHarmony(emotions) {
        if (emotions.length < 2) return 1.0;
        
        let totalSimilarity = 0;
        let comparisons = 0;
        
        for (let i = 0; i < emotions.length; i++) {
            for (let j = i + 1; j < emotions.length; j++) {
                const similarity = this.calculateEmotionalSimilarity(emotions[i], emotions[j]);
                totalSimilarity += similarity;
                comparisons++;
            }
        }
        
        return comparisons > 0 ? totalSimilarity / comparisons : 1.0;
    }

    /**
     * Calculate similarity between two emotional states
     */
    calculateEmotionalSimilarity(emotion1, emotion2) {
        const valenceDiff = Math.abs((emotion1.valence || 0.5) - (emotion2.valence || 0.5));
        const intensityDiff = Math.abs((emotion1.intensity || 0.5) - (emotion2.intensity || 0.5));
        const depthDiff = Math.abs((emotion1.depth || 0) - (emotion2.depth || 0)) / 100;
        
        const avgDiff = (valenceDiff + intensityDiff + depthDiff) / 3;
        return 1 - avgDiff;
    }

    // ================================
    // MESSAGING AND COMMUNICATION
    // ================================

    /**
     * Send message to room
     */
    sendMessage(roomId, message) {
        if (!roomId || !message) return;
        
        // Add metadata
        const fullMessage = {
            ...message,
            roomId: roomId,
            senderId: this.peerId,
            timestamp: Date.now()
        };
        
        // Send via broadcast channel
        if (this.broadcastChannel) {
            this.broadcastChannel.postMessage(fullMessage);
        }
        
        // Send via signalling if needed
        if (this.signallingChannel) {
            this.signallingChannel.send(fullMessage);
        }
    }

    /**
     * Handle broadcast message
     */
    handleBroadcastMessage(message) {
        if (!message || message.senderId === this.peerId) return;
        
        switch (message.type) {
            case 'emotional_state':
                this.handleEmotionalStateMessage(message);
                break;
            case 'group_emotional_state':
                this.handleGroupEmotionalStateMessage(message);
                break;
            case 'join_request':
                this.handleJoinRequest(message);
                break;
            case 'leave':
                this.handleLeaveMessage(message);
                break;
            case 'room_destroyed':
                this.handleRoomDestroyed(message);
                break;
        }
    }

    /**
     * Handle signalling message
     */
    handleSignallingMessage(signal) {
        // Process discovery and connection signals
        if (signal.type === 'room_advertisement') {
            this.nearbyRooms.set(signal.roomId, signal.roomInfo);
        }
    }

    /**
     * Handle emotional state message
     */
    handleEmotionalStateMessage(message) {
        if (message.roomId !== this.currentRoomId) return;
        
        // Store shared emotion
        this.sharedEmotions.set(message.senderId, message.emotionalState);
        
        // Update UI with shared emotion
        this.updateSharedEmotionUI(message.senderId, message.emotionalState);
        
        // Calculate emotional compatibility
        if (this.coreApp && this.coreApp.currentEmotionalState) {
            const compatibility = this.calculateEmotionalSimilarity(
                this.coreApp.currentEmotionalState,
                message.emotionalState
            );
            this.emotionalCompatibility.set(message.senderId, compatibility);
        }
    }

    /**
     * Handle group emotional state message
     */
    handleGroupEmotionalStateMessage(message) {
        if (message.roomId !== this.currentRoomId) return;
        
        this.groupEmotionalState = message.groupState;
        this.updateGroupEmotionUI(message.groupState);
    }

    /**
     * Handle join request
     */
    handleJoinRequest(message) {
        if (!this.isHosting || message.roomId !== this.currentRoomId) return;
        
        const roomInfo = this.hostedRooms.get(this.currentRoomId);
        if (!roomInfo) return;
        
        // Check capacity
        if (roomInfo.participants.length >= roomInfo.maxParticipants) {
            this.sendMessage(this.currentRoomId, {
                type: 'join_rejected',
                reason: 'Room full',
                targetPeer: message.peerId
            });
            return;
        }
        
        // Add participant
        roomInfo.participants.push(message.peerId);
        
        // Welcome new participant
        this.sendMessage(this.currentRoomId, {
            type: 'join_accepted',
            targetPeer: message.peerId,
            roomInfo: roomInfo
        });
        
        console.log(`👋 ${message.peerId} joined room ${this.currentRoomId}`);
    }

    /**
     * Handle leave message
     */
    handleLeaveMessage(message) {
        if (message.roomId !== this.currentRoomId) return;
        
        // Remove from shared emotions
        this.sharedEmotions.delete(message.senderId);
        
        // Update participant list if hosting
        if (this.isHosting) {
            const roomInfo = this.hostedRooms.get(this.currentRoomId);
            if (roomInfo) {
                roomInfo.participants = roomInfo.participants.filter(p => p !== message.senderId);
            }
        }
        
        // Update UI
        this.updateParticipantUI();
        
        console.log(`👋 ${message.senderId} left room ${this.currentRoomId}`);
    }

    /**
     * Handle room destroyed
     */
    handleRoomDestroyed(message) {
        if (message.roomId !== this.currentRoomId) return;
        
        // Leave room
        this.leaveRoom();
        
        // Notify user
        this.updateConnectionStatus('Room was closed by host');
    }

    // ================================
    // UI UPDATES
    // ================================

    /**
     * Update connection UI
     */
    updateConnectionUI() {
        const statusElement = document.getElementById('roomStatus');
        if (statusElement) {
            const icon = statusElement.querySelector('.status-icon');
            const text = statusElement.querySelector('.status-text');
            
            if (this.isHosting) {
                icon.textContent = '🏠';
                text.textContent = `Hosting room: ${this.currentRoomId}`;
            } else if (this.currentRoomId) {
                icon.textContent = '🤝';
                text.textContent = `Connected to room: ${this.currentRoomId}`;
            } else {
                icon.textContent = '🌐';
                text.textContent = 'Not connected to any emotional room';
            }
        }
        
        // Update participant count
        this.updateParticipantUI();
    }

    /**
     * Update connection status message
     */
    updateConnectionStatus(message) {
        if (this.coreApp && this.coreApp.updateGlobalStatus) {
            this.coreApp.updateGlobalStatus(`🌐 ${message}`);
        }
    }

    /**
     * Update discovery UI
     */
    updateDiscoveryUI() {
        // This would update a UI showing nearby rooms
        console.log(`🔍 Found ${this.nearbyRooms.size} nearby emotional rooms`);
    }

    /**
     * Update shared emotion UI
     */
    updateSharedEmotionUI(peerId, emotionalState) {
        const container = document.getElementById('connectedConsciousness');
        if (!container) return;
        
        let userElement = container.querySelector(`[data-peer-id="${peerId}"]`);
        
        if (!userElement) {
            userElement = document.createElement('div');
            userElement.className = 'connected-user';
            userElement.setAttribute('data-peer-id', peerId);
            userElement.innerHTML = `
                <div class="user-avatar">${this.getAvatarForPeer(peerId)}</div>
                <div class="user-name">${this.getNameForPeer(peerId)}</div>
                <div class="user-emotion"></div>
            `;
            container.appendChild(userElement);
        }
        
        // Update emotion display
        const emotionElement = userElement.querySelector('.user-emotion');
        if (emotionElement) {
            emotionElement.textContent = emotionalState.primary;
            emotionElement.style.color = emotionalState.synestheticColors?.[0] || '#4ECDC4';
        }
    }

    /**
     * Update group emotion UI
     */
    updateGroupEmotionUI(groupState) {
        // This would update UI showing the collective emotional state
        console.log('🎭 Group emotion:', groupState.primary, 'Harmony:', groupState.harmony.toFixed(2));
    }

    /**
     * Update participant UI
     */
    updateParticipantUI() {
        const container = document.getElementById('connectedConsciousness');
        if (!container) return;
        
        // Remove participants who are no longer connected
        const currentPeers = Array.from(this.sharedEmotions.keys());
        const existingElements = container.querySelectorAll('.connected-user');
        
        existingElements.forEach(element => {
            const peerId = element.getAttribute('data-peer-id');
            if (!currentPeers.includes(peerId)) {
                element.remove();
            }
        });
    }

    /**
     * Get avatar for peer
     */
    getAvatarForPeer(peerId) {
        // Generate consistent avatar based on peer ID
        const avatars = ['👤', '🎭', '🌟', '💫', '🌙', '🌸', '🦋', '✨'];
        const hash = peerId.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        return avatars[Math.abs(hash) % avatars.length];
    }

    /**
     * Get name for peer
     */
    getNameForPeer(peerId) {
        // Generate friendly name or use stored name
        if (this.friendsList.has(peerId)) {
            return this.friendsList.get(peerId).name;
        }
        
        const adjectives = ['Dreamy', 'Cosmic', 'Mystic', 'Serene', 'Vibrant', 'Blissful'];
        const nouns = ['Soul', 'Spirit', 'Heart', 'Mind', 'Dreamer', 'Wanderer'];
        
        const hash = peerId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const adj = adjectives[hash % adjectives.length];
        const noun = nouns[(hash + 1) % nouns.length];
        
        return `${adj} ${noun}`;
    }

    // ================================
    // PUBLIC API METHODS
    // ================================

    /**
     * Create and host a new room
     */
    hostRoom(roomName) {
        return this.createRoom(roomName);
    }

    /**
     * Join room by ID
     */
    async joinRoomById(roomId) {
        return await this.joinRoom(roomId);
    }

    /**
     * Discover nearby rooms
     */
    discoverNearbyRooms() {
        this.discoverySystem.discover();
        return Array.from(this.nearbyRooms.values());
    }

    /**
     * Get current connection status
     */
    getConnectionStatus() {
        return {
            isConnected: this.isConnected,
            isHosting: this.isHosting,
            currentRoomId: this.currentRoomId,
            participantCount: this.sharedEmotions.size,
            groupEmotionalState: this.groupEmotionalState
        };
    }

    /**
     * Update privacy settings
     */
    updatePrivacySettings(newSettings) {
        this.privacySettings = { ...this.privacySettings, ...newSettings };
        
        try {
            localStorage.setItem('socialPrivacySettings', JSON.stringify(this.privacySettings));
            console.log('🔒 Privacy settings updated');
        } catch (error) {
            console.error('Error saving privacy settings:', error);
        }
    }

    /**
     * Get emotional compatibility with peers
     */
    getEmotionalCompatibility() {
        return Object.fromEntries(this.emotionalCompatibility);
    }

    /**
     * Export social data
     */
    exportSocialData() {
        return {
            emotionalHistory: this.emotionalHistory,
            compatibility: Object.fromEntries(this.emotionalCompatibility),
            privacySettings: this.privacySettings,
            connectionStats: {
                roomsHosted: this.hostedRooms.size,
                roomsJoined: this.joinedRooms.size,
                emotionsShared: this.emotionalHistory.length
            }
        };
    }

    /**
     * Clean up social consciousness
     */
    destroy() {
        // Leave current room
        if (this.currentRoomId) {
            this.leaveRoom();
        }
        
        // Stop broadcasting
        this.emotionalBroadcast.stop();
        
        // Close connections
        if (this.broadcastChannel) {
            this.broadcastChannel.close();
        }
        
        // Clear data
        this.sharedEmotions.clear();
        this.hostedRooms.clear();
        this.joinedRooms.clear();
        
        this.isInitialized = false;
        console.log('🌐 Social Consciousness destroyed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialConsciousness;
}