/**
 * Confetti built on `motion` (MIT) in the style of motion.dev's confetti
 * example: randomised particle physics, no canvas. Two modes:
 * - confettiRain: rains from the top (Q1 wrong "CONGRATS! YOU'RE BANNED!")
 * - confettiBurst: celebratory explosion (end slide)
 * Particles self-remove when their animation completes. No-ops under
 * prefers-reduced-motion.
 */
import { animate } from 'motion';

const COLORS = ['#00a372', '#ffd6a6', '#b4bd11', '#e03c31', '#d6ece5', '#127ec6', '#ffffff'];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function reducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function makePiece(host: HTMLElement): HTMLSpanElement {
  const el = document.createElement('span');
  const w = rand(7, 12);
  el.style.cssText = [
    'position:absolute',
    'top:0',
    'left:0',
    'pointer-events:none',
    'z-index:30',
    `width:${w}px`,
    `height:${w * rand(1, 1.6)}px`,
    `background:${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
    `border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`,
    'will-change:transform,opacity',
  ].join(';');
  host.appendChild(el);
  return el;
}

/** Confetti rains down the full height of `host` (position:relative). */
export function confettiRain(host: HTMLElement, count = 80) {
  if (!host || reducedMotion()) return;
  const { width, height } = host.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const el = makePiece(host);
    const x = rand(0, width);
    const sway = rand(-80, 80);
    const spin = rand(-720, 720);
    const fall = rand(1.8, 3.2);
    animate(
      el,
      {
        x: [x, x + sway * 0.5, x + sway],
        y: [-20, height + 30],
        rotate: [0, spin],
        opacity: [1, 1, 0.9],
      },
      { duration: fall, delay: rand(0, 0.8), ease: [0.3, 0.1, 0.6, 0.9] },
    ).then(() => el.remove());
  }
}

/** Celebratory burst from a point (fractions of host size), then gravity. */
export function confettiBurst(host: HTMLElement, count = 60, origin = { x: 0.5, y: 0.3 }) {
  if (!host || reducedMotion()) return;
  const { width, height } = host.getBoundingClientRect();
  const ox = width * origin.x;
  const oy = height * origin.y;
  for (let i = 0; i < count; i++) {
    const el = makePiece(host);
    const angle = rand(0, Math.PI * 2);
    const power = rand(60, Math.min(260, width * 0.4));
    const vx = Math.cos(angle) * power;
    const peakY = oy + Math.sin(angle) * power * 0.7 - rand(20, 90);
    const spin = rand(-900, 900);
    animate(
      el,
      {
        x: [ox, ox + vx, ox + vx * rand(1.1, 1.4)],
        // out fast, hang, then fall under gravity
        y: [oy, peakY, height + 30],
        rotate: [0, spin * 0.6, spin],
        opacity: [1, 1, 0.85],
      },
      {
        duration: rand(1.6, 2.6),
        delay: rand(0, 0.15),
        ease: [0.15, 0.6, 0.6, 1],
        times: [0, 0.35, 1],
      },
    ).then(() => el.remove());
  }
}
