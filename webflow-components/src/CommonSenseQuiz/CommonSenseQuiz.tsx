/**
 * Forest Common Sense Quiz — 1:1 rebuild of the live safety quiz as a React
 * code component. Intro -> 14 questions (instant right/wrong feedback modal)
 * -> pass screen -> Typeform claim step. Content lives in quiz.ts; visuals in
 * styles.ts. Shadow-DOM component with scoped styles.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { css } from './styles';
import { ASSETS, QUESTIONS, QUESTION_COUNT, type Option } from './quiz';

export interface CommonSenseQuizProps {
  /** Typeform live-embed id for the claim step */
  typeformId?: string;
  blogUrl?: string;
  termsUrl?: string;
  endHeading?: string;
  endButtonLabel?: string;
}

type Phase = 'intro' | 'quiz' | 'passed' | 'claim';
type Feedback = { kind: 'success' | 'error'; html: string } | null;

const ARROW = (
  <svg className="arrow" viewBox="0 0 144 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M144.003 33.9414L110.062 67.8828L98.748 56.5684L113.397 41.9199H0V25.9609H113.396L98.748 11.3145L110.062 0L144.003 33.9414Z"
      fill="currentColor"
    />
  </svg>
);

export function CommonSenseQuiz({
  typeformId = 'UyV9UM8b',
  blogUrl = 'https://www.forest.me/post/forest-common-sense-club',
  termsUrl = 'https://help.forest.me/en/articles/652-forest-common-sense-club-terms-and-conditions',
  endHeading = 'Well done, you passed! Now claim your 10 free minutes*:',
  endButtonLabel = 'GET 10 FREE MINUTES*',
}: CommonSenseQuizProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0); // 0-based question index
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [closing, setClosing] = useState(false); // modal exit animation
  const [leaving, setLeaving] = useState(false); // question exit animation
  const claimRef = useRef<HTMLDivElement>(null);

  // Typeform live embeds need the official embed lib; its createWidget API
  // takes a container element, so it works inside the shadow root.
  useEffect(() => {
    if (phase !== 'claim' || !claimRef.current) return;
    const container = claimRef.current;
    const mount = () => {
      const tf = (window as any).tf;
      if (tf?.createWidget) tf.createWidget(typeformId, { container, hideHeaders: true, hideFooters: true });
    };
    if ((window as any).tf) {
      mount();
      return;
    }
    let script = document.getElementById('typeform-embed-js') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'typeform-embed-js';
      script.src = 'https://embed.typeform.com/next/embed.js';
      document.head.appendChild(script);
    }
    script.addEventListener('load', mount);
    return () => script?.removeEventListener('load', mount);
  }, [phase, typeformId]);

  const styles = useMemo(() => css.replace('__BG__', ASSETS.bgDesk), []);
  const question = QUESTIONS[current];

  function pick(option: Option) {
    if (option.correct) {
      setFeedback({ kind: 'success', html: question.correctMsg });
    } else {
      setFeedback({ kind: 'error', html: question.errorMsg });
    }
  }

  function dismissFeedback() {
    setClosing(true);
    window.setTimeout(() => {
      setFeedback(null);
      setClosing(false);
    }, 260);
  }

  function nextQuestion() {
    setClosing(true);
    window.setTimeout(() => {
      setFeedback(null);
      setClosing(false);
      if (current + 1 < QUESTION_COUNT) {
        setLeaving(true);
        window.setTimeout(() => {
          setCurrent((c) => c + 1);
          setLeaving(false);
        }, 300);
      } else {
        setPhase('passed');
      }
    }, 240);
  }

  const circles = question.options.filter((o) => o.kind === 'circle');
  const pills = question.options.filter((o) => o.kind === 'pill');
  const images = question.options.filter((o) => o.kind === 'image');

  return (
    <div className="csq">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {phase === 'intro' && (
        <div className="stage is-entry">
          <div className="entry-logo">
            <img src={ASSETS.csClub} alt="Do you have common sense?!" />
          </div>
          <div>
            <div className="entry-title"><div className="h1">Take the</div></div>
            <div className="entry-title"><div className="h1">world's</div></div>
            <div className="entry-title"><div className="h1">hardest*</div></div>
            <div className="entry-title is-bottom">
              <div className="h1">Quiz</div>
              <button className="btn is-entry" onClick={() => setPhase('quiz')} aria-label="Start the quiz">
                {ARROW}
              </button>
            </div>
            <div className="entry-title">
              <div className="entry-note">*it’s actually just common sense</div>
            </div>
          </div>
          <div className="entry-logo is-bottom">
            <img src={ASSETS.introSticker} alt="Complete the quiz and get 10 mins free" />
          </div>
        </div>
      )}

      {phase === 'quiz' && (
        <div className="stage">
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

          <div key={current} className={'q-anim' + (leaving ? ' is-out' : '')}>
          <div
            className={
              'question-card' +
              (images.length ? ' is-img-btn' : '') +
              (pills.length ? ' is-step-3' : '')
            }
          >
            <div className="card-text">{question.prompt}</div>
            {question.img && <img className="card-img" src={question.img} alt="" />}
            {images.length > 0 && (
              <div className="img-options">
                {images.map((o) => (
                  <div key={o.letter} className="quiz-btn" onClick={() => pick(o)}>
                    <div className="quiz-step-img">
                      <img src={o.img} alt={`Option ${o.letter}`} />
                    </div>
                    {o.caption ? (
                      <div className="step-letter is-text">
                        <span className="letter-badge">{o.letter}</span>
                        {o.caption}
                      </div>
                    ) : (
                      <div className="step-letter">{o.letter}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {circles.length > 0 && (
            <div className="question-buttons">
              {circles.map((o) => (
                <div
                  key={o.label}
                  className={`qs-btn-circle ${o.color} ${o.size}`}
                  onClick={() => pick(o)}
                >
                  {o.label}
                </div>
              ))}
            </div>
          )}
          {pills.length > 0 && (
            <div className="question-buttons wrap">
              {pills.map((o) => (
                <button
                  key={o.label}
                  className={'btn is-pill' + (o.dark ? ' is-dark' : '')}
                  onClick={() => pick(o)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
          </div>
        </div>
      )}

      {phase === 'passed' && (
        <div className="stage is-entry">
          <div className="entry-logo">
            <img src={ASSETS.endImg} alt="" />
          </div>
          <div>
            <p className="end-copy">{endHeading}</p>
            <div className="entry-title is-bottom" style={{ marginTop: 12 }}>
              <button className="btn is-entry" onClick={() => setPhase('claim')}>
                {endButtonLabel}
              </button>
            </div>
          </div>
          <div className="entry-logo">
            <p className="end-copy" style={{ marginBottom: '1em' }}>
              Want to learn more about cycling? Check out our blog{' '}
              <a href={blogUrl} target="_blank" rel="noreferrer">here</a>
            </p>
            <p className="end-small">
              *10 minutes applies to Pay As You Go (PAYG) Forest rides only. Doesn’t include unlock
              fees. Additional fees may apply.{' '}
              <a href={termsUrl} target="_blank" rel="noreferrer">See full T&amp;Cs</a>.
            </p>
          </div>
        </div>
      )}

      {phase === 'claim' && (
        <div className="stage is-transparent">
          <div className="claim-frame" ref={claimRef} />
        </div>
      )}

      {feedback && (
        <>
          <div className={'overlay' + (closing ? ' closing' : '')} onClick={dismissFeedback} />
          <div
            className={'feedback-modal' + (closing ? ' closing' : '')}
            data-modal-type={feedback.kind}
          >
            <button className="modal-close" onClick={dismissFeedback} aria-label="Close">
              <img src={ASSETS.iconExit} alt="" width={21} height={21} />
            </button>
            <div className="modal-heading">
              <img src={feedback.kind === 'success' ? ASSETS.iconCorrect : ASSETS.iconError} alt="" />
              <div>{feedback.kind === 'success' ? 'Well done you!' : 'Not quite!'}</div>
            </div>
            <p className="modal-content" dangerouslySetInnerHTML={{ __html: feedback.html }} />
            {feedback.kind === 'success' ? (
              <button className="modal-btn" onClick={nextQuestion}>
                {current + 1 < QUESTION_COUNT ? 'Next Question' : 'Finish'} {ARROW}
              </button>
            ) : (
              <button className="modal-btn error" onClick={dismissFeedback}>
                Try Again
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
