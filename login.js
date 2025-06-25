// === LOGIN UI SYSTEM ===

// Create login modal HTML
function createAuthModal() {
    const modalHTML = `
        <div id="authModal" class="auth-modal hidden">
            <div class="auth-container">
                <button class="close-btn" onclick="closeAuthModal()">×</button>
                
                <h2 class="auth-title">Welcome to Synesthetic</h2>
                <p class="auth-subtitle">Create your emotional profile</p>
                
                <div class="auth-tabs">
                    <button class="auth-tab active" id="loginTab" onclick="switchTab('login')">Sign In</button>
                    <button class="auth-tab" id="signupTab" onclick="switchTab('signup')">Sign Up</button>
                </div>
                
                <!-- Login Form -->
                <form id="loginForm" class="auth-form">
                    <div class="form-group">
                        <input type="email" id="loginEmail" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="loginPassword" placeholder="Password" required>
                    </div>
                    <button type="submit" class="auth-submit-btn">Sign In</button>
                </form>
                
                <!-- Signup Form -->
                <form id="signupForm" class="auth-form hidden">
                    <div class="form-group">
                        <input type="text" id="signupUsername" placeholder="Username" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="signupEmail" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="signupPassword" placeholder="Password (min 6 characters)" required minlength="6">
                    </div>
                    <button type="submit" class="auth-submit-btn">Create Account</button>
                </form>
                
                <div id="authError" class="auth-error hidden"></div>
                <div id="authSuccess" class="auth-success hidden"></div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

// Create user dashboard HTML
function createUserDashboard() {
    const dashboardHTML = `
        <div id="userDashboard" class="user-dashboard hidden">
            <div class="dashboard-header">
                <div class="user-info">
                    <span class="user-icon">👤</span>
                    <span class="username" id="displayUsername">Guest</span>
                </div>
                <button class="dashboard-btn" onclick="showEmotionalHistory()">
                    <span class="btn-icon">📊</span>
                    <span>My History</span>
                </button>
                <button class="dashboard-btn" onclick="showPlaylists()">
                    <span class="btn-icon">🎵</span>
                    <span>Playlists</span>
                </button>
                <button class="dashboard-btn" onclick="createRoom()">
                    <span class="btn-icon">🏠</span>
                    <span>Create Room</span>
                </button>
                <button class="dashboard-btn logout" onclick="handleLogout()">
                    <span class="btn-icon">🚪</span>
                    <span>Logout</span>
                </button>
            </div>
            
            <div class="emotional-stats hidden" id="emotionalStats">
                <h3>Your Emotional DNA</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value" id="totalSongs">0</div>
                        <div class="stat-label">Songs Analyzed</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="favoriteEmotion">-</div>
                        <div class="stat-label">Dominant Emotion</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="emotionalRange">-</div>
                        <div class="stat-label">Emotional Range</div>
                    </div>
                </div>
                <div class="emotion-history" id="emotionHistory"></div>
            </div>
            
            <div class="playlists-section hidden" id="playlistsSection">
                <h3>Your Emotional Playlists</h3>
                <button class="create-playlist-btn" onclick="showCreatePlaylist()">+ Create New Playlist</button>
                <div class="playlists-grid" id="playlistsGrid"></div>
            </div>
            
            <div class="room-section hidden" id="roomSection">
                <h3>Emotion Sharing Room</h3>
                <div class="room-create">
                    <input type="text" id="roomName" placeholder="Room name...">
                    <button onclick="createEmotionRoom()">Create Room</button>
                </div>
                <div class="room-join">
                    <input type="text" id="roomCode" placeholder="Enter room code...">
                    <button onclick="joinRoom()">Join Room</button>
                </div>
                <div class="active-room hidden" id="activeRoom">
                    <h4>Active Room: <span id="activeRoomName"></span></h4>
                    <p>Room Code: <span id="activeRoomCode"></span></p>
                    <p>Participants: <span id="roomParticipants"></span></p>
                    <button onclick="leaveRoom()">Leave Room</button>
                </div>
            </div>
        </div>
    `;
    
    // Add dashboard after header
    const header = document.querySelector('.header');
    header.insertAdjacentHTML('afterend', dashboardHTML);
}

// Add auth button to header
function addAuthButton() {
    const authButtonHTML = `
        <button id="authButton" class="auth-button" onclick="showAuthModal()">
            <span class="auth-icon">👤</span>
            <span>Sign In</span>
        </button>
    `;
    
    const header = document.querySelector('.header');
    header.insertAdjacentHTML('beforeend', authButtonHTML);
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    showAuthLoading(true);
    
    const result = await window.authManager.signIn(email, password);
    
    if (result.success) {
        showAuthSuccess('Welcome back!');
        setTimeout(() => {
            closeAuthModal();
            updateUIForUser(result.user);
        }, 1500);
    } else {
        showAuthError(result.error);
    }
    
    showAuthLoading(false);
}

// Handle signup
async function handleSignup(e) {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    showAuthLoading(true);
    
    const result = await window.authManager.signUp(email, password, username);
    
    if (result.success) {
        showAuthSuccess('Account created! Check your email to verify.');
        setTimeout(() => {
            closeAuthModal();
            updateUIForUser(result.user);
        }, 2000);
    } else {
        showAuthError(result.error);
    }
    
    showAuthLoading(false);
}

// Handle logout
async function handleLogout() {
    const result = await window.authManager.signOut();
    
    if (result.success) {
        updateUIForGuest();
    }
}

// Update UI for logged in user
function updateUIForUser(user) {
    // Hide auth button
    document.getElementById('authButton').style.display = 'none';
    
    // Show dashboard
    const dashboard = document.getElementById('userDashboard');
    dashboard.classList.remove('hidden');
    
    // Update username
    document.getElementById('displayUsername').textContent = user.username || user.email;
    
    // Update stats
    document.getElementById('totalSongs').textContent = user.total_songs_analyzed || 0;
    document.getElementById('favoriteEmotion').textContent = user.favorite_emotion || '-';
    
    // Calculate emotional range
    if (user.emotional_dna && user.emotional_dna.dominant_emotions) {
        const range = user.emotional_dna.dominant_emotions.length;
        document.getElementById('emotionalRange').textContent = `${range} emotions`;
    }
}

// Update UI for guest
function updateUIForGuest() {
    // Show auth button
    document.getElementById('authButton').style.display = 'flex';
    
    // Hide dashboard
    document.getElementById('userDashboard').classList.add('hidden');
    
    // Hide all sections
    document.getElementById('emotionalStats').classList.add('hidden');
    document.getElementById('playlistsSection').classList.add('hidden');
    document.getElementById('roomSection').classList.add('hidden');
}

// Show auth modal
function showAuthModal() {
    document.getElementById('authModal').classList.remove('hidden');
}

// Close auth modal
function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
    // Clear forms
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    // Clear messages
    document.getElementById('authError').classList.add('hidden');
    document.getElementById('authSuccess').classList.add('hidden');
}

// Switch between login and signup tabs
function switchTab(tab) {
    if (tab === 'login') {
        document.getElementById('loginTab').classList.add('active');
        document.getElementById('signupTab').classList.remove('active');
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('signupForm').classList.add('hidden');
    } else {
        document.getElementById('signupTab').classList.add('active');
        document.getElementById('loginTab').classList.remove('active');
        document.getElementById('signupForm').classList.remove('hidden');
        document.getElementById('loginForm').classList.add('hidden');
    }
}

// Show auth error
function showAuthError(message) {
    const errorDiv = document.getElementById('authError');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Show auth success
function showAuthSuccess(message) {
    const successDiv = document.getElementById('authSuccess');
    successDiv.textContent = message;
    successDiv.classList.remove('hidden');
}

// Show auth loading
function showAuthLoading(show) {
    const buttons = document.querySelectorAll('.auth-submit-btn');
    buttons.forEach(btn => {
        btn.disabled = show;
        btn.textContent = show ? 'Loading...' : (btn.closest('#loginForm') ? 'Sign In' : 'Create Account');
    });
}

// Show emotional history
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
                <div class="history-item">
                    <div class="history-song">${item.song_name}</div>
                    <div class="history-emotion">${item.user_emotion || item.detected_emotion} (${confidence}%)</div>
                    <div class="history-date">${date} ${time}</div>
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

// Show playlists
function showPlaylists() {
    // Hide other sections
    document.getElementById('emotionalStats').classList.add('hidden');
    document.getElementById('roomSection').classList.add('hidden');
    
    // Show playlists
    document.getElementById('playlistsSection').classList.remove('hidden');
    
    // TODO: Fetch and display playlists
}

// Create room UI
function createRoom() {
    // Hide other sections
    document.getElementById('emotionalStats').classList.add('hidden');
    document.getElementById('playlistsSection').classList.add('hidden');
    
    // Show room section
    document.getElementById('roomSection').classList.remove('hidden');
}

// Create emotion room
async function createEmotionRoom() {
    const roomName = document.getElementById('roomName').value;
    if (!roomName) {
        alert('Please enter a room name');
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
    } else {
        alert('Error creating room: ' + result.error);
    }
}

// Join room
async function joinRoom() {
    const roomCode = document.getElementById('roomCode').value;
    if (!roomCode) {
        alert('Please enter a room code');
        return;
    }
    
    const result = await window.authManager.joinEmotionRoom(roomCode);
    
    if (result.success) {
        document.getElementById('activeRoom').classList.remove('hidden');
        document.getElementById('activeRoomName').textContent = result.room.room_name;
        document.getElementById('activeRoomCode').textContent = result.room.room_code;
        document.getElementById('roomParticipants').textContent = result.room.participants;
        
        // Clear input
        document.getElementById('roomCode').value = '';
    } else {
        alert('Error joining room: ' + result.error);
    }
}

// Initialize auth UI when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createAuthModal();
    createUserDashboard();
    addAuthButton();
    
    // Override auth manager UI callbacks
    window.authManager.showUserDashboard = function() {
        if (this.currentUser) {
            updateUIForUser(this.currentUser);
        }
    };
    
    window.authManager.hideUserDashboard = function() {
        updateUIForGuest();
    };
});