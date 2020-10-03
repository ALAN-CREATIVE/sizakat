import React from 'react';
import UlasanContainer from './UlasanStyle';
import Uang from './Uang'
import Button from '../Buttons/Button'
import { formatMoney } from '../../utils/parser-util';

export default function TransferUang({location, accountName, bankName, accountNumber, amount}){

    return (
        <UlasanContainer>
            <p><b>Pengiriman Uang</b><br></br>Transfer</p>
            <p>Silakan transfer ke {location}</p>
            <p>{bankName} <br></br> {accountName}</p> 
            <div className="highlight">
                <b>Nomor Rekening</b>
                <div className="flex-container">
                    <div className="num" id="accNum">
                        {accountNumber}
                    </div>
                    <div>
                        <Button type="tertiary" label="salin"/>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="highlight">
                <b>Nominal</b>
                <div className="flex-container">
                    <div className="num">
                        <Uang amount= {formatMoney(amount)}/>
                    </div>
                    <div>
                        <Button type="tertiary" label="salin" />
                    </div>
                </div>
            </div>
        </UlasanContainer>
    )
}