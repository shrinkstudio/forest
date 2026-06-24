# Changelog

All notable changes to the Forest Webflow bundle. Dates are commit dates.

## v1.0.0 — 2026-06-15

Launch baseline. forest.me + partnerships.forest.me merged onto forest.bike on a single Webflow build.

### Bundle

- Lifecycle orchestrated by Barba.js (init/destroy per page swap, persistent Lenis scroll, no full-page bundle reparse on navigation)
- 12 page modules: `accordion`, `copy-link`, `form-validate`, `hubspot`, `inline-video`, `list-load`, `modal`, `nav-banner`, `slider`, `tabs`, `theme-toggle`, `utilities`
- esbuild output: ~34 KB minified, IIFE, ES2020

### Notable behaviour

- **Page transition is currently a no-op.** Barba still orchestrates the content swap, but the leave/enter animation was removed per client request close to launch. Barba is kept wired for future transitions.
- **HubSpot embeds are eager-loaded** on first page render with `<link rel="preconnect">` warming the connection — form pages render instantly instead of waiting for the embed script to fetch.
- **Theme flash prevention** runs at module-load time (`theme-toggle.js` is imported in `index.js` for its top-level side effects, before transitions.js).
- **Custom Webflow CMS paginator** (`list-load.js`) replaces Finsweet CMS Load with three modes: `more`, `all`, `infinite`.

### Deploy

- Served via jsDelivr from `@main`: <https://cdn.jsdelivr.net/gh/shrinkstudio/forest@main/dist/index.min.js>
- Webflow head loads with `defer`
- Bundle SHA256 at this tag: `17fc276b3f71f85c4c76e9341c709b27794576145985770094a671f00a9d6fb8`

### Cleanup at handover

- Removed orphaned `src/scripts/nav.js` (legacy `initNavScrollHide` was wired out earlier in the build)
- Replaced template README with Forest-specific handover documentation
- Added this CHANGELOG
