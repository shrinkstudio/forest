/**
 * Scoped CSS for the Common Sense Quiz, ported 1:1 from the live
 * forest-latest Webflow classes (question / question-card / qs-btn-circle /
 * quiz-btn / feedback-modal / progress-wrapper etc). Values that were Webflow
 * variables are inlined from the site's :root.
 * Fonts (Gt Haptik / Mohr / Mohr Alt) must be @font-face'd on the host page —
 * they already are on the Forest site.
 */
export const css = `
:host { all: initial; }
* { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; display: block; }

.csq {
  /* forest-latest tokens */
  --black: #1d1c1a;
  --white: #fff;
  --green-leaf: #00a372;
  --green-forest: #002a24;
  --green-pine: #046c4c;
  --stage-green: #076c4c;
  --haptik: "Gt Haptik", Arial, sans-serif;
  --mohr: Mohr, sans-serif;
  --mohr-alt: "Mohr Alt", sans-serif;
  --ease: cubic-bezier(0.65, 0.05, 0, 1);

  position: relative;
  width: 100%;
  height: 100svh;
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

/* ---- centre stage column (.question) ---- */
.stage {
  width: 60svh;
  min-width: min(60svh, 100%);
  max-width: 100%;
  height: 100svh;
  background-color: var(--stage-green);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 24px;
  position: relative;
}
.stage.is-entry { gap: 32px; background-color: transparent; }
.stage.is-transparent { background-color: transparent; }

/* ---- motion ---- */
.stage { animation: csq-fade 0.5s var(--ease) both; }
.stage.is-entry > * { animation: csq-rise 0.6s var(--ease) both; }
.stage.is-entry > *:nth-child(2) { animation-delay: 0.08s; }
.stage.is-entry > *:nth-child(3) { animation-delay: 0.16s; }

.q-anim {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
}
.q-anim > * { animation: csq-rise 0.55s var(--ease) both; }
.q-anim > *:nth-child(2) { animation-delay: 0.08s; }
.q-anim.is-out { animation: csq-drop 0.3s var(--ease) both; }

@keyframes csq-fade {
  from { opacity: 0; }
}
@keyframes csq-rise {
  from { opacity: 0; transform: translateY(26px) scale(0.985); }
  to { opacity: 1; transform: none; }
}
@keyframes csq-drop {
  to { opacity: 0; transform: translateY(-18px); }
}

.btn,
.qs-btn-circle {
  transition: transform 0.3s var(--ease);
  will-change: transform;
}
.btn:hover, .qs-btn-circle:hover { transform: scale(1.045); }
.btn:active, .qs-btn-circle:active { transform: scale(0.95); }
.quiz-btn { transition: transform 0.3s var(--ease); will-change: transform; }
.quiz-btn:hover { transform: translateY(-4px) scale(1.015); }
.quiz-btn:active { transform: scale(0.97); }

@media (prefers-reduced-motion: reduce) {
  .stage, .stage.is-entry > *, .q-anim, .q-anim > *, .feedback-modal, .overlay {
    animation: none !important;
  }
  .btn, .qs-btn-circle, .quiz-btn { transition: none; }
}

/* ---- intro / end screens ---- */
.entry-logo { padding: 0 24px; }
.entry-logo.is-bottom { padding: 0 54px; }
.entry-title {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
.entry-title.is-bottom { gap: 12px; align-items: center; }
.h1 {
  font-family: var(--mohr);
  font-weight: 900;
  font-style: italic;
  color: var(--white);
  font-size: 3rem;
  line-height: 1em;
  text-transform: uppercase;
  text-align: center;
}
.entry-note { color: var(--white); margin-top: 4px; }

.btn {
  font-family: var(--haptik);
  font-weight: 700;
  cursor: pointer;
  border: 2px solid var(--black);
  border-radius: 0.75rem;
  background-color: var(--green-leaf);
  color: var(--white);
  padding: 0.5em 1em;
  font-size: 1.25rem;
  line-height: 1.1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btn.is-entry { padding-top: 0.35em; padding-bottom: 0.35em; margin-bottom: 10px; }
.btn.is-entry .arrow { width: 4.5rem; height: auto; display: block; }
.btn.is-pill { border-radius: 6.25rem; width: 100%; }
.btn.is-dark { background-color: var(--green-forest); }

.end-copy { color: var(--white); text-align: center; font-size: 1.25rem; }
.end-small { color: var(--white); text-align: center; font-size: 0.9rem; line-height: 1.5; }
.end-small a, .end-copy a { color: var(--white); }

/* ---- progress ---- */
.progress-wrapper {
  z-index: 9;
  width: min(50svh, calc(100% - 48px));
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}
.progress-title {
  color: var(--white);
  text-align: center;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.2;
}
.loading-bar {
  background-color: var(--white);
  border: 3px solid #000;
  border-radius: 79.53px;
  width: 100%;
  height: 32px;
  margin-top: 12px;
  overflow: hidden;
}
.progress-bar {
  background-color: var(--green-leaf);
  border-right: 3px solid #000;
  height: 100%;
  transition: width 0.6s var(--ease);
}

/* ---- question card ---- */
.question-card {
  background-color: var(--white);
  border: 3px solid #000;
  border-radius: 32px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 55px;
  width: 90%;
  margin: 0 auto;
  padding: 20px 40px;
  position: relative;
}
.question-card.is-img-btn { gap: 32px; padding: 24px 40px; }
.question-card.is-img-btn.u-gap-lg { gap: 42px; }
.question-card.is-step-3 { gap: 3em; padding-bottom: 20px; }
.card-text {
  font-size: 1.25rem;
  text-align: center;
  font-weight: 500;
  line-height: 100%;
}
.card-img { max-height: 180px; width: auto; }

/* ---- answer buttons ---- */
.question-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 109px;
  width: 100%;
}
.question-buttons.wrap { flex-flow: column; gap: 21px; }

.qs-btn-circle {
  font-family: var(--mohr);
  font-weight: 900;
  font-style: italic;
  color: var(--white);
  cursor: pointer;
  border: 4px solid #000;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
}
.qs-btn-circle.green { background-color: var(--green-leaf); }
.qs-btn-circle.red { background-color: red; }
.qs-btn-circle.big { width: 200px; height: 200px; font-size: 2rem; }
.qs-btn-circle.small { width: 80px; height: 80px; }

/* A/B image answers */
.img-options {
  display: flex;
  flex-flow: column;
  gap: 32px;
  width: 100%;
}
.quiz-btn {
  aspect-ratio: 16 / 9;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}
.quiz-btn.is-2-3 { aspect-ratio: 3 / 2; }
.quiz-step-img {
  border: 3px solid var(--black);
  border-radius: 0.75rem;
  background: var(--white);
  width: 100%;
  height: 100%;
  padding: 6px;
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.quiz-step-img img { width: 100%; height: 100%; object-fit: cover; border-radius: 0.4rem; }
.step-letter {
  z-index: 9;
  border: 3px solid var(--white);
  border-radius: 6.25rem;
  background-color: var(--black);
  width: 2.75em;
  height: 2.75em;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  position: absolute;
  top: -12.5%;
}
.step-letter.is-text {
  border-color: var(--black);
  background-color: var(--white);
  color: var(--black);
  width: auto;
  height: auto;
  padding: 4px 16px 4px 4px;
}
.step-letter.is-text .letter-badge {
  border: 3px solid var(--white);
  border-radius: 6.25rem;
  background: var(--black);
  color: var(--white);
  width: 2.2em;
  height: 2.2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ---- feedback modal ---- */
.overlay {
  z-index: 10;
  background-color: #3838384f;
  position: absolute;
  inset: 0;
  animation: csq-fade 0.4s ease both;
}
.overlay.closing { animation: csq-fade-out 0.3s ease both; }
.feedback-modal {
  z-index: 11;
  background-color: var(--white);
  border: 3px solid #000;
  border-top: none;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  display: flex;
  flex-flow: column;
  padding: 16px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  animation: csq-modal-in 0.5s var(--ease) both;
}
.feedback-modal.closing { animation: csq-modal-out 0.3s var(--ease) both; }
@keyframes csq-modal-in {
  from { transform: translateY(-110%); }
}
@keyframes csq-modal-out {
  to { transform: translateY(-110%); }
}
@keyframes csq-fade-out {
  to { opacity: 0; }
}
.modal-close {
  cursor: pointer;
  align-self: flex-end;
  background: none;
  border: none;
}
.modal-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.05rem;
}
.modal-heading img { width: 32px; height: 32px; }
.modal-content { font-size: 1rem; line-height: 1.4; }
.modal-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--white);
  cursor: pointer;
  background-color: var(--green-leaf);
  border: none;
  border-radius: 35.69px;
  align-self: flex-end;
  padding: 8px 14px;
  font-family: var(--haptik);
  font-weight: 700;
  font-size: 1rem;
  margin-top: 8px;
}
.modal-btn.error { background-color: #127ec6; }
.modal-btn .arrow { width: 1.4em; height: auto; }

/* ---- typeform claim step ---- */
.claim-frame {
  width: 100%;
  height: 100%;
}
/* typeform injects its widget CSS into document.head, which can't reach the
   shadow root — size the widget ourselves */
.claim-frame .tf-v1-widget,
.claim-frame .tf-v1-widget iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
}

@media (max-width: 767px) {
  .stage { width: 100%; min-width: 0; }
  .h1 { font-size: 2.5rem; }
  .question-card { padding-left: 24px; padding-right: 24px; }
  .question-card.is-img-btn { padding: 20px; }
  .qs-btn-circle.small { width: 60px; height: 60px; }
  .question-buttons { gap: 48px; }
}
`;
