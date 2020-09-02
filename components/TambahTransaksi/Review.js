import React, {useState, useEffect} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import ReviewStyle from './ReviewStyle';

const QUERY_TRANSAKSI = gql`
    query transactionQuery($transactionId: ID!) {
        transaction(transactionId: $transactionId) {
            id
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
export default function Review ({ transactionId }){
    const { data, loading, error } = useQuery(QUERY_TRANSAKSI, {variables: {transactionId}})

    
    var money = 0;
    var rice = 0;
    var muzakkiSet = new Set();

    if (loading) return <p>Loading...</p>;

    if (error) {
        console.log(error);
        console.log(error.graphQLErrors);
        if (error.networkError && error.networkError.result) console.log(error.networkError.result.errors);
        return  [error].map(({message})=>(
            <p>{message}</p>
        ));
    }


    data.transaction.zakattransactionSet.map(({ value, muzakki, zakatType })=> {
        muzakkiSet.add(muzakki.id)
        if(zakatType.id === '3'){
            rice += value;
        } else {
            money += value;
        }
    })
    

    var jumlahMuzakki = muzakkiSet.size
    return (
        <div>
            <ReviewStyle />
            <div className="rev-container">
                <p>Sudah Tersimpan {jumlahMuzakki} Muzakki</p>
                <p>Total Nominal {money} Rupiah dan {rice} Kg Beras</p>
            </div>
        </div>
    )
}
