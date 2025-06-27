// Sidebar Dashboard Logic for Synesthetic Music App
// Extracted from index.html for modularity and maintainability

export function initSidebarDashboard() {
    // Check if sidebar elements exist (for compatibility with clean interface)
    const sidebar = document.getElementById('sidebarDashboard');
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const closeBtn = document.getElementById('sidebarCloseBtn');
    
    // Only initialize if sidebar exists
    if (!sidebar || !toggleBtn || !closeBtn) {
        console.log('📱 Sidebar elements not found - using clean interface mode');
        return;
    }
    
    const sectionToggles = document.querySelectorAll('.section-toggle');

    // Sidebar open/close
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });
    closeBtn.addEventListener('click', () => {
        sidebar.classList.add('hidden');
    });

    // Collapsible sections
    sectionToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.parentElement.querySelector('.section-content');
            content.classList.toggle('hidden');
        });
    });

    // === Train My Soul: Data Collection Logic ===
    const trainSoulForm = document.getElementById('trainSoulForm');
    const emotionLabelInput = document.getElementById('emotionLabelInput');
    const featuresInput = document.getElementById('featuresInput');
    const trainSoulStatus = document.getElementById('trainSoulStatus');
    const trainingExamplesList = document.getElementById('trainingExamplesList');
    const trainSoulBtn = document.getElementById('trainSoulBtn');
    const downloadTrainingDataBtn = document.getElementById('downloadTrainingDataBtn');
    const clearTrainingDataBtn = document.getElementById('clearTrainingDataBtn');
    const importTrainingDataBtn = document.getElementById('importTrainingDataBtn');
    const importTrainingDataInput = document.getElementById('importTrainingDataInput');
    let trainingExamples = [];

    function updateTrainingExamplesList() {
        if (!trainingExamples.length) {
            trainingExamplesList.innerHTML = '<span style="opacity:0.6;">No training examples yet.</span>';
            return;
        }
        trainingExamplesList.innerHTML = trainingExamples.map((ex, i) => {
            const keys = Object.keys(ex.features).slice(0,2);
            const preview = keys.map(k => `${k}: ${JSON.stringify(ex.features[k])}`).join(', ');
            return `<div style='margin-bottom:0.3em;'><b>${i+1}.</b> <span style='color:var(--synesthetic-teal);'>${ex.label}</span> <span style='opacity:0.7;'>(${preview}${Object.keys(ex.features).length>2?', ...':''})</span></div>`;
        }).join('');
    }
    function safeUpdateListAndStatus(fn) {
        fn();
        updateTrainingExamplesList();
    }
    // Form submit
    trainSoulForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const label = emotionLabelInput.value.trim();
        let features;
        try {
            features = JSON.parse(featuresInput.value);
        } catch (err) {
            trainSoulStatus.textContent = 'Invalid JSON in features.';
            trainSoulStatus.style.color = '#ff006e';
            return;
        }
        if (!label || typeof features !== 'object') {
            trainSoulStatus.textContent = 'Please provide both a label and valid features.';
            trainSoulStatus.style.color = '#ff006e';
            return;
        }
        safeUpdateListAndStatus(() => trainingExamples.push({ label, features }));
        trainSoulStatus.textContent = `Added! Total examples: ${trainingExamples.length}`;
        trainSoulStatus.style.color = 'var(--synesthetic-green)';
        trainSoulForm.reset();
    });
    // Clear
    clearTrainingDataBtn.addEventListener('click', () => {
        if (!trainingExamples.length) {
            trainSoulStatus.textContent = 'No training examples to clear.';
            trainSoulStatus.style.color = '#ff006e';
            return;
        }
        if (confirm('Are you sure you want to clear all training examples? This cannot be undone.')) {
            safeUpdateListAndStatus(() => trainingExamples = []);
            trainSoulStatus.textContent = 'Training examples cleared.';
            trainSoulStatus.style.color = 'var(--synesthetic-red)';
        }
    });
    // Train
    trainSoulBtn.addEventListener('click', async () => {
        if (!window.emotionEngine || typeof window.emotionEngine.trainOnUserData !== 'function') {
            trainSoulStatus.textContent = 'Neural net not loaded.';
            trainSoulStatus.style.color = '#ff006e';
            return;
        }
        if (!trainingExamples.length) {
            trainSoulStatus.textContent = 'Add at least one training example first.';
            trainSoulStatus.style.color = '#ff006e';
            return;
        }
        trainSoulStatus.textContent = 'Training...';
        trainSoulStatus.style.color = 'var(--synesthetic-blue)';
        try {
            await window.emotionEngine.trainOnUserData(trainingExamples);
            safeUpdateListAndStatus(() => trainingExamples = []);
            trainSoulStatus.textContent = 'Training complete! Your soul is smarter.';
            trainSoulStatus.style.color = 'var(--synesthetic-green)';
        } catch (err) {
            trainSoulStatus.textContent = 'Training failed: ' + (err && err.message ? err.message : err);
            trainSoulStatus.style.color = '#ff006e';
        }
    });
    // Download
    downloadTrainingDataBtn.addEventListener('click', () => {
        if (!trainingExamples.length) {
            trainSoulStatus.textContent = 'No training examples to download.';
            trainSoulStatus.style.color = '#ff006e';
            return;
        }
        const blob = new Blob([JSON.stringify(trainingExamples, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-soul-training-data.json';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        trainSoulStatus.textContent = 'Training data downloaded!';
        trainSoulStatus.style.color = 'var(--synesthetic-gold)';
    });
    // Import
    importTrainingDataBtn.addEventListener('click', () => {
        importTrainingDataInput.value = '';
        importTrainingDataInput.click();
    });
    importTrainingDataInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const imported = JSON.parse(evt.target.result);
                if (!Array.isArray(imported)) throw new Error('File must be a JSON array.');
                let added = 0;
                imported.forEach(ex => {
                    if (ex && typeof ex === 'object' && typeof ex.label === 'string' && typeof ex.features === 'object') {
                        trainingExamples.push({ label: ex.label, features: ex.features });
                        added++;
                    }
                });
                updateTrainingExamplesList();
                if (added) {
                    trainSoulStatus.textContent = `Imported ${added} example(s)! Total: ${trainingExamples.length}`;
                    trainSoulStatus.style.color = 'var(--synesthetic-blue)';
                } else {
                    trainSoulStatus.textContent = 'No valid examples found in file.';
                    trainSoulStatus.style.color = '#ff006e';
                }
            } catch (err) {
                trainSoulStatus.textContent = 'Import failed: ' + (err && err.message ? err.message : err);
                trainSoulStatus.style.color = '#ff006e';
            }
        };
        reader.readAsText(file);
    });
    // === Feedback Section for Emotion Correction ===
    const feedbackSection = document.createElement('div');
    feedbackSection.style = 'margin-top:1.5em;padding:1em;background:rgba(0,245,255,0.04);border-radius:0.7em;';
    feedbackSection.innerHTML = `
        <div style="font-size:1em;margin-bottom:0.5em;color:var(--text-secondary);">Was the detected emotion correct?</div>
        <button id="emotionFeedbackYes" style="margin-right:0.7em;background:var(--synesthetic-green);color:#111;border:none;padding:0.4em 1em;border-radius:0.7em;font-weight:500;cursor:pointer;">Yes</button>
        <button id="emotionFeedbackNo" style="background:var(--synesthetic-red);color:#fff;border:none;padding:0.4em 1em;border-radius:0.7em;font-weight:500;cursor:pointer;">No</button>
        <div id="emotionCorrectionForm" style="margin-top:0.7em;display:none;">
            <input type="text" id="correctEmotionInput" placeholder="What was the correct emotion?" style="width:70%;margin-right:0.5em;" />
            <button id="submitCorrectionBtn" style="background:var(--synesthetic-blue);color:#fff;border:none;padding:0.4em 1em;border-radius:0.7em;font-weight:500;cursor:pointer;">Submit Correction</button>
        </div>
        <div id="feedbackStatus" style="margin-top:0.5em;font-size:0.95em;color:var(--text-tertiary);"></div>
    `;
    // Insert feedback section at the end of Train My Soul section
    const trainSoulSection = document.querySelector('.sidebar-section .section-content');
    if (trainSoulSection) trainSoulSection.appendChild(feedbackSection);

    // Feedback logic
    const feedbackStatus = document.getElementById('feedbackStatus');
    document.getElementById('emotionFeedbackYes').onclick = () => {
        feedbackStatus.textContent = 'Thanks for your feedback!';
        feedbackStatus.style.color = 'var(--synesthetic-green)';
        document.getElementById('emotionCorrectionForm').style.display = 'none';
        // Optionally: call engine to reinforce correct prediction
        if (window.emotionEngine && typeof window.emotionEngine.learnFromCorrection === 'function') {
            window.emotionEngine.learnFromCorrection({ correct: true });
        }
    };
    document.getElementById('emotionFeedbackNo').onclick = () => {
        document.getElementById('emotionCorrectionForm').style.display = 'block';
        feedbackStatus.textContent = '';
    };
    document.getElementById('submitCorrectionBtn').onclick = () => {
        const correctLabel = document.getElementById('correctEmotionInput').value.trim();
        if (!correctLabel) {
            feedbackStatus.textContent = 'Please enter the correct emotion.';
            feedbackStatus.style.color = '#ff006e';
            return;
        }
        if (window.emotionEngine && typeof window.emotionEngine.learnFromCorrection === 'function') {
            window.emotionEngine.learnFromCorrection({ correct: false, correctLabel });
        }
        feedbackStatus.textContent = 'Correction submitted! Your soul is learning.';
        feedbackStatus.style.color = 'var(--synesthetic-blue)';
        document.getElementById('emotionCorrectionForm').style.display = 'none';
        document.getElementById('correctEmotionInput').value = '';
    };

    // Initial render
    updateTrainingExamplesList();
}
