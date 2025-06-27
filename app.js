// === COMPLETE APP.JS FILE ===

// === MICROPHONE ANALYSIS STATE ===
let isListening = false;
let micStream = null;
let micAnalyzer = null;

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
    console.log('[DEBUG] updateSynestheticDisplay called', {emotion, features});
    const display = document.getElementById('synestheticDisplay');
    if (!display) {
        console.warn('[Visualizer] #synestheticDisplay not found!');
        return;
    }
    console.log('[Visualizer] updateSynestheticDisplay', {emotion, features});
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

export function updateParticles(emotion, features) {
    const particles = document.querySelectorAll('.particle');
    if (!particles.length) {
        console.warn('[Visualizer] No .particle elements found! Creating them...');
        createParticles();
        // Try again after creating particles
        const newParticles = document.querySelectorAll('.particle');
        if (!newParticles.length) {
            console.error('[Visualizer] Failed to create particles!');
            return;
        }
        console.log('[Visualizer] Successfully created particles');
    }
    
    const activeParticles = document.querySelectorAll('.particle');
    console.log('[Visualizer] updateParticles', {emotion, features, particleCount: activeParticles.length});
    
    const isTVMode = document.body.classList.contains('tv-mode');
    const colors = isTVMode ? emotion.colorsVibrant : emotion.colors;
    
    activeParticles.forEach((particle, index) => {
        const colorIndex = index % colors.length;
        particle.style.background = colors[colorIndex];
        particle.style.opacity = features.energy * (isTVMode ? 1 : 0.8);
        particle.style.transform = `scale(${0.5 + features.energy * (isTVMode ? 2 : 1)})`;
        particle.style.boxShadow = `0 0 ${10 + features.energy * 20}px ${colors[colorIndex]}`;
    });
}

export function updateBackgroundColors(colors) {
    console.log('[Visualizer] updateBackgroundColors', colors);
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
    if (!container) {
        console.warn('[Particles] Container #emotionParticles not found!');
        return;
    }
    
    console.log('[Particles] Creating 60 particles...');
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
    
    console.log('[Particles] Created 60 particles successfully');
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
    
    if (!audio || !progressBar) {
        console.warn('[Player] Audio element or progress bar not found');
        return;
    }
    
    const clickX = event.offsetX;
    const width = progressBar.offsetWidth;
    const duration = audio.duration;
    
    if (duration && !isNaN(duration)) {
        const newTime = (clickX / width) * duration;
        
        // Important: If audio has ended, we need to restart analysis
        if (audio.ended) {
            console.log('[Player] Audio ended - restarting analysis for seek');
            // Restart analysis without stopping/starting everything
            if (window.audioAnalyzer) {
                window.audioAnalyzer.isAnalyzing = true;
                if (window.audioAnalyzer.setupAnalysisLoop) {
                    window.audioAnalyzer.setupAnalysisLoop();
                }
            }
        }
        
        // Set the new time
        audio.currentTime = newTime;
        
        // Always start playing when seeking (user expects playback)
        audio.play().then(() => {
            const playPauseBtn = document.getElementById('playPauseBtn');
            if (playPauseBtn) {
                playPauseBtn.textContent = '⏸';
            }
            console.log('[Player] Seeked to:', newTime, 'seconds and resumed playback');
        }).catch(error => {
            console.warn('[Player] Could not resume playback:', error);
        });
    }
}

