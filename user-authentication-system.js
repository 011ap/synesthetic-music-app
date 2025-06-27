/**
 * 🔐 USER AUTHENTICATION & ROLE MANAGEMENT SYSTEM
 * Professional-grade user management with clear role separation
 * Admin: memoire.product@gmail.com (and designated admins)
 * Users: Everyone else (free tier with premium features during development)
 */

class UserAuthenticationSystem {
    constructor() {
        this.currentUser = null;
        this.userRole = 'guest'; // 'guest', 'user', 'admin'
        this.adminEmails = ['memoire.product@gmail.com'];
        this.isAuthenticated = false;
        this.isDevelopmentMode = true; // Free users get premium features during dev
        
        this.initializeAuthSystem();
        console.log('🔐 User Authentication System initialized');
    }

    /**
     * Initialize the authentication system
     */
    async initializeAuthSystem() {
        // Check if user is already logged in
        await this.checkExistingSession();
        
        // Setup auth UI
        this.setupAuthInterface();
        
        // Setup role-based access
        this.setupRoleBasedAccess();
        
        console.log(`🔐 Auth initialized - Role: ${this.userRole}, User: ${this.currentUser?.email || 'none'}`);
    }

    /**
     * Check for existing user session
     */
    async checkExistingSession() {
        try {
            // Check localStorage for session
            const savedSession = localStorage.getItem('synesthetic_user_session');
            if (savedSession) {
                const session = JSON.parse(savedSession);
                if (this.isValidSession(session)) {
                    this.currentUser = session.user;
                    this.userRole = this.determineUserRole(session.user.email);
                    this.isAuthenticated = true;
                    console.log('🔐 Existing session found:', this.currentUser.email);
                }
            }
            
            // If no local session, check if we have Supabase session
            if (window.supabase && !this.isAuthenticated) {
                const { data: { session } } = await window.supabase.auth.getSession();
                if (session?.user) {
                    this.currentUser = session.user;
                    this.userRole = this.determineUserRole(session.user.email);
                    this.isAuthenticated = true;
                    this.saveSessionLocally(session);
                    console.log('🔐 Supabase session found:', this.currentUser.email);
                }
            }
        } catch (error) {
            console.warn('🔐 Session check failed:', error);
        }
    }

    /**
     * Setup authentication interface
     */
    setupAuthInterface() {
        // Create auth button in top-right corner
        const authButton = document.createElement('div');
        authButton.id = 'authButton';
        authButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 80px;
            z-index: 10001;
            background: linear-gradient(135deg, rgba(15, 15, 20, 0.95), rgba(8, 8, 12, 0.95));
            border: 2px solid rgba(0, 245, 255, 0.3);
            border-radius: 25px;
            padding: 8px 15px;
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        this.updateAuthButton(authButton);
        document.body.appendChild(authButton);

        // Add click handler
        authButton.addEventListener('click', () => this.toggleAuthModal());
    }

    /**
     * Update auth button based on authentication status
     */
    updateAuthButton(button) {
        if (this.isAuthenticated) {
            const roleIcon = this.userRole === 'admin' ? '👑' : '👤';
            const roleColor = this.userRole === 'admin' ? '#ffd700' : '#00f5ff';
            
            button.innerHTML = `
                <div style="color: ${roleColor}; font-size: 14px;">${roleIcon}</div>
                <div style="color: white; font-size: 12px; max-width: 120px; overflow: hidden; text-overflow: ellipsis;">
                    ${this.currentUser.email.split('@')[0]}
                </div>
                <div style="color: #888; font-size: 10px;">▼</div>
            `;
        } else {
            button.innerHTML = `
                <div style="color: #00f5ff; font-size: 14px;">🔐</div>
                <div style="color: white; font-size: 12px;">Sign In</div>
            `;
        }
    }

