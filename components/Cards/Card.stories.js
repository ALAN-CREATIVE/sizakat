import { action } from '@storybook/addon-actions';
import React from 'react';

import Card from './Card';

export default {
  component: Card,
  title: 'Card',
  excludeStories: /.*Data$/,
};

const cardData = {
  id: '1',
  label: 'Lorem Ipsum Sit Dolor Amet',
  desc: 'warga',
};

const actionsData = {
  onDetailClicked: action('onDetailClicked'),
};

export const Default = () => <Card {...cardData} {...actionsData} />;
