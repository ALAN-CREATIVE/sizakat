import React from 'react';
import BerasAntar from './BerasAntar';
import BerasJemput from './BerasJemput';
import UangTunai from './UangTunai';
import TransferUang from './TransferUang';
import UlasanContainer from './UlasanStyle';
import Button from '../Buttons/Button';

export default function Ulasan({
    moneyAmount, 
    riceAmount, 
    paymentType, 
    goodsDeliveryType,
    location,
    address,
    accountName,
    accountNumber,
    bankName,
    workingHour
}){
    return(
        <UlasanContainer>
            <div className="title">Ringkasan Transaksi</div>
            <div className="content">
                <div className="money">
                    <div className="title">Transaksi Uang</div>
                    {paymentType === 'TRANSFER' && (
                        <TransferUang 
                        location = {location}
                        accountName = {accountName}
                        bankName = {bankName}
                        accountNumber = {accountNumber}
                        amount = {moneyAmount}
                        />
                    )}
                    {paymentType === 'CASH' && (
                        <UangTunai
                        location = {location}
                        amount = {moneyAmount}
                        workingHour = {workingHour}
                        />
                    )}
                </div>
                <div className="rice">
                    <div className="title">Transaksi Beras</div>
                    {goodsDeliveryType === 'PICKUP' && (
                        <BerasJemput 
                        amount = {riceAmount}
                        address = {address}
                        />
                    )}
                    {goodsDeliveryType === 'DELIVER' && (
                        <BerasAntar 
                        amount = {riceAmount}
                        location = {location}
                        workingHour = {workingHour}
                        />
                    )}
                </div>
            </div>
            <Button label="LANJUTKAN KE KWITANSI >>" type="primary" /> <br></br>
        </UlasanContainer>
    )
}

