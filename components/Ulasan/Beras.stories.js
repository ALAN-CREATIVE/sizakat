import React from 'react'
import BerasJemput from './BerasJemput'
import BerasAntar from './BerasAntar'

export default {
    component : {BerasJemput, BerasAntar},
    title : 'Beras',
    excludeStories: /.*Data$/,
}

export const jemputData = {
    address : 'Jalan Taman Mini Indonesia Indah',
    amount : 2.5,
}
export const antarData = {
    location : 'Masjid Al-Jabbar',
    amount : 2.5,
    workingHour: 'Selasa-Sabtu 08.00-16.00'
}

export const Jemput = () => <BerasJemput {... jemputData} />
export const Antar = () => <BerasAntar {... antarData} />