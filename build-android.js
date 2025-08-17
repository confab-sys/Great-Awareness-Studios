const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Android APK build process...\n');

// Check if Vercel deployment is accessible
function checkVercelDeployment() {
    try {
        console.log('📡 Checking if Vercel deployment is accessible...');
        const response = execSync('curl -s -o nul -w "%{http_code}" https://great-awareness-studio-9ps8i1rg4-confab-sys-projects.vercel.app', { encoding: 'utf8' });
        if (response.trim() === '200') {
            console.log('✅ Vercel deployment is accessible');
            return true;
        } else {
            console.log('❌ Vercel deployment is not responding properly');
            return false;
        }
    } catch (error) {
        console.log('❌ Cannot connect to Vercel deployment. Please check your deployment first.');
        return false;
    }
}

// Initialize Bubblewrap project
function initBubblewrap() {
    try {
        console.log('\n🔧 Initializing Bubblewrap project...');
        
        // Check if android directory already exists
        if (fs.existsSync('android')) {
            console.log('📁 Android directory already exists, skipping initialization');
            return true;
        }
        
        execSync('npx @bubblewrap/cli init --manifest https://great-awareness-studio-9ps8i1rg4-confab-sys-projects.vercel.app/manifest.json --directory android', { 
            stdio: 'inherit' 
        });
        
        console.log('✅ Bubblewrap project initialized successfully');
        return true;
    } catch (error) {
        console.log('❌ Failed to initialize Bubblewrap project:', error.message);
        return false;
    }
}

// Build the APK
function buildAPK() {
    try {
        console.log('\n🔨 Building Android APK...');
        
        // Change to android directory
        process.chdir('android');
        
        // Build the APK
        execSync('npx @bubblewrap/cli build', { 
            stdio: 'inherit' 
        });
        
        console.log('✅ APK built successfully!');
        
        // Find the APK file
        const apkPath = path.join(__dirname, 'android', 'app', 'release');
        if (fs.existsSync(apkPath)) {
            const files = fs.readdirSync(apkPath);
            const apkFile = files.find(file => file.endsWith('.apk'));
            if (apkFile) {
                console.log(`📱 APK location: ${path.join(apkPath, apkFile)}`);
                console.log('\n🎉 Your Android APK is ready!');
                console.log('📲 You can now install it on your Android device');
            }
        }
        
        // Change back to original directory
        process.chdir('..');
        return true;
    } catch (error) {
        console.log('❌ Failed to build APK:', error.message);
        process.chdir('..');
        return false;
    }
}

// Main build process
async function main() {
    console.log('Great Awareness Studio - Android APK Builder\n');
    console.log('This script will:');
    console.log('1. Check if your Vercel deployment is accessible');
    console.log('2. Initialize Bubblewrap project (if needed)');
    console.log('3. Build the Android APK');
    console.log('4. Provide you with the APK file location\n');
    
    // Step 1: Check Vercel deployment
    if (!checkVercelDeployment()) {
        console.log('\n💡 Please check your Vercel deployment first:');
        console.log('   https://great-awareness-studio-9ps8i1rg4-confab-sys-projects.vercel.app');
        console.log('\nThen run this script again.');
        process.exit(1);
    }
    
    // Step 2: Initialize Bubblewrap
    if (!initBubblewrap()) {
        console.log('\n❌ Failed to initialize Bubblewrap project');
        process.exit(1);
    }
    
    // Step 3: Build APK
    if (!buildAPK()) {
        console.log('\n❌ Failed to build APK');
        process.exit(1);
    }
    
    console.log('\n🎊 Build process completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Transfer the APK to your Android device');
    console.log('2. Enable "Install from unknown sources" in Android settings');
    console.log('3. Install the APK on your device');
    console.log('4. Enjoy your native Android app!');
}

// Run the build process
main().catch(error => {
    console.error('❌ Build process failed:', error);
    process.exit(1);
});
