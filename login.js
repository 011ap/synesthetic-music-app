// === LOGIN UI SYSTEM ===

// Only export functions, do not create UI on import

// Create login modal HTML (if not already present)
function createAuthModal() {
    if (document.getElementById('authModal')) return;
    const modalHTML = `
        <div id="authModal" class="auth-modal hidden" style="display:none;">
            <div class="auth-container">
                <button class="close-btn" onclick="closeAuthModal()">&times;</button>
                <h2 class="auth-title">Welcome to Synesthetic</h2>
                <p class="auth-subtitle">Create your emotional profile</p>
                <div class="auth-tabs">
                    <button class="auth-tab active" id="loginTab" type="button">Sign In</button>
                    <button class="auth-tab" id="signupTab" type="button">Sign Up</button>
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
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('authModal').style.display = 'none';
    // Attach tab event listeners robustly
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    if (loginTab && signupTab) {
        loginTab.onclick = () => switchTab('login');
        signupTab.onclick = () => switchTab('signup');
    } else {
        console.warn('Auth modal tabs not found!');
    }
    // Always show only the sign in form by default
    switchTab('login');
}

// Create user dashboard HTML
function createUserDashboard() {
    // Remove any existing dashboard to avoid duplicate nodes and listeners
    document.getElementById('userDashboard')?.remove();
    const dashboardHTML = `
        <div id="userDashboard" class="user-dashboard hidden">
            <div class="dashboard-header">
                <div class="user-info">
                    <span class="user-icon">👤</span>
                    <span class="username" id="displayUsername">Guest</span>
                </div>
                <button class="dashboard-btn" id="historyBtn">
                    <span class="btn-icon">📊</span>
                    <span>My History</span>
                </button>
                <button class="dashboard-btn" id="playlistsBtn">
                    <span class="btn-icon">🎵</span>
                    <span>Playlists</span>
                </button>
                <button class="dashboard-btn" id="roomBtn">
                    <span class="btn-icon">🏠</span>
                    <span>Create Room</span>
                </button>
                <button class="dashboard-btn logout" id="logoutBtn">
                    <span class="btn-icon">🔪</span>
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
                <button class="create-playlist-btn" id="createPlaylistBtn">+ Create New Playlist</button>
                <div class="playlists-grid" id="playlistsGrid"></div>
            </div>
            <div class="room-section hidden" id="roomSection">
                <h3>Emotion Sharing Room</h3>
                <div class="room-create">
                    <input type="text" id="roomName" placeholder="Room name...">
                    <button id="createRoomBtn">Create Room</button>
                </div>
                <div class="room-join">
                    <input type="text" id="roomCode" placeholder="Enter room code...">
                    <button id="joinRoomBtn">Join Room</button>
                </div>
                <div class="active-room hidden" id="activeRoom">
                    <h4>Active Room: <span id="activeRoomName"></span></h4>
                    <p>Room Code: <span id="activeRoomCode"></span></p>
                    <p>Participants: <span id="roomParticipants"></span></p>
                    <button id="leaveRoomBtn">Leave Room</button>
                </div>
            </div>
        </div>
    `;
    const header = document.querySelector('.header');
    header.insertAdjacentHTML('afterend', dashboardHTML);
    // Always start with all dashboard sections hidden except header
    setTimeout(() => {
      document.getElementById('emotionalStats')?.classList.add('hidden');
      document.getElementById('playlistsSection')?.classList.add('hidden');
      document.getElementById('roomSection')?.classList.add('hidden');
      // Attach event listeners programmatically ONLY
      const historyBtn = document.getElementById('historyBtn');
      const playlistsBtn = document.getElementById('playlistsBtn');
      const roomBtn = document.getElementById('roomBtn');
      const logoutBtn = document.getElementById('logoutBtn');
      if (historyBtn) historyBtn.addEventListener('click', () => {
        console.log('[Dashboard] showEmotionalHistory called');
        document.getElementById('emotionalStats')?.classList.remove('hidden');
        document.getElementById('playlistsSection')?.classList.add('hidden');
        document.getElementById('roomSection')?.classList.add('hidden');
      });
      if (playlistsBtn) playlistsBtn.addEventListener('click', () => {
        console.log('[Dashboard] showPlaylists called');
        document.getElementById('emotionalStats')?.classList.add('hidden');
        document.getElementById('playlistsSection')?.classList.remove('hidden');
        document.getElementById('roomSection')?.classList.add('hidden');
      });
      if (roomBtn) roomBtn.addEventListener('click', () => {
        console.log('[Dashboard] createRoom called');
        document.getElementById('emotionalStats')?.classList.add('hidden');
        document.getElementById('playlistsSection')?.classList.add('hidden');
        document.getElementById('roomSection')?.classList.remove('hidden');
      });
      if (logoutBtn) logoutBtn.addEventListener('click', () => {
        console.log('[Dashboard] handleLogout called');
        handleLogout();
      });
    }, 0);
}

// Add auth button to header (if not already present)
function addAuthButton() {
    if (document.getElementById('authButton')) return;
    const authButtonHTML = `
        <button id="authButton" class="auth-button">
            <span class="auth-icon">👤</span>
            <span>Sign In</span>
        </button>
    `;
    const header = document.querySelector('.header');
    header.insertAdjacentHTML('beforeend', authButtonHTML);
    document.getElementById('authButton').onclick = showAuthModal;
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
        // Remove dashboard from DOM for clean state
        document.getElementById('userDashboard')?.remove();
    }
}

// Update UI for logged in user
function updateUIForUser(user) {
    // Always (re)create dashboard to guarantee listeners are attached
    createUserDashboard();
    // Hide auth button
    const authBtn = document.getElementById('authButton');
    if (authBtn) authBtn.style.display = 'none';
    // Show dashboard
    const dashboard = document.getElementById('userDashboard');
    if (dashboard) {
        dashboard.classList.remove('hidden');
        // Update username
        const usernameSpan = document.getElementById('displayUsername');
        if (usernameSpan && user && (user.username || user.email)) {
            usernameSpan.textContent = user.username || user.email;
        }
        // Always start with all dashboard sections hidden except header
        setTimeout(() => {
            document.getElementById('emotionalStats')?.classList.add('hidden');
            document.getElementById('playlistsSection')?.classList.add('hidden');
            document.getElementById('roomSection')?.classList.add('hidden');
        }, 0);
    } else {
        console.warn('[updateUIForUser] Dashboard not found!');
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
    const modal = document.getElementById('authModal');
    if (modal) {
        switchTab('login'); // Always reset to sign in form
        // Defensive: forcibly hide sign up form and show sign in form
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        if (loginForm && signupForm) {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            loginForm.style.display = '';
            signupForm.style.display = 'none';
        }
        modal.classList.remove('hidden');
        modal.style.display = 'block';
    } else {
        console.warn('Auth modal not found when trying to show!');
    }
}

// Close auth modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    // Clear forms
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    // Clear messages
    document.getElementById('authError').classList.add('hidden');
    document.getElementById('authSuccess').classList.add('hidden');
}

// Switch between login and signup tabs
function switchTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    console.log('[switchTab] called with:', tab, {loginTab, signupTab, loginForm, signupForm});
    if (!loginTab || !signupTab || !loginForm || !signupForm) {
        console.warn('Auth modal elements missing for tab switch!');
        return;
    }
    if (tab === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginForm.style.display = '';
        signupForm.style.display = 'none';
    } else {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupForm.style.display = '';
        loginForm.style.display = 'none';
    }
}
window.switchTab = switchTab;

// Show auth error
function showAuthError(message) {
    const errorDiv = document.getElementById('authError');
    const successDiv = document.getElementById('authSuccess');
    if (successDiv) {
        successDiv.classList.add('hidden');
        successDiv.textContent = '';
    }
    if (errorDiv) {
        if (message) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        } else {
            errorDiv.textContent = '';
            errorDiv.classList.add('hidden');
        }
    }
}

function showAuthSuccess(message) {
    const errorDiv = document.getElementById('authError');
    const successDiv = document.getElementById('authSuccess');
    if (errorDiv) {
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';
    }
    if (successDiv) {
        if (message) {
            successDiv.textContent = message;
            successDiv.classList.remove('hidden');
        } else {
            successDiv.textContent = '';
            successDiv.classList.add('hidden');
        }
    }
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

// Global error handler for debugging
window.onerror = function(message, source, lineno, colno, error) {
  console.error('[Global Error]', message, 'at', source + ':' + lineno + ':' + colno, error);
};

// Attach global functions for modal/tab switching (for HTML event handlers)
window.closeAuthModal = closeAuthModal;
window.showAuthModal = showAuthModal;
window.switchTab = switchTab;
// Attach dashboard handlers to window for robust event binding
window.handleLogout = function() {
  console.log('[Dashboard] handleLogout called');
  return handleLogout();
};
window.showEmotionalHistory = function() {
  console.log('[Dashboard] showEmotionalHistory called');
  document.getElementById('emotionalStats')?.classList.remove('hidden');
  document.getElementById('playlistsSection')?.classList.add('hidden');
  document.getElementById('roomSection')?.classList.add('hidden');
};
window.showPlaylists = function() {
  console.log('[Dashboard] showPlaylists called');
  document.getElementById('emotionalStats')?.classList.add('hidden');
  document.getElementById('playlistsSection')?.classList.remove('hidden');
  document.getElementById('roomSection')?.classList.add('hidden');
};
window.createRoom = function() {
  console.log('[Dashboard] createRoom called');
  document.getElementById('emotionalStats')?.classList.add('hidden');
  document.getElementById('playlistsSection')?.classList.add('hidden');
  document.getElementById('roomSection')?.classList.remove('hidden');
};

// Convert to ES module: export all major functions
export {
  createAuthModal,
  createUserDashboard,
  addAuthButton,
  handleLogin,
  handleSignup,
  handleLogout,
  updateUIForUser,
  updateUIForGuest,
  showAuthModal,
  closeAuthModal,
  switchTab,
  showAuthError,
  showAuthSuccess,
  showAuthLoading,
  showPlaylists,
  createRoom,
  createEmotionRoom,
  joinRoom
};

// Remove global window assignments and DOMContentLoaded block
// Instead, export all functions for import elsewhere