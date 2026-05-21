// -----------------------------------------
// HUBSPOT EMBED
// Attribute-driven HubSpot form embedding
// Put data-hubspot="<form-id>" on any div
// Configure portal + region once on <body data-hubspot-portal="..." data-hubspot-region="eu1|na1">
// -----------------------------------------

const DEFAULT_REGION = "eu1";

let scriptLoaded = false;
let loadedRegion = null;

function loadHubspotScript(region) {
  if (scriptLoaded && loadedRegion === region) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `//js-${region}.hsforms.net/forms/embed/v2.js`;
    s.onload = () => {
      scriptLoaded = true;
      loadedRegion = region;
      resolve();
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export function initHubspot(scope) {
  scope = scope || document;
  const els = scope.querySelectorAll("[data-hubspot]");
  if (!els.length) return;

  const portalId = document.body.getAttribute("data-hubspot-portal");
  const region = document.body.getAttribute("data-hubspot-region") || DEFAULT_REGION;

  if (!portalId) {
    console.warn("[hubspot] Missing data-hubspot-portal on <body> — forms will not render.");
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
