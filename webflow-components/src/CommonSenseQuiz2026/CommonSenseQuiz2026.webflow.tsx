import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { CommonSenseQuiz2026 } from './CommonSenseQuiz2026';

export default declareComponent(CommonSenseQuiz2026, {
  name: 'Common Sense Quiz 2026',
  description:
    'The 2026 edition: 3 questions with bespoke right/wrong screens (trumpet, banned confetti, zebra) and a Typeform claim step (email + consent). Questions and copy live in code.',
  group: 'Forest',
  props: {
    typeformId: props.Text({
      name: 'Typeform form id',
      defaultValue: 'S9ha6xGg',
    }),
    seriousUrl: props.Text({
      name: '"Find out more" link',
      defaultValue: 'https://www.forest.me/post/forest-common-sense-club',
    }),
    termsUrl: props.Text({
      name: 'T&Cs link',
      defaultValue:
        'https://help.forest.me/en/articles/652-forest-common-sense-club-terms-and-conditions',
    }),
  },
});
