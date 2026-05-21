// -----------------------------------------
// NAV BANNER — Expose .nav-banner height as --nav-banner-height
// -----------------------------------------

let banner = null;
let resizeObserver = null;

function setBannerHeightVar() {
  if (!banner) return;
  document.documentElement.style.setProperty('--nav-banner-height', banner.offsetHeight + 'px');
}

export function initNavBannerHeight(scope) {
  scope = scope || document;
  banner = scope.querySelector('.nav-banner');
  if (!banner) return;

  setBannerHeightVar();
  resizeObserver = new ResizeObserver(setBannerHeightVar);
  resizeObserver.observe(banner);
}

export function destroyNavBannerHeight() {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  banner = null;
}
