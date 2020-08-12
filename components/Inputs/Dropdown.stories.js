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
  options: ['Miskin', 'Janda'],
  required: false,
  error: null,
}

export const Default = () => <Dropdown { ...dropdownData } { ...actionsData } />;

export const Required = () => <Dropdown { ...{ ...dropdownData, required: true  }} { ...actionsData } />;

export const Error = () => <Dropdown { ...{ ...dropdownData, error: "Error message" }} { ...actionsData } />;
