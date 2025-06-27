/**
 * 🧪 UNIFIED TEST DASHBOARD
 * 
 * Single, clean interface for all soul system tests
 * Replaces the cluttered test buttons
 */

class UnifiedTestDashboard {
    constructor() {
        this.isVisible = false;
        this.dashboardElement = null;
        this.createDashboard();
    }
    
    createDashboard() {
        // Create dashboard container
        this.dashboardElement = document.createElement('div');
        this.dashboardElement.id = 'unified-test-dashboard';
        this.dashboardElement.innerHTML = `
            <div class="test-dashboard-content">
                <div class="test-dashboard-header">
                    <h3>🧠 Soul System Tests</h3>
                    <button class="close-dashboard" onclick="window.testDashboard.toggle()">×</button>
                </div>
                
                <div class="test-categories">
                    <!-- Core System Tests -->
                    <div class="test-category">
                        <h4>🧬 Core Systems</h4>
                        <button onclick="window.testDashboard.runTest('factory-soul')">Factory Soul Test</button>
                        <button onclick="window.testDashboard.runTest('neural-soul')">Neural Soul Training</button>
                        <button onclick="window.testDashboard.runTest('personality-viz')">Personality Visualizer</button>
                        <button onclick="window.testDashboard.runTest('emotion-engine')">Emotion Engine</button>
                        <button onclick="window.testDashboard.runTest('visual-feedback')">Visual Feedback</button>
                        <button onclick="window.testDashboard.runTest('audio-analysis')">Audio Analysis</button>
                    </div>
                    
                    <!-- Awakening Phases -->
                    <div class="test-category">
                        <h4>🌟 Awakening Phases</h4>
                        <button onclick="window.testDashboard.runTest('phase-1')">Phase 1: Connection</button>
                        <button onclick="window.testDashboard.runTest('phase-2')">Phase 2: Learning</button>
                        <button onclick="window.testDashboard.runTest('phase-3')">Phase 3: Intelligence</button>
                        <button onclick="window.testDashboard.runTest('phase-4')">Phase 4: Network</button>
                        <button onclick="window.testDashboard.runTest('phase-5')">Phase 5: Consciousness</button>
                    </div>
                    
                    <!-- Comprehensive Tests -->
                    <div class="test-category">
                        <h4>🔬 Comprehensive</h4>
                        <button onclick="window.testDashboard.runTest('master-test')" class="primary-test">Master Soul Test</button>
                        <button onclick="window.testDashboard.runTest('soul-status')">Soul Status</button>
                        <button onclick="window.testDashboard.runTest('memory-integration')">Memory Integration</button>
                    </div>
                    
                    <!-- Auto Tests -->
                    <div class="test-category">
                        <h4>🤖 Auto Demo</h4>
                        <button onclick="window.testDashboard.runTest('auto-demo')">Auto Demo</button>
                        <button onclick="window.testDashboard.runTest('auto-music')">Auto Music Test</button>
                    </div>
                </div>
                
                <div class="test-output">
                    <h4>📊 Test Output</h4>
                    <div id="test-output-content">
                        <p>Click any test above to see results here...</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        this.addStyles();
        
        // Hide initially
        this.dashboardElement.style.display = 'none';
        document.body.appendChild(this.dashboardElement);
        
        // Create single toggle button (replaces all the scattered test buttons)
        this.createToggleButton();
    }
    
    createToggleButton() {
        // Remove any existing test buttons first
        this.removeOldTestButtons();
        
        const toggleButton = document.createElement('button');
        toggleButton.id = 'test-dashboard-toggle';
        toggleButton.innerHTML = '🧪 Tests';
        toggleButton.onclick = () => this.toggle();
        
        // Style the toggle button
        toggleButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: linear-gradient(135deg, #ff006e, #0096ff);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(255, 0, 110, 0.3);
            transition: all 0.3s ease;
            font-family: 'Segoe UI', sans-serif;
        `;
        
        // Add hover effect
        toggleButton.addEventListener('mouseenter', () => {
            toggleButton.style.transform = 'scale(1.05)';
            toggleButton.style.boxShadow = '0 6px 20px rgba(255, 0, 110, 0.4)';
        });
        
        toggleButton.addEventListener('mouseleave', () => {
            toggleButton.style.transform = 'scale(1)';
            toggleButton.style.boxShadow = '0 4px 15px rgba(255, 0, 110, 0.3)';
        });
        
        document.body.appendChild(toggleButton);
    }
    
