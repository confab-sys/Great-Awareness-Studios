package com.greatawareness.studio;

import android.app.Application;
import android.content.Intent;
import android.util.Log;

public class GreatAwarenessApplication extends Application {
    private static final String TAG = "GreatAwarenessApp";
    
    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "Great Awareness Studio Application started");
        
        // Start the update service
        startUpdateService();
    }
    
    private void startUpdateService() {
        try {
            Intent updateServiceIntent = new Intent(this, UpdateService.class);
            startService(updateServiceIntent);
            Log.d(TAG, "Update service started successfully");
        } catch (Exception e) {
            Log.e(TAG, "Failed to start update service: " + e.getMessage());
        }
    }
}
