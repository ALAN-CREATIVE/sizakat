import React from 'react';
import TransaksiUangContainer from './TrasferUangStyle';
import Button from '../Buttons/Button'

export default function TransferUang({location, accountName, bankName, accountNumber, nominal}){
    return (
        <TransaksiUangContainer>
            <p><b>Pengiriman Uang</b><br></br>Transfer</p>
            <br></br>
            <p>Silakan transfer ke {location}</p>

            <p>{bankName} <br></br> {accountName}</p> 

            <div className="highlight">
                <b>Nomor Rekening</b>
                <div className="flex-container">
                    <div className="num">
                        {accountNumber}
                    </div>
                    <div>
                        <Button type="tertiary" label="salin" />
                    </div>
                </div>
            </div>
            <br></br>
            <div className="highlight">
                <b>Nominal</b>
                <div className="flex-container">
                    <div className="num">
                        Rp {nominal}
                    </div>
                    <div>
                        <Button type="tertiary" label="salin" />
                    </div>
                </div>
            </div>
        </TransaksiUangContainer>
    )
}