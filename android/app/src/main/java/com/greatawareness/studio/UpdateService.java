package com.greatawareness.studio;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;

public class UpdateService extends Service {
    private static final String TAG = "UpdateService";
    private static final String WEBSITE_URL = "https://great-awareness-studio.vercel.app/";
    private static final long UPDATE_CHECK_INTERVAL = 60000; // 1 minute in milliseconds
    
    private Handler handler;
    private WebView webView;
    private boolean isUpdateAvailable = false;
    
    @Override
    public void onCreate() {
        super.onCreate();
        handler = new Handler(Looper.getMainLooper());
        initializeWebView();
    }
    
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "UpdateService started");
        scheduleUpdateCheck();
        return START_STICKY;
    }
    
    private void initializeWebView() {
        webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                Log.d(TAG, "Page loaded: " + url);
                checkForUpdates();
            }
            
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                Log.e(TAG, "Error loading page: " + error.getDescription());
            }
        });
    }
    
    private void scheduleUpdateCheck() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                performUpdateCheck();
                scheduleUpdateCheck(); // Schedule next check
            }
        }, UPDATE_CHECK_INTERVAL);
    }
    
    private void performUpdateCheck() {
        Log.d(TAG, "Performing update check...");
        webView.loadUrl(WEBSITE_URL);
    }
    
    private void checkForUpdates() {
        // Check if the website has been updated by comparing content or version
        webView.evaluateJavascript(
            "(function() { return document.documentElement.outerHTML; })();",
            new android.webkit.ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    if (value != null && !value.isEmpty()) {
                        // Compare with cached version or check for specific changes
                        Log.d(TAG, "Website content received, checking for updates...");
                        // Here you could implement more sophisticated update detection
                        // For now, we'll just log that an update check was performed
                    }
                }
            }
        );
    }
    
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
    
    @Override
    public void onDestroy() {
        super.onDestroy();
        if (handler != null) {
            handler.removeCallbacksAndMessages(null);
        }
        if (webView != null) {
            webView.destroy();
        }
    }
}
