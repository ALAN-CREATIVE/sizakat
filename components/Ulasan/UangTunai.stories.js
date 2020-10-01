import React from 'react'
import UangTunai from './UangTunai'

export default {
    component : UangTunai,
    title : 'UangTunai',
    excludeStories: /.*Data$/,
}

export const tunaiData = {
    location : 'Masjid Al-Jabbar',
    amount : 650000,
    workingHour: 'Selasa-Sabtu 08.00-16.00'
}

export const Default = () => <UangTunai {... tunaiData} />