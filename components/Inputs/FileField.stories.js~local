import React from './node_modules/react';
import { action } from './node_modules/@storybook/addon-actions';

import FileField from './FileField';

export default {
  component: FileField,
  title: 'Input/File Field',
  excludeStories: /.*Data$/,
}

export const fileFieldData = {
  label: 'Foto Mustahik',
  buttonLabel: 'Pilih Foto',
  description: 'Unggah foto ukuran 300 x 300 milik mustahik dengan format .jpg',
  required: false,
  error: null,
}

export const actionsData = {
  onFileSelected: action('onFileSelected')
}

export const Default = () => <FileField { ...fileFieldData } { ...actionsData } />;

export const Required = () => <FileField { ...{ ...fileFieldData, required: true }} { ...actionsData } />;

export const Error = () => <FileField { ...{ ...fileFieldData, error: "Ukuran foto yang diunggah tidak sesuai" }} { ...actionsData } />;
