import React from 'react';
import TransferUang from './TransferUang'

export default {
    component : TransferUang,
    title : 'TransferUang',
    excludeStories: /.*Data$/,
}

export const transData = {
    location : 'Masjid Al-Jabbar',
    accountName : 'Masjid Al-Jabbar',
    bankName : 'Muamalat',
    accountNumber : 999991223458273,
    amount : 650000,
}

export const Default = () => <TransferUang {...transData} />