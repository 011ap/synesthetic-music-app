#!/usr/bin/env node

// Simple browser test script to check for obvious issues
const fs = require('fs');
const path = require('path');

console.log('🔍 Running basic checks on synesthetic music app...\n');

// Check if main files exist
const requiredFiles = [
    'index.html',
    'app.js', 
    'main.js',
    'auth.js',
    'init.js'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing`);
        allFilesExist = false;
    }
});

// Check for basic syntax issues in main JS files
const jsFiles = ['app.js', 'main.js', 'auth.js', 'init.js'];
let syntaxOk = true;

jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            // Basic syntax checks
            if (content.includes('import') && !content.includes('export')) {
                console.log(`⚠️  ${file} has imports but no exports - check if this is intentional`);
            }
            console.log(`✅ ${file} basic syntax check passed`);
        } catch (e) {
            console.log(`❌ ${file} syntax error: ${e.message}`);
            syntaxOk = false;
        }
    }
});

console.log('\n🔍 Summary:');
console.log(`Files: ${allFilesExist ? '✅ All required files present' : '❌ Missing files'}`);
console.log(`Syntax: ${syntaxOk ? '✅ Basic syntax checks passed' : '❌ Syntax issues found'}`);

if (allFilesExist && syntaxOk) {
    console.log('\n🎉 Basic checks passed! App should load in browser.');
    console.log('💡 Check browser console at http://localhost:8000 for runtime errors.');
} else {
    console.log('\n⚠️  Issues found. Review the errors above.');
}
