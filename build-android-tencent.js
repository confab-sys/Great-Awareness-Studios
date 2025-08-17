const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Android APK build with Tencent Cloud mirror...\n');

function buildAPK() {
    try {
        console.log('🔨 Building Android APK...');
        process.chdir('android');
        
        const env = {
            ...process.env,
            GRADLE_OPTS: '-Dorg.gradle.daemon=false -Dorg.gradle.parallel=true',
            ANDROID_HOME: 'C:\\Users\\Great Awareness\\AppData\\Local\\Android\\Sdk'
        };
        
        console.log('📥 Using Tencent Cloud mirror for Gradle...');
        execSync('.\\gradlew.bat assembleRelease --no-daemon', { 
            stdio: 'inherit',
            env: env
        });
        
        const apkPath = path.join(__dirname, 'android', 'app', 'build', 'outputs', 'apk', 'release');
        if (fs.existsSync(apkPath)) {
            const files = fs.readdirSync(apkPath);
            const apkFile = files.find(file => file.endsWith('.apk'));
            if (apkFile) {
                console.log(`📱 APK ready: ${path.join(apkPath, apkFile)}`);
            }
        }
        
        process.chdir('..');
        return true;
    } catch (error) {
        console.log('❌ Build failed:', error.message);
        process.chdir('..');
        return false;
    }
}

buildAPK();
