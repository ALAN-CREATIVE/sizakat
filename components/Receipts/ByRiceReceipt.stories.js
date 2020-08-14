import React from 'react';
import { action } from '@storybook/addon-actions';

import ByRiceReceipt from './ByRiceReceipt';

export default {
  component: ByRiceReceipt,
  title: 'Receipt/Rice'
}

const byRiceReceiptData = {
  payments: [
    {name: 'Syidniy Melborn', amount: 2.5},
    {name: 'Bambang Bimbing', amount: 1.0}
  ],
  methods: [
    {label: 'Dijemput', value: 'PICK_UP', needAddress: true},
    {label: 'Diantar ke Masjid Al-Jabbar', value: 'SEND', note: 'Jam Opersaional Selasa - Sabtu 08.00 - 17.00'}
  ],
  addressForm: {
    label: 'Alamat Lengkap',
    placeholder: 'Diisi dengan alamat'
  }
}

const actionsData = {
  onMethodChosen: action('onMethodChosen'),
  onAddressFilled: action('onAddressFilled')
}

export const Default = () => <ByRiceReceipt { ...byRiceReceiptData } { ...actionsData } />
