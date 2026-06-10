// -----------------------------------------
// HUBSPOT EMBED
// Attribute-driven HubSpot form embedding
// Put data-hubspot="<form-id>" on any div
// Configure portal + region site-wide via meta tags in Site Settings → Head Code:
//   <meta name="hubspot-portal" content="146362921">
//   <meta name="hubspot-region" content="eu1">
// -----------------------------------------

const DEFAULT_REGION = "eu1";

let scriptLoaded = false;
let scriptLoading = null;
let loadedRegion = null;

function loadHubspotScript(region) {
  if (scriptLoaded && loadedRegion === region) return Promise.resolve();
  if (scriptLoading && loadedRegion === region) return scriptLoading;

  loadedRegion = region;
  scriptLoading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://js-${region}.hsforms.net/forms/embed/v2.js`;
    s.async = true;
    s.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    s.onerror = (err) => {
      scriptLoading = null;
      reject(err);
    };
    document.head.appendChild(s);
  });
  return scriptLoading;
}

function readMeta(name) {
  return document.querySelector(`meta[name="${name}"]`)?.content || null;
}

// Start fetching the embed script on first page load so it's already cached
// (and window.hbspt is ready) by the time a form-bearing page is reached.
// Safe to call multiple times — loadHubspotScript() short-circuits.
export function eagerLoadHubspot() {
  const region = readMeta("hubspot-region") || DEFAULT_REGION;
  loadHubspotScript(region).catch(() => { /* swallow — initHubspot will retry + warn */ });
}

export function initHubspot(scope) {
  scope = scope || document;
  const els = scope.querySelectorAll("[data-hubspot]");
  if (!els.length) return;

  const portalId = readMeta("hubspot-portal");
  const region = readMeta("hubspot-region") || DEFAULT_REGION;

  if (!portalId) {
    console.warn('[hubspot] Missing <meta name="hubspot-portal"> — forms will not render.');
    return;
  }

  loadHubspotScript(region).then(() => {
    els.forEach((el) => {
      const formId = el.getAttribute("data-hubspot");
      if (!formId || el.dataset.hubspotInit) return;
      el.dataset.hubspotInit = "true";

      if (!el.id) el.id = `hubspot-form-${Math.random().toString(36).slice(2, 9)}`;

      window.hbspt?.forms?.create?.({
        region,
        portalId,
        formId,
        target: `#${el.id}`,
      });
    });
  });
}

export function destroyHubspot() {
  document.querySelectorAll("[data-hubspot][data-hubspot-init]").forEach((el) => {
    el.innerHTML = "";
    delete el.dataset.hubspotInit;
  });
}
