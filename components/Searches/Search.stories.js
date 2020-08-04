import React from 'react';
import { action } from '@storybook/addon-actions';
import Search from './Search';

export default {
  component: Search,
  title: 'Search',
  excludeStories: /.*Data$/,
}

export const searchData = {
   placeholder : "Cari berdasarkan nama sumber data",
}

const actionsData = {
  onChange: action('onChange')
}

export const Default = () => <Search { ...searchData } { ...actionsData } />;
