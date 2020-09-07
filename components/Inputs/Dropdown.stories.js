import React from 'react';

import Dropdown from './Dropdown';
import { actionsData } from './TextField.stories';

export default {
  component: Dropdown,
  title: 'Input/Dropdown',
  excludeStories: /.*Data$/,
}

export const dropdownData = {
  label: 'Status Mustahik',
  placeholder: 'Pilih Status Mustahik',
  options: [
    {display: 'Miskin', value: 'MISKIN'},
    {display: 'Janda', value: 'JANDA'}
  ],
  required: false,
  error: null,
}

const optionsWithNote = [
    {display: 'Miskin', value: 'MISKIN', note: 'tidak memiliki uang'},
    {display: 'Janda', value: 'JANDA', note: 'sudah tidak ada menikah'}
]

export const Default = () => <Dropdown { ...dropdownData } { ...actionsData } />;

export const Required = () => <Dropdown { ...{ ...dropdownData, required: true  }} { ...actionsData } />;

export const Error = () => <Dropdown { ...{ ...dropdownData, error: "Error message" }} { ...actionsData } />;

export const DefaultValue = () => <Dropdown { ...{ ...dropdownData, defaultValue: 'MISKIN' }} { ...actionsData } />;

export const WithNote = () => <Dropdown { ...{ ...dropdownData, options: optionsWithNote }} { ...actionsData } />;

export const AlignLeft = () => <Dropdown { ...{...dropdownData, align: 'left'} } { ...actionsData } />;