    /**
     * Setup role-based access control
     */
    setupRoleBasedAccess() {
        // Apply role-based CSS classes to body
        document.body.className = document.body.className.replace(/\b(guest|user|admin)-role\b/g, '');
        document.body.classList.add(`${this.userRole}-role`);

        // Show/hide elements based on role
        this.updateUIForRole();
    }

    /**
     * Update UI elements based on user role
     */
    updateUIForRole() {
        // Admin-only elements
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = this.userRole === 'admin' ? 'block' : 'none';
        });

        // User-only elements (hide from guests)
        const userElements = document.querySelectorAll('.user-only');
        userElements.forEach(el => {
            el.style.display = this.isAuthenticated ? 'block' : 'none';
        });

        // Guest-only elements
        const guestElements = document.querySelectorAll('.guest-only');
        guestElements.forEach(el => {
            el.style.display = !this.isAuthenticated ? 'block' : 'none';
        });

        // Update mode toggle visibility
        const modeToggle = document.getElementById('modeToggle');
        if (modeToggle) {
            modeToggle.style.display = this.userRole === 'admin' ? 'block' : 'none';
        }
    }

    /**
     * Determine user role based on email
     */
    determineUserRole(email) {
        if (this.adminEmails.includes(email.toLowerCase())) {
            return 'admin';
        }
        return 'user';
    }

    /**
     * Toggle authentication modal
     */
    toggleAuthModal() {
        if (this.isAuthenticated) {
            this.showUserMenu();
        } else {
            this.showSignInModal();
        }
    }

    /**
     * Show sign-in modal
     */
    showSignInModal() {
        const modal = document.createElement('div');
        modal.id = 'authModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10002;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        `;

        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(15, 15, 20, 0.98), rgba(8, 8, 12, 0.98));
                border: 2px solid rgba(0, 245, 255, 0.3);
                border-radius: 20px;
                padding: 40px;
                max-width: 400px;
                width: 90%;
                text-align: center;
                color: white;
                font-family: 'Arial', sans-serif;
            ">
                <h2 style="color: #00f5ff; margin-bottom: 10px; font-size: 24px;">
                    🧠 Welcome to Synesthetic
                </h2>
                <p style="color: #aaa; margin-bottom: 30px; line-height: 1.5;">
                    Experience music through the eyes of digital consciousness
                </p>
                
                <div style="margin-bottom: 20px;">
                    <input type="email" id="authEmail" placeholder="Enter your email" style="
                        width: 100%;
                        padding: 12px;
                        border: 1px solid rgba(0, 245, 255, 0.3);
                        border-radius: 8px;
                        background: rgba(0, 0, 0, 0.3);
                        color: white;
                        font-size: 14px;
                        margin-bottom: 15px;
                    ">
                    <input type="password" id="authPassword" placeholder="Password" style="
                        width: 100%;
                        padding: 12px;
                        border: 1px solid rgba(0, 245, 255, 0.3);
                        border-radius: 8px;
                        background: rgba(0, 0, 0, 0.3);
                        color: white;
                        font-size: 14px;
                    ">
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button id="signInBtn" style="
                        flex: 1;
                        padding: 12px;
                        background: linear-gradient(135deg, #00f5ff, #0096ff);
                        border: none;
                        border-radius: 8px;
                        color: white;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">Sign In</button>
                    <button id="signUpBtn" style="
                        flex: 1;
                        padding: 12px;
                        background: transparent;
                        border: 1px solid rgba(0, 245, 255, 0.3);
                        border-radius: 8px;
                        color: #00f5ff;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">Sign Up</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <button id="guestModeBtn" style="
                        width: 100%;
                        padding: 10px;
                        background: transparent;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 8px;
                        color: #888;
                        cursor: pointer;
                        font-size: 12px;
                    ">Continue as Guest</button>
                </div>
                
                <button id="closeAuthModal" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: #888;
                    font-size: 20px;
                    cursor: pointer;
                ">×</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        document.getElementById('signInBtn').addEventListener('click', () => this.handleSignIn());
        document.getElementById('signUpBtn').addEventListener('click', () => this.handleSignUp());
        document.getElementById('guestModeBtn').addEventListener('click', () => this.handleGuestMode());
        document.getElementById('closeAuthModal').addEventListener('click', () => this.closeAuthModal());
        
        // Handle Enter key
        const inputs = modal.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSignIn();
            });
        });
    }

    /**
     * Show user menu for authenticated users
     */
    showUserMenu() {
        const menu = document.createElement('div');
        menu.id = 'userMenu';
        menu.style.cssText = `
            position: fixed;
            top: 60px;
            right: 80px;
            z-index: 10002;
            background: linear-gradient(135deg, rgba(15, 15, 20, 0.98), rgba(8, 8, 12, 0.98));
            border: 2px solid rgba(0, 245, 255, 0.3);
            border-radius: 15px;
            padding: 20px;
            min-width: 200px;
            color: white;
            font-family: 'Arial', sans-serif;
            backdrop-filter: blur(10px);
        `;

        const roleDisplay = this.userRole === 'admin' ? '👑 Admin' : '👤 User';
        const roleColor = this.userRole === 'admin' ? '#ffd700' : '#00f5ff';

        menu.innerHTML = `
            <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <div style="color: ${roleColor}; font-weight: bold; margin-bottom: 5px;">${roleDisplay}</div>
                <div style="color: #888; font-size: 12px;">${this.currentUser.email}</div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <button id="profileBtn" style="
                    width: 100%;
                    padding: 8px;
                    background: transparent;
                    border: 1px solid rgba(0, 245, 255, 0.2);
                    border-radius: 5px;
                    color: #00f5ff;
                    cursor: pointer;
                    margin-bottom: 8px;
                ">👤 Profile</button>
                
                ${this.userRole === 'admin' ? `
                <button id="adminPanelBtn" style="
                    width: 100%;
                    padding: 8px;
                    background: transparent;
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    border-radius: 5px;
                    color: #ffd700;
                    cursor: pointer;
                    margin-bottom: 8px;
                ">👑 Admin Panel</button>
                ` : ''}
                
                <button id="settingsBtn" style="
                    width: 100%;
                    padding: 8px;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 5px;
                    color: white;
                    cursor: pointer;
                    margin-bottom: 8px;
                ">⚙️ Settings</button>
            </div>
            
            <button id="signOutBtn" style="
                width: 100%;
                padding: 8px;
                background: transparent;
                border: 1px solid rgba(255, 0, 0, 0.3);
                border-radius: 5px;
                color: #ff6b6b;
                cursor: pointer;
            ">🚪 Sign Out</button>
        `;

        document.body.appendChild(menu);

        // Add event listeners
        document.getElementById('profileBtn').addEventListener('click', () => this.showProfile());
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());
        document.getElementById('signOutBtn').addEventListener('click', () => this.handleSignOut());
        
        if (this.userRole === 'admin') {
            document.getElementById('adminPanelBtn').addEventListener('click', () => this.showAdminPanel());
        }

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target) && !document.getElementById('authButton').contains(e.target)) {
                    this.closeUserMenu();
                }
            }, { once: true });
        }, 100);
    }

    /**
     * Handle sign in
     */
    async handleSignIn() {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;

        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        try {
            // Show loading
            document.getElementById('signInBtn').textContent = 'Signing in...';

            // If Supabase is available, use it
            if (window.supabase) {
                const { data, error } = await window.supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) throw error;

                this.currentUser = data.user;
                this.userRole = this.determineUserRole(email);
                this.isAuthenticated = true;
                this.saveSessionLocally(data);
            } else {
                // Fallback for development
                this.currentUser = { email: email, id: 'dev_' + Date.now() };
                this.userRole = this.determineUserRole(email);
                this.isAuthenticated = true;
                this.saveSessionLocally({ user: this.currentUser });
            }

            this.closeAuthModal();
            this.setupRoleBasedAccess();
            this.updateAuthButton(document.getElementById('authButton'));
            this.showWelcomeMessage();

        } catch (error) {
            console.error('Sign in failed:', error);
            alert('Sign in failed: ' + error.message);
            document.getElementById('signInBtn').textContent = 'Sign In';
        }
    }

    /**
     * Handle sign up
     */
    async handleSignUp() {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;

        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        try {
            document.getElementById('signUpBtn').textContent = 'Signing up...';

            if (window.supabase) {
                const { data, error } = await window.supabase.auth.signUp({
                    email: email,
                    password: password
                });

                if (error) throw error;

                if (data.user && !data.session) {
                    alert('Please check your email for verification link');
                    return;
                }

                this.currentUser = data.user;
                this.userRole = this.determineUserRole(email);
                this.isAuthenticated = true;
                this.saveSessionLocally(data);
            } else {
                // Fallback for development
                this.currentUser = { email: email, id: 'dev_' + Date.now() };
                this.userRole = this.determineUserRole(email);
                this.isAuthenticated = true;
                this.saveSessionLocally({ user: this.currentUser });
            }

            this.closeAuthModal();
            this.setupRoleBasedAccess();
            this.updateAuthButton(document.getElementById('authButton'));
            this.showWelcomeMessage();

        } catch (error) {
            console.error('Sign up failed:', error);
            alert('Sign up failed: ' + error.message);
            document.getElementById('signUpBtn').textContent = 'Sign Up';
        }
    }

    /**
     * Handle guest mode
     */
    handleGuestMode() {
        this.currentUser = null;
        this.userRole = 'guest';
        this.isAuthenticated = false;
        
        this.closeAuthModal();
        this.setupRoleBasedAccess();
        this.updateAuthButton(document.getElementById('authButton'));
        
        // Show guest limitations
        this.showGuestWelcome();
    }

    /**
     * Handle sign out
     */
    async handleSignOut() {
        try {
            if (window.supabase) {
                await window.supabase.auth.signOut();
            }
            
            localStorage.removeItem('synesthetic_user_session');
            this.currentUser = null;
            this.userRole = 'guest';
            this.isAuthenticated = false;
            
            this.closeUserMenu();
            this.setupRoleBasedAccess();
            this.updateAuthButton(document.getElementById('authButton'));
            
            console.log('🔐 User signed out');
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    }

    /**
     * Utility methods
     */
    saveSessionLocally(session) {
        localStorage.setItem('synesthetic_user_session', JSON.stringify(session));
    }

    isValidSession(session) {
        return session && session.user && session.user.email;
    }

    closeAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) modal.remove();
    }

    closeUserMenu() {
        const menu = document.getElementById('userMenu');
        if (menu) menu.remove();
    }

    showWelcomeMessage() {
        console.log(`🔐 Welcome ${this.currentUser.email} (${this.userRole})`);
    }

    showGuestWelcome() {
        console.log('🔐 Guest mode - limited features available');
    }

    showProfile() {
        console.log('👤 Profile view - to be implemented');
        this.closeUserMenu();
    }

    showSettings() {
        console.log('⚙️ Settings view - to be implemented');
        this.closeUserMenu();
    }

    showAdminPanel() {
        console.log('👑 Admin panel - to be implemented');
        this.closeUserMenu();
    }

    /**
     * Public API
     */
    getCurrentUser() {
        return this.currentUser;
    }

    getUserRole() {
        return this.userRole;
    }

    isAdmin() {
        return this.userRole === 'admin';
    }

    isUser() {
        return this.userRole === 'user';
    }

    isGuest() {
        return this.userRole === 'guest';
    }

    isLoggedIn() {
        return this.isAuthenticated;
    }
}

// Initialize the authentication system
window.userAuth = new UserAuthenticationSystem();

console.log('🔐 User Authentication System ready!');
