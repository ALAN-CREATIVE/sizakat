import React from 'react';
import { action } from '@storybook/addon-actions';

import Warning from './Warning';

export default {
  component: Warning,
  title: 'Warning',
  excludeStories: /.*Data$/,
}

export const warningData = {
  message: 'Apakah Anda yakin menghapus "Dewi Kobujer" dari Daftar Mustahik?',
  confirmButton: 'Ya, Hapus',
}

const actionsData = {
  onConfirm: action('onConfirm'),
  onReject: action('onReject'),
}

export const Default = () => <Warning { ...warningData } { ...actionsData } />;
