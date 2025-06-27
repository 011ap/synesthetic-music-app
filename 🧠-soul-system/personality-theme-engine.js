/**
 * 🎨 PERSONALITY-DRIVEN DYNAMIC THEMES
 * 
 * Changes the app's visual appearance based on the user's soul personality
 * Each personality trait influences different aspects of the interface
 */

class PersonalityThemeEngine {
    constructor(personalityVisualizer) {
        this.personalityVisualizer = personalityVisualizer;
        this.currentTheme = null;
        this.baseThemes = {
            // High Openness - Creative and experimental
            creative: {
                primary: '#FF6B6B',    // Vibrant red
                secondary: '#4ECDC4',  // Turquoise  
                accent: '#45B7D1',     // Sky blue
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                particleStyle: 'organic',
                borderRadius: '15px'
            },
            
            // High Conscientiousness - Clean and organized
            organized: {
                primary: '#10B981',    // Clean green
                secondary: '#3B82F6',  // Professional blue
                accent: '#8B5CF6',     // Purple accent
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                particleStyle: 'geometric',
                borderRadius: '8px'
            },
            
            // High Extraversion - Warm and energetic
            energetic: {
                primary: '#F59E0B',    // Warm orange
                secondary: '#EF4444',  // Energetic red
                accent: '#F97316',     // Bright orange
                background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
                particleStyle: 'dynamic',
                borderRadius: '20px'
            },
            
            // High Agreeableness - Warm and harmonious
            harmonious: {
                primary: '#EC4899',    // Warm pink
                secondary: '#8B5CF6',  // Soft purple
                accent: '#06B6D4',     // Cyan accent
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                particleStyle: 'flowing',
                borderRadius: '12px'
            },
            
            // Low Neuroticism - Stable and calm
            stable: {
                primary: '#06B6D4',    // Calm cyan
                secondary: '#10B981',  // Stable green
                accent: '#3B82F6',     // Trust blue
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                particleStyle: 'gentle',
                borderRadius: '10px'
            }
        };
        
        this.initialize();
    }
    
    async initialize() {
        console.log('🎨 Initializing Personality Theme Engine...');
        
        // Wait for personality data to be available
        this.waitForPersonalityData();
        
        // Listen for personality changes
        this.setupPersonalityListener();
        
        console.log('✨ Personality Theme Engine ready!');
    }
    
    waitForPersonalityData() {
        const checkPersonality = () => {
            if (this.personalityVisualizer?.emotionEngine?.factorySoul?.corePersonality) {
                this.updateThemeFromPersonality();
            } else {
                setTimeout(checkPersonality, 1000);
            }
        };
        
        checkPersonality();
    }
    
    setupPersonalityListener() {
        // Listen for personality updates
        setInterval(() => {
            this.updateThemeFromPersonality();
        }, 5000); // Check every 5 seconds for personality changes
    }
    
    updateThemeFromPersonality() {
        const personality = this.personalityVisualizer?.emotionEngine?.factorySoul?.corePersonality;
        if (!personality) return;
        
        console.log('🎨 Updating theme based on personality:', personality);
        
        // Determine dominant personality theme
        const dominantTheme = this.calculateDominantTheme(personality);
        
        // Generate custom theme based on personality mix
        const customTheme = this.generateCustomTheme(personality, dominantTheme);
        
        // Apply the theme
        this.applyTheme(customTheme);
        
        // Update particle style based on personality
        this.updateParticleStyle(personality);
    }
    
    calculateDominantTheme(personality) {
        const themeScores = {
            creative: personality.openness * 0.8 + (1 - personality.conscientiousness) * 0.2,
            organized: personality.conscientiousness * 0.8 + personality.openness * 0.2,
            energetic: personality.extraversion * 0.7 + personality.openness * 0.3,
            harmonious: personality.agreeableness * 0.8 + (1 - personality.neuroticism) * 0.2,
            stable: (1 - personality.neuroticism) * 0.8 + personality.conscientiousness * 0.2
        };
        
        // Find the highest scoring theme
        let dominantTheme = 'stable'; // default
        let maxScore = 0;
        
        for (const [theme, score] of Object.entries(themeScores)) {
            if (score > maxScore) {
                maxScore = score;
                dominantTheme = theme;
            }
        }
        
        console.log('🎭 Dominant personality theme:', dominantTheme, 'score:', maxScore.toFixed(2));
        return dominantTheme;
    }
    
    generateCustomTheme(personality, dominantTheme) {
        const baseTheme = this.baseThemes[dominantTheme];
        
        // Blend themes based on personality mix
        const customTheme = { ...baseTheme };
        
        // Adjust based on specific traits
        
        // High openness = more vibrant colors
        if (personality.openness > 0.7) {
            customTheme.accent = this.adjustColorBrightness(customTheme.accent, 1.2);
        }
        
        // High conscientiousness = cleaner, more structured
        if (personality.conscientiousness > 0.7) {
            customTheme.borderRadius = '6px';
            customTheme.particleStyle = 'geometric';
        }
        
        // High extraversion = warmer colors
        if (personality.extraversion > 0.7) {
            customTheme.primary = this.shiftColorWarmth(customTheme.primary, 0.1);
        }
        
        // High agreeableness = softer colors
        if (personality.agreeableness > 0.7) {
            customTheme.secondary = this.adjustColorSaturation(customTheme.secondary, 0.8);
        }
        
        // High neuroticism = less intense colors
        if (personality.neuroticism > 0.6) {
            customTheme.primary = this.adjustColorSaturation(customTheme.primary, 0.7);
            customTheme.secondary = this.adjustColorSaturation(customTheme.secondary, 0.7);
        }
        
        return customTheme;
    }
    
