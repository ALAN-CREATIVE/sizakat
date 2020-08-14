import React from 'react';
import TitleFlow from './TitleFlow';

export default {
  component: TitleFlow,
  title: 'Title/Title Flow'
}

const titleFlowData = {
  titleList: [
    'Data',
    'Pengiriman',
    'Ulasan',
    'Kwitansi'
  ],
  currentTitleIndex: 1
}

export const Default = () => <TitleFlow { ...titleFlowData } />
