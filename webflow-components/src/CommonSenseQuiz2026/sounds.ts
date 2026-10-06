/**
 * Placeholder WebAudio sounds so the prototype demos without asset files.
 * Swap each for real samples (trumpet toot, klaxon, clip-clop, "neigh",
 * "I'm walking here") once exported/recorded. All lazily create one shared
 * AudioContext on first user gesture, so autoplay policies are satisfied.
 */

let ctx: AudioContext | null = null;
function ac(): AudioContext | null {
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, gainV: number) {
  const c = ac();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, c.currentTime + start);
  g.gain.linearRampToValueAtTime(gainV, c.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime + start);
  o.stop(c.currentTime + start + dur + 0.05);
}

/** a bit lacklustre, a bit tinny — by design */
export function trumpetToot() {
  tone(392, 0, 0.18, 'square', 0.08);
  tone(523, 0.16, 0.3, 'square', 0.07);
}

export function klaxon() {
  for (let i = 0; i < 3; i++) {
    tone(660, i * 0.28, 0.16, 'sawtooth', 0.07);
    tone(440, i * 0.28 + 0.13, 0.16, 'sawtooth', 0.07);
  }
}

export function clipClop() {
  for (let i = 0; i < 4; i++) {
    tone(180, i * 0.22, 0.05, 'triangle', 0.12);
    tone(140, i * 0.22 + 0.09, 0.05, 'triangle', 0.1);
  }
}

export function alarm() {
  for (let i = 0; i < 4; i++) tone(880, i * 0.15, 0.1, 'square', 0.06);
}
