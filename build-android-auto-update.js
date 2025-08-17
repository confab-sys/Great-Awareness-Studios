#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Great Awareness Studio APK with Auto-Update functionality...\n');

try {
    // Check if bubblewrap is installed
    console.log('📋 Checking bubblewrap installation...');
    execSync('bubblewrap --version', { stdio: 'inherit' });
    
    // Update the manifest to ensure latest changes are included
    console.log('📝 Updating web app manifest...');
    execSync('bubblewrap update', { stdio: 'inherit' });
    
    // Build the APK with auto-update enabled
    console.log('🔨 Building APK with auto-update functionality...');
    execSync('bubblewrap build', { stdio: 'inherit' });
    
    // Check if APK was created
    const apkPath = path.join(__dirname, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
    if (fs.existsSync(apkPath)) {
        console.log('\n✅ APK built successfully with auto-update functionality!');
        console.log(`📱 APK location: ${apkPath}`);
        console.log('\n🔧 Auto-update features enabled:');
        console.log('   • Automatic update checks every hour');
        console.log('   • Background service for update monitoring');
        console.log('   • Network connectivity monitoring');
        console.log('   • Seamless updates from Vercel website');
        console.log('\n📋 To install on device:');
        console.log('   adb install android/app/build/outputs/apk/debug/app-debug.apk');
    } else {
        console.log('\n❌ APK not found. Build may have failed.');
        process.exit(1);
    }
    
} catch (error) {
    console.error('\n❌ Build failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure bubblewrap is installed: npm install -g @bubblewrap/cli');
    console.log('   2. Check that Android SDK is properly configured');
    console.log('   3. Verify that all dependencies are installed');
    process.exit(1);
}
