import { action } from '@storybook/addon-actions';
import React from 'react';

import Filter from './Filter';

export default {
  component: Filter,
  title: 'Input/Filter',
  excludeStories: /.*Data$/,
};

export const filterData = {
  options: ['Semua Kategori Sumber Data', 'Warga', 'Pesantren', 'Pekerja'],
  required: false,
  error: null,
};

export const actionsData = {
  onRadioClicked: action('onRadioClicked'),
};

export const Default = () => <Filter {...filterData} {...actionsData} />;
