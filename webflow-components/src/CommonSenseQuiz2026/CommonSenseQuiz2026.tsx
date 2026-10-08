/**
 * Forest Common Sense Quiz 2026 — three questions, bespoke in-card
 * right/wrong screens (trumpet, banned-confetti, zebra happy/angry), inline
 * email claim on the pass screen. Content in quiz.ts, styles in styles.ts,
 * placeholder sounds in sounds.ts. Shadow-DOM component.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { css } from './styles';
import { ASSETS, QUESTIONS, QUESTION_COUNT, type Feedback26 } from './quiz';
import { trumpetToot } from './sounds';
import { confettiRain } from './confetti';

/**
 * Feedback clip. Tries to autoplay with sound (the user just clicked, so
 * Chrome allows it); if the browser refuses, falls back to muted autoplay.
 * The quiz-level mute toggle wins over everything.
 */
function FeedbackVideo({ src, quizMuted, tall }: { src: string; quizMuted: boolean; tall?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = quizMuted;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }, [src, quizMuted]);
  return <video ref={ref} className={'fb-video' + (tall ? ' is-tall' : '')} src={src} playsInline preload="auto" />;
}

/** play an audio asset; falls back to the provided synth stub */
function playAudio(src: string, fallback?: () => void) {
  if (!src) {
    fallback?.();
    return;
  }
  try {
    const a = new Audio(src);
    a.volume = 0.9;
    a.play().catch(() => fallback?.());
  } catch {
    fallback?.();
  }
}

export interface CommonSenseQuiz2026Props {
  /** Where the claim form POSTs { email }. Empty = demo mode (fake success). */
  emailEndpoint?: string;
  seriousUrl?: string;
  termsUrl?: string;
}

type Phase = 'splash' | 'intro' | 'quiz' | 'passed';
type Stage = 'ask' | 'right' | 'wrong';

const SPLASH_MS = 3200;

const ARROW = (
  <svg className="arrow" viewBox="0 0 144 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M144.003 33.9414L110.062 67.8828L98.748 56.5684L113.397 41.9199H0V25.9609H113.396L98.748 11.3145L110.062 0L144.003 33.9414Z"
      fill="currentColor"
    />
  </svg>
);

function Media({ src, label, className }: { src?: string; label: string; className?: string }) {
  return src ? (
    <img className={className ?? 'card-img'} src={src} alt="" />
  ) : (
    <div className="img-ph">{label}</div>
  );
}

