import MustahikSearch from './MustahikSearch'
import { action } from '@storybook/addon-actions';

export default {
    component: MustahikSearch,
    title: 'MustahikSearch',
    excludeStories: /.*Data$/,
  }

  
export const Default = () => <MustahikSearch onKeyPress={action('click')} />;