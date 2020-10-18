import { action } from '@storybook/addon-actions';
import React from 'react';

import NavigationBar from './NavigationBar';

export default {
  component: NavigationBar,
  title: 'Navigation Bar',
  excludeStories: /.*Data$/,
};

export const menuData = {
  name: 'Annisaa Fitri Shabrina',
  role: 'Admin',
  menu: 'Mustahik',
  submenu: ['Data Mustahik', 'Sumber Data Mustahik'],
};

const actionsData = {
  onMenuClicked: action('onMenuClicked'),
};

export const Default = () => <NavigationBar {...menuData} {...actionsData} />;
