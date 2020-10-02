import React from 'react';
import Ulasan from './Ulasan';

export default {
    component : Ulasan,
    title : 'Ulasan',
    excludeStories: /.*Data$/,
}

export const ulasanData = {
    paymentType : 'TRANSFER',
    goodsDeliveryType : 'DELIVERY',
    location : 'Masjid Al-Jabbar',
    accountName : 'Masjid Al-Jabbar',
    bankName : 'Muamalat',
    accountNumber : 999991223458273,
    moneyAmount : 650000,
    riceAmount : 2.5,
    workingHour: 'Selasa-Sabtu 08.00-16.00',
    address: 'Jalan Taman Mini Indonesia Indah',
}

export const Default = () => <Ulasan {...ulasanData} />