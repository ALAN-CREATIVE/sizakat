import React from 'react';
import { action } from '@storybook/addon-actions';
import TransferUang from"./TransferUang"

export default {
    component : TransferUang,
    title : 'TransferUang'
}

export const transData = {
    location : 'Masjid Al-Jabbar',
    accountName : 'Masjid Al-Jabbar',
    bankName : 'Muamalat',
    accountNumber : 999991223458273,
    nominal : 650000,
}

export const Default = () => <TransferUang {...transData} />