export function toggleLoop() {
    const btn = document.getElementById('loopBtn');
    const audio = document.getElementById('audioElement');
    window.isLooping = !window.isLooping;
    audio.loop = window.isLooping;
    if (window.isLooping) {
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
  const body = document.body;
  body.classList.toggle('tv-mode');
  const isTVMode = body.classList.contains('tv-mode');
  
  // Save to localStorage
  localStorage.setItem('tvMode', isTVMode);
  
  // Update button text
  const tvBtn = document.getElementById('tvModeBtn');
  if (tvBtn) {
    tvBtn.textContent = isTVMode ? '📱 Normal' : '📺 TV Mode';
  }
  
  console.log(`[TV Mode] ${isTVMode ? 'Enabled' : 'Disabled'}`);
}

export function loadTVMode() {
  const savedTVMode = localStorage.getItem('tvMode') === 'true';
  if (savedTVMode) {
    document.body.classList.add('tv-mode');
    const tvBtn = document.getElementById('tvModeBtn');
    if (tvBtn) {
      tvBtn.textContent = '📱 Normal';
    }
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

// === UPLOAD FUNCTIONALITY ===
export function showUploadSection() {
  console.log('[Upload] showUploadSection called');
  const uploadSection = document.getElementById('uploadSection');
  if (uploadSection) {
    uploadSection.classList.toggle('hidden');
    console.log('[Upload] Upload section visibility toggled');
  } else {
    console.error('[Upload] uploadSection element not found');
  }
}

export function handleUploadClick() {
  console.log('[Upload] handleUploadClick called');
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.click();
  }
}

export async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    console.log('[Upload] No file selected');
    return;
  }
  
  console.log('[Upload] File selected:', file.name, file.type);
  
  // Validate file type
  if (!file.type.startsWith('audio/')) {
    alert('Please select an audio file');
    return;
  }
  
  try {
    // Create audio URL
    const audioUrl = URL.createObjectURL(file);
    
    // Start file analysis using audio analyzer
    if (window.audioAnalyzer && window.audioAnalyzer.startFileAnalysis) {
      console.log('[Upload] Starting file analysis...');
      await window.audioAnalyzer.startFileAnalysis(audioUrl, file.name);
    } else {
      console.warn('[Upload] Audio analyzer not available, importing...');
      const audioAnalyzer = await import('./components/audio-analyzer.js');
      if (audioAnalyzer.startFileAnalysis) {
        await audioAnalyzer.startFileAnalysis(audioUrl, file.name);
      } else {
        console.error('[Upload] Audio analyzer startFileAnalysis function not found');
      }
    }
    
    // Also trigger visual feedback immediately with a basic emotion
    const uploadEmotion = {
      primary: 'Upload Processing',
      confidence: 85,
      depth: 60,
      intensity: 0.7,
      synestheticColors: ['#4ECDC4', '#44A08D', '#093637'],
      features: { energy: 0.7, bass: 50, mid: 60, treble: 40 }
    };
    
    // Trigger visual feedback
    if (window.synestheticCore?.updateEmotionalConsciousness) {
      window.synestheticCore.updateEmotionalConsciousness(uploadEmotion);
    }
    
    console.log('[Upload] File upload and analysis initiated');
    
  } catch (error) {
    console.error('[Upload] Error processing file:', error);
    alert('Error processing audio file: ' + error.message);
  }
}

// === MIC FUNCTIONALITY ===
export async function startMicAnalysis() {
  console.log('[Mic] startMicAnalysis called, current state:', isListening);
  
  if (isListening) {
    // Stop listening
    stopMicAnalysis();
    return;
  }
  
  // Start listening
  console.log('[Mic] Starting microphone analysis...');
  
  // 🧠 Start analysis session for memory tracking
  if (window.emotionEngine && window.emotionEngine.startAnalysisSession) {
    window.emotionEngine.startAnalysisSession('mic');
  }
  
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      micStream = stream;
      isListening = true;
      
      // Update button state
      const micBtn = document.getElementById('micButton');
      if (micBtn) {
        micBtn.textContent = '🛑 Stop';
        micBtn.classList.add('active');
      }
      
      // Set up audio analysis
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      micAnalyzer = audioContext.createAnalyser();
      micAnalyzer.fftSize = 2048;
      source.connect(micAnalyzer);
      
      // Create data array
      const dataArray = new Uint8Array(micAnalyzer.frequencyBinCount);
      
      // Start analysis loop
      function analyzeMic() {
        if (!isListening) return;
        
        micAnalyzer.getByteFrequencyData(dataArray);
        
        // Calculate basic features
        let energy = 0;
        let bass = 0, mid = 0, treble = 0;
        
        for (let i = 0; i < dataArray.length; i++) {
          energy += dataArray[i];
          if (i < dataArray.length * 0.15) bass += dataArray[i];
          else if (i < dataArray.length * 0.5) mid += dataArray[i];
          else treble += dataArray[i];
        }
        
        energy /= dataArray.length;
        bass /= (dataArray.length * 0.15);
        mid /= (dataArray.length * 0.35);
        treble /= (dataArray.length * 0.5);
        
        // Only process if there's significant audio
        if (energy > 10) {
          // 🧠 PHASE 1: USE REAL EMOTION ENGINE INSTEAD OF PRIMITIVE LOGIC
          let micState;
          
          if (window.emotionEngine && window.emotionEngine.analyze) {
            // Use advanced AI emotion detection
            console.log('[Soul Awakening] Using EmotionEngine for mic analysis');
            try {
              micState = window.emotionEngine.analyze(dataArray);
              console.log('[Soul Awakening] EmotionEngine result:', micState);
            } catch (error) {
              console.warn('[Soul Awakening] EmotionEngine failed, falling back to primitive logic:', error);
              micState = null;
            }
          }
          
          // Fallback to primitive logic if EmotionEngine not available
          if (!micState) {
            console.log('[Soul Awakening] Using primitive emotion detection (fallback)');
            let primary = 'Listening', color = '#4ECDC4';
            
            if (energy > 100) {
              primary = 'Energetic'; color = '#FF6B6B';
            } else if (energy > 50) {
              primary = 'Active'; color = '#FFD700';
            } else if (bass > mid && bass > treble) {
              primary = 'Deep'; color = '#667eea';
            }
            
            micState = {
              primary,
              confidence: Math.min(100, Math.round(energy)),
              depth: Math.round((mid + treble) * 2),
              intensity: Math.min(1, energy / 100),
              synestheticColors: [color, '#FF69B4', '#4ECDC4'],
              features: { energy: energy / 255, bass, mid, treble }
            };
          }
          
          // Trigger visual feedback
          if (window.synestheticCore?.updateEmotionalConsciousness && micState) {
            window.synestheticCore.updateEmotionalConsciousness(micState);
          }
        }
        
        // Continue analysis
        requestAnimationFrame(analyzeMic);
      }
      
      analyzeMic();
      console.log('[Mic] Microphone analysis started successfully');
      
    })
    .catch(error => {
      console.error('[Mic] Error accessing microphone:', error);
      alert('Error accessing microphone. Please ensure microphone permissions are granted.');
    });
}

