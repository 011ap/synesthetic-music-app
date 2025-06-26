// === COMPLETE APP.JS FILE ===

// === CONTINUATION OF EMOTIONAL INTELLIGENCE ENGINE ===
// These methods extend the EmotionalIntelligenceEngine class

export function calculateEmotionalDepth(features) {
    const complexity = (features.bass * 0.2 + features.mid * 0.3 + features.treble * 0.2 + 
                      features.spectralCentroid * 0.3) / 255;
    
    if (complexity > 0.8) {
        return { level: 'Profound', description: 'Multi-layered emotional complexity detected' };
    } else if (complexity > 0.6) {
        return { level: 'Deep', description: 'Rich emotional texture with nuanced feelings' };
    } else if (complexity > 0.4) {
        return { level: 'Moderate', description: 'Clear emotional expression with some depth' };
    } else {
        return { level: 'Surface', description: 'Simple, direct emotional expression' };
    }
}

export function updateSynestheticDisplay(emotion, features) {
    const display = document.getElementById('synestheticDisplay');
    const colorIntensity = Math.round(features.energy * 100);
    const isTVMode = document.body.classList.contains('tv-mode');
    const colors = isTVMode ? emotion.colorsVibrant : emotion.colors;
    
    display.innerHTML = `
        <div style="display: flex; gap: 8px; margin-bottom: 12px; justify-content: center;">
            ${colors.map(color => `
                <div style="width: 40px; height: 40px; background: ${color}; 
                           border-radius: 8px; opacity: ${features.energy};
                           box-shadow: 0 0 20px ${color}; transition: all 0.3s;"></div>
            `).join('')}
        </div>
        <div style="font-size: 0.9rem;">
            <div>Primary: ${colors[0]}</div>
            <div>Intensity: ${colorIntensity}%</div>
            <div>Resonance: ${emotion.key}</div>
        </div>
    `;
}

export function updateBackgroundColors(colors) {
    const bg = document.querySelector('.emotional-background');
    const opacity = document.body.classList.contains('tv-mode') ? '1' : '0.7';
    bg.style.background = `
        radial-gradient(circle at 20% 50%, ${colors[0]}, transparent 30%),
        radial-gradient(circle at 80% 80%, ${colors[1]}, transparent 30%),
        radial-gradient(circle at 40% 20%, ${colors[2]}, transparent 30%)
    `;
    bg.style.opacity = opacity;
}

export function createParticles() {
    const container = document.getElementById('emotionParticles');
    container.innerHTML = ''; // Clear existing
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 8) + 's';
        container.appendChild(particle);
    }
}

export function updateParticles(emotion, features) {
    const particles = document.querySelectorAll('.particle');
    const isTVMode = document.body.classList.contains('tv-mode');
    const colors = isTVMode ? emotion.colorsVibrant : emotion.colors;
    
    particles.forEach((particle, index) => {
        const colorIndex = index % colors.length;
        particle.style.background = colors[colorIndex];
        particle.style.opacity = features.energy * (isTVMode ? 1 : 0.8);
        particle.style.transform = `scale(${0.5 + features.energy * (isTVMode ? 2 : 1)})`;
        particle.style.boxShadow = `0 0 ${10 + features.energy * 20}px ${colors[colorIndex]}`;
    });
}

export function togglePlayPause() {
    const audio = document.getElementById('audioElement');
    const btn = document.getElementById('playPauseBtn');
    
    if (audio.paused) {
        audio.play();
        btn.textContent = '⏸';
    } else {
        audio.pause();
        btn.textContent = '▶';
    }
}

export function seekTo(event) {
    const audio = document.getElementById('audioElement');
    const progressBar = document.getElementById('progressBar');
    const clickX = event.offsetX;
    const width = progressBar.offsetWidth;
    const duration = audio.duration;
    
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
}

