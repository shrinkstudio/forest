// -----------------------------------------
// forest — PAGE TRANSITIONS
// Barba.js + GSAP + Lenis
// -----------------------------------------

import { initThemeToggle } from './theme-toggle.js';
import { initAccordions, destroyAccordions } from './accordion.js';
import { initTabs, destroyTabs } from './tabs.js';
import { initSliders, destroySliders } from './slider.js';
import { initInlineVideos, destroyInlineVideos } from './inline-video.js';
import { initModalDelegation, initModals, destroyModals } from './modal.js';
import { initFontSizeDetect, initFooterYear, initSkipLink } from './utilities.js';
import { initNavScrollHide, destroyNavScrollHide } from './nav.js';
import { initFormValidation, destroyFormValidation } from './form-validate.js';
import { initCopyLink, destroyCopyLink } from './copy-link.js';
import { initHubspot, destroyHubspot } from './hubspot.js';
import { initNavBannerHeight, destroyNavBannerHeight } from './nav-banner.js';
import { initListLoad, destroyListLoad } from './list-load.js';

gsap.registerPlugin(CustomEase);
if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

history.scrollRestoration = "manual";

let lenis = null;
let nextPage = document;
let onceFunctionsInitialized = false;

const hasLenis = typeof window.Lenis !== "undefined";
const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

const rmMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
let reducedMotion = rmMQ.matches;
rmMQ.addEventListener?.("change", e => (reducedMotion = e.matches));

const has = (s) => !!nextPage.querySelector(s);

let staggerDefault = 0.05;
let durationDefault = 0.6;

CustomEase.create("osmo", "0.625, 0.05, 0, 1");
gsap.defaults({ ease: "osmo", duration: durationDefault });


// -----------------------------------------
// FUNCTION REGISTRY
// -----------------------------------------

function initOnceFunctions() {
  initLenis();
  if (onceFunctionsInitialized) return;
  onceFunctionsInitialized = true;

  // Document-level delegation (bind once)
  initModalDelegation();
  initFontSizeDetect();
  initSkipLink();
  initCopyLink();
}

function initBeforeEnterFunctions(next) {
  nextPage = next || document;

  // Destroy old instances before new page enters
  destroyNavScrollHide();
  destroyAccordions();
  destroyTabs();
  destroySliders();
  destroyInlineVideos();
  destroyModals();
  destroyFormValidation();
  destroyHubspot();
  destroyNavBannerHeight();
  destroyListLoad();
}

function initAfterEnterFunctions(next) {
  nextPage = next || document;

  if (has('.nav'))                          initNavScrollHide(nextPage);
  if (has('.nav-banner'))                   initNavBannerHeight(nextPage);
  if (has('[data-theme-toggle]'))           initThemeToggle(nextPage);
  if (has('details'))                       initAccordions(nextPage);
  if (has('[data-tabs-component]'))         initTabs(nextPage);
  if (has('[data-slider]'))                 initSliders(nextPage);
  if (has('[data-video]'))                  initInlineVideos(nextPage);
  if (has('dialog'))                        initModals(nextPage);
  if (has('[data-form-validate]'))          initFormValidation(nextPage);
  if (has('[data-hubspot]'))                initHubspot(nextPage);
  if (has('[data-list-load]'))              initListLoad(nextPage);
  if (has('[data-footer-year]'))            initFooterYear(nextPage);

  // Re-evaluate inline scripts inside the new container (Webflow embeds)
  reinitScripts(nextPage);

  // Webflow IX2 reinit
  if (window.Webflow && window.Webflow.ready) {
    window.Webflow.ready();
  }

  if (hasLenis) lenis.resize();
  if (hasScrollTrigger) ScrollTrigger.refresh();
}


// -----------------------------------------
// PAGE TRANSITIONS (Osmo curved wipe)
// HTML + CSS provided in Webflow via Osmo cloneable
// -----------------------------------------

function runPageOnceAnimation(next) {
  const tl = gsap.timeline();
  tl.call(() => resetPage(next), null, 0);
  return tl;
}

function runPageLeaveAnimation(current, next) {
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionPanel = transitionWrap.querySelector("[data-transition-panel]");
  const transitionPanelTop = transitionWrap.querySelector("[data-transition-panel-top]");
  const transitionPanelBottom = transitionWrap.querySelector("[data-transition-panel-bottom]");
  const transitionLogo = transitionWrap.querySelector("[data-transition-logo]");
  const transitionLogoPath = transitionWrap.querySelectorAll("path");

  const tl = gsap.timeline({
    onComplete: () => { current.remove(); }
  });

  if (reducedMotion) {
    return tl.set(current, { autoAlpha: 0 });
  }

  tl.set(transitionPanel, { autoAlpha: 1 }, 0);
  tl.set(transitionPanelTop, { scaleY: 0, height: "15vw" }, 0);
  tl.set(transitionPanelBottom, { scaleY: 1, height: "20vw" }, 0);
  tl.set(transitionLogo, { autoAlpha: 1 });
  tl.set(transitionLogoPath, { yPercent: 105 });
  tl.set(next, { autoAlpha: 0 }, 0);

  tl.fromTo(transitionPanel,
    { yPercent: 0 },
    { yPercent: -100, duration: 1 },
    0
  );

  tl.fromTo(transitionPanelTop,
    { scaleY: 0 },
    { scaleY: 1, duration: 1 },
    "<"
  );

  tl.fromTo(transitionLogoPath,
    { yPercent: 105 },
    {
      yPercent: 0,
      duration: 0.8,
      ease: "expo.out",
      stagger: { amount: 0.06 }
    },
    "<+=0.4"
  );

  tl.fromTo(current,
    { y: "0vh" },
    { y: "-15dvh", duration: 1 },
    0
  );

  return tl;
}

