# Small Steps Beta 1.22 — GitHub-ready PWA

This is a static Progressive Web App. Publish the contents of this folder with GitHub Pages.

## GitHub Pages
1. Create a GitHub repository, e.g. `small-steps`.
2. Upload `index.html`, `manifest.webmanifest`, `sw.js`, `css/`, `js/`, and `assets/`.
3. In **Settings → Pages**, choose **Deploy from a branch**, then `main` and `/ (root)`.
4. Open the resulting `github.io` URL on a phone.

## Install
- Android/Chrome: open the site and use **Install app** / **Add to Home screen** when offered.
- iPhone/iPad Safari: open the site, Share → **Add to Home Screen**, then enable **Open as Web App** if shown.

## Notes
- Progress remains in browser local storage, as in previous builds.
- The service worker caches the app shell for offline launches after the first successful visit.
- Increment the cache name in `sw.js` when shipping a new version so updated files replace old cached files.