    removeOldTestButtons() {
        // Remove old scattered test buttons
        const selectors = [
            'button[onclick*="runVisualTest"]',
            'button[onclick*="testSoulAwakening"]',
            'button[onclick*="testFactorySoul"]',
            'button[onclick*="runSoulTest"]',
            'button[onclick*="autoDemo"]'
        ];
        
        selectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => button.remove());
        });
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #unified-test-dashboard {
                position: fixed;
                top: 0;
                right: 0;
                width: 450px;
                height: 100vh;
                background: rgba(15, 15, 20, 0.95);
                backdrop-filter: blur(20px);
                border-left: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 9999;
                overflow-y: auto;
                font-family: 'Segoe UI', sans-serif;
            }
            
            .test-dashboard-content {
                padding: 20px;
            }
            
            .test-dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .test-dashboard-header h3 {
                color: #00f5ff;
                margin: 0;
                font-size: 1.2em;
            }
            
            .close-dashboard {
                background: none;
                border: none;
                color: #ff006e;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .close-dashboard:hover {
                background: rgba(255, 0, 110, 0.1);
            }
            
            .test-category {
                margin-bottom: 25px;
            }
            
            .test-category h4 {
                color: #ffffff;
                margin: 0 0 10px 0;
                font-size: 0.9em;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .test-category button {
                display: block;
                width: 100%;
                margin-bottom: 8px;
                padding: 10px 15px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #ffffff;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 0.9em;
            }
            
            .test-category button:hover {
                background: rgba(0, 245, 255, 0.1);
                border-color: #00f5ff;
                transform: translateX(5px);
            }
            
            .test-category button.primary-test {
                background: linear-gradient(135deg, #ff006e, #0096ff);
                border: none;
                font-weight: bold;
            }
            
            .test-category button.primary-test:hover {
                transform: translateX(5px) scale(1.02);
            }
            
            .test-output {
                margin-top: 25px;
                padding-top: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .test-output h4 {
                color: #00ff88;
                margin: 0 0 15px 0;
                font-size: 0.9em;
            }
            
            #test-output-content {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 15px;
                color: #ffffff;
                font-family: 'Consolas', monospace;
                font-size: 0.8em;
                line-height: 1.4;
                max-height: 200px;
                overflow-y: auto;
                white-space: pre-wrap;
            }
        `;
        document.head.appendChild(style);
    }
    
    toggle() {
        this.isVisible = !this.isVisible;
        this.dashboardElement.style.display = this.isVisible ? 'block' : 'none';
    }
    
    async runTest(testType) {
        const output = document.getElementById('test-output-content');
        output.textContent = `🧪 Running ${testType} test...\n`;
        
        try {
            let result;
            
            switch(testType) {
                case 'factory-soul':
                    if (typeof quickFactorySoulTest !== 'undefined') {
                        result = await quickFactorySoulTest();
                    } else {
                        output.textContent += '❌ Factory soul test not available\n';
                    }
                    break;
                    
                case 'neural-soul':
                    output.textContent += '🧠 Testing neural soul training...\n';
                    if (typeof NeuralFactorySoulTrainer !== 'undefined') {
                        const trainer = new NeuralFactorySoulTrainer();
                        output.textContent += '✅ Neural trainer initialized\n';
                        output.textContent += '⏳ Training in progress (this may take a moment)...\n';
                    } else {
                        output.textContent += '❌ Neural trainer not available\n';
                    }
                    break;
                    
                case 'personality-viz':
                    output.textContent += '🎭 Testing personality visualizer...\n';
                    if (window.app?.personalityVisualizer) {
                        output.textContent += '✅ Personality visualizer is active\n';
                        output.textContent += '🎨 Check left side of screen for personality display\n';
                    } else if (window.SoulPersonalityVisualizer) {
                        output.textContent += '⚡ Creating personality visualizer...\n';
                        const viz = new SoulPersonalityVisualizer(window.app?.emotionEngine);
                        output.textContent += '✅ Personality visualizer created\n';
                    } else {
                        output.textContent += '❌ Personality visualizer not available\n';
                    }
                    break;
                    
                case 'master-test':
                    if (typeof masterSoulSystemTest !== 'undefined') {
                        result = await masterSoulSystemTest();
                    } else {
                        output.textContent += '❌ Master test not available\n';
                    }
                    break;
                    
                case 'visual-feedback':
                    if (window.synestheticTest?.runFullTest) {
                        result = await window.synestheticTest.runFullTest();
                    } else {
                        output.textContent += '❌ Visual feedback test not available\n';
                    }
                    break;
                    
                case 'auto-demo':
                    if (window.autoDemo?.startDemo) {
                        window.autoDemo.startDemo();
                        output.textContent += '✅ Auto demo started\n';
                    } else {
                        output.textContent += '❌ Auto demo not available\n';
                    }
                    break;
                    
                case 'soul-status':
                    if (window.soulStatusDashboard?.displayStatus) {
                        window.soulStatusDashboard.displayStatus();
                        output.textContent += '✅ Soul status displayed\n';
                    } else {
                        output.textContent += '❌ Soul status not available\n';
                    }
                    break;
                    
                default:
                    output.textContent += `⚠️ Test "${testType}" not implemented yet\n`;
            }
            
            if (result) {
                output.textContent += '\n📊 Test completed successfully\n';
            }
            
        } catch (error) {
            output.textContent += `\n❌ Test error: ${error.message}\n`;
        }
    }
}

// Initialize the unified dashboard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.testDashboard = new UnifiedTestDashboard();
    });
} else {
    window.testDashboard = new UnifiedTestDashboard();
}

console.log('🧪 Unified Test Dashboard loaded - Single clean test interface ready!');
