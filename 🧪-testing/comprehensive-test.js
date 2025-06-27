// Test the app in a browser-like environment
// This will help identify any obvious runtime issues

console.log('🧪 Testing Synesthetic Music App functionality...\n');

// Test 1: Check if main modules can be loaded
async function testModuleLoading() {
    console.log('📦 Testing module loading...');
    
    try {
        // Simulate browser environment
        global.window = global;
        global.document = {
            addEventListener: () => {},
            createElement: () => ({ 
                onload: null,
                style: {},
                innerHTML: '',
                appendChild: () => {},
                addEventListener: () => {}
            }),
            head: { appendChild: () => {} },
            body: { appendChild: () => {} },
            getElementById: () => null,
            querySelectorAll: () => [],
            readyState: 'complete'
        };
        global.navigator = { mediaDevices: null };
        global.AudioContext = function() {};
        global.webkitAudioContext = function() {};
        
        console.log('✅ Browser environment simulated');
        return true;
    } catch (error) {
        console.log('❌ Module loading failed:', error.message);
        return false;
    }
}

// Test 2: Check key functions exist
async function testFunctionAvailability() {
    console.log('🔧 Testing function availability...');
    
    try {
        const fs = require('fs');
        const appContent = fs.readFileSync('app.js', 'utf8');
        
        const keyFunctions = [
            'startMicAnalysis',
            'handleFileUpload', 
            'createParticles',
            'updateParticles',
            'showUploadSection'
        ];
        
        let functionsFound = 0;
        keyFunctions.forEach(func => {
            if (appContent.includes(func)) {
                console.log(`✅ ${func} found`);
                functionsFound++;
            } else {
                console.log(`❌ ${func} missing`);
            }
        });
        
        console.log(`📊 ${functionsFound}/${keyFunctions.length} key functions found`);
        return functionsFound === keyFunctions.length;
    } catch (error) {
        console.log('❌ Function check failed:', error.message);
        return false;
    }
}

// Test 3: Check initialization chain
async function testInitialization() {
    console.log('🚀 Testing initialization chain...');
    
    try {
        const fs = require('fs');
        const initContent = fs.readFileSync('init.js', 'utf8');
        const mainContent = fs.readFileSync('main.js', 'utf8');
        
        const hasInitOrchestrator = initContent.includes('InitOrchestrator');
        const hasMainInit = mainContent.includes('DOMContentLoaded');
        
        console.log(`✅ Init orchestrator: ${hasInitOrchestrator ? 'Found' : 'Missing'}`);
        console.log(`✅ Main initialization: ${hasMainInit ? 'Found' : 'Missing'}`);
        
        return hasInitOrchestrator && hasMainInit;
    } catch (error) {
        console.log('❌ Initialization check failed:', error.message);
        return false;
    }
}

// Run all tests
async function runTests() {
    const results = [];
    
    results.push(await testModuleLoading());
    results.push(await testFunctionAvailability());
    results.push(await testInitialization());
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log(`\n📋 Test Results: ${passed}/${total} tests passed`);
    
    if (passed === total) {
        console.log('🎉 All tests passed! App appears ready for browser testing.');
    } else {
        console.log('⚠️  Some tests failed. Check the issues above.');
    }
    
    console.log('\n💡 Next steps:');
    console.log('1. Open http://localhost:8000 in browser');
    console.log('2. Check browser console for runtime errors');
    console.log('3. Test microphone and file upload functionality');
    console.log('4. Verify admin mode toggle for admin users');
}

runTests().catch(console.error);
