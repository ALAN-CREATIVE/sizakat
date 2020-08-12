import React from 'react';
import { action } from '@storybook/addon-actions';

import Table from './Table';

export default {
  component: Table,
  title: 'Table'
}

const tableData = {
  title: 'Sumber Data Mustahik',
  searchPlaceholder: 'Cari berdasarkan nama sumber data',
  buttonCaption: 'Tambah Sumber Data',
  filterCaption: 'SEMUA KATEGORI SUMBER',
  filterOptions: [
    'Semua Kategori Sumber Data',
    'Warga',
    'Pesantren',
    'Pekerja',
  ],
  itemList: [
    {id: 1, desc: 'Warga', label: 'Lorem Ipsum'},
    {id: 2, desc: 'Warga', label: 'Sit Dolor Amet'},
    {id: 3, desc: 'Institusi', label: 'Consectetur Adisipicing'},
    {id: 4, desc: 'Pekerja', label: 'Elit Sed Do'},
    {id: 5, desc: 'Institusi', label: 'Eiusmod Tempor'},
  ]
}

const actionsData = {
  onFilterPicked: action('onFilterPicked'),
  onButtonClicked: action('onButtonClicked'),
  onSearchChanged: action('onSearchChanged'),
  onDetailClicked: action('onDetailClicked'),
}

export const Default = () => <Table { ...tableData } { ...actionsData } />
