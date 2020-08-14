import React from 'react';
import PaymentList from './PaymentList';

export default {
  title: 'Receipt/Parts/Payment List',
  component: PaymentList
}

const paymentListData = {
  payments: [
    {name: 'Syidniy Melborn', amount: 'Rp 400.000'},
    {name: 'Dzakiah Aisyah', amount: 'Rp 250.000'}
  ],
  total: {
    label: 'Total Transaksi Uang',
    amount: 'Rp 650.000'
  }
}

export const Default = () => <PaymentList { ...paymentListData } />
