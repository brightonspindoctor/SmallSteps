# Small Steps — Beta 1.57

A responsive, installable Progressive Web App for stretching, meditation and real-world side quests.
Progress is stored locally in the browser on each device.

## GitHub Pages
1. Upload the contents of this folder with `index.html` at the repository root.
2. Go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
3. Open the published URL on a phone.

## Install
- iPhone: open the URL in Safari → Share → Add to Home Screen → Add.
- Android: open the URL in Chrome → menu → Install app / Add to Home screen.

## Releasing an update
Bump the version number in two places so installed copies pick up the new files:
- `index.html`: every `?v=157` on the CSS and JS links
- `sw.js`: `const VERSION='157'`

Pages always load from the network first, so users see a new `index.html` straight away.
The version number makes sure it loads the matching CSS and JS rather than cached ones.

## Files
- `index.html` — entry point and boot-error screen
- `js/app.js` — app logic, screens, timers, storage
- `js/forest-home.js` — time-of-day forest background
- `js/forest-quotes.js` — daily home-screen quote
- `css/` — styles
- `sw.js` — offline support
- `manifest.webmanifest` — install metadata
