#!/usr/bin/env bash
SDKMANAGER=$ANDROID_HOME/tools/bin/sdkmanager
echo y | $SDKMANAGER "ndk;21.0.6113669"
echo "{\"app_secret\": \"$APP_SECRET\"}" > $APPCENTER_SOURCE_DIRECTORY/Android/app/src/main/assets/appcenter-config.json