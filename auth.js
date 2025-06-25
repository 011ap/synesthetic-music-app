// === SUPABASE CONFIGURATION ===
// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'; // From Supabase dashboard
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // From Supabase dashboard

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
    
    // Sign up new user - Updated to work with automatic profile creation
    async signUp(email, password, username) {
        try {
            // Create auth user with username in metadata
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username
                    }
                }
            });
            
            if (authError) throw authError;
            
            // Wait for profile to be created by trigger
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Fetch the automatically created profile
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authData.user.id)
                .single();
                
            if (profileError || !profile) {
                console.error('Profile fetch error:', profileError);
                // If profile doesn't exist yet, create it manually as fallback
                const { data: newProfile, error: createError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        email: email,
                        username: username,
                        emotional_dna: {
                            dominant_emotions: [],
                            color_preferences: {},
                            sensitivity_level: 0.5
                        },
                        total_songs_analyzed: 0,
                        subscription_tier: 'free'
                    })
                    .select()
                    .single();
                    
                if (createError) {
                    console.error('Manual profile creation failed:', createError);
                    return { success: true, user: authData.user }; // Still return success for auth
                }
                
                this.currentUser = newProfile;
            } else {
                this.currentUser = profile;
            }
            
            this.showUserDashboard();
            return { success: true, user: this.currentUser || authData.user };
            
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
    
    // Join emotion sharing room - Fixed version
    async joinEmotionRoom(roomCode) {
        try {
            // First check if room exists
            const { data: room, error } = await supabase
                .from('emotion_rooms')
                .select('*')
                .eq('room_code', roomCode.toUpperCase())
                .eq('is_active', true)
                .single();
                
            if (error || !room) {
                throw new Error('Room not found or inactive');
            }
            
            // Update participant count
            const { error: updateError } = await supabase
                .from('emotion_rooms')
                .update({ 
                    participants: room.participants + 1,
                    updated_at: new Date().toISOString()
                })
                .eq('room_code', roomCode.toUpperCase());
            
            if (updateError) throw updateError;
            
            // Subscribe to room updates
            this.subscribeToRoom(roomCode.toUpperCase());
            
            // Return updated room data
            room.participants += 1;
            return { success: true, room: room };
            
        } catch (error) {
            console.error('Error joining room:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Subscribe to real-time room updates - Enhanced version
    subscribeToRoom(roomCode) {
        // Unsubscribe from any existing room
        if (this.currentRoomChannel) {
            supabase.removeChannel(this.currentRoomChannel);
        }
        
        // Store current room code
        this.currentRoomCode = roomCode;
        
        // Create new subscription with presence tracking
        this.currentRoomChannel = supabase
            .channel(`room-${roomCode}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'emotion_rooms',
                    filter: `room_code=eq.${roomCode}`
                },
                (payload) => {
                    console.log('Room update received:', payload);
                    this.handleRoomUpdate(payload.new);
                }
            )
            .on('presence', { event: 'sync' }, () => {
                const state = this.currentRoomChannel.presenceState();
                const participantCount = Object.keys(state).length;
                console.log('Participants in room:', participantCount);
                
                // Update participant count in UI
                const participantsElement = document.getElementById('roomParticipants');
                if (participantsElement) {
                    participantsElement.textContent = participantCount || 1;
                }
            })
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Subscribed to room:', roomCode);
                    // Track presence
                    this.currentRoomChannel.track({
                        user: this.currentUser?.id || 'anonymous',
                        username: this.currentUser?.username || 'Guest',
                        online_at: new Date().toISOString()
                    });
                }
            });
    }
    
    // Handle room emotion updates - Enhanced version
    handleRoomUpdate(roomData) {
        if (!roomData) return;
        
        console.log('Handling room update:', roomData);
        
        // Update participant count
        const participantsElement = document.getElementById('roomParticipants');
        if (participantsElement) {
            participantsElement.textContent = roomData.participants || 1;
        }
        
        // Update room name
        const roomNameElement = document.getElementById('activeRoomName');
        if (roomNameElement) {
            roomNameElement.textContent = roomData.room_name;
        }
        
        // Update room emotion and colors with smooth transition
        if (roomData.current_colors && roomData.current_colors.length >= 3) {
            // Animate background change
            const bg = document.querySelector('.emotional-background');
            bg.style.transition = 'all 1s ease';
            bg.style.background = `
                radial-gradient(circle at 20% 50%, ${roomData.current_colors[0]}, transparent 40%),
                radial-gradient(circle at 80% 80%, ${roomData.current_colors[1]}, transparent 40%),
                radial-gradient(circle at 40% 20%, ${roomData.current_colors[2]}, transparent 40%)
            `;
            
            // Update particles if engine exists
            if (window.emotionEngine && window.emotionEngine.updateParticles) {
                const mockEmotion = {
                    colors: roomData.current_colors,
                    colorsVibrant: roomData.current_colors,
                    name: roomData.current_emotion
                };
                window.emotionEngine.currentEmotion = mockEmotion;
                window.emotionEngine.updateParticles(mockEmotion, { energy: 0.7 });
            }
        }
        
        // Show notification
        if (roomData.current_emotion && roomData.current_emotion !== 'waiting') {
            this.showNotification(`Room emotion: ${roomData.current_emotion}`);
        }
    }
    
    // Broadcast emotion changes to room
    async broadcastEmotionToRoom(emotion, colors) {
        if (!this.currentRoomCode || !this.currentUser) return;
        
        console.log('Broadcasting emotion to room:', emotion);
        
        try {
            const { error } = await supabase
                .from('emotion_rooms')
                .update({
                    current_emotion: emotion,
                    current_colors: colors,
                    updated_at: new Date().toISOString()
                })
                .eq('room_code', this.currentRoomCode)
                .eq('host_id', this.currentUser.id); // Only host can update
                
            if (error) {
                // If not host, try participant update
                const { error: participantError } = await supabase
                    .from('emotion_rooms')
                    .update({
                        current_emotion: emotion,
                        current_colors: colors,
                        updated_at: new Date().toISOString()
                    })
                    .eq('room_code', this.currentRoomCode);
                    
                if (participantError) {
                    console.error('Error broadcasting emotion:', participantError);
                }
            }
        } catch (error) {
            console.error('Error in broadcastEmotionToRoom:', error);
        }
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