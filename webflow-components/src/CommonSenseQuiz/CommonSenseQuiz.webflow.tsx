import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { CommonSenseQuiz } from './CommonSenseQuiz';

export default declareComponent(CommonSenseQuiz, {
  name: 'Common Sense Quiz',
  description:
    "Forest's 14-question safety quiz (intro, instant right/wrong feedback, pass screen, Typeform claim step). Questions and copy live in code; the claim Typeform and end-screen links are editable below.",
  group: 'Forest',
  props: {
    typeformId: props.Text({
      name: 'Claim Typeform id',
      defaultValue: 'UyV9UM8b',
    }),
    blogUrl: props.Text({
      name: 'Blog link',
      defaultValue: 'https://www.forest.me/post/forest-common-sense-club',
    }),
    termsUrl: props.Text({
      name: 'T&Cs link',
      defaultValue:
        'https://help.forest.me/en/articles/652-forest-common-sense-club-terms-and-conditions',
    }),
    endHeading: props.Text({
      name: 'Pass-screen heading',
      defaultValue: 'Well done, you passed! Now claim your 10 free minutes*:',
    }),
    endButtonLabel: props.Text({
      name: 'Pass-screen button label',
      defaultValue: 'GET 10 FREE MINUTES*',
    }),
  },
});
