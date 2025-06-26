import { createParticles, toggleTVMode, loadTVMode } from './app.js';
import { initSidebarDashboard } from './components/sidebar-dashboard.js';

// Only initialize sidebar/dashboard here. Auth UI is handled by auth.js for stability.
initSidebarDashboard();

// --- Restore particles and TV mode button functionality ---
function attachMainAppListeners() {
  if (document.getElementById('micButton')) {
    import('./app.js').then(app => {
      document.getElementById('micButton').onclick = app.startMicAnalysis;
      document.getElementById('uploadButton').onclick = app.showUploadSection;
      document.getElementById('uploadArea').onclick = app.handleUploadClick;
      document.getElementById('fileInput').onchange = app.handleFileUpload;
    });
  }
  if (document.getElementById('tvModeBtn')) {
    document.getElementById('tvModeBtn').addEventListener('click', toggleTVMode);
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
