/**
 * 🗄️ SUPABASE CLIENT - DATABASE INTEGRATION SERVICE
 * Handles all database operations, user authentication, and data persistence
 * Provides free, scalable backend for the synesthetic consciousness engine
 */

class SupabaseClient {
    constructor(coreApp) {
        this.coreApp = coreApp;
        this.isInitialized = false;
        this.isConnected = false;
        
        // Supabase configuration
        this.supabase = null;
        this.config = {
            url: null,
            anonKey: null,
            isConfigured: false
        };
        
        // User management
        this.currentUser = null;
        this.session = null;
        this.userProfile = null;
        
        // Data synchronization
        this.syncQueue = [];
        this.syncInterval = null;
        this.lastSyncTime = 0;
        this.offlineMode = false;
        
        // Real-time subscriptions
        this.subscriptions = new Map();
        this.realtimeChannels = new Map();
        
        // Offline storage
        this.offlineStorage = {
            emotionalData: [],
            userProfiles: new Map(),
            socialConnections: []
        };
        
        // Performance tracking
        this.performance = {
            queries: 0,
            errors: 0,
            averageResponseTime: 0,
            lastResponseTime: 0
        };
        
        console.log('🗄️ Supabase Client initializing...');
        this.initialize();
    }

    /**
     * Initialize Supabase client
     */
    async initialize() {
        try {
            // Check if Supabase is available
            this.checkSupabaseAvailability();
            
            // Load configuration
            await this.loadConfiguration();
            
            // Initialize client if configured
            if (this.config.isConfigured) {
                await this.initializeSupabaseClient();
                await this.setupAuthentication();
                await this.setupRealtimeSubscriptions();
            } else {
                console.log('📝 Supabase not configured - running in offline mode');
                this.setupOfflineMode();
            }
            
            // Initialize data sync
            this.setupDataSync();
            
            // Load offline data
            this.loadOfflineData();
            
            this.isInitialized = true;
            console.log('✨ Supabase Client fully operational');
            
        } catch (error) {
            console.error('❌ Supabase Client initialization failed:', error);
            this.setupOfflineMode();
            this.isInitialized = true;
        }
    }

    /**
     * Check if Supabase library is available
     */
    checkSupabaseAvailability() {
        if (typeof window.supabase === 'undefined') {
            console.warn('⚠️ Supabase library not found - using offline mode');
            return false;
        }
        return true;
    }

    /**
     * Load Supabase configuration
     */
    async loadConfiguration() {
        // Try to load from environment or stored config
        const storedConfig = localStorage.getItem('supabase-config');
        
        if (storedConfig) {
            try {
                const config = JSON.parse(storedConfig);
                this.config = { ...this.config, ...config, isConfigured: true };
                console.log('🔧 Supabase configuration loaded from storage');
                return;
            } catch (error) {
                console.error('Error parsing stored config:', error);
            }
        }
        
        // Check for environment variables (would be set by user)
        const envUrl = this.getEnvVar('SUPABASE_URL');
        const envKey = this.getEnvVar('SUPABASE_ANON_KEY');
        
        if (envUrl && envKey) {
            this.config = {
                url: envUrl,
                anonKey: envKey,
                isConfigured: true
            };
            console.log('🔧 Supabase configuration loaded from environment');
        } else {
            console.log('📝 No Supabase configuration found - provide URL and key to enable cloud features');
        }
    }

    /**
     * Get environment variable (placeholder - would be replaced with actual env vars)
     */
    getEnvVar(name) {
        // In a real implementation, this would read from process.env or similar
        // For now, return null to use offline mode
        return null;
    }

