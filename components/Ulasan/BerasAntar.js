import React from 'react';
import UlasanContainer from './UlasanStyle';

export default function BerasJemput ({amount, location, workingHour}){
    return(
        <UlasanContainer>
            <p><b>{amount} kilogram Beras</b></p>
            <p>
                <b>Pengiriman Beras</b> <br></br>
                Dijemput di {location} <br></br>
                <span className="info">*jam Operasional {workingHour}</span>
            </p>
        </UlasanContainer>
        
    )
}