import React from 'react';
import { action } from '@storybook/addon-actions';
import Filter from './Filter';


export default {
    component: Filter,
    title: 'Filter',
    excludeStories: /.*Data$/
}

export const filterData = {
    label: 'SEMUA KATEGORI SUMBER',
    options: [
        {display: 'Semua Kategori Sumber Data', value: 'ALL'},
        {display: 'Warga', value: 'WARGA'},
        {display: 'Institusi', value: 'INSTITUSI'}, 
        {display: 'Pekerja', value: 'PEKERJA'}
    ],
    required : false,
    error : null
}

export const actionsData={
    onRadioClicked: action('onRadioClicked')
}

export const Default = () => <Filter {...filterData} {...actionsData}/> ;