export function stopMicAnalysis() {
  console.log('[Mic] Stopping microphone analysis...');
  
  isListening = false;
  
  // 🧠 End analysis session for memory tracking
  if (window.emotionEngine && window.emotionEngine.endAnalysisSession) {
    window.emotionEngine.endAnalysisSession();
  }
  
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }
  
  micAnalyzer = null;
  
  // Update button state
  const micBtn = document.getElementById('micButton');
  if (micBtn) {
    micBtn.textContent = '🎤 Live';
    micBtn.classList.remove('active');
  }
  
  console.log('[Mic] Microphone analysis stopped');
}

// Ensure particles are created on DOM ready with multiple safety checks
function ensureParticlesExist() {
    const container = document.getElementById('emotionParticles');
    if (!container) {
        console.warn('[Particles] Container not found, retrying...');
        return false;
    }
    
    const existingParticles = container.querySelectorAll('.particle');
    if (existingParticles.length === 0) {
        console.log('[Particles] No particles found, creating them...');
        createParticles();
        return true;
    } else {
        console.log(`[Particles] ${existingParticles.length} particles already exist`);
        return true;
    }
}

// Multiple checks to ensure particles are created
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => ensureParticlesExist(), 100);
    setTimeout(() => ensureParticlesExist(), 500);
    setTimeout(() => ensureParticlesExist(), 1000);
});

// Also check when the app loads
if (document.readyState !== 'loading') {
    setTimeout(() => ensureParticlesExist(), 100);
}

// Create window.app assignments AFTER DOM is ready to avoid module loading issues
function setupWindowApp() {
    // Ensure all app.js exports are available on window.app for button handlers
    window.app = {
        updateSynestheticDisplay,
        updateParticles,
        updateBackgroundColors,
        createParticles,
        togglePlayPause,
        seekTo,
        toggleLoop,
        closePlayer,
        updateTimeDisplay,
        formatTime,
        showUploadSection,
        handleUploadClick,
        handleFileUpload,
        startMicAnalysis,
        stopMicAnalysis,
        toggleTVMode,
        loadTVMode,
        
        // Initialize soul personality visualizer
        personalityVisualizer: null,
        themeEngine: null,
        
        // Add startFileAnalysis as a proxy to audioAnalyzer
        startFileAnalysis: async (audioUrl, fileName) => {
            if (window.audioAnalyzer && window.audioAnalyzer.startFileAnalysis) {
                return await window.audioAnalyzer.startFileAnalysis(audioUrl, fileName);
            } else {
                console.warn('[App] AudioAnalyzer not available');
                throw new Error('AudioAnalyzer not available');
            }
        }
    };
    
    // Initialize personality visualizer when emotion engine is ready
    setTimeout(() => {
        if (window.SoulPersonalityVisualizer && window.app.emotionEngine) {
            window.app.personalityVisualizer = new SoulPersonalityVisualizer(window.app.emotionEngine);
            console.log('🎭 Soul Personality Visualizer initialized');
            
            // Initialize theme engine with personality visualizer
            if (window.PersonalityThemeEngine) {
                window.app.themeEngine = new PersonalityThemeEngine(window.app.personalityVisualizer);
                console.log('🎨 Personality Theme Engine initialized');
            }
        } else {
            console.log('⏳ Waiting for emotion engine to initialize personality visualizer...');
            // Try again in a bit
            setTimeout(() => {
                if (window.SoulPersonalityVisualizer && window.app.emotionEngine) {
                    window.app.personalityVisualizer = new SoulPersonalityVisualizer(window.app.emotionEngine);
                    console.log('🎭 Soul Personality Visualizer initialized (delayed)');
                    
                    // Initialize theme engine
                    if (window.PersonalityThemeEngine) {
                        window.app.themeEngine = new PersonalityThemeEngine(window.app.personalityVisualizer);
                        console.log('🎨 Personality Theme Engine initialized (delayed)');
                    }
                }
            }, 3000);
        }
    }, 1000);
}

// Setup window.app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWindowApp);
} else {
    setupWindowApp();
}