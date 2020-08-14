import React from 'react';
import { action } from '@storybook/addon-actions';

import PaymentOptions from './PaymentOptions';

export default {
  title: 'Receipt/Parts/Payment Option',
  component: PaymentOptions
}

const paymentOptionData = {
  title: 'Pengiriman',
  methods: [
    {label: 'Transfer Bank', value: 'TRANSFER'},
    {label: 'Tunai di Masjid Al-Jabbar', value: 'TUNAI', note: 'Jam Operasional Selasa - Sabtu 08:00 - 17:00'}
  ]
}

const actionsData = {
  onMethodChosen: action('onMethodChosen')
}

export const Default = () => <PaymentOptions { ...paymentOptionData } { ...actionsData } />
