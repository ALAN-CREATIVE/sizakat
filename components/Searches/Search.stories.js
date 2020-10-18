import React from 'react';

import Search from './Search';

export default {
  component: Search,
  title: 'Search',
  excludeStories: /.*Data$/,
};

export const searchData = {
  placeholder: 'Cari berdasarkan nama sumber data',
};

export const Default = () => <Search props={{ ...searchData }} />;
