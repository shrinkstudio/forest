import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { CommonSenseQuiz2026 } from './CommonSenseQuiz2026';

export default declareComponent(CommonSenseQuiz2026, {
  name: 'Common Sense Quiz 2026',
  description:
    'The 2026 edition: 3 questions with bespoke right/wrong screens (trumpet, banned confetti, zebra) and an inline email claim for 60 free minutes. Questions and copy live in code.',
  group: 'Forest',
  props: {
    emailEndpoint: props.Text({
      name: 'Email submit endpoint',
      defaultValue: '',
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
