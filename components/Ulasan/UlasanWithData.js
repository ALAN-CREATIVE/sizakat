import React, {useState, useEffect} from 'react';
import { gql, useQuery } from '@apollo/client';
import Ulasan from './Ulasan';

const QUERY_TRANSAKSI = gql`
    query transactionQuery($transactionId: ID!) {
        transaction(transactionId: $transactionId) {
            id
            goodsDeliveryType
            paymentType
            zakattransactionSet{
                value
                muzakki{
                    id
                }
                zakatType{
                    id
                }
            }
        }
    }
  
`;

export default function UlasanWithData ({ transactionId }){
    const { data, loading, error } = useQuery(QUERY_TRANSAKSI, {variables: {transactionId}})

    var totalMoney = 0;
    var totalRice = 0;

    if (loading) return <p>Loading...</p>;

    if (error) {
        console.log(error);
        console.log(error.graphQLErrors);
        if (error.networkError && error.networkError.result) console.log(error.networkError.result.errors);
        return  [error].map(({message})=>(
            <p>{message}</p>
        ));
    }

    console.log(data)
    data.transaction.zakattransactionSet.map(({ value, muzakki, zakatType })=> {
        if(zakatType.id === '3'){
            totalRice += value;
        } else {
            totalMoney += value;
        }
    })

    return(
        <Ulasan
        moneyAmount = {totalMoney}
        riceAmount = {totalRice}
        paymentType = {data.transaction.paymentType}
        goodsDeliveryType = {data.transaction.goodsDeliveryType}
        location = 'Masjid Al-Jabbar'
        address = 'Jalan TMII'
        accountName = 'Masji Al-Jabbar'
        accountNumber = {999991223458273}
        bankName = 'BNI'
        workingHour = 'Selasa-Sabtu 08.00-16.00'
        />
    )

}