function runPageEnterAnimation(next) {
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionPanel = transitionWrap.querySelector("[data-transition-panel]");
  const transitionPanelBottom = transitionWrap.querySelector("[data-transition-panel-bottom]");
  const transitionLogoPath = transitionWrap.querySelectorAll("path");

  const tl = gsap.timeline();

  if (reducedMotion) {
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady");
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }

  tl.add("startEnter", 1.35);

  tl.set(next, { autoAlpha: 1 }, "startEnter");

  tl.fromTo(transitionPanel,
    { yPercent: -100 },
    {
      yPercent: -200,
      duration: 1,
      overwrite: "auto",
      immediateRender: false
    },
    "startEnter"
  );

  tl.fromTo(transitionPanelBottom,
    { scaleY: 1 },
    { scaleY: 0, duration: 1 },
    "<"
  );

  tl.set(transitionPanel, { autoAlpha: 0 }, ">");

  tl.to(transitionLogoPath,
    {
      yPercent: -130,
      duration: 1.2,
      ease: "expo.inOut",
      stagger: { amount: -0.06 }
    },
    "startEnter-=0.4"
  );

  tl.from(next,
    { y: "25dvh", duration: 1 },
    "startEnter"
  );

  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");

  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}


// -----------------------------------------
// BARBA HOOKS + INIT
// -----------------------------------------

barba.hooks.beforeEnter(data => {
  gsap.set(data.next.container, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  });

  if (lenis && typeof lenis.stop === "function") {
    lenis.stop();
  }

  initBeforeEnterFunctions(data.next.container);
  applyThemeFrom(data.next.container);
});

barba.hooks.afterLeave(() => {
  if (hasScrollTrigger) {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
});

barba.hooks.enter(data => {
  initBarbaNavUpdate(data);
});

barba.hooks.afterEnter(data => {
  initAfterEnterFunctions(data.next.container);

  if (hasLenis) {
    lenis.resize();
    lenis.start();
  }

  if (hasScrollTrigger) {
    ScrollTrigger.refresh();
  }
});

barba.init({
  debug: false,
  timeout: 7000,
  preventRunning: true,
  transitions: [
    {
      name: "default",
      sync: true,

      async once(data) {
        initOnceFunctions();
        return runPageOnceAnimation(data.next.container);
      },

      async leave(data) {
        return runPageLeaveAnimation(data.current.container, data.next.container);
      },

      async enter(data) {
        return runPageEnterAnimation(data.next.container);
      }
    }
  ],
});


// -----------------------------------------
// HELPERS
// -----------------------------------------

const themeConfig = {
  light: { nav: "dark", transition: "light" },
  dark: { nav: "light", transition: "dark" }
};

function applyThemeFrom(container) {
  const pageTheme = container?.dataset?.pageTheme || "light";
  const config = themeConfig[pageTheme] || themeConfig.light;

  document.body.dataset.pageTheme = pageTheme;
  const transitionEl = document.querySelector('[data-theme-transition]');
  if (transitionEl) transitionEl.dataset.themeTransition = config.transition;

  const nav = document.querySelector('[data-theme-nav]');
  if (nav) nav.dataset.themeNav = config.nav;
}

function initLenis() {
  if (lenis) return;
  if (!hasLenis) return;

  lenis = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25,
  });

  window.__forestLenis = lenis;

  if (hasScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function resetPage(container) {
  window.scrollTo(0, 0);
  gsap.set(container, { clearProps: "position,top,left,right" });

  if (hasLenis) {
    lenis.resize();
    lenis.start();
  }
}

function reinitScripts(container) {
  container.querySelectorAll('script').forEach(oldScript => {
    const newScript = document.createElement('script');
    [...oldScript.attributes].forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

function initBarbaNavUpdate(data) {
  var tpl = document.createElement('template');
  tpl.innerHTML = data.next.html.trim();
  var nextNodes = tpl.content.querySelectorAll('[data-barba-update]');
  var currentNodes = document.querySelectorAll('nav [data-barba-update]');

  currentNodes.forEach(function (curr, index) {
    var next = nextNodes[index];
    if (!next) return;

    var newStatus = next.getAttribute('aria-current');
    if (newStatus !== null) {
      curr.setAttribute('aria-current', newStatus);
    } else {
      curr.removeAttribute('aria-current');
    }

    var newClassList = next.getAttribute('class') || '';
    curr.setAttribute('class', newClassList);
  });
}
