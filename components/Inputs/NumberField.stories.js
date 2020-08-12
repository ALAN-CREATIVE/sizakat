import React from 'react';

import NumberField from './NumberField';
import { actionsData } from './TextField.stories';

export default {
  component: NumberField,
  title: 'Input/Number Field',
  excludeStories: /.*Data$/,
}

export const numberFieldData = {
  label: 'Nomor KTP',
  placeholder: 'Terdiri dari 14 karakter angka',
  required: false,
  error: null,
}

export const Default = () => <NumberField { ...numberFieldData } { ...actionsData } />;

export const Required = () => <NumberField { ...{ ...numberFieldData, required: true }} { ...actionsData } />;

export const Error = () => <NumberField { ...{ ...numberFieldData, error: 'Format KTP harus berupa 14 karakter angka' }} { ...actionsData } />;
