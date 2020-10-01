import React from 'react';
import UlasanContainer from './UlasanStyle';
import Uang from './Uang'
import { formatMoney } from '../../utils/parser-util';

export default function UangTunai ({location, amount, workingHour}){
    return(
        <UlasanContainer>
            <p><b><Uang amount= {formatMoney(amount)}/></b></p>
            <p>
                <b>Pengiriman</b> <br></br>
                Tunai di {location} <br></br>
                <span className="info">*jam Operasional {workingHour}</span>
            </p>
        </UlasanContainer>   
    )
}