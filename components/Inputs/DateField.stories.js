import React from 'react';
import { action } from '@storybook/addon-actions';

import DateField from './DateField';

export default {
  component: DateField,
  title: 'Input/Date Field',
  excludeStories: /.*Data$/,
}

export const dateFieldData = {
  label: 'Tanggal Lahir',
  required: false,
  errorDate: null,
  errorMonth: null,
  errorYear: null,
}

const actionsData = {
  onDatePicked: action('onDatePicked'),
  onMonthPicked: action('onMonthPicked'),
  onYearPicked: action('onYearPicked'),
}

export const Default = () => <DateField { ...dateFieldData } { ...actionsData } />;

export const Required = () => <DateField { ...{ ...dateFieldData, required: true }} { ...actionsData } />;

export const ErrorDate = () => <DateField { ...{ ...dateFieldData, errorDate: "Tanggal lahir tidak boleh kosong" }} { ...actionsData } />;

export const ErrorMonth = () => <DateField { ...{ ...dateFieldData, errorMonth: "Bulan lahir tidak boleh kosong" }} { ...actionsData } />;

export const ErrorYear = () => <DateField { ...{ ...dateFieldData, errorYear: "Tahun lahir tidak boleh kosong" }} { ...actionsData } />;

export const DefaultValue = () => <DateField { ...{ ...dateFieldData, defaultValue: 10 }} { ...actionsData } />;