export function toggleLoop() {
    const btn = document.getElementById('loopBtn');
    const audio = document.getElementById('audioElement');
    
    this.isLooping = !this.isLooping;
    audio.loop = this.isLooping;
    
    if (this.isLooping) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

export function closePlayer() {
    const audioPlayer = document.getElementById('audioPlayer');
    const audio = document.getElementById('audioElement');
    
    // Stop audio
    audio.pause();
    audio.currentTime = 0;
    
    // Hide player
    audioPlayer.classList.remove('active');
    
    // Stop analysis if from file
    if (this.isAnalyzing && !this.source?.mediaStream) {
        this.stopAnalysis();
    }
}

export function updateTimeDisplay() {
    const audio = document.getElementById('audioElement');
    const currentTime = document.getElementById('currentTime');
    const progressFill = document.getElementById('progressFill');
    
    if (audio.duration) {
        currentTime.textContent = this.formatTime(audio.currentTime);
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
    }
}

export function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function toggleTVMode() {
    const btn = document.getElementById('tvModeBtn');
    const body = document.body;
    
    body.classList.toggle('tv-mode');
    btn.classList.toggle('active');
    
    // Save preference
    localStorage.setItem('tvMode', body.classList.contains('tv-mode'));
    
    // Update current colors if analyzing
    if (this.currentEmotion) {
        const colors = body.classList.contains('tv-mode') ? 
            this.currentEmotion.colorsVibrant : this.currentEmotion.colors;
        this.updateBackgroundColors(colors);
    }
}

export function loadTVMode() {
    const tvMode = localStorage.getItem('tvMode') === 'true';
    if (tvMode) {
        document.body.classList.add('tv-mode');
        document.getElementById('tvModeBtn').classList.add('active');
    }
}

export function stopAnalysis() {
    this.isAnalyzing = false;
    if (this.source) {
        if (this.source.mediaStream) {
            this.source.mediaStream.getTracks().forEach(track => track.stop());
        }
        this.source.disconnect();
    }
    this.updateStatus('Ready to Feel Music', false);
}

export function updateStatus(text, active) {
    document.getElementById('statusText').textContent = text;
    const indicator = document.getElementById('statusIndicator');
    if (active) {
        indicator.classList.add('active');
    } else {
        indicator.classList.remove('active');
    }
}

// === FIX FOR CREATE ROOM AND PLAYLIST FEATURES ===

// Override the create room function
window.createEmotionRoom = async function() {
    const roomName = document.getElementById('roomName').value;
    if (!roomName) {
        alert('Please enter a room name');
        return;
    }
    
    if (!window.authManager || !window.authManager.currentUser) {
        alert('Please sign in to create a room');
        return;
    }
    
    const result = await window.authManager.createEmotionRoom(roomName);
    
    if (result.success) {
        document.getElementById('activeRoom').classList.remove('hidden');
        document.getElementById('activeRoomName').textContent = result.room.room_name;
        document.getElementById('activeRoomCode').textContent = result.room.room_code;
        document.getElementById('roomParticipants').textContent = result.room.participants;
        
        // Clear input
        document.getElementById('roomName').value = '';
        
        // Show success notification
        showNotification(`Room created! Code: ${result.room.room_code}`);
    } else {
        alert('Error creating room: ' + result.error);
    }
};

// Add playlist creation modal
window.showCreatePlaylist = function() {
    // Remove any existing modal first
    const existingModal = document.querySelector('.playlist-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'playlist-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="playlist-modal-content" style="
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            position: relative;
        ">
            <button class="close-btn" onclick="this.closest('.playlist-modal').remove()" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.6);
                font-size: 2rem;
                cursor: pointer;
            ">×</button>
            
            <h3 style="color: #4ECDC4; margin-bottom: 1rem;">Create Emotional Playlist</h3>
            
            <input type="text" id="playlistName" placeholder="Playlist name..." style="
                width: 100%;
                margin: 1rem 0;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 0.75rem;
                color: white;
                font-size: 1rem;
            ">
            
            <select id="targetEmotion" style="
                width: 100%;
                margin: 1rem 0;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 0.75rem;
                color: white;
                font-size: 1rem;
            ">
                <option value="">Select target emotion...</option>
                <option value="joy">Euphoric Joy</option>
                <option value="sadness">Melancholic Depth</option>
                <option value="energy">Dynamic Power</option>
                <option value="calm">Serene Peace</option>
                <option value="mystery">Enigmatic Wonder</option>
            </select>
            
            <button onclick="createPlaylist()" style="
                width: 100%;
                background: linear-gradient(135deg, #4ECDC4, #45B7D1);
                border: none;
                border-radius: 10px;
                padding: 0.75rem;
                color: white;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Create Playlist</button>
        </div>
    `;
    
    document.body.appendChild(modal);
};

window.createPlaylist = async function() {
    const name = document.getElementById('playlistName').value;
    const emotion = document.getElementById('targetEmotion').value;
    
    if (!name || !emotion) {
        alert('Please fill in all fields');
        return;
    }
    
    const result = await window.authManager.createPlaylist(name, emotion);
    
    if (result.success) {
        document.querySelector('.playlist-modal').remove();
        showNotification('Playlist created successfully!');
        // Refresh playlists display
        window.showPlaylists();
    } else {
        alert('Error creating playlist: ' + result.error);
    }
};

// Update showEmotionalHistory to show correct data
window.showEmotionalHistory = async function() {
    // Hide other sections
    document.getElementById('playlistsSection').classList.add('hidden');
    document.getElementById('roomSection').classList.add('hidden');
    
    // Show stats
    const statsSection = document.getElementById('emotionalStats');
    statsSection.classList.remove('hidden');
    
    // Fetch history
    const history = await window.authManager.getEmotionalHistory(10);
    
    // Display history with correct formatting
    const historyDiv = document.getElementById('emotionHistory');
    historyDiv.innerHTML = '<h4>Recent Analyses</h4>';
    
    if (history.length === 0) {
        historyDiv.innerHTML += '<p class="no-data">No songs analyzed yet. Start playing music!</p>';
    } else {
        history.forEach(item => {
            const date = new Date(item.created_at).toLocaleDateString();
            const time = new Date(item.created_at).toLocaleTimeString();
            const confidence = item.emotion_confidence || 0;
            
            historyDiv.innerHTML += `
                <div class="history-item" style="
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 10px;
                    margin-bottom: 0.5rem;
                ">
                    <div class="history-song" style="font-weight: 600;">${item.song_name}</div>
                    <div class="history-emotion" style="color: #45B7D1;">${item.user_emotion || item.detected_emotion} (${confidence}%)</div>
                    <div class="history-date" style="color: rgba(255, 255, 255, 0.6); text-align: right;">${date} ${time}</div>
                </div>
            `;
        });
    }
    
    // Update user stats
    if (window.authManager.currentUser) {
        const user = window.authManager.currentUser;
        document.getElementById('totalSongs').textContent = user.total_songs_analyzed || 0;
        document.getElementById('favoriteEmotion').textContent = user.favorite_emotion || 'None yet';
        
        // Calculate emotional range from history
        const uniqueEmotions = new Set(history.map(h => h.detected_emotion));
        document.getElementById('emotionalRange').textContent = `${uniqueEmotions.size} types`;
    }
};

// Override showPlaylists to actually show them
window.showPlaylists = async function() {
    // Hide other sections
    document.getElementById('emotionalStats').classList.add('hidden');
    document.getElementById('roomSection').classList.add('hidden');
    
    // Show playlists
    const playlistsSection = document.getElementById('playlistsSection');
    playlistsSection.classList.remove('hidden');
    
    // Fetch user's playlists
    if (!window.authManager || !window.authManager.currentUser) {
        return;
    }
    
    try {
        const { data: playlists, error } = await supabase
            .from('emotional_playlists')
            .select('*')
            .eq('user_id', window.authManager.currentUser.id)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        const playlistsGrid = document.getElementById('playlistsGrid');
        playlistsGrid.innerHTML = '';
        
        if (playlists && playlists.length > 0) {
            playlists.forEach(playlist => {
                const playlistCard = document.createElement('div');
                playlistCard.style.cssText = `
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                
                playlistCard.innerHTML = `
                    <h4 style="color: #4ECDC4; margin-bottom: 0.5rem;">${playlist.playlist_name}</h4>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Target: ${playlist.target_emotion}</p>
                    <p style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">${playlist.songs.length} songs</p>
                `;
                
                playlistCard.addEventListener('mouseenter', () => {
                    playlistCard.style.transform = 'translateY(-3px)';
                    playlistCard.style.borderColor = '#4ECDC4';
                });
                
                playlistCard.addEventListener('mouseleave', () => {
                    playlistCard.style.transform = 'translateY(0)';
                    playlistCard.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                });
                
                playlistsGrid.appendChild(playlistCard);
            });
        } else {
            playlistsGrid.innerHTML = '<p style="text-align: center; color: rgba(255, 255, 255, 0.5);">No playlists yet. Create your first one!</p>';
        }
    } catch (error) {
        console.error('Error fetching playlists:', error);
    }
};

