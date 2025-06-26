import * as app from './app.js';
import { createParticles, toggleTVMode, loadTVMode } from './app.js';
import { initSidebarDashboard } from './components/sidebar-dashboard.js';

// Only initialize sidebar/dashboard here. Auth UI is handled by auth.js for stability.
initSidebarDashboard();

// Ensure all app.js exports are available on window.app for button handlers
window.app = app;

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
}

// Ensure particles are created on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    loadTVMode();
    attachMainAppListeners();
  });
} else {
  createParticles();
  loadTVMode();
  attachMainAppListeners();
}
