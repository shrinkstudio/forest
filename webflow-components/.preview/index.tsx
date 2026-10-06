// Local preview harness. Renders into a real shadow root (as Webflow does).
// Default = 2026 edition; ?v=2025 for the original. Not shipped.
import { createRoot } from 'react-dom/client';
import { CommonSenseQuiz } from '../src/CommonSenseQuiz/CommonSenseQuiz';
import { CommonSenseQuiz2026 } from '../src/CommonSenseQuiz2026/CommonSenseQuiz2026';

const host = document.getElementById('quiz');
if (host) {
  const shadow = host.attachShadow({ mode: 'open' });
  const el = document.createElement('div');
  shadow.appendChild(el);
  const v = new URLSearchParams(location.search).get('v');
  createRoot(el).render(v === '2025' ? <CommonSenseQuiz /> : <CommonSenseQuiz2026 />);
}