// Leave room functionality
window.leaveRoom = async function() {
    if (!window.authManager || !window.authManager.currentRoomCode) return;
    
    try {
        // Update participant count
        const { data: room } = await supabase
            .from('emotion_rooms')
            .select('participants')
            .eq('room_code', window.authManager.currentRoomCode)
            .single();
            
        if (room && room.participants > 0) {
            await supabase
                .from('emotion_rooms')
                .update({ 
                    participants: Math.max(0, room.participants - 1) 
                })
                .eq('room_code', window.authManager.currentRoomCode);
        }
        
        // Unsubscribe
        if (window.authManager.currentRoomChannel) {
            supabase.removeChannel(window.authManager.currentRoomChannel);
        }
        
        // Clear UI
        document.getElementById('activeRoom').classList.add('hidden');
        window.authManager.currentRoomCode = null;
        window.authManager.currentRoomChannel = null;
        
        showNotification('Left the room');
    } catch (error) {
        console.error('Error leaving room:', error);
    }
};

// Simple notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(78, 205, 196, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        animation: slideUp 0.3s ease;
        z-index: 1000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Add styles for playlist modal
const playlistModalStyles = `
<style>
.playlist-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.playlist-modal-content {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    position: relative;
}

.playlist-modal-content h3 {
    color: #4ECDC4;
    margin-bottom: 1rem;
}

.playlist-modal-content input,
.playlist-modal-content select {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 0.75rem;
    color: white;
    font-size: 1rem;
}

.playlist-modal-content button {
    background: linear-gradient(135deg, #4ECDC4, #45B7D1);
    border: none;
    border-radius: 10px;
    padding: 0.75rem;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.playlist-modal-content button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(78, 205, 196, 0.4);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateX(-50%) translateY(50px); opacity: 0; }
    to { transform: translateX(-50%) translateY(0); opacity: 1; }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', playlistModalStyles);

// Convert app.js to an ES module by exporting all major functions
// and removing global window assignments and DOMContentLoaded.
// This prepares the file for modular imports and prevents global conflicts.