export function CommonSenseQuiz2026({
  emailEndpoint = '',
  seriousUrl = 'https://www.forest.me/post/forest-common-sense-club',
  termsUrl = 'https://help.forest.me/en/articles/652-forest-common-sense-club-terms-and-conditions',
}: CommonSenseQuiz2026Props) {
  const [phase, setPhase] = useState<Phase>('splash');
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [current, setCurrent] = useState(0);
  const [stage, setStage] = useState<Stage>('ask');
  const [fbClosing, setFbClosing] = useState(false); // overlay exit animation
  const [tooting, setTooting] = useState(false);
  const [muted, setMuted] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [gagged, setGagged] = useState(false); // banned-screen joke "input"
  const gagTimer = useRef<number>();
  const stageRef = useRef<HTMLDivElement>(null);

  const styles = useMemo(() => css.replace('__BG__', ASSETS.bgDesk), []);
  const question = QUESTIONS[current];

  function pick(correct: boolean | undefined) {
    if (correct) {
      setStage('right');
    } else {
      setStage('wrong');
      if (question.wrong.flair === 'banned') {
        if (stageRef.current) confettiRain(stageRef.current);
        if (!muted) playAudio(ASSETS.cheerAudio);
      }
    }
  }

  // warm the image cache while the intro is on screen (question stills, trumpet,
  // end sticker), then the video cache once the quiz starts
  useEffect(() => {
    if (phase !== 'intro') return;
    [ASSETS.zebraStill, ASSETS.cycleLane, ASSETS.pavementCar, ASSETS.trumpetImg, ASSETS.endImg].forEach((src) => {
      if (src) new Image().src = src;
    });
  }, [phase]);
  useEffect(() => {
    if (phase !== 'quiz') return;
    [ASSETS.zebraCorrectVideo, ASSETS.zebraWrongVideo, ASSETS.ferdiVideo, ASSETS.roadmanVideo].forEach((src) => {
      if (src) fetch(src).catch(() => {});
    });
  }, [phase]);

  // splash: branding beat, then the start slide (mimics last year's flow)
  useEffect(() => {
    if (phase !== 'splash') return;
    const t1 = window.setTimeout(() => setSplashLeaving(true), SPLASH_MS - 300);
    const t2 = window.setTimeout(() => setPhase('intro'), SPLASH_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase]);

  // end slide: repeat the confetti effect (initial rain, then a gentle drizzle)
  useEffect(() => {
    if (phase !== 'passed' || !stageRef.current) return;
    const host = stageRef.current;
    confettiRain(host, 70);
    if (!muted) playAudio(ASSETS.cheerAudio);
    const iv = window.setInterval(() => confettiRain(host, 16), 3000);
    return () => window.clearInterval(iv);
  }, [phase]);

  function toot() {
    if (!muted) playAudio(ASSETS.trumpetAudio, trumpetToot);
    setTooting(true);
    window.setTimeout(() => setTooting(false), 650);
  }

  // the trumpet announces itself once when the correct screen opens
  useEffect(() => {
    if (stage !== 'right' || question.right.flair !== 'trumpet') return;
    const t = window.setTimeout(toot, 600);
    return () => window.clearTimeout(t);
  }, [stage]);

  function advance() {
    setFbClosing(true);
    window.setTimeout(() => {
      setFbClosing(false);
      setStage('ask');
      if (current + 1 < QUESTION_COUNT) setCurrent((c) => c + 1);
      else setPhase('passed');
    }, 240);
  }

  function retry() {
    setFbClosing(true);
    window.setTimeout(() => {
      setFbClosing(false);
      setStage('ask');
    }, 240);
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    if (emailEndpoint) {
      try {
        await fetch(emailEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      } catch {
        /* still confirm; endpoint wiring is a launch task */
      }
    }
    setSent(true);
  }

  function renderFeedback(fb: Feedback26, isRight: boolean) {
    return (
      <div className={`feedback ${fb.flair}`}>
        <div className={`fb-heading ${fb.headingTone}`}>{fb.heading}</div>

        {fb.flair === 'trumpet' && (
          <>
            <div className="fb-body">{fb.body}</div>
            <div className="trumpet-zone">
              <img className="fb-arrow" src={ASSETS.trumpetArrow} alt="" />
              <button
                className={'trumpet' + (tooting ? ' tooting' : '')}
                aria-label="Tap the tiny trumpet"
                onClick={toot}
              >
                <img className="trumpet-img" src={ASSETS.trumpetImg} alt="" />
                <img className="trumpet-waves" src={ASSETS.trumpetWaves} alt="" />
              </button>
            </div>
          </>
        )}

        {fb.flair === 'banned' && (
          <>
            <div className="fb-heading-sub">
              You’re banned!<span className="sup">*</span>
            </div>
            <div className="fb-body is-haptik">{fb.body}</div>
            {/* a button so iOS never tries to focus/scroll a form field */}
            <button
              type="button"
              className={'fb-input' + (gagged ? ' is-gagged' : '')}
              aria-label="Not a real email field"
              onClick={() => {
                setGagged(true);
                window.clearTimeout(gagTimer.current);
                gagTimer.current = window.setTimeout(() => setGagged(false), 1600);
              }}
            >
              <span className="gag-msg">this isn’t real stop pressing it</span>
            </button>
            <div className="fb-note">*ur not actually banned, just try again.</div>
          </>
        )}

        {(fb.flair === 'zebra-happy' || fb.flair === 'zebra-angry' || fb.flair === 'none') && (
          <>
            {fb.video ? (
              <FeedbackVideo src={fb.video} quizMuted={muted} tall={fb.tall} />
            ) : (
              fb.img !== undefined && <Media src={fb.img} label="[photo — export from Figma]" className="fb-img" />
            )}
            {fb.body && <div className="fb-body is-media">{fb.body}</div>}
            {fb.note && <div className="fb-note is-italic">{fb.note}</div>}
          </>
        )}

      </div>
    );
  }

  const circles = question.options.filter((o) => o.kind === 'circle');
  const pills = question.options.filter((o) => o.kind === 'pill');
  const images = question.options.filter((o) => o.kind === 'image');
  const showAnswersOutside = circles.length > 0;

  return (
    <div className="csq26" ref={stageRef}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {phase === 'splash' && (
        <div className={'stage is-entry is-splash' + (splashLeaving ? ' is-leaving' : '')}>
          {/* mobile: entire splash frame; desktop/tablet: centre cluster over the backdrop */}
          <img className="splash-full" src={ASSETS.splashFull} alt="Do you have common sense?!" />
          <img className="splash-cluster" src={ASSETS.splashCluster} alt="Do you have common sense?!" />
        </div>
      )}

      {phase === 'intro' && (
        <div className="stage is-entry">
          <div className="entry-logo">
            <img src={ASSETS.csClub} alt="Do you have common sense?!" />
          </div>
          <div>
            <div className="entry-title"><div className="h1">Take the</div></div>
            <div className="entry-title"><div className="h1">world’s</div></div>
            <div className="entry-title"><div className="h1">hardest<span className="sup">*</span></div></div>
            <div className="entry-title">
              <div className="h1">Quiz</div>
              <button className="btn is-entry" onClick={() => setPhase('quiz')} aria-label="Start the quiz">
                {ARROW}
              </button>
            </div>
            <div className="entry-note">*it’s actually just common sense</div>
          </div>
          <button className="sticker-btn" onClick={() => setPhase('quiz')} aria-label="Get 30 mins free — start the quiz">
            <img className="sticker-img" src={ASSETS.get30Sticker} alt="Get 30 mins free" />
          </button>
        </div>
      )}

      {phase === 'quiz' && (
        <>
        <div className="stage is-quiz">
          <button
            className="mute-btn"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            <img className="snd" src={muted ? ASSETS.soundOff : ASSETS.soundOn} alt="" />
          </button>
          <div className="progress-wrapper">
            <div className="progress-title">
              Question {current + 1}/{QUESTION_COUNT}
            </div>
            <div className="loading-bar">
              <div
                className="progress-bar"
                style={{ width: `${((current + 1) / QUESTION_COUNT) * 100}%` }}
              />
            </div>
          </div>

          <div key={current} className="q-anim">
            <div className={'question-card' + (circles.length ? ' is-flush' : '')}>
              {(
                <>
                  <div className={'card-text' + (question.prompt.length > 70 ? ' is-long' : '')}>{question.prompt}</div>
                  {question.img !== undefined && (
                    <Media src={question.img} label="[question photo — export from Figma]" />
                  )}
                  {pills.length > 0 && (
                    <div className="pill-options">
                      {pills.map((o) => (
                        <button key={o.letter} className="pill-opt" onClick={() => pick(o.correct)}>
                          <span className="letter">{o.letter}</span>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {images.length > 0 && (
                    <div className="img-options">
                      {images.map((o) => (
                        <div key={o.letter} className="img-opt" onClick={() => pick(o.correct)}>
                          <div className="frame">
                            <Media src={o.img} label={`[option ${o.letter} photo]`} className="" />
                          </div>
                          <div className="letter">{o.letter}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {showAnswersOutside && (
              <div className="question-buttons">
                {circles.map((o) => (
                  <div
                    key={o.label}
                    className={`qs-btn-circle ${o.color} ${o.size}`}
                    onClick={() => pick(o.correct)}
                  >
                    {o.label}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
          {stage !== 'ask' && (
            <div className={'fb-overlay' + (fbClosing ? ' is-closing' : '')}>
              <div
                className="question-card is-feedback"
              >
                {renderFeedback(stage === 'right' ? question.right : question.wrong, stage === 'right')}
              </div>
              <button
                className={
                  'fb-btn is-screen-bottom' +
                  (stage === 'wrong' ? ' is-amber' : '')
                }
                onClick={stage === 'right' ? advance : retry}
              >
                {(stage === 'right' ? question.right : question.wrong).btnLabel}
              </button>
            </div>
          )}
        </>
      )}

      {phase === 'passed' && (
        <div className="stage is-end">
          <button
            className="mute-btn"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            <img className="snd" src={muted ? ASSETS.soundOff : ASSETS.soundOn} alt="" />
          </button>
          <img
            className="end-sticker"
            src={ASSETS.endImg}
            alt="You have common sense!"
            onError={(e) => {
              /* flaky mobile networks: retry a couple of times instead of staying blank */
              const img = e.currentTarget;
              const tries = Number(img.dataset.retries || 0);
              if (tries < 2) {
                img.dataset.retries = String(tries + 1);
                window.setTimeout(() => {
                  img.src = `${ASSETS.endImg}?retry=${tries + 1}`;
                }, 1200 * (tries + 1));
              }
            }}
          />
          {!sent ? (
            <form className="end-form" onSubmit={submitEmail}>
              <p className="end-copy">
                Enter your email address
                <br />
                to claim <b>30 free minutes<span className="sup">*</span>:</b>
              </p>
              <input
                className="end-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button className="end-send" type="submit">Send</button>
            </form>
          ) : (
            <p className="end-sent">Nice one. Check your inbox for your 30 free minutes.</p>
          )}
          <p className="end-serious">
            Jokes aside, there are serious consequences to your actions on the road.
            <br />
            <a href={seriousUrl} target="_blank" rel="noreferrer">Find out more here.</a>
          </p>
          <p className="end-small">
            *30 minutes applies to Pay As You Go (PAYG) Forest rides only. Doesn’t include unlock
            fees. Additional fees may apply.{' '}
            <a href={termsUrl} target="_blank" rel="noreferrer">See full T&amp;Cs</a>.
          </p>
        </div>
      )}

    </div>
  );
}
