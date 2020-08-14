import React from 'react';
import { action } from '@storybook/addon-actions';

import ByCashReceipt from './ByCashReceipt';

export default {
  component: ByCashReceipt,
  title: 'Receipt/Cash'
}

const byCashReceiptData = {
  payments: [
    {name: 'Syidniy melborn', amount: 400000},
    {name: 'Dzakiah Aisyah', amount: 250000}
  ],
  methods: [
    {label: 'Transfer Bank', value: 'TRANSFER'},
    {label: 'Tunai di Masjid Al-Jabbar', value: 'TUNAI', note: 'Jam Operasional Selasa - Sabtu 08.00 - 17.00'}
  ]
}

const actionsData = {
  onMethodChosen: action('onMethodChosen')
}

export const Default = () => <ByCashReceipt { ...byCashReceiptData } { ...actionsData } />
