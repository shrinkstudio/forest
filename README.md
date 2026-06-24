# Forest

JavaScript bundle for the [forest.bike](https://forest.bike) Webflow site. Built with esbuild, served via jsDelivr CDN, loaded by the Webflow `<head>`.

This repo was built and handed over by [Shrink Studio](https://shrink.studio) at the merger of `forest.me` and `partnerships.forest.me` into a single Webflow site at `forest.bike`.

---

## Repo layout

```
src/
  scripts/
    index.js          ← entry — imports theme-toggle (side-effect) + transitions
    transitions.js    ← Barba + Lenis orchestration, module init/destroy registry
    accordion.js      ← <details> open/close
    copy-link.js      ← copy-to-clipboard for current page URL
    form-validate.js  ← inline form validation
    hubspot.js        ← HubSpot form embed (eager-loaded, Cookiebot-aware)
    inline-video.js   ← inline video player setup
    list-load.js      ← paginated CMS list loading (more / all / infinite)
    modal.js          ← <dialog> modal delegation
    nav-banner.js     ← exposes banner height as --nav-banner-height CSS var
    slider.js         ← Swiper.js wrapper with data-attribute config
    tabs.js           ← tab UI
    theme-toggle.js   ← dark/light mode, with FOUC prevention
    utilities.js      ← small helpers (footer year, skip link, font-size detect)
build.js              ← esbuild config
dist/
  index.min.js        ← bundled output (committed for jsDelivr to serve)
llms.txt              ← source for /llms.txt on the live site
```

---

## Deploy model

The Webflow site loads this bundle via a single script tag in **Site Settings → Custom Code → Head Code**:

```html
<script defer src="https://cdn.jsdelivr.net/gh/shrinkstudio/forest@main/dist/index.min.js"></script>
```

This pulls the latest commit on the `main` branch of `shrinkstudio/forest`. **Any commit to `main` pushes to production within a few minutes** (jsDelivr cache TTL plus the manual purge below).

### Updating production

```bash
# 1. Make changes under src/scripts/
# 2. Build
npm run build

# 3. Commit + push
git add src/scripts dist/index.min.js
git commit -m "your message"
git push

# 4. Purge the jsDelivr cache
curl https://purge.jsdelivr.net/gh/shrinkstudio/forest@main/dist/index.min.js
```

Production serves the new bundle on the next request.

### Vendoring for supply-chain isolation (recommended)

`@main` is an unpinned, live source — any commit lands in production on next purge. For a stricter handover, vendor a build under your own infrastructure:

1. Download `dist/index.min.js` from this repo at a known commit (the `v1.0.0` tag points at the launch baseline).
2. Record the SHA256:
   ```bash
   shasum -a 256 dist/index.min.js
   ```
   `v1.0.0` SHA256: `17fc276b3f71f85c4c76e9341c709b27794576145985770094a671f00a9d6fb8`
3. Host the file at `https://assets.forest.bike/forest.min.js` (Cloudflare R2 or equivalent).
4. Update the Webflow head to point at that URL.
5. Tell Shrink that `@main` no longer flows to prod so future updates are deliberate re-vendor cycles, not live pushes.

After vendoring, the workflow for any future bundle updates becomes: Shrink commits + tags a new version → you download, verify SHA → upload to R2 → site picks it up.

---

## Local development

```bash
npm install
npm run build     # one-time build
npm run watch     # rebuild on save (then push to update prod)
```

There's no local dev server bound to the Webflow site — local builds aren't loaded by `forest.bike` automatically. Iterate by pushing to a feature branch and temporarily pointing the Webflow head at it (e.g. `@dev-branch` instead of `@main`).

### Build details

`build.js` runs esbuild with:
- `bundle: true`
- `format: 'iife'`
- `target: 'es2020'`
- `minify: true`

Output goes to `dist/index.min.js` and is committed so jsDelivr can serve it.

---

## Webflow head dependencies

The bundle expects these globals to be available before it runs. Already in the Forest Webflow site's head:

```html
<!-- GSAP + plugins -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/CustomEase.min.js"></script>

<!-- Lenis smooth scroll -->
<link rel="stylesheet" href="https://unpkg.com/lenis@1/dist/lenis.css">
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>

<!-- Barba.js page transitions -->
<script src="https://cdn.jsdelivr.net/npm/@barba/core@2/dist/barba.umd.min.js"></script>

<!-- Swiper (for sliders) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- HubSpot meta (read by hubspot.js) -->
<meta name="hubspot-portal" content="146362921">
<meta name="hubspot-region" content="eu1">

<!-- The bundle itself -->
<script defer src="https://cdn.jsdelivr.net/gh/shrinkstudio/forest@main/dist/index.min.js"></script>

<!-- jsDelivr preconnect (small perf win) -->
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>

<!-- HubSpot preconnect (form embeds are eager-loaded) -->
<link rel="preconnect" href="https://js-eu1.hsforms.net" crossorigin>
<link rel="preconnect" href="https://forms-eu1.hsforms.com" crossorigin>
```

---

## Module reference

Each module in `src/scripts/` initialises on a Webflow element matching its trigger attribute. All are wired via `transitions.js`'s `initAfterEnterFunctions()`.

| Module | Trigger | What it does |
|---|---|---|
| `accordion.js` | `<details>` | Animated open/close on native `<details>` elements |
| `copy-link.js` | `[data-copy-link]` | Click to copy current page URL |
| `form-validate.js` | `[data-form-validate]` | Inline form validation |
| `hubspot.js` | `[data-hubspot="<formId>"]` | Embed HubSpot form by ID (portal/region from `<meta>`) |
| `inline-video.js` | `[data-video]` | Inline video player setup |
| `list-load.js` | `[data-list-load="more|all|infinite"]` | Paginated CMS list loading |
| `modal.js` | `<dialog>` | Open modal dialogs (event delegation) |
| `nav-banner.js` | `.nav-banner` | Exposes banner height as `--nav-banner-height` CSS var |
| `slider.js` | `[data-slider="slider"]` | Swiper.js wrapper, fully data-attribute driven |
| `tabs.js` | `[data-tabs-component]` | Tabs UI |
| `theme-toggle.js` | `[data-theme-toggle]` | Dark/light mode toggle (with FOUC prevention) |
| `utilities.js` | `[data-footer-year]`, `[data-font-size]`, skip link | Small helpers |

Individual modules carry detailed header comments — read the file for the full attribute API.

---

## Lifecycle

Barba.js manages SPA-like content swaps so the bundle doesn't reparse on every navigation and Lenis scroll stays warm. Module lifecycle:

1. **First page load** (Barba `once`) → `initOnceFunctions()`
   - Lenis init
   - Document-level delegation (modal, font-size detect, skip link, copy-link)
   - Eager-load HubSpot embed script in the background
2. **Before next page renders** (Barba `beforeEnter`) → `initBeforeEnterFunctions()`
   - Destroys all current page module instances
   - Stops Lenis
   - Applies theme from the new container's `data-page-theme`
3. **After new page rendered** (Barba `afterEnter`) → `initAfterEnterFunctions()`
   - Boots all modules for the new page (each guarded by a `has(...)` selector check)
   - Re-runs any inline scripts inside the new container
   - Triggers Webflow IX2 reinit, resizes Lenis, refreshes ScrollTrigger

There is currently **no visible page transition** — the leave/enter animations are no-ops (the curved-wipe was removed close to launch per client request). Barba is kept wired for future use; the no-op transition lives in `runPageLeaveAnimation` / `runPageEnterAnimation` in `transitions.js` and can be reanimated by swapping those two functions for GSAP timelines.

---

## Adding a new module

1. Create `src/scripts/your-feature.js` with named exports:
   ```js
   export function initYourFeature(scope) {
     // scope is the page container — use scope.querySelector(...)
   }
   export function destroyYourFeature() {
     // tear down listeners, observers, etc.
   }
   ```
2. Import in `transitions.js`:
   ```js
   import { initYourFeature, destroyYourFeature } from './your-feature.js';
   ```
3. Wire destroy in `initBeforeEnterFunctions()`:
   ```js
   destroyYourFeature();
   ```
4. Wire init in `initAfterEnterFunctions()` with a `has(...)` guard:
   ```js
   if (has('[data-your-feature]')) initYourFeature(nextPage);
   ```
5. `npm run build`, commit, push, purge.

---

## Watch out for

- **Webflow service worker** caches bundles aggressively. After a deploy, if the new bundle doesn't appear in DevTools → Network, unregister the worker (DevTools → Application → Service Workers) and hard refresh. If you still see the old bundle, suspect the service worker before the CDN.
- **`@main` is live.** Any push to `main` becomes production within minutes. Use a feature branch + the temporary `@branch-name` jsDelivr URL for non-trivial work.
- **Webflow CMS API pagination** — large `list_collection_items` calls past offset 50 on the Blogs collection can time out at `limit=25`; drop to `limit=10` to get through.
- **Theme flash prevention** runs at module load from the top of `theme-toggle.js`. Don't move the `import './theme-toggle.js'` from `index.js` — it must execute before `transitions.js`.

---

## License

All rights reserved. Built by [Shrink Studio](https://shrink.studio) for Forest.
