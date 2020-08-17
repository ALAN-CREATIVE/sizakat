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
    options : ['Semua Kategori Sumber Data','Warga','Pesantren','Pekerja'],
    required : false,
    error : null,
}

export const actionsData={
    onRadioClicked: action('onRadioClicked')
}

export const Default = () => <Filter {...filterData} {...actionsData}/> ;
