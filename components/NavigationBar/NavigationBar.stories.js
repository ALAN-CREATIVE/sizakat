import React from 'react';
import NavigationBar from './NavigationBar';
import { action } from '@storybook/addon-actions';

export default {
    component: NavigationBar,
    title: 'Navigation Bar',
    excludeStories: /.*Data$/,
}

export const menuData = {
    name: 'Annisaa Fitri Shabrina',
    role: 'Admin',
    menuPenyaluranZakat: 'Penyaluran Zakat',
    submenuPenyaluranZakat: ['Data Mustahik', 'Sumber Data Mustahik'],
    menuTransaksiZakat: 'Transaksi Zakat',
    submenuTransaksiZakat: ['Data Transaksi', 'Data Muzaki']

}

const actionsData = {
    onMenuClicked: action('onMenuClicked')
  }

export const Default = () => <NavigationBar { ...menuData } { ...actionsData} />
