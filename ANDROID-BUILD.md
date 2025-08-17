# Android APK Build Guide

## Overview

This guide will help you build your Great Awareness Studio PWA into a native Android APK using Google's Bubblewrap tool.

## Prerequisites

### Required Software:
1. **Java JDK 11 or higher** ✅ (You have OpenJDK 17)
2. **Android Studio** (for Android SDK)
3. **Node.js** ✅ (Already installed)
4. **Bubblewrap CLI** ✅ (Available via npx)

### Android SDK Setup:
1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio and install the Android SDK
3. Set the `ANDROID_HOME` environment variable to your SDK location
4. Add `platform-tools` to your PATH

## Quick Start

### 1. Start Your Server
```bash
npm start
```

### 2. Build the APK
```bash
npm run build-apk
```

This will:
- Check if your server is running
- Initialize the Bubblewrap project
- Build the Android APK
- Show you where to find the APK file

## Manual Build Process

If you prefer to build manually:

### 1. Initialize Bubblewrap Project
```bash
npm run android-init
```

### 2. Build the APK
```bash
npm run android-build
```

### 3. Find Your APK
The APK will be located in: `android/app/release/`

## Configuration Files

### bubblewrap.json
- Main configuration for production builds
- Uses HTTPS URLs for Google Play Store compatibility

### bubblewrap-local.json
- Configuration for local development builds
- Uses HTTP URLs for local testing

## Features Included

### App Features:
- ✅ Native Android app experience
- ✅ Home screen installation
- ✅ App shortcuts (Mindfulness, Journal, Breathing)
- ✅ Push notifications support
- ✅ Offline functionality
- ✅ Splash screen
- ✅ Custom app icon

### Technical Features:
- ✅ Trusted Web Activity (TWA)
- ✅ Digital Asset Links
- ✅ App signing
- ✅ Multiple architecture support
- ✅ Debug and release builds

## Installation on Android Device

### Method 1: Direct Installation
1. Transfer the APK to your Android device
2. Enable "Install from unknown sources" in Android settings
3. Tap the APK file to install

### Method 2: ADB Installation
```bash
adb install android/app/release/app-release.apk
```

## Troubleshooting

### Common Issues:

#### 1. "Server not accessible"
- Make sure your server is running: `npm start`
- Check if the IP address is correct in bubblewrap.json
- Ensure your device is on the same network

#### 2. "Android SDK not found"
- Install Android Studio
- Set ANDROID_HOME environment variable
- Add platform-tools to PATH

#### 3. "Java not found"
- Install Java JDK 11 or higher
- Set JAVA_HOME environment variable

#### 4. "Build failed"
- Check the console output for specific errors
- Ensure all dependencies are installed
- Try cleaning and rebuilding: `npm run android-update`

### Environment Variables:
```bash
# Windows
set ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
set JAVA_HOME=C:\Program Files\Java\jdk-17

# Add to PATH
set PATH=%PATH%;%ANDROID_HOME%\platform-tools
```

## Advanced Configuration

### Customizing the Build:
1. Edit `bubblewrap.json` for production settings
2. Edit `bubblewrap-local.json` for development settings
3. Modify app icons in the `icons/` directory
4. Update the manifest.json for PWA features

### Build Variants:
- **Debug**: `npm run android-build` (for testing)
- **Release**: `npm run build-apk` (for distribution)

## Publishing to Google Play Store

### Requirements:
1. Google Play Developer account ($25 one-time fee)
2. Signed APK with release keystore
3. App bundle (AAB) format recommended
4. Privacy policy and app description

### Steps:
1. Build release APK: `npm run build-apk`
2. Create Google Play Console account
3. Upload APK/AAB to Play Console
4. Fill in app details and screenshots
5. Submit for review

## File Structure After Build

```
Great Awareness Studio/
├── android/                 # Bubblewrap project
│   ├── app/
│   │   ├── release/        # Built APK files
│   │   └── src/
│   ├── gradle/
│   └── build.gradle
├── icons/                   # App icons
├── dist/                    # Electron builds
├── bubblewrap.json          # Production config
├── bubblewrap-local.json    # Development config
└── build-android.js         # Build script
```

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Bubblewrap documentation: https://github.com/GoogleChromeLabs/bubblewrap
3. Check Android Studio logs for detailed error messages

---

*Great Awareness Studio - Native Android App Ready! 📱*
