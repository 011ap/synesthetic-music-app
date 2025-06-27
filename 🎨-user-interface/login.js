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
    // Skip creating dashboard - using clean interface
    console.log('📱 Skipping dashboard creation - using clean interface');
    return;
}

// Add auth button to header (if not already present)
function addAuthButton() {
    // Skip creating auth button - using custom auth button in new interface
    console.log('📱 Skipping auth button creation - using custom interface');
    return;
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
    // Hide sign in button and show user profile
    const authBtn = document.getElementById('authBtn');
    const userProfile = document.getElementById('userProfile');
    const userDisplayName = document.getElementById('userDisplayName');
    
    if (authBtn && userProfile && userDisplayName) {
        authBtn.style.display = 'none';
        userProfile.style.display = 'block';
        userDisplayName.textContent = user.username || user.email.split('@')[0];
    }
    
    // Set up user dropdown functionality
    setupUserDropdown();
    
    // Check if admin user and show admin options + Neural Interface
    if (user && user.email === 'memoire.product@gmail.com') {
        showAdminOptions();
        showNeuralInterfaceButton();
    }
    
    // Update status to show authenticated state
    const statusText = document.getElementById('statusText');
    if (statusText) {
        statusText.textContent = 'Welcome back! Ready to Feel Music';
    }
    
    console.log('👤 UI updated for user:', user.email);
}

// Update UI for guest
function updateUIForGuest() {
    // Show auth button and hide user profile
    const authBtn = document.getElementById('authBtn');
    const userProfile = document.getElementById('userProfile');
    
    if (authBtn && userProfile) {
        authBtn.style.display = 'block';
        authBtn.textContent = 'Sign In';
        authBtn.classList.remove('authenticated');
        userProfile.style.display = 'none';
    }
    
    // Hide admin options and Neural Interface
    hideAdminOptions();
    hideNeuralInterfaceButton();
    
    // Update status to show guest mode
    const statusText = document.getElementById('statusText');
    if (statusText) {
        statusText.textContent = 'Ready to Feel Music';
    }
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

// Set up user dropdown functionality
function setupUserDropdown() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileOption = document.getElementById('profileOption');
    
    if (userBtn && userDropdown) {
        // Toggle dropdown on click
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
            userBtn.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
                userBtn.classList.remove('active');
            }
        });
    }
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            handleLogout();
        });
    }
    
    // Handle profile (placeholder for now)
    if (profileOption) {
        profileOption.addEventListener('click', () => {
            console.log('Profile clicked - feature coming soon');
            userDropdown.classList.remove('show');
            userBtn.classList.remove('active');
        });
    }
}

// Show admin options in dropdown
function showAdminOptions() {
    const adminItems = document.querySelectorAll('.admin-only');
    adminItems.forEach(item => {
        item.classList.add('visible');
    });
}

// Hide admin options in dropdown
function hideAdminOptions() {
    const adminItems = document.querySelectorAll('.admin-only');
    adminItems.forEach(item => {
        item.classList.remove('visible');
    });
}

// Show Neural Interface button for admin
function showNeuralInterfaceButton() {
    let neuralBtn = document.getElementById('neuralInterfaceBtn');
    if (!neuralBtn) {
        // Create button if it doesn't exist - call the global function
        if (typeof window.addNeuralInterfaceButton === 'function') {
            neuralBtn = window.addNeuralInterfaceButton();
        } else {
            // Create it manually if the function isn't available yet
            neuralBtn = document.createElement('button');
            neuralBtn.id = 'neuralInterfaceBtn';
            neuralBtn.className = 'neural-interface-btn';
            neuralBtn.innerHTML = '🧠 Neural Interface';
            neuralBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #8a2be2, #4169e1);
                border: none;
                border-radius: 25px;
                padding: 15px 25px;
                color: white;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 8px 25px rgba(138, 43, 226, 0.4);
                backdrop-filter: blur(20px);
            `;
            
            neuralBtn.addEventListener('click', () => {
                console.log('🧠 Neural Interface activated');
                if (typeof window.showRevolutionaryInterface === 'function') {
                    window.showRevolutionaryInterface();
                } else {
                    // Fallback to auth manager admin mode
                    if (window.authManager && typeof window.authManager.switchToAdminMode === 'function') {
                        window.authManager.switchToAdminMode();
                    }
                }
            });
            
            neuralBtn.addEventListener('mouseenter', () => {
                neuralBtn.style.transform = 'translateY(-5px) scale(1.05)';
                neuralBtn.style.boxShadow = '0 15px 35px rgba(138, 43, 226, 0.6)';
            });
            
            neuralBtn.addEventListener('mouseleave', () => {
                neuralBtn.style.transform = 'translateY(0) scale(1)';
                neuralBtn.style.boxShadow = '0 8px 25px rgba(138, 43, 226, 0.4)';
            });
            
            document.body.appendChild(neuralBtn);
        }
    }
    if (neuralBtn) {
        neuralBtn.style.display = 'block';
    }
}

// Hide Neural Interface button
function hideNeuralInterfaceButton() {
    const neuralBtn = document.getElementById('neuralInterfaceBtn');
    if (neuralBtn) {
        neuralBtn.style.display = 'none';
    }
}

// Export functions for module imports
export { 
    createUserDashboard, 
    updateUIForUser, 
    createAuthModal,
    showAuthModal,
    closeAuthModal,
    addAuthButton,
    showNeuralInterfaceButton,
    hideNeuralInterfaceButton,
    handleLogout,
    switchTab
};