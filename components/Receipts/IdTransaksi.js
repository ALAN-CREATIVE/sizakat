import React from 'react';
import IdTransaksiContainer from './IdTransaksiStyle';

export default function IdTransaksi({id}){
    return (
        <IdTransaksiContainer>
            ID TRANSAKSI : #{id}
        </IdTransaksiContainer>
    );
}