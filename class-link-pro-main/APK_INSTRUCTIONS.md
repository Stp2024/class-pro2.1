# APK Generation Instructions

## After uploading this project to GitHub and deploying to Vercel:

### Step 1: Verify PWA is working
- Visit: https://class-hub-pro.vercel.app/manifest.json
- Visit: https://class-hub-pro.vercel.app/icons/icon-512.png
- Test PWA install on mobile browser

### Step 2: Generate APK using Bubblewrap
```bash
# Install Bubblewrap (if not already installed)
npm install -g @bubblewrap/cli

# Initialize TWA project
bubblewrap init --manifest=https://class-hub-pro.vercel.app/manifest.json

# Answer the prompts:
# - Domain: class-hub-pro.vercel.app
# - URL path: /
# - Application name: Class Hub Pro
# - Short name: ClassHub
# - Application ID: app.vercel.class_hub_pro.twa
# - Display mode: standalone
# - Orientation: portrait
# - Status bar color: #0D47A1
# - Splash screen color: #FFFFFF
# - Icon URL: https://class-hub-pro.vercel.app/icons/icon-512.png
# - Maskable icon URL: https://class-hub-pro.vercel.app/icons/icon-512.png
# - Key store location: (choose a path)
# - Key name: android

# Build the APK
cd class-hub-pro
bubblewrap build
```

### Step 3: Upload APK to website
- Copy the generated APK from `./output/` folder
- Upload it to `public/class-hub-pro.apk` in your project
- Commit and push to GitHub
- The download button will now work!

## Files included in this project:
- ✅ `public/manifest.json` - PWA manifest
- ✅ `public/service-worker.js` - Service worker for offline support
- ✅ `public/icons/maskable_icon.png` - Main app logo
- ✅ `public/icons/icon-192.png` - 192x192 icon
- ✅ `public/icons/icon-512.png` - 512x512 icon
- ✅ `index.html` - Updated with PWA support
- ✅ `src/pages/Index.tsx` - Updated with download button
