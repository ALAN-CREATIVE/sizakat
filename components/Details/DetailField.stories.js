import React from 'react';
import DetailField from './DetailField';

export default {
  component: DetailField,
  title: 'Details/Detail Field',
  excludeStories: /.*Data$/,
}

export const detailsData = {
  title: 'Usia', 
  description: '67 tahun',
}

export const Default = () => <DetailField { ...detailsData } />;
