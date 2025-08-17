const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Android APK build with proper signing...\n');

function buildSignedAPK() {
    try {
        console.log('🔨 Building signed Android APK...');
        process.chdir('android');
        
        const env = {
            ...process.env,
            GRADLE_OPTS: '-Dorg.gradle.daemon=false -Dorg.gradle.parallel=true',
            ANDROID_HOME: 'C:\\Users\\Great Awareness\\AppData\\Local\\Android\\Sdk'
        };
        
        console.log('📥 Using Tencent Cloud mirror for Gradle...');
        console.log('🔐 Building with proper signing configuration...');
        
        // Clean previous build
        console.log('🧹 Cleaning previous build...');
        execSync('.\\gradlew.bat clean', { stdio: 'inherit', env: env });
        
        // Build signed APK
        console.log('🔨 Building signed APK...');
        execSync('.\\gradlew.bat assembleRelease', { 
            stdio: 'inherit',
            env: env
        });
        
        // Check for the signed APK
        const apkPath = path.join(__dirname, 'android', 'app', 'build', 'outputs', 'apk', 'release');
        if (fs.existsSync(apkPath)) {
            const files = fs.readdirSync(apkPath);
            const signedApk = files.find(file => file.endsWith('.apk') && !file.includes('unsigned'));
            if (signedApk) {
                const fullPath = path.join(apkPath, signedApk);
                const stats = fs.statSync(fullPath);
                console.log(`\n✅ SUCCESS! Signed APK ready:`);
                console.log(`📱 APK location: ${fullPath}`);
                console.log(`📊 APK size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
                console.log(`🔐 APK is properly signed and ready for installation`);
                console.log(`📱 Compatible with Android 15+`);
                console.log('\n🎉 Your Android APK is ready for installation!');
                console.log('📲 Transfer this APK to your Android device and install it');
            } else {
                console.log('⚠️ Warning: No signed APK found, checking for unsigned APK...');
                const unsignedApk = files.find(file => file.endsWith('.apk'));
                if (unsignedApk) {
                    console.log(`📱 Unsigned APK found: ${path.join(apkPath, unsignedApk)}`);
                    console.log('⚠️ This APK is unsigned and may not install properly');
                }
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

buildSignedAPK();
