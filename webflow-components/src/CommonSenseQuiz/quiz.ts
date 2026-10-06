/**
 * Common Sense Quiz — content, 1:1 with the live safety quiz at
 * forest-latest.webflow.io/common-sense-quiz/safety-quiz (scraped 2026-09-11).
 * Feedback strings may contain inline HTML (<b>, <s>) exactly as authored.
 * Assets point at the forest-latest Webflow CDN for now; swap when rebuilt.
 */

const CDN = 'https://cdn.prod.website-files.com/6707bcb65af64c7288ddba74';

export const ASSETS = {
  bgDesk: `${CDN}/68fa3f492321161d84844a3c_bg-desk.svg`,
  csClub: `${CDN}/68fe6c409bfd4ed3a9d51d37_cs%20club.svg`,
  introSticker: `${CDN}/697cb8f05d38c2ab52e2a5a4_forest-10.png`,
  iconCorrect: `${CDN}/68f797664c941c7ad19f8c8b_correct.svg`,
  iconError: `${CDN}/68f797918915aada1994c45c_error.svg`,
  iconExit: `${CDN}/68f797664c941c7ad19f8c8c_Exit.svg`,
  endImg: `${CDN}/68ff9e969d4d95d4a080d41b_end-img.svg`,
} as const;

/** Circle answer button (YES/NO). */
export interface CircleOption {
  kind: 'circle';
  label: string;
  color: 'green' | 'red';
  size: 'big' | 'small';
  correct?: boolean;
}

/** A/B image answer, optionally with a caption in the letter pill. */
export interface ImageOption {
  kind: 'image';
  letter: string;
  caption?: string;
  img: string;
  /** live site: 3/2 frames on some questions, 16/9 default */
  ratio?: '16/9' | '3/2';
  correct?: boolean;
}

/** Full-width pill answer below the card. */
export interface PillOption {
  kind: 'pill';
  label: string;
  /** live site: correct pill is green-leaf, wrong pill is green-forest */
  dark?: boolean;
  correct?: boolean;
}

export type Option = CircleOption | ImageOption | PillOption;

export interface Question {
  prompt: string;
  /** illustration inside the white card (circle/pill questions) */
  img?: string;
  options: Option[];
  correctMsg: string;
  errorMsg: string;
}

