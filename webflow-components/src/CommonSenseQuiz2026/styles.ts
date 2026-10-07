/**
 * Scoped CSS for the 2026 Common Sense Quiz. Shares the forest-latest tokens
 * with the 2025 edition but restyles per the v2 Figma: lighter progress bar,
 * in-card feedback screens, flair animations (confetti, spiral, trumpet
 * waves, zebra states). Fonts must be @font-face'd on the host page.
 */
export const css = `
:host { all: initial; }
* { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; display: block; }
button { font: inherit; }

.csq26 {
  --black: #1d1c1a;
  --white: #fff;
  --green-leaf: #00a372;
  --green-light: #8fd6b7;
  --green-btn: #8fd189;
  --green-forest: #002a24;
  --green-pine: #00845C;
  --stage-green: #00845C;
  --red: #e03c31;
  --haptik: "Gt Haptik", Arial, sans-serif;
  --mohr: Mohr, sans-serif;
  --mohr-alt: "Mohr Alt", sans-serif;
  --ease: cubic-bezier(0.65, 0.05, 0, 1);

  position: relative;
  width: 100%;
  height: 100svh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-family: var(--haptik);
  font-size: 15px;
  line-height: 1.3;
  color: var(--black);
  background-color: var(--green-pine);
  background-image: url("__BG__");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
}
/* phone sticker pack (its own frame, not a crop of the desktop one) */
@media (max-width: 767px) {
  .csq26 { background-image: url("__BGM__"); }
}

.stage {
  width: 60svh;
  min-width: min(60svh, 100%);
  max-width: 100%;
  height: 100svh;
  height: 100dvh;
  background-color: var(--stage-green);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 24px;
  position: relative;
  animation: fade 0.5s var(--ease) both;
}
.stage.is-entry { gap: 32px; background-color: transparent; container-type: inline-size; padding-left: 0; padding-right: 0; }
.stage.is-entry > * { animation: rise 0.6s var(--ease) both; }
.stage.is-entry > *:nth-child(2) { animation-delay: 0.08s; }
.stage.is-entry > *:nth-child(3) { animation-delay: 0.16s; }

/* ---- splash ---- */
.stage.is-splash { justify-content: center; padding: 0; overflow: hidden; }
.splash-center {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 20px;
}
/* desktop/tablet: cluster only (backdrop already has stickers) */
.splash-full { display: none; }
.splash-cluster {
  width: min(74%, 400px);
  animation: pop 0.6s var(--ease) both;
}
/* mobile: the full splash frame, full-bleed */
@media (max-width: 767px) {
  .splash-cluster { display: none; }
  .splash-full {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: fade 0.5s var(--ease) both;
  }
}
.stage.is-leaving { animation: fade-out 0.3s var(--ease) both; }
@keyframes fade-out { to { opacity: 0; } }

/* ---- intro / end ---- */
.entry-logo { width: min(69%, 350px); width: 67.4cqw; margin: 0 auto; padding: 0; }
.entry-logo img { width: 100%; }
/* v2 start slide: Mohr Alt Black, upright (50.49px on the 390 frame) */
.h1 {
  font-family: var(--mohr-alt);
  font-weight: 900;
  font-style: normal;
  color: var(--white);
  font-size: min(7.8svh, 12.9vw);
  font-size: 12.95cqw;
  line-height: 1.1;
  text-transform: uppercase;
  text-align: center;
}
.h1 .sup { font-size: 0.38em; vertical-align: 1.25em; }
.entry-title { display: flex; justify-content: center; align-items: center; gap: 12px; width: 100%; }
.entry-note { color: var(--white); margin-top: 14px; text-align: center; font-size: min(2.6svh, 4.3vw); font-size: 4.3cqw; }
.sticker-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: min(39%, 190px); /* 151px of the 390 frame */
  width: 38.7cqw;
  transition: transform 0.3s var(--ease);
}
.sticker-btn:hover { transform: scale(1.05) rotate(-1deg); }
.sticker-btn:active { transform: scale(0.95); }
.sticker-img { width: 100%; display: block; }
.sticker-cta {
  font-family: var(--mohr);
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  background: var(--black);
  color: var(--white);
  border: 3px solid var(--white);
  border-radius: 16px;
  padding: 14px 22px;
  font-size: 1.3rem;
  text-align: center;
  transform: rotate(-2deg);
}
.sticker-cta em {
  display: inline-block;
  background: var(--green-leaf);
  border-radius: 100px;
  padding: 2px 12px;
  font-style: italic;
  margin-left: 6px;
}

.btn {
  font-family: var(--haptik);
  font-weight: 700;
  cursor: pointer;
  border: 2px solid var(--green-forest);
  border-radius: 0.75rem;
  background-color: var(--green-btn);
  color: var(--green-forest);
  box-shadow: 0 2.5px 0 var(--green-forest);
  padding: 0.5em 1em;
  font-size: 1.25rem;
  line-height: 1.1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s var(--ease);
}
.btn:hover { transform: scale(1.045); }
.btn:active { transform: translateY(2.5px) scale(0.98); box-shadow: 0 0 0 var(--green-forest); }
.btn.is-entry .arrow { width: 4.5rem; width: 16.4cqw; height: auto; display: block; }
.btn.is-entry { padding: 0.35em 1em; position: relative; top: -4px; }

/* ---- progress (v2: lighter, no heavy border) ---- */
.progress-wrapper {
  z-index: 9;
  width: min(44svh, calc(100% - 48px));
  position: absolute;
  top: 36px;
  left: 50%;
  transform: translateX(-50%);
}
.progress-title { color: var(--white); text-align: center; font-weight: 500; font-size: 16.6px; }
.loading-bar {
  background-color: var(--white);
  border-radius: 100px;
  width: 100%;
  height: 25px;
  margin-top: 10px;
  overflow: hidden;
}
.progress-bar {
  background-color: var(--green-btn);
  border-radius: 100px;
  height: 100%;
  transition: width 0.6s var(--ease);
}

/* the quiz stage starts below the absolute progress header; "safe" falls back
   to top-aligned instead of sliding under it when a short viewport overflows */
.stage.is-quiz { padding-top: clamp(100px, 13svh, 140px); justify-content: safe center; overflow-y: auto; overflow-x: hidden; }

/* ---- question card ---- */
.q-anim {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
}
.q-anim > * { animation: rise 0.55s var(--ease) both; }
.q-anim > *:nth-child(2) { animation-delay: 0.08s; }
.q-anim.is-out { animation: drop 0.3s var(--ease) both; }

.question-card {
  background-color: var(--white);
  border-radius: 36px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 88%;
  margin: 0 auto;
  padding: 28px;
  position: relative;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
}
.card-text { font-size: min(24px, 6.2vw); font-family: var(--haptik); text-align: center; font-weight: 700; line-height: 1.2; }
.card-text.is-long { font-size: min(20px, 5.2vw); line-height: 1.3; }
.card-img { max-height: 200px; width: auto; border-radius: 12px; }
.question-card.is-flush { padding-bottom: 0; gap: 36px; }
.question-card.is-flush .card-img { max-height: min(36svh, 280px); border-radius: 0; }
.img-ph {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  background: repeating-linear-gradient(45deg, #e7e5dd, #e7e5dd 12px, #dcdad2 12px, #dcdad2 24px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888680;
  font-weight: 700;
  font-size: 0.85rem;
  text-align: center;
  padding: 8px;
}

/* answers */
.question-buttons { display: flex; justify-content: center; align-items: center; gap: 40px; width: 100%; }
.qs-btn-circle {
  font-family: var(--mohr);
  font-weight: 900;
  font-style: italic;
  color: var(--white);
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  text-align: center;
  font-size: 1.25rem;
  transition: transform 0.3s var(--ease);
}
.qs-btn-circle:hover { transform: scale(1.05); }
.qs-btn-circle:active { transform: scale(0.94); }
.qs-btn-circle.green { background-color: var(--green-btn); color: var(--black); }
.qs-btn-circle.red { background-color: var(--red); }
.qs-btn-circle.big { width: 160px; height: 160px; font-size: 24px; }
.qs-btn-circle.small { width: 54px; height: 54px; font-size: 15px; }

.pill-options { display: flex; flex-flow: column; gap: 12px; width: 100%; }
.pill-opt {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #000;
  border-radius: 16.1px;
  background: #e3e3e3;
  color: var(--black);
  cursor: pointer;
  padding: 4px 14px 4px 4px;
  font-family: var(--haptik);
  font-weight: 700;
  font-size: 17px;
  text-align: left;
  transition: transform 0.3s var(--ease), background 0.2s;
}
.pill-opt:hover { transform: scale(1.03); }
.pill-opt:active { transform: scale(0.97); }
.pill-opt .letter {
  background: #000;
  color: var(--white);
  border-radius: 100px;
  font-size: 13.8px;
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
}

.img-options { display: flex; flex-flow: column; gap: 26px; width: 100%; }
.img-opt { position: relative; cursor: pointer; transition: transform 0.3s var(--ease); }
.img-opt:hover { transform: translateY(-4px) scale(1.015); }
.img-opt:active { transform: scale(0.97); }
.img-opt .frame { border-radius: 16.5px; border: 1px solid #000; overflow: hidden; }
.img-opt .frame img { width: 100%; aspect-ratio: 257 / 159; object-fit: cover; }
.img-opt .letter {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: var(--white);
  border: 2px solid var(--white);
  border-radius: 100px;
  width: 31px;
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--haptik);
  font-weight: 700;
  font-size: 18.5px;
}

/* ---- end slide (finish-forest frame) ---- */
.stage.is-end {
  justify-content: flex-start;
  gap: 0;
  padding: 10.4svh 24px 0;
}
.stage.is-end > * { animation: rise 0.6s var(--ease) both; }
.stage.is-end > *:nth-child(3) { animation-delay: 0.08s; }
.stage.is-end > *:nth-child(4) { animation-delay: 0.16s; }
.end-sticker { width: min(84%, 340px); margin: 0 auto; }
.end-form { display: flex; flex-flow: column; align-items: center; width: 100%; margin-top: 13.5svh; }
.end-copy {
  color: var(--white);
  text-align: center;
  font-family: var(--haptik);
  font-weight: 500;
  font-size: min(23.5px, 6vw);
  line-height: 1.3;
}
.end-copy b { font-weight: 700; }
.end-copy .sup { font-size: 0.64em; vertical-align: 0.4em; }
.end-input {
  margin-top: 14px;
  width: min(71%, 300px);
  height: 34px;
  min-height: 31px;
  background: #f6fbf9;
  border: 1px solid var(--green-forest);
  border-radius: 17.2px;
  font-family: var(--haptik);
  font-size: 14px;
  text-align: center;
  outline: none;
}
.end-send {
  margin-top: 19px;
  background: var(--green-btn);
  border: 1px solid #000;
  border-radius: 16.8px;
  padding: 6px 24px;
  font-family: var(--haptik);
  font-weight: 700;
  font-size: 17px;
  color: #000;
  cursor: pointer;
  transition: transform 0.3s var(--ease);
}
.end-send:hover { transform: scale(1.05); }
.end-send:active { transform: scale(0.94); }
.end-sent { color: var(--white); font-weight: 700; text-align: center; margin-top: 15svh; }
.end-serious {
  position: absolute;
  bottom: 10svh;
  left: 24px;
  right: 24px;
  margin-top: 0;
  color: var(--white);
  text-align: center;
  font-family: var(--haptik);
  font-weight: 700;
  font-size: min(16.1px, 4.1vw);
  line-height: 1.35;
}
.end-serious a { color: var(--white); text-underline-offset: 3px; }
.end-small {
  position: absolute;
  bottom: 2.6svh;
  left: 24px;
  right: 24px;
  color: var(--white);
  text-align: center;
  font-size: 9.5px;
  line-height: 1.5;
}
.end-small a { color: var(--white); }

/* ---- feedback overlay (scrim over the question screen) ---- */
.fb-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  background: rgba(0, 42, 36, 0.75);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  animation: fade 0.35s var(--ease) both;
}
.question-card.is-feedback {
  width: 80%;
  max-width: 340px;
  padding: 36px 24px 44px;
  gap: 26px;
  animation: pop 0.45s var(--ease) both;
}
.fb-overlay.is-closing { animation: fade-out 0.22s var(--ease) both; }
.fb-btn.is-amber {
  background: #f59e0b;
  border-color: #000;
  color: #000;
  box-shadow: 0 2.5px 0 #000;
}
.fb-btn.is-screen-bottom {
  position: absolute;
  bottom: 26px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: max-content;
}

/* ---- in-card feedback ---- */
.feedback { display: flex; flex-flow: column; align-items: center; gap: 18px; width: 100%; animation: pop 0.45s var(--ease) both; }
.fb-heading {
  font-family: var(--mohr-alt);
  font-weight: 900;
  font-style: normal;
  text-transform: uppercase;
  font-size: min(49px, 12.5vw);
  line-height: 1;
  text-align: center;
}
.fb-heading.green { color: var(--green-leaf); }
.fb-heading.red { color: #ff0000; }
.fb-body {
  font-family: var(--mohr-alt);
  font-weight: 900;
  text-align: center;
  font-size: min(27.7px, 7.1vw);
  line-height: 1.1;
  text-transform: uppercase;
  max-width: 86%;
}
.fb-body.is-media { font-family: var(--haptik); text-transform: none; font-weight: 700; font-size: min(20px, 5.2vw); line-height: 1.3; max-width: 100%; }
.fb-btn {
  border: 2px solid var(--green-forest);
  border-radius: 100px;
  background: var(--green-btn);
  color: var(--green-forest);
  box-shadow: 0 2.5px 0 var(--green-forest);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  padding: 10px 22px;
  transition: transform 0.3s var(--ease);
}
.fb-btn:hover { transform: scale(1.04); }
.fb-btn:active { transform: translateY(2.5px) scale(0.98); box-shadow: 0 0 0 var(--green-forest); }
.fb-note { font-size: 0.7rem; color: #888680; text-align: center; }
.fb-note.is-italic { font-style: italic; font-size: 10px; color: var(--black); }

/* trumpet */
.trumpet-zone {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 76px 0 10px;
}
.fb-arrow {
  position: absolute;
  right: -30px;
  top: 35px;
  width: 33%;
  transform: rotate(113.87deg);
  pointer-events: none;
}
.trumpet {
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform 0.15s var(--ease);
}
.trumpet.tooting { transform: scale(0.8); } /* 20% smaller on press */
.trumpet-img { width: min(42vw, 150px); display: block; }
.trumpet-waves {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  opacity: 0;
  transition: opacity 0.1s;
}
.trumpet.tooting .trumpet-waves { opacity: 1; }

/* banned email joke */
.fb-heading-sub {
  font-family: var(--mohr);
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  color: #ff0000;
  font-size: min(54px, 13.8vw);
  line-height: 1.05;
  text-align: center;
  margin-top: -14px;
}
.fb-heading-sub .sup { font-size: 0.64em; vertical-align: 0.35em; }
.fb-body.is-haptik {
  font-family: var(--haptik);
  font-weight: 700;
  font-size: min(23.3px, 6vw);
  line-height: 1.25;
}
.fb-input {
  border: 2px solid var(--black);
  border-radius: 100px;
  padding: 10px 16px;
  width: 92%;
  font-family: var(--haptik);
  font-weight: 700;
  font-size: min(1rem, 3.7vw); /* the gag placeholder must fit uncropped on phones */
  text-align: center;
  background: var(--white);
  transition: background-color 0.35s var(--ease);
  outline: none;
}
.fb-input::placeholder { color: var(--black); opacity: 0; transition: opacity 0.35s var(--ease); font-size: min(0.85rem, 3vw); }
.fb-input:focus { background-color: #facf85; }
.fb-input:focus::placeholder { opacity: 1; }

/* confetti + spiral (banned flair) */
.confetti-piece {
  position: absolute;
  top: -20px;
  width: 10px;
  height: 14px;
  z-index: 20;
  animation: confetti-fall linear both;
  pointer-events: none;
}
@keyframes confetti-fall {
  to { transform: translateY(110svh) rotate(720deg); }
}
.spiral {
  position: absolute;
  z-index: 21;
  top: 38%;
  left: 0;
  width: 180px;
  pointer-events: none;
  animation: spiral 1.1s linear both;
  border-radius: 8px;
  border: 3px solid var(--black);
  background: var(--white);
  padding: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  text-align: center;
}
@keyframes spiral {
  from { transform: translateX(-120%) rotate(0deg); }
  to { transform: translateX(80svh) rotate(1080deg); }
}

/* feedback video */
.fb-video {
  width: 100%;
  aspect-ratio: 263 / 226;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid #000;
  display: block;
  background: #000;
}
.fb-video.is-tall { aspect-ratio: 264 / 317; }
.fb-img { width: 100%; border-radius: 16.5px; border: 1px solid #000; display: block; }

/* mute toggle */
.mute-btn {
  position: absolute;
  top: 28px;
  right: 22px;
  z-index: 12;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  transition: transform 0.3s var(--ease);
}
.mute-btn { width: 27px; justify-content: flex-start; }
.mute-btn .snd { height: 24px; display: block; }
.mute-btn:hover { transform: scale(1.08); }
.mute-btn:active { transform: scale(0.92); }

/* zebra states */
.zebra-img { border-radius: 12px; width: 100%; aspect-ratio: 16 / 11; object-fit: cover; }
.feedback.zebra-happy .zebra-media { animation: skip 0.9s ease-in-out 2; }
@keyframes skip {
  25% { transform: translateY(-6px) rotate(-1.5deg); }
  75% { transform: translateY(-6px) rotate(1.5deg); }
}
.feedback.zebra-angry .zebra-media { animation: zoom-in 0.6s var(--ease) 0.3s both; }
@keyframes zoom-in { to { transform: scale(1.18); } }
.zebra-img.frame2 {
  position: absolute;
  inset: 0;
  height: 100%;
  opacity: 0;
  animation: frame2 0.25s var(--ease) 0.75s forwards;
}
@keyframes frame2 { to { opacity: 1; } }
.feedback.zebra-angry .speech { animation-delay: 0.95s; z-index: 2; }
.flash-red::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(224, 60, 49, 0.35);
  border-radius: 28px;
  pointer-events: none;
  animation: flash 1s ease-out both;
}
@keyframes flash { 0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }
.speech {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--white);
  border: 2px solid var(--black);
  border-radius: 10px;
  padding: 4px 10px;
  font-weight: 700;
  font-size: 0.8rem;
  animation: pop 0.3s var(--ease) 0.5s both;
}
.zebra-media { position: relative; width: 100%; }

/* ---- shared keyframes ---- */
@keyframes fade { from { opacity: 0; } }
@keyframes rise {
  from { opacity: 0; transform: translateY(26px) scale(0.985); }
  to { opacity: 1; transform: none; }
}
@keyframes drop { to { opacity: 0; transform: translateY(-18px); } }
@keyframes pop {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: none; }
}

@media (max-width: 767px) {
  .stage { width: 100%; min-width: 0; }
  .question-buttons { gap: 44px; }
  .qs-btn-circle.small { width: 60px; height: 60px; }
  .qs-btn-circle.big { width: 150px; height: 150px; }
}

/* short screens: compress the quiz stage so the answers stay on screen
   (the stage still scrolls as a last resort on extreme viewports) */
@media (max-height: 700px) {
  .stage.is-quiz { padding-top: 96px; gap: 14px; }
  .stage.is-quiz .question-card { padding: 20px; gap: 18px; }
  .stage.is-quiz .question-card.is-flush { padding-bottom: 0; gap: 24px; }
  .stage.is-quiz .question-card.is-flush .card-img { max-height: min(30svh, 240px); }
  .stage.is-quiz .card-img { max-height: min(26svh, 200px); }
  .stage.is-quiz .card-text { font-size: min(20px, 5.2vw); }
  .qs-btn-circle.big { width: min(160px, 24svh); height: min(160px, 24svh); font-size: min(24px, 3.4svh); }
  .qs-btn-circle.small { width: min(54px, 9svh); height: min(54px, 9svh); }
}

@media (max-width: 480px) {
  .fb-heading { font-size: 40px; }
  .fb-heading-sub { font-size: 44px; }
  /* keep air between the serious note and the smallprint */
  .end-serious { bottom: max(13.5svh, 96px); }
  .end-small { bottom: 2.2svh; }
  /* stop the trumpet card elongating past the pinned continue button */
  .feedback.trumpet .fb-body { font-size: min(22px, 5.9vw); }
}

@media (prefers-reduced-motion: reduce) {
  .stage, .stage.is-entry > *, .q-anim, .q-anim > *, .feedback,
  .fb-overlay, .fb-overlay.is-closing, .question-card.is-feedback, .stage.is-end > *,
  .confetti-piece, .spiral, .zebra-media, .trumpet, .flash-red::after {
    animation: none !important;
  }
  .zebra-img.frame2 { animation: none !important; opacity: 1; }
  .btn, .qs-btn-circle, .pill-opt, .img-opt, .fb-btn { transition: none; }
}
`;
