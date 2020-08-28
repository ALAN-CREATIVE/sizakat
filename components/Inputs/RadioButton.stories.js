import React from 'react';
import { action } from '@storybook/addon-actions';

import RadioButton from './RadioButton';

export default {
  component: RadioButton,
  title: 'Input/Radio Button',
  excludeStories: /.*Data/,
}

export const radioButtonData = {
  label: 'Jenis Kelamin',
  options: [
    {value: 'L', name: 'Laki-laki'},
    {value: 'P', name: 'Perempuan'}
  ],
  required: false,
  error: null,
  defaultChecked: 'L',
}

export const actionsData = {
  onRadioClicked: action('onRadioClicked')
}

export const Default = () => <RadioButton { ...radioButtonData } { ...actionsData } />;

export const Required = () => <RadioButton { ...{ ...radioButtonData, required: true }} { ...actionsData } />;

export const Error = () => <RadioButton { ...{ ...radioButtonData, error: "Pilih salah satu jenis kelamin" }} { ...actionsData } />

export const DefaultChecked = () => <RadioButton { ...{ ...radioButtonData, defaultChecked: 'L' }} { ...actionsData } />;
