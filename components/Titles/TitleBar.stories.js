import React from 'react';
import TitleBar from './TitleBar';

export default {
    component: TitleBar,
    title: 'Title Bar'
}

const titleData = {
    title: 'Lorem Ipsum',
    path: 'Sit // Dolor //',
    current: 'Amet'
}

export const Default = () => <TitleBar { ...titleData } />