export const QUESTIONS: Question[] = [
  {
    prompt: 'As a cyclist, are you legally allowed to go through red traffic lights?',
    img: `${CDN}/68f7983b813fd410622ffc5a_Group%20633328.svg`,
    options: [
      { kind: 'circle', label: 'YES', color: 'green', size: 'small' },
      { kind: 'circle', label: 'NO', color: 'red', size: 'big', correct: true },
    ],
    correctMsg:
      'Traffic lights tell <b>ALL</b> road users when to go and when to wait — cyclists included!',
    errorMsg: 'Woops! Try picking the answer that seems the hardest to miss. ',
  },
  {
    prompt: 'Please select the photo showing correct parking in a parking bay.',
    options: [
      { kind: 'image', letter: 'A', img: `${CDN}/68f8ca2a1f6d039334c26932_PXL_20231107_121319054.png`, correct: true },
      { kind: 'image', letter: 'B', img: `${CDN}/68f8ca7398ac56ab556a7d4d_Rectangle%201710.png` },
    ],
    correctMsg:
      'Although our bikes look like trees, don’t park in one. Always park where you’re not blocking pavements, entrances or gates.',
    errorMsg:
      'Try picking the photo where the bike is parked neatly... on the ground... and not in a tree.',
  },
  {
    prompt: 'You’ve been to the pub and you’re wanting to ride an ebike home. What do you do?',
    img: `${CDN}/68f8cf06d0ebc6ab28f17109_Group%20633605.svg`,
    options: [
      { kind: 'pill', label: 'Find another way home', correct: true },
      { kind: 'pill', label: 'Ride some of the way, just not ALL the way home.', dark: true },
    ],
    correctMsg:
      'There are plenty of safe ways to travel home after the pub — cycling is not one of them.',
    errorMsg: 'Bold choice but we don’t recommended it. Give that one another go.',
  },
  {
    prompt: 'Please choose the surface that is best to cycle on',
    options: [
      { kind: 'image', letter: 'A', img: `${CDN}/68f8ce4d5a4579a782233c0e_Rectangle%201713.png`, correct: true },
      { kind: 'image', letter: 'B', img: `${CDN}/68f8ce5bf2681e5090f64c5e_Rectangle%201712.png` },
    ],
    correctMsg: 'Pavements are for walkers and mobility users. Bikes belong on roads and cycle lanes.',
    errorMsg: 'Here’s a hint: Try selecting the option with the massive bike symbol on it.',
  },
  {
    prompt: 'Please select the photo with the correct parking.',
    options: [
      { kind: 'image', letter: 'A', img: `${CDN}/68fa2cd0007e629b2270fd78_Rectangle%201689.png` },
      { kind: 'image', letter: 'B', img: `${CDN}/68fa2cdc071867dd20d21767_Rectangle%201690.png`, correct: true },
    ],
    correctMsg:
      'When ending your ride, be sure not to block paths, crossings, or entrances. As a rule of thumb, think ‘can a wheelchair pass here?’',
    errorMsg: 'Try selecting the option where the bike isn’t blocking the entire pavement. ',
  },
  {
    prompt: 'What is this person doing?',
    img: `${CDN}/68fa2dff64b6f018f3023db6_Rectangle%202177.png`,
    options: [
      { kind: 'pill', label: 'Walking', correct: true },
      { kind: 'pill', label: 'Cycling', dark: true },
    ],
    correctMsg:
      'This person <b>is</b> walking. That means no cycling unless there’s also a bike symbol.',
    errorMsg:
      'That is in fact someone walking, not cycling. (The trick to tell is whether there’s a bike in the image).',
  },
  {
    prompt: 'Please select the safest cycling route when at a zebra crossing.',
    options: [
      { kind: 'image', letter: 'A', caption: 'Wait 4 seconds', img: `${CDN}/68fa2f15f5490b032ac1e98d_image%2011.png`, correct: true },
      { kind: 'image', letter: 'B', caption: 'Do this', img: `${CDN}/68fa2f150d21a7d34d8083f3_Group%20633372.png` },
    ],
    correctMsg: 'Get back! Get back! Get back behind the white striped line.',
    errorMsg: 'Here comes the <s>sun</s> Fixed Penalty Notice, also known as a FPN.',
  },
  {
    prompt: 'What is this person doing?',
    img: `${CDN}/68ff6f3a1c493b1e1ca5cd89_q82.png`,
    options: [
      { kind: 'pill', label: 'Indicating', correct: true },
      { kind: 'pill', label: 'Giving you a high five', dark: true },
    ],
    correctMsg:
      'They’re letting you know their next move. If you haven’t already, try it next time you ride.',
    errorMsg: 'Oof! You just went for a high five mid-turn. Awkward.',
  },
  {
    prompt: 'Which is safer to wear when cycling?',
    options: [
      { kind: 'image', letter: 'A', img: `${CDN}/68ffad2dfddfb4f0d9b60b1b_helmet-amend.svg`, correct: true },
      { kind: 'image', letter: 'B', img: `${CDN}/68ff708bac7845deb71fb10f_fedora-amend.svg` },
    ],
    correctMsg:
      'Always wear a helmet when cycling, even on short rides. Be sure it meets the EN 1078 European Standard.',
    errorMsg:
      'As cool as you’d look in that fedora, it doesn’t protect you on impact when riding a bike.',
  },
  {
    prompt: 'You’re overtaking a cyclist, which side do you pass on?',
    options: [
      { kind: 'image', letter: 'A', caption: 'On the Left', img: `${CDN}/68fa38ad8258ac1db3867fd2_overtake1.png` },
      { kind: 'image', letter: 'B', caption: 'On the Right', img: `${CDN}/68fa38ad270c4ecf983e58ce_overtake2.png`, correct: true },
    ],
    correctMsg:
      'Like other vehicles, you should overtake on the right — ‘undertaking’ on the left is risky and best avoided.',
    errorMsg:
      'Cyclists should follow the same road rules as other vehicles — try again and get the right (or left) answer.',
  },
  {
    prompt: 'Can you be fined for using your mobile phone when cycling?',
    img: `${CDN}/68ff6bda26a65040a9a30b10_Group%20634004.svg`,
    options: [
      { kind: 'circle', label: 'YES', color: 'green', size: 'big', correct: true },
      { kind: 'circle', label: 'NO', color: 'red', size: 'small' },
    ],
    correctMsg:
      'It’s not illegal to use your phone while cycling, but you could be charged with careless cycling. Stay safe by pulling over.',
    errorMsg:
      'Although there’s no law against using your phone, you can still be charged with careless cycling.',
  },
  {
    prompt: 'Which is better to be seen wearing in darker months?',
    options: [
      { kind: 'image', letter: 'A', img: `${CDN}/68fa41496d4c6760ca6f44de_Group%20633407.png`, correct: true },
      { kind: 'image', letter: 'B', img: `${CDN}/68fa41497b09a9f2ffa3ea80_Group%20633406.png` },
    ],
    correctMsg:
      'Wearing something bright (over something warm) is a great way to stay visible when riding in the dark.',
    errorMsg: 'For visibility, try going for something fluorescent and reflective.',
  },
  {
    prompt:
      'You’re turning the corner off the main road and you see pedestrians waiting to cross. What do you do?',
    img: `${CDN}/68ff6b58f58e971216871050_Group%20634003%201.png`,
    options: [
      { kind: 'pill', label: 'Give way and let them cross', correct: true },
      { kind: 'pill', label: 'Cut them off', dark: true },
    ],
    correctMsg:
      'Like drivers, cyclists must give way to pedestrians who are crossing or waiting to cross the road they are turning into — this is Highway code!',
    errorMsg: 'Woah! I wouldn’t want to be caught at a junction with you on the road.',
  },
  {
    prompt: 'What should you do if you see this sign?',
    img: `${CDN}/68ff71d2fed131e8cf30867b_Screenshot%202025-10-27%20at%2011.11.52%201.png`,
    options: [
      { kind: 'pill', label: 'Follow the diversion route', correct: true },
      { kind: 'pill', label: 'Use it as a ramp', dark: true },
    ],
    correctMsg:
      'The big red sign marked in capital letters indicates that the road ahead is closed (That means don’t go this way).',
    errorMsg:
      'Rad but wrong. We can tell you’re a gnarly one but sadly, that’s not the answer. Try again using logic this time.',
  },
];

export const QUESTION_COUNT = QUESTIONS.length;
