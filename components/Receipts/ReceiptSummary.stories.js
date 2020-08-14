import React from 'react';
import { action } from '@storybook/addon-actions';

import ReceiptSummary from './ReceiptSummary';

export default {
  component: ReceiptSummary,
  title: 'Receipt/Summary'
}

const receiptSummaryData = {
  payments: [
    {name: 'Sydniy Melbourn', amount: 400000, type: 'MONEY'},
    {name: 'Dzakiah Lorem', amount: 350000, type: 'MONEY'},
    {name: 'Ipsum Sit', amount: 50000, type: 'MONEY'},
    {name: 'Sydniy Lorem', amount: 2.0, type: 'RICE'},
    {name: 'Dzakiah Lorem', amount: 3.0, type: 'RICE'}
  ],
  cashMethods: [
    {label: 'Transfer Bank', value: 'TRANSFER'},
    {label: 'Tunai di Masjid Al-Jabbar', value: 'CASH', note: 'Jam Operasional Selasa - Sabtu 08.00 - 17.00'}
  ],
  riceMethods: [
    {label: 'Dijemput', value: 'PICKUP', needAddress: true},
    {label: 'Diantar ke Masjid Al-Jabbar', value: 'DELIVER', note: 'Jam Opersaional Selasa - Sabtu 08.00 - 17.00'}
  ],
  riceAddressForm: {
    label: 'Alamat Lengkap',
    placeholder: 'Diisi dengan alamat'
  },
  nextButtonLabel: 'Lanjutkan Ke Pengiriman >>'
}

const actionsData = {
  onCashMethodChosen: action('onCashMethodChosen'),
  onRiceMethodChosen: action('onRiceMethodChosen'),
  onRiceAddressFilled: action('onRiceAddressFilled'),
  onNextButtonClick: action('onNextButtonClick')
}

export const Default = () => <ReceiptSummary { ...receiptSummaryData } { ...actionsData } />