    /**
     * Initialize Supabase client
     */
    async initializeSupabaseClient() {
        if (!this.config.isConfigured || typeof window.supabase === 'undefined') {
            throw new Error('Supabase not available or not configured');
        }
        
        this.supabase = window.supabase.createClient(this.config.url, this.config.anonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            },
            realtime: {
                params: {
                    eventsPerSecond: 10
                }
            }
        });
        
        this.isConnected = true;
        console.log('🔗 Supabase client connected');
    }

    /**
     * Set up authentication system
     */
    async setupAuthentication() {
        if (!this.supabase) return;
        
        // Check for existing session
        const { data: { session } } = await this.supabase.auth.getSession();
        if (session) {
            this.session = session;
            this.currentUser = session.user;
            await this.loadUserProfile();
        }
        
        // Listen for auth changes
        this.supabase.auth.onAuthStateChange(async (event, session) => {
            this.session = session;
            this.currentUser = session?.user || null;
            
            switch (event) {
                case 'SIGNED_IN':
                    await this.handleSignIn(session);
                    break;
                case 'SIGNED_OUT':
                    await this.handleSignOut();
                    break;
                case 'TOKEN_REFRESHED':
                    await this.handleTokenRefresh(session);
                    break;
            }
        });
        
        console.log('🔐 Authentication system initialized');
    }

    /**
     * Set up real-time subscriptions
     */
    async setupRealtimeSubscriptions() {
        if (!this.supabase || !this.currentUser) return;
        
        // Subscribe to user's emotional data changes
        this.subscribeToEmotionalData();
        
        // Subscribe to social connections
        this.subscribeToSocialConnections();
        
        console.log('📡 Real-time subscriptions established');
    }

    /**
     * Set up offline mode
     */
    setupOfflineMode() {
        this.offlineMode = true;
        this.isConnected = false;
        
        // Create mock functions for offline use
        this.mockSupabaseOperations();
        
        console.log('📱 Running in offline mode - data will sync when connection is available');
    }

    /**
     * Create mock Supabase operations for offline mode
     */
    mockSupabaseOperations() {
        this.supabase = {
            from: (table) => ({
                select: () => Promise.resolve({ data: [], error: null }),
                insert: (data) => {
                    this.queueForSync('insert', table, data);
                    return Promise.resolve({ data: data, error: null });
                },
                update: (data) => {
                    this.queueForSync('update', table, data);
                    return Promise.resolve({ data: data, error: null });
                },
                delete: () => {
                    this.queueForSync('delete', table, {});
                    return Promise.resolve({ data: null, error: null });
                }
            }),
            auth: {
                getSession: () => Promise.resolve({ data: { session: null } }),
                signUp: () => Promise.resolve({ data: { user: null }, error: new Error('Offline mode') }),
                signIn: () => Promise.resolve({ data: { user: null }, error: new Error('Offline mode') }),
                signOut: () => Promise.resolve({ error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
            }
        };
    }

    /**
     * Set up data synchronization
     */
    setupDataSync() {
        // Sync every 30 seconds when online
        this.syncInterval = setInterval(() => {
            if (this.isConnected && !this.offlineMode && this.syncQueue.length > 0) {
                this.processSyncQueue();
            }
        }, 30000);
        
        // Sync when coming back online
        window.addEventListener('online', () => {
            if (this.isConnected) {
                this.processSyncQueue();
            }
        });
        
        // Handle going offline
        window.addEventListener('offline', () => {
            console.log('📱 Connection lost - switching to offline mode');
        });
    }

    /**
     * Load offline data
     */
    loadOfflineData() {
        try {
            const stored = localStorage.getItem('synesthetic-offline-data');
            if (stored) {
                this.offlineStorage = { ...this.offlineStorage, ...JSON.parse(stored) };
                console.log('📚 Offline data loaded');
            }
        } catch (error) {
            console.error('Error loading offline data:', error);
        }
    }

    /**
     * Save offline data
     */
    saveOfflineData() {
        try {
            localStorage.setItem('synesthetic-offline-data', JSON.stringify(this.offlineStorage));
        } catch (error) {
            console.error('Error saving offline data:', error);
        }
    }

    // ================================
    // AUTHENTICATION METHODS
    // ================================

    /**
     * Sign up with email and password
     */
    async signUp(email, password, userData = {}) {
        try {
            const startTime = performance.now();
            
            const { data, error } = await this.supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: userData
                }
            });
            
            this.updatePerformanceMetrics(startTime);
            
            if (error) throw error;
            
            // Create user profile
            if (data.user) {
                await this.createUserProfile(data.user, userData);
            }
            
            console.log('✅ User signed up successfully');
            return { success: true, user: data.user };
            
        } catch (error) {
            this.performance.errors++;
            console.error('❌ Sign up failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Sign in with email and password
     */
    async signIn(email, password) {
        try {
            const startTime = performance.now();
            
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            this.updatePerformanceMetrics(startTime);
            
            if (error) throw error;
            
            console.log('✅ User signed in successfully');
            return { success: true, user: data.user };
            
        } catch (error) {
            this.performance.errors++;
            console.error('❌ Sign in failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Sign out
     */
    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            
            console.log('✅ User signed out successfully');
            return { success: true };
            
        } catch (error) {
            console.error('❌ Sign out failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Handle sign in
     */
    async handleSignIn(session) {
        this.session = session;
        this.currentUser = session.user;
        
        await this.loadUserProfile();
        await this.setupRealtimeSubscriptions();
        await this.syncOfflineData();
        
        if (this.coreApp) {
            this.coreApp.updateGlobalStatus(`👋 Welcome back! Syncing your emotional consciousness...`);
        }
        
        console.log('🔐 User authenticated and data synced');
    }

    /**
     * Handle sign out
     */
    async handleSignOut() {
        this.currentUser = null;
        this.userProfile = null;
        this.session = null;
        
        // Unsubscribe from real-time updates
        this.unsubscribeFromAll();
        
        if (this.coreApp) {
            this.coreApp.updateGlobalStatus(`👋 Signed out. Your data is saved locally.`);
        }
        
        console.log('🔐 User signed out and subscriptions cleaned up');
    }

    /**
     * Handle token refresh
     */
    async handleTokenRefresh(session) {
        this.session = session;
        console.log('🔄 Authentication token refreshed');
    }

    // ================================
    // USER PROFILE METHODS
    // ================================

    /**
     * Create user profile
     */
    async createUserProfile(user, userData) {
        try {
            const profile = {
                id: user.id,
                email: user.email,
                created_at: new Date().toISOString(),
                emotional_preferences: {},
                privacy_settings: {
                    share_emotions: true,
                    allow_discovery: true,
                    public_profile: false
                },
                synesthetic_mappings: {},
                ...userData
            };
            
            const { data, error } = await this.supabase
                .from('user_profiles')
                .insert([profile]);
            
            if (error) throw error;
            
            this.userProfile = profile;
            console.log('👤 User profile created');
            
        } catch (error) {
            console.error('Error creating user profile:', error);
        }
    }

    /**
     * Load user profile
     */
    async loadUserProfile() {
        if (!this.currentUser) return;
        
        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .select('*')
                .eq('id', this.currentUser.id)
                .single();
            
            if (error && error.code !== 'PGRST116') throw error;
            
            if (data) {
                this.userProfile = data;
                console.log('👤 User profile loaded');
            } else {
                // Create profile if it doesn't exist
                await this.createUserProfile(this.currentUser);
            }
            
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    /**
     * Update user profile
     */
    async updateUserProfile(updates) {
        if (!this.currentUser) return;
        
        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .update(updates)
                .eq('id', this.currentUser.id)
                .select()
                .single();
            
            if (error) throw error;
            
            this.userProfile = { ...this.userProfile, ...data };
            console.log('👤 User profile updated');
            
            return { success: true, profile: data };
            
        } catch (error) {
            console.error('Error updating user profile:', error);
            return { success: false, error: error.message };
        }
    }

    // ================================
    // EMOTIONAL DATA METHODS
    // ================================

    /**
     * Save emotional data
     */
    async saveEmotionalData(emotionalState) {
        try {
            const emotionalRecord = {
                user_id: this.currentUser?.id || 'anonymous',
                primary_emotion: emotionalState.primary,
                valence: emotionalState.valence,
                arousal: emotionalState.intensity,
                dominance: emotionalState.dominance,
                complexity: emotionalState.complexity,
                confidence: emotionalState.confidence,
                synesthetic_colors: emotionalState.synestheticColors,
                audio_features: emotionalState.audioFeatures,
                context: {
                    timestamp: Date.now(),
                    session_id: this.generateSessionId()
                },
                created_at: new Date().toISOString()
            };
            
            if (this.offlineMode || !this.isConnected) {
                // Store offline
                this.offlineStorage.emotionalData.push(emotionalRecord);
                this.saveOfflineData();
                return { success: true, id: Date.now().toString() };
            }
            
            const { data, error } = await this.supabase
                .from('emotional_data')
                .insert([emotionalRecord])
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, id: data.id };
            
        } catch (error) {
            console.error('Error saving emotional data:', error);
            
            // Fallback to offline storage
            if (emotionalState) {
                this.queueForSync('insert', 'emotional_data', emotionalState);
            }
            
            return { success: false, error: error.message };
        }
    }

    /**
     * Get emotional history
     */
    async getEmotionalHistory(limit = 50, offset = 0) {
        try {
            if (this.offlineMode || !this.isConnected) {
                return {
                    success: true,
                    data: this.offlineStorage.emotionalData.slice(offset, offset + limit)
                };
            }
            
            const { data, error } = await this.supabase
                .from('emotional_data')
                .select('*')
                .eq('user_id', this.currentUser?.id || 'anonymous')
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);
            
            if (error) throw error;
            
            return { success: true, data: data || [] };
            
        } catch (error) {
            console.error('Error getting emotional history:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get emotional analytics
     */
    async getEmotionalAnalytics(timeRange = '7d') {
        try {
            const timeRanges = {
                '1d': 1,
                '7d': 7,
                '30d': 30,
                '90d': 90
            };
            
            const days = timeRanges[timeRange] || 7;
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
            
            if (this.offlineMode || !this.isConnected) {
                // Analyze offline data
                const filtered = this.offlineStorage.emotionalData.filter(
                    item => new Date(item.created_at) >= startDate
                );
                return { success: true, data: this.analyzeEmotionalData(filtered) };
            }
            
            const { data, error } = await this.supabase
                .from('emotional_data')
                .select('*')
                .eq('user_id', this.currentUser?.id || 'anonymous')
                .gte('created_at', startDate.toISOString());
            
            if (error) throw error;
            
            const analytics = this.analyzeEmotionalData(data || []);
            
            return { success: true, data: analytics };
            
        } catch (error) {
            console.error('Error getting emotional analytics:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Analyze emotional data
     */
    analyzeEmotionalData(data) {
        if (!data || data.length === 0) {
            return {
                totalEntries: 0,
                averageValence: 0,
                averageArousal: 0,
                mostFrequentEmotion: null,
                emotionDistribution: {},
                timePattern: {}
            };
        }
        
        // Calculate statistics
        const totalEntries = data.length;
        const avgValence = data.reduce((sum, item) => sum + (item.valence || 0), 0) / totalEntries;
        const avgArousal = data.reduce((sum, item) => sum + (item.arousal || 0), 0) / totalEntries;
        
        // Emotion distribution
        const emotionCounts = {};
        data.forEach(item => {
            const emotion = item.primary_emotion || 'Unknown';
            emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
        });
        
        const mostFrequentEmotion = Object.entries(emotionCounts)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
        
        // Time pattern analysis
        const timePattern = {};
        data.forEach(item => {
            const hour = new Date(item.created_at).getHours();
            timePattern[hour] = (timePattern[hour] || 0) + 1;
        });
        
        return {
            totalEntries,
            averageValence: avgValence,
            averageArousal: avgArousal,
            mostFrequentEmotion,
            emotionDistribution: emotionCounts,
            timePattern
        };
    }

    // ================================
    // REAL-TIME SUBSCRIPTIONS
    // ================================

    /**
     * Subscribe to emotional data changes
     */
    subscribeToEmotionalData() {
        if (!this.supabase || !this.currentUser) return;
        
        const subscription = this.supabase
            .channel('emotional_data_changes')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'emotional_data',
                filter: `user_id=eq.${this.currentUser.id}`
            }, (payload) => {
                this.handleEmotionalDataChange(payload);
            })
            .subscribe();
        
        this.subscriptions.set('emotional_data', subscription);
    }

    /**
     * Subscribe to social connections
     */
    subscribeToSocialConnections() {
        if (!this.supabase || !this.currentUser) return;
        
        const subscription = this.supabase
            .channel('social_connections')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'social_connections',
                filter: `user_id=eq.${this.currentUser.id}`
            }, (payload) => {
                this.handleSocialConnectionChange(payload);
            })
            .subscribe();
        
        this.subscriptions.set('social_connections', subscription);
    }

    /**
     * Handle emotional data changes
     */
    handleEmotionalDataChange(payload) {
        console.log('📊 Emotional data updated:', payload.eventType);
        
        // Notify core app of data changes
        if (this.coreApp && this.coreApp.socialConsciousness) {
            this.coreApp.socialConsciousness.handleDataSync(payload);
        }
    }

    /**
     * Handle social connection changes
     */
    handleSocialConnectionChange(payload) {
        console.log('👥 Social connection updated:', payload.eventType);
        
        // Update local social data
        if (this.coreApp && this.coreApp.socialConsciousness) {
            this.coreApp.socialConsciousness.handleConnectionUpdate(payload);
        }
    }

    /**
     * Unsubscribe from all real-time updates
     */
    unsubscribeFromAll() {
        this.subscriptions.forEach((subscription, key) => {
            subscription.unsubscribe();
            console.log(`📡 Unsubscribed from ${key}`);
        });
        this.subscriptions.clear();
    }

    // ================================
    // DATA SYNC METHODS
    // ================================

    /**
     * Queue operation for sync
     */
    queueForSync(operation, table, data) {
        this.syncQueue.push({
            operation,
            table,
            data,
            timestamp: Date.now(),
            id: Math.random().toString(36).substr(2, 9)
        });
        
        // Save queue to localStorage
        this.saveSyncQueue();
    }

    /**
     * Process sync queue
     */
    async processSyncQueue() {
        if (!this.isConnected || this.syncQueue.length === 0) return;
        
        console.log(`🔄 Processing ${this.syncQueue.length} queued operations`);
        
        const processed = [];
        const failed = [];
        
        for (const operation of this.syncQueue) {
            try {
                await this.executeQueuedOperation(operation);
                processed.push(operation.id);
            } catch (error) {
                console.error('Sync operation failed:', error);
                failed.push(operation.id);
            }
        }
        
        // Remove processed operations
        this.syncQueue = this.syncQueue.filter(op => !processed.includes(op.id));
        
        // Save updated queue
        this.saveSyncQueue();
        
        this.lastSyncTime = Date.now();
        console.log(`✅ Sync complete: ${processed.length} processed, ${failed.length} failed`);
    }

    /**
     * Execute queued operation
     */
    async executeQueuedOperation(operation) {
        const { operation: op, table, data } = operation;
        
        switch (op) {
            case 'insert':
                return await this.supabase.from(table).insert([data]);
            case 'update':
                return await this.supabase.from(table).update(data);
            case 'delete':
                return await this.supabase.from(table).delete().match(data);
            default:
                throw new Error(`Unknown operation: ${op}`);
        }
    }

    /**
     * Sync offline data
     */
    async syncOfflineData() {
        if (!this.isConnected || this.offlineStorage.emotionalData.length === 0) return;
        
        console.log(`🔄 Syncing ${this.offlineStorage.emotionalData.length} offline records`);
        
        // Sync emotional data
        for (const record of this.offlineStorage.emotionalData) {
            this.queueForSync('insert', 'emotional_data', record);
        }
        
        // Clear offline storage after queuing
        this.offlineStorage.emotionalData = [];
        this.saveOfflineData();
        
        // Process sync queue
        await this.processSyncQueue();
    }

    /**
     * Save sync queue to localStorage
     */
    saveSyncQueue() {
        try {
            localStorage.setItem('synesthetic-sync-queue', JSON.stringify(this.syncQueue));
        } catch (error) {
            console.error('Error saving sync queue:', error);
        }
    }

    /**
     * Load sync queue from localStorage
     */
    loadSyncQueue() {
        try {
            const stored = localStorage.getItem('synesthetic-sync-queue');
            if (stored) {
                this.syncQueue = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading sync queue:', error);
        }
    }

    // ================================
    // UTILITY METHODS
    // ================================

    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(startTime) {
        const responseTime = performance.now() - startTime;
        this.performance.queries++;
        this.performance.lastResponseTime = responseTime;
        this.performance.averageResponseTime = 
            (this.performance.averageResponseTime * (this.performance.queries - 1) + responseTime) / this.performance.queries;
    }

    /**
     * Generate session ID
     */
    generateSessionId() {
        if (!this.sessionId) {
            this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
        return this.sessionId;
    }

    /**
     * Configure Supabase connection
     */
    async configure(url, anonKey) {
        this.config = { url, anonKey, isConfigured: true };
        
        // Save configuration
        try {
            localStorage.setItem('supabase-config', JSON.stringify(this.config));
        } catch (error) {
            console.error('Error saving config:', error);
        }
        
        // Reinitialize if needed
        if (!this.isConnected) {
            await this.initializeSupabaseClient();
            await this.setupAuthentication();
        }
        
        console.log('🔧 Supabase configuration updated');
    }

    /**
     * Get connection status
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            isConnected: this.isConnected,
            isAuthenticated: !!this.currentUser,
            offlineMode: this.offlineMode,
            syncQueueLength: this.syncQueue.length,
            lastSyncTime: this.lastSyncTime,
            performance: this.performance
        };
    }

    /**
     * Export user data
     */
    async exportUserData() {
        const emotionalHistory = await this.getEmotionalHistory(1000);
        const analytics = await this.getEmotionalAnalytics('90d');
        
        return {
            userProfile: this.userProfile,
            emotionalHistory: emotionalHistory.data || [],
            analytics: analytics.data || {},
            exportedAt: new Date().toISOString(),
            offlineData: this.offlineStorage
        };
    }

    /**
     * Clean up resources
     */
    destroy() {
        // Stop sync interval
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
        
        // Unsubscribe from all
        this.unsubscribeFromAll();
        
        // Save any pending data
        this.saveOfflineData();
        this.saveSyncQueue();
        
        this.isInitialized = false;
        console.log('🗄️ Supabase Client destroyed');
    }
}

// Make available globally
window.SupabaseClient = SupabaseClient;
export default SupabaseClient;