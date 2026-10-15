# UYIR Bug Tracker

## Total Bugs by Severity
- Critical: 1
- High: 0
- Medium: 0
- Low: 0

## Bug List

| ID | Severity | File:Line | Symptom | Root Cause | Fix | Verified |
|----|----------|-----------|---------|------------|-----|----------|
| 1 | Critical | `server/index.ts:67` | API server crashes on startup with `PathError: Missing parameter name at index 1: *` | Express 5 uses `path-to-regexp` v8+ which does not support bare `*` wildcards. | Changed to `app.use` catch-all. | Yes |
| 2 | Medium | `public/` (missing) | PWA icons are missing. | Project structure was missing necessary assets for PWA. | Create placeholder icons. | No |

| 2 | Medium | `public/` (missing) | PWA icons are missing. | Project structure was missing necessary assets for PWA. | Create placeholder icons for `favicon.ico`, `apple-touch-icon.png`, `pwa-192x192.png`, `pwa-512x512.png` and `mask-icon.svg`. | No |
