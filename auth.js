// === SUPABASE CONFIGURATION ===
// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://fwuwuofgwvyacmpppect.supabase.co'; // From Supabase dashboard
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dXd1b2Znd3Z5YWNtcHBwZWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDgzMzEsImV4cCI6MjA2NjQyNDMzMX0.9FdGAMI6YnnKwqXGJp4EvkoEiylhGoLHEGgYJQ5r7mY'; // From Supabase dashboard

// Initialize Supabase client
let supabase = null;

// Load Supabase from CDN
async function initializeSupabase() {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    
    // Wait for script to load
    await new Promise((resolve) => {
        script.onload = resolve;
        document.head.appendChild(script);
    });
    
    // Initialize Supabase client
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase initialized successfully!');
    
    // Check if user is already logged in
    checkUser();
}

// === USER AUTHENTICATION ===
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.emotionalProfile = null;
    }
    
    // Sign up new user
    async signUp(email, password, username) {
        try {
            // Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password
            });
            
            if (authError) throw authError;
            
            // Create user profile
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .insert([{
                    id: authData.user.id,
                    email: email,
                    username: username,
                    emotional_dna: {
                        dominant_emotions: [],
                        color_preferences: {},
                        sensitivity_level: 0.5
                    }
                }])
                .select()
                .single();
                
            if (profileError) throw profileError;
            
            this.currentUser = profile;
            this.showUserDashboard();
            return { success: true, user: profile };
            
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Sign in existing user
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (error) throw error;
            
            // Get user profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();
                
            this.currentUser = profile;
            this.showUserDashboard();
            return { success: true, user: profile };
            
        } catch (error) {
            console.error('Signin error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Sign out
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            this.currentUser = null;
            this.emotionalProfile = null;
            this.hideUserDashboard();
            return { success: true };
            
        } catch (error) {
            console.error('Signout error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Save emotional mapping for a song
    async saveEmotionalMapping(songData) {
        if (!this.currentUser) return;
        
        try {
            const { data, error } = await supabase
                .from('emotional_mappings')
                .insert([{
                    user_id: this.currentUser.id,
                    song_name: songData.name,
                    artist: songData.artist || 'Unknown',
                    detected_emotion: songData.detectedEmotion,
                    user_emotion: songData.userEmotion || songData.detectedEmotion,
                    emotion_confidence: songData.confidence,
                    color_palette: songData.colors,
                    audio_features: songData.features
                }])
                .select();
                
            if (error) throw error;
            
            // Update user stats
            await this.updateUserStats();
            
            return { success: true, mapping: data[0] };
            
        } catch (error) {
            console.error('Error saving mapping:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Get user's emotional history
    async getEmotionalHistory(limit = 50) {
        if (!this.currentUser) return [];
        
        try {
            const { data, error } = await supabase
                .from('emotional_mappings')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .order('created_at', { ascending: false })
                .limit(limit);
                
            if (error) throw error;
            return data;
            
        } catch (error) {
            console.error('Error fetching history:', error);
            return [];
        }
    }
    
    // Update user's emotional DNA
    async updateEmotionalDNA(emotionData) {
        if (!this.currentUser) return;
        
        try {
            // Calculate dominant emotions from history
            const history = await this.getEmotionalHistory(100);
            const emotionCounts = {};
            
            history.forEach(mapping => {
                const emotion = mapping.user_emotion || mapping.detected_emotion;
                emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
            });
            
            // Sort emotions by frequency
            const dominantEmotions = Object.entries(emotionCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([emotion]) => emotion);
            
            // Update profile
            const { error } = await supabase
                .from('profiles')
                .update({
                    emotional_dna: {
                        dominant_emotions: dominantEmotions,
                        color_preferences: this.currentUser.emotional_dna.color_preferences,
                        sensitivity_level: this.currentUser.emotional_dna.sensitivity_level,
                        last_updated: new Date().toISOString()
                    },
                    favorite_emotion: dominantEmotions[0]
                })
                .eq('id', this.currentUser.id);
                
            if (error) throw error;
            
        } catch (error) {
            console.error('Error updating emotional DNA:', error);
        }
    }
    
    // Update user statistics
    async updateUserStats() {
        if (!this.currentUser) return;
        
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    total_songs_analyzed: this.currentUser.total_songs_analyzed + 1
                })
                .eq('id', this.currentUser.id);
                
            if (error) throw error;
            
            this.currentUser.total_songs_analyzed += 1;
            
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }
    
    // Create emotion sharing room
    async createEmotionRoom(roomName) {
        if (!this.currentUser) return;
        
        try {
            const roomCode = this.generateRoomCode();
            
            const { data, error } = await supabase
                .from('emotion_rooms')
                .insert([{
                    room_code: roomCode,
                    host_id: this.currentUser.id,
                    room_name: roomName,
                    current_emotion: 'waiting',
                    current_colors: ['#4ECDC4', '#45B7D1', '#96CEB4']
                }])
                .select()
                .single();
                
            if (error) throw error;
            
            // Start real-time subscription for room
            this.subscribeToRoom(roomCode);
            
            return { success: true, room: data };
            
        } catch (error) {
            console.error('Error creating room:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Join emotion sharing room
    async joinEmotionRoom(roomCode) {
        try {
            const { data, error } = await supabase
                .from('emotion_rooms')
                .select('*')
                .eq('room_code', roomCode)
                .eq('is_active', true)
                .single();
                
            if (error) throw error;
            
            // Update participant count
            await supabase
                .from('emotion_rooms')
                .update({ participants: data.participants + 1 })
                .eq('room_code', roomCode);
            
            // Subscribe to room updates
            this.subscribeToRoom(roomCode);
            
            return { success: true, room: data };
            
        } catch (error) {
            console.error('Error joining room:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Subscribe to real-time room updates
    subscribeToRoom(roomCode) {
        const channel = supabase
            .channel(`room:${roomCode}`)
            .on('postgres_changes', 
                { 
                    event: 'UPDATE', 
                    schema: 'public', 
                    table: 'emotion_rooms',
                    filter: `room_code=eq.${roomCode}`
                }, 
                (payload) => {
                    // Update UI with new emotion/colors
                    this.handleRoomUpdate(payload.new);
                }
            )
            .subscribe();
            
        // Store channel reference for cleanup
        this.currentRoomChannel = channel;
    }
    
    // Handle room emotion updates
    handleRoomUpdate(roomData) {
        // Update background colors
        const bg = document.querySelector('.emotional-background');
        if (roomData.current_colors && roomData.current_colors.length >= 3) {
            bg.style.background = `
                radial-gradient(circle at 20% 50%, ${roomData.current_colors[0]}40, transparent 50%),
                radial-gradient(circle at 80% 80%, ${roomData.current_colors[1]}40, transparent 50%),
                radial-gradient(circle at 40% 20%, ${roomData.current_colors[2]}40, transparent 50%)
            `;
        }
        
        // Show notification
        this.showNotification(`Room emotion: ${roomData.current_emotion}`);
    }
    
    // Update room with current emotion
    async updateRoomEmotion(roomCode, emotion, colors) {
        try {
            const { error } = await supabase
                .from('emotion_rooms')
                .update({
                    current_emotion: emotion,
                    current_colors: colors
                })
                .eq('room_code', roomCode);
                
            if (error) throw error;
            
        } catch (error) {
            console.error('Error updating room:', error);
        }
    }
    
    // Create emotional playlist
    async createPlaylist(name, targetEmotion) {
        if (!this.currentUser) return;
        
        try {
            const { data, error } = await supabase
                .from('emotional_playlists')
                .insert([{
                    user_id: this.currentUser.id,
                    playlist_name: name,
                    target_emotion: targetEmotion,
                    songs: []
                }])
                .select()
                .single();
                
            if (error) throw error;
            
            return { success: true, playlist: data };
            
        } catch (error) {
            console.error('Error creating playlist:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Add song to playlist
    async addToPlaylist(playlistId, songData) {
        try {
            // Get current playlist
            const { data: playlist, error: fetchError } = await supabase
                .from('emotional_playlists')
                .select('songs')
                .eq('id', playlistId)
                .single();
                
            if (fetchError) throw fetchError;
            
            // Add new song
            const updatedSongs = [...(playlist.songs || []), songData];
            
            const { error: updateError } = await supabase
                .from('emotional_playlists')
                .update({ songs: updatedSongs })
                .eq('id', playlistId);
                
            if (updateError) throw updateError;
            
            return { success: true };
            
        } catch (error) {
            console.error('Error adding to playlist:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Helper function to generate room codes
    generateRoomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    // UI Helper functions
    showUserDashboard() {
        // This will be called from the main app
        console.log('User logged in:', this.currentUser.username || this.currentUser.email);
    }
    
    hideUserDashboard() {
        // This will be called from the main app
        console.log('User logged out');
    }
    
    showNotification(message) {
        // Simple notification - can be enhanced with better UI
        console.log('Notification:', message);
    }
}

// Check if user is already logged in
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        // Get full profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
        if (profile) {
            window.authManager.currentUser = profile;
            window.authManager.showUserDashboard();
        }
    }
}

// Initialize auth manager
window.authManager = new AuthManager();

// Initialize Supabase when script loads
initializeSupabase();