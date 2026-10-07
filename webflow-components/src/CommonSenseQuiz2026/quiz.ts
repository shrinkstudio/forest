/**
 * Common Sense Quiz 2026 — content from the Figma "Rider Safety and Parking"
 * v2 boards (node 1832-1348). Three static questions, bespoke in-card
 * right/wrong screens per question. PLACEHOLDER assets are marked; swap for
 * Figma exports once uploaded to the merger site.
 */

/* Assets are served from the repo via jsDelivr in production and from the
   local preview server in dev. */
const ASSET_BASE =
  typeof location !== 'undefined' && location.hostname === 'localhost'
    ? '/assets'
    : 'https://cdn.jsdelivr.net/gh/shrinkstudio/forest@main/webflow-components/assets';

export const ASSETS = {
  /* 2026 sticker packs (client exports, rasters recompressed locally) */
  bgDesk: `${ASSET_BASE}/bg-desk.svg`,
  bgPhone: `${ASSET_BASE}/bg-phone.svg`, // dedicated phone sticker pack (<768px)
  splashFull: `${ASSET_BASE}/splash-full.svg`, // entire splash frame (mobile)
  splashCluster: `${ASSET_BASE}/splash-forest.svg`, // sticker + forest pill (desktop/tablet)
  /* intro/outro clusters with the forest pill below (client exports) */
  csClub: `${ASSET_BASE}/do-you-have-cs.svg`,
  endImg: `${ASSET_BASE}/you-have-cs.svg`,
  trafficLight: `${ASSET_BASE}/traffic-light.svg`, // composed from Q1-Forest parts
  soundOn: `${ASSET_BASE}/sound-on.svg`, // client-supplied
  trumpetImg: `${ASSET_BASE}/trumpet.png`,
  trumpetArrow: `${ASSET_BASE}/trumpet-arrow.svg`,
  trumpetWaves: `${ASSET_BASE}/trumpet-waves.svg`,
  soundOff: `${ASSET_BASE}/sound-off.svg`,
  /* Exported from Figma (nodes 5948:600 / 5948:617) — local preview paths;
     re-upload to the merger site's assets before publish. */
  zebraCrossing: `${ASSET_BASE}/zebra-crossing.png`,
  zebraStill: `${ASSET_BASE}/zebra-still.jpg`, // question still (frame 5976-473), grey export margin cropped
  zebraAngry: `${ASSET_BASE}/zebra-angry.png`,
  /* PLACEHOLDERS — still to export from Figma: */
  zebraWink: '', // winking zebra face (correct, frame 2)
  cycleLane: `${ASSET_BASE}/cycle-lane.png`, // Q3 option A
  pavementCar: `${ASSET_BASE}/pavement-crash.png`, // Q3 option B (Ferdi still)
  trumpet: '', // tiny trumpet image (emoji fallback used when empty)
  /* final audio + video (local preview paths; re-host + compress before publish) */
  cheerAudio: `${ASSET_BASE}/cheer.m4a`,
  trumpetAudio: `${ASSET_BASE}/trumpet.mp3`,
  get30Sticker: `${ASSET_BASE}/get-30-mins.svg`,
  zebraCorrectVideo: `${ASSET_BASE}/zebra-correct.mp4`,
  zebraWrongVideo: `${ASSET_BASE}/zebra-wrong.mp4`,
  ferdiVideo: `${ASSET_BASE}/ferdi.mp4`,
  roadmanVideo: `${ASSET_BASE}/roadman.mp4`,
} as const;

export interface Option26 {
  label: string;
  /** circle YES/NO, lettered pill, or A/B image card */
  kind: 'circle' | 'pill' | 'image';
  color?: 'green' | 'red';
  size?: 'big' | 'small';
  letter?: string;
  img?: string;
  correct?: boolean;
}

/** Bespoke in-card feedback screen. `flair` picks the animation treatment. */
export interface Feedback26 {
  heading: string;
  headingTone: 'green' | 'red';
  body: string;
  btnLabel: string;
  img?: string;
  /** autoplaying clip with its own audio — replaces img when set */
  video?: string;
  /** portrait video slot (Ferdi) */
  tall?: boolean;
  /** tiny italic footnote under the body */
  note?: string;
  flair: 'trumpet' | 'banned' | 'zebra-happy' | 'zebra-angry' | 'none';
}

export interface Question26 {
  prompt: string;
  img?: string;
  options: Option26[];
  right: Feedback26;
  wrong: Feedback26;
}

export const QUESTIONS: Question26[] = [
  {
    prompt: 'Are you legally allowed to cycle through red traffic lights?',
    img: ASSETS.trafficLight,
    options: [
      { kind: 'circle', label: 'YES', color: 'green', size: 'small' },
      { kind: 'circle', label: 'NO', color: 'red', size: 'big', correct: true },
    ],
    right: {
      heading: 'CORRECT',
      headingTone: 'green',
      body: 'TAP THIS TINY TRUMPET TO CELEBRATE BEING A DECENT HUMAN BEING:',
      btnLabel: 'continue',
      flair: 'trumpet',
    },
    wrong: {
      heading: 'CONGRATS!',
      headingTone: 'red',
      body: 'PLEASE ENTER YOUR EMAIL TO BE BANNED FROM FOREST:',
      btnLabel: 'try again',
      flair: 'banned',
    },
  },
  {
    prompt:
      'If a zebra is crossing a zebra crossing, will you let the zebra cross the crossing without making the zebra cross?',
    img: ASSETS.zebraStill,
    options: [
      { kind: 'pill', letter: 'A', label: 'yes, LET the zebra cross', correct: true },
      { kind: 'pill', letter: 'B', label: 'no, MAKE the zebra cross' },
    ],
    right: {
      heading: 'CORRECT',
      headingTone: 'green',
      body: 'Thanks for waiting an entire 4 seconds to let the zebra cross.',
      btnLabel: 'continue',
      video: ASSETS.zebraCorrectVideo,
      flair: 'zebra-happy',
    },
    wrong: {
      heading: 'WRONG',
      headingTone: 'red',
      body: 'By not waiting an entire 4 seconds, you just made the zebra cross!',
      btnLabel: 'try again',
      video: ASSETS.zebraWrongVideo,
      flair: 'zebra-angry',
    },
  },
  {
    prompt: 'Which of these are you legally allowed to cycle on?',
    options: [
      { kind: 'image', letter: 'A', label: '', img: ASSETS.cycleLane, correct: true },
      { kind: 'image', letter: 'B', label: '', img: ASSETS.pavementCar },
    ],
    /* final layout: Q3 has bespoke screens now */
    right: {
      heading: 'CORRECT',
      headingTone: 'green',
      body: 'Be a roadman, not a pavementboy.',
      btnLabel: 'continue',
      video: ASSETS.roadmanVideo,
      flair: 'none',
    },
    wrong: {
      heading: 'WRONG',
      headingTone: 'red',
      body: '', // the viral Ferdi clip carries this screen
      btnLabel: 'try again',
      video: ASSETS.ferdiVideo,
      tall: true,
      flair: 'none',
    },
  },
];

export const QUESTION_COUNT = QUESTIONS.length;