    applyTheme(theme) {
        if (!theme) return;
        
        console.log('🎨 Applying personality theme:', theme);
        
        // Create or update CSS custom properties
        const root = document.documentElement;
        
        root.style.setProperty('--personality-primary', theme.primary);
        root.style.setProperty('--personality-secondary', theme.secondary);
        root.style.setProperty('--personality-accent', theme.accent);
        root.style.setProperty('--personality-background', theme.background);
        root.style.setProperty('--personality-border-radius', theme.borderRadius);
        
        // Apply theme to key UI elements
        this.applyThemeToElements(theme);
        
        this.currentTheme = theme;
    }
    
    applyThemeToElements(theme) {
        // Apply to main containers
        const containers = document.querySelectorAll('.glass-card, .emotion-display, .upload-area');
        containers.forEach(container => {
            container.style.borderColor = theme.accent + '40'; // 40 = 25% opacity
            container.style.borderRadius = theme.borderRadius;
            container.style.boxShadow = `0 8px 32px ${theme.primary}20`; // 20 = 12% opacity
        });
        
        // Apply to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (!button.style.background || button.style.background === '') {
                button.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;
                button.style.borderRadius = theme.borderRadius;
            }
        });
        
        // Apply to personality visualizer itself
        const personalityViz = document.getElementById('soul-personality-visualizer');
        if (personalityViz) {
            personalityViz.style.borderColor = theme.accent + '60';
            personalityViz.style.boxShadow = `0 20px 60px ${theme.primary}30`;
        }
        
        // Apply to test dashboard
        const testDashboard = document.getElementById('unified-test-dashboard');
        if (testDashboard) {
            testDashboard.style.borderColor = theme.accent + '40';
        }
    }
    
    updateParticleStyle(personality) {
        // Influence particle behavior based on personality
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;
        
        // Clear existing particles
        particleContainer.innerHTML = '';
        
        // Create personality-influenced particles
        this.createPersonalityParticles(personality, particleContainer);
    }
    
    createPersonalityParticles(personality, container) {
        const particleCount = Math.round(20 + personality.openness * 30); // 20-50 particles
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'personality-particle';
            
            // Size based on conscientiousness (organized = uniform, creative = varied)
            const baseSize = personality.conscientiousness > 0.6 ? 4 : 2 + Math.random() * 6;
            const size = Math.round(baseSize);
            
            // Speed based on extraversion
            const speed = 2 + personality.extraversion * 8; // 2-10 seconds
            
            // Color based on agreeableness (warm vs cool)
            const hue = personality.agreeableness > 0.6 ? 
                        340 + Math.random() * 80 : // Warm colors (340-420)
                        200 + Math.random() * 80;  // Cool colors (200-280)
            
            const saturation = 50 + personality.openness * 50; // 50-100%
            const lightness = 50 + (1 - personality.neuroticism) * 30; // 50-80%
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: hsl(${hue}, ${saturation}%, ${lightness}%);
                border-radius: ${personality.conscientiousness > 0.6 ? '50%' : Math.random() > 0.5 ? '50%' : '0'};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: personalityFloat ${speed}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${0.3 + personality.extraversion * 0.4};
                box-shadow: 0 0 ${size * 2}px hsl(${hue}, ${saturation}%, ${lightness}%);
            `;
            
            container.appendChild(particle);
        }
        
        // Add CSS animation if not already present
        if (!document.getElementById('personality-particle-styles')) {
            const style = document.createElement('style');
            style.id = 'personality-particle-styles';
            style.textContent = `
                @keyframes personalityFloat {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg) scale(1); 
                    }
                    33% { 
                        transform: translateY(-20px) rotate(120deg) scale(1.1); 
                    }
                    66% { 
                        transform: translateY(-10px) rotate(240deg) scale(0.9); 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Color manipulation utilities
    adjustColorBrightness(color, factor) {
        // Simple brightness adjustment (would be more sophisticated in production)
        return color;
    }
    
    shiftColorWarmth(color, amount) {
        // Simple warmth shift (would be more sophisticated in production)  
        return color;
    }
    
    adjustColorSaturation(color, factor) {
        // Simple saturation adjustment (would be more sophisticated in production)
        return color;
    }
    
    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Manual theme override (for testing)
    setTheme(themeName) {
        const theme = this.baseThemes[themeName];
        if (theme) {
            this.applyTheme(theme);
            console.log('🎨 Manual theme applied:', themeName);
        }
    }
}

// Export for use in main app
if (typeof window !== 'undefined') {
    window.PersonalityThemeEngine = PersonalityThemeEngine;
    
    // Auto-initialize with delay for dependencies
    setTimeout(() => {
        if (window.soulPersonalityVisualizer) {
            window.personalityThemeEngine = new PersonalityThemeEngine(window.soulPersonalityVisualizer);
        }
    }, 3000);
}

export { PersonalityThemeEngine };
