<<<<<<< HEAD
import React from 'react';
import { action } from '@storybook/addon-actions';

import TextField from './TextField';

export default {
  component: TextField,
  title: 'Input/Text Field',
  excludeStories: /.*Data$/,
}

export const textFieldData = {
  label: 'Nama Lengkap',
  disabled: false,
  initialValue: '',
  placeholder: 'Nama sesuai dengan KTP',
  required: false,
  error: null,
}

export const actionsData = {
  onChange: action('onChange')
}

export const Default = () => <TextField { ...textFieldData } { ...actionsData } />;

export const Disabled = () => <TextField { ...{ ...textFieldData, disabled: true, initialValue: "Pekerja" }} { ...actionsData } />;

export const Required = () => <TextField { ...{ ...textFieldData, required: true }} { ...actionsData } />;

export const Error = () => <TextField { ...{ ...textFieldData, error: "Nama lengkap tidak boleh kosong" }} { ...actionsData } />;
=======
import React from 'react';
import { action } from '@storybook/addon-actions';

import TextField from './TextField';

export default {
  component: TextField,
  title: 'Input/Text Field',
  excludeStories: /.*Data$/,
}

export const textFieldData = {
  label: 'Nama Lengkap',
  disabled: false,
  initialValue: '',
  placeholder: 'Nama sesuai dengan KTP',
  required: false,
  error: null,
}

export const actionsData = {
  onChange: action('onChange')
}

export const Default = () => <TextField { ...textFieldData } { ...actionsData } />;

export const Disabled = () => <TextField { ...{ ...textFieldData, disabled: true }} { ...actionsData } />;

export const Required = () => <TextField { ...{ ...textFieldData, required: true }} { ...actionsData } />;

export const Error = () => <TextField { ...{ ...textFieldData, error: "Nama lengkap tidak boleh kosong" }} { ...actionsData } />;
>>>>>>> a13b28917db4e093597c85e2431cd7670c389db9
