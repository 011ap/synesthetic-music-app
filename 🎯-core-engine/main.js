import * as app from './app.js';
import { createParticles, toggleTVMode, loadTVMode } from './app.js';
import { initSidebarDashboard } from '../components/sidebar-dashboard.js';

// Only initialize sidebar/dashboard here if elements exist. Auth UI is handled by auth.js for stability.
document.addEventListener('DOMContentLoaded', () => {
    // Check if sidebar elements exist before initializing
    if (document.getElementById('sidebarDashboard')) {
        initSidebarDashboard();
    } else {
        console.log('📱 Sidebar not found - running in clean interface mode');
    }
});

// Ensure all app.js exports are available on window.app for button handlers
window.app = app;

// Ensure the synesthetic core initializes after all components are loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for all modules to load
    setTimeout(() => {
        if (!window.synestheticCore && window.SynestheticCore) {
            window.synestheticCore = new window.SynestheticCore();
            console.log('🧠 Synesthetic consciousness manually initialized from main.js');
        }
    }, 100);
});

// --- Restore particles and TV mode button functionality ---
function attachMainAppListeners() {
  const micBtn = document.getElementById('micButton');
  const uploadBtn = document.getElementById('uploadButton');
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  if (micBtn) {
    // Use a global toggle for mic state
    micBtn.onclick = () => {
      if (window.app && typeof window.app.startMicAnalysis === 'function') {
        window.app.startMicAnalysis();
      } else {
        import('./app.js').then(app => {
          window.app = app;
          app.startMicAnalysis();
        });
      }
    };
  }
  if (uploadBtn) uploadBtn.onclick = (...args) => { if (window.app && window.app.showUploadSection) window.app.showUploadSection(...args); };
  if (uploadArea) uploadArea.onclick = (...args) => { if (window.app && window.app.handleUploadClick) window.app.handleUploadClick(...args); };
  if (fileInput) fileInput.onchange = (...args) => { if (window.app && window.app.handleFileUpload) window.app.handleFileUpload(...args); };
  const tvBtn = document.getElementById('tvModeBtn');
  if (tvBtn) {
    tvBtn.addEventListener('click', () => { console.log('[Main] tvModeBtn clicked'); if (window.app && window.app.toggleTVMode) window.app.toggleTVMode(); });
  }
  
  // Add player control listeners
  const playPauseBtn = document.getElementById('playPauseBtn');
  const loopBtn = document.getElementById('loopBtn');
  const closePlayer = document.getElementById('closePlayer');
  const progressBar = document.getElementById('progressBar');
  
  if (playPauseBtn) {
    playPauseBtn.onclick = () => { if (window.app && window.app.togglePlayPause) window.app.togglePlayPause(); };
  }
  if (loopBtn) {
    loopBtn.onclick = () => { if (window.app && window.app.toggleLoop) window.app.toggleLoop(); };
  }
  if (closePlayer) {
    closePlayer.onclick = () => { if (window.app && window.app.closePlayer) window.app.closePlayer(); };
  }
  if (progressBar) {
    progressBar.onclick = (event) => { if (window.app && window.app.seekTo) window.app.seekTo(event); };
  }
}

// Ensure particles are created on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      createParticles();
      loadTVMode();
      attachMainAppListeners();
    }, 100);
  });
} else {
  setTimeout(() => {
    createParticles();
    loadTVMode();
    attachMainAppListeners();
  }, 100);
}
