import React from 'react';
import UlasanContainer from './UlasanStyle';

export default function BerasJemput ({amount, address}){
    return(
        <UlasanContainer>
            <p><b>{amount} kilogram Beras</b></p>
            <p>
                <b>Pengiriman Beras</b> <br></br>
                Dijemput di {address} <br></br>
            </p>
        </UlasanContainer>
        
    )
}