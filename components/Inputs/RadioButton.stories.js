import { action } from '@storybook/addon-actions';
import React from 'react';

import RadioButton from './RadioButton';

export default {
  component: RadioButton,
  title: 'Input/Radio Button',
  excludeStories: /.*Data/,
};

export const radioButtonData = {
  label: 'Jenis Kelamin',
  options: ['Laki-laki', 'Perempuan'],
  required: false,
  error: null,
};

export const actionsData = {
  onRadioClicked: action('onRadioClicked'),
};

export const Default = () => (
  <RadioButton {...radioButtonData} {...actionsData} />
);

export const Required = () => (
  <RadioButton {...{ ...radioButtonData, required: true }} {...actionsData} />
);

export const Error = () => (
  <RadioButton
    {...{ ...radioButtonData, error: 'Pilih salah satu jenis kelamin' }}
    {...actionsData}
  />
);
