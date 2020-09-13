import React, {useState, useReducer, useEffect} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import ReceiptSummary from './ReceiptSummary';
import { useRouter } from 'next/router';

const QUERY_TRANSAKSI = gql`
    query transactionQuery($transactionId: ID!) {
        transaction(transactionId: $transactionId) {
            zakattransactionSet{
                value
                muzakki{
                    name
                }
                zakatType{
                    itemType
                }
            }
        }
    }
`;

const UPDATE_TRANSAKSI = gql `
    mutation transactionMutation($input: TransactionMutationInput!) {
        transactionMutation(input: $input) {
            transaction {
                id
                paymentType
                goodsDeliveryType
                pickUpAddress
                transferReceipt
                paymentConfirmation
                goodsConfirmation
            }
            errors {
                field
                messages
            }
        }
    }
`

const INITIAL_DATA_TRANSAKSI = gql `
    query transactionQuery($transactionId: ID!) {
        transaction(transactionId: $transactionId) {
            id
            paymentType
            goodsDeliveryType
            pickUpAddress
            transferReceipt
            paymentConfirmation
            goodsConfirmation
        }
    }
`

const UPDATE_PAYMENT_TYPE = 0,
      UPDATE_GOODS_DELIVERY_TYPE_WITH_ADDRESS = 1,
      UPDATE_GOODS_DELIVERY_TYPE_WITHOUT_ADDRESS = 2,
      UPDATE_PICK_UP_ADDRESS = 3;

function transactionReducer(state, action) {
    switch (action.type) {
        case UPDATE_PAYMENT_TYPE:
            return { ...state, paymentType: action.value };
        case UPDATE_GOODS_DELIVERY_TYPE_WITH_ADDRESS:
            return { ...state, goodsDeliveryType: action.value, pickUpAddress: action.address };
        case UPDATE_GOODS_DELIVERY_TYPE_WITHOUT_ADDRESS:
            return {paymentType: state.paymentType, goodsDeliveryType: action.value};
        case UPDATE_PICK_UP_ADDRESS:
            if ((state.goodsDeliveryType == 'PICKUP')) return { ...state, address: action.value };
            else return state;
    }
}

export function ReceiptSummaryForm({transactionId, data}){
    const router = useRouter();
    const [pickUpAddress, setPickUpAddress] = useState('');
    const [transaction, dispatchTransaction] = useReducer(transactionReducer, {});
    const { data: dataTransaksi, loading, error } = useQuery(QUERY_TRANSAKSI, {variables: {transactionId}})
    const [ updateTransaksiData, setUpdateTransaksiData] = useState(data.transaction)
    const [updateTransaksi, {error: updateError}] = useMutation(UPDATE_TRANSAKSI)
    
    var zakatTransactions = []
    useEffect(() => {
        console.log(transaction);
        setUpdateTransaksiData({
            ...updateTransaksiData,
            paymentType: transaction.paymentType,
            goodsDeliveryType: transaction.goodsDeliveryType,
        });

        if(transaction.address){
            setUpdateTransaksiData({
                ...updateTransaksiData,
                pickUpAddress: transaction.address
            });
        }
        console.log(updateTransaksiData);
    }, [transaction])

    if (loading) return <p>Loading...</p>;

    if (error) {
        console.log(error);
        console.log(error.graphQLErrors);
        if (error.networkError && error.networkError.result) console.log(error.networkError.result.errors);
            return  [error].map(({message})=>(
            <p>{message}</p>
        ));
    }

    if(dataTransaksi) {
        dataTransaksi.transaction.zakattransactionSet.map(({ value, muzakki, zakatType })=> {
            zakatTransactions.push({name: muzakki.name, amount: value, type: zakatType.itemType})
        });
    }

    const submitUpdate = () => {
        console.log(updateTransaksiData);
        updateTransaksi({
            variables: {
                input: {
                    id : updateTransaksiData.id,
                    paymentType : updateTransaksiData.paymentType,
                    goodsDeliveryType: updateTransaksiData.goodsDeliveryType,
                    pickUpAddress: updateTransaksiData.pickUpAddress
                }
            }
        })
    }

    const nextPage = () => {
        submitUpdate()
        router.push('/buat/transaksi?page=2', undefined, { shallow: true })
    }
    
    return (
        <ReceiptSummary
            payments={zakatTransactions}
            cashMethods={[
                {label: 'Transfer Bank', value: 'TRANSFER'},
                {label: 'Tunai di Masjid Al-Jabbar', value: 'CASH', note: 'Jam Operasional Selasa - Sabtu 08.00 - 17.00'}
            ]}
            riceMethods={[
                {label: 'Dijemput', value: 'PICKUP', needAddress: true},
                {label: 'Diantar ke Masjid Al-Jabbar', value: 'DELIVER', note: 'Jam Opersaional Selasa - Sabtu 08.00 - 17.00'}
            ]}
            riceAddressForm={{label: 'Alamat Lengkap', placeholder: 'Diisi dengan alamat'}}
            onCashMethodChosen={(method) => dispatchTransaction({type: UPDATE_PAYMENT_TYPE, value: method})}
            onRiceMethodChosen={(method) => {
                if (method === 'PICKUP') {
                    dispatchTransaction({
                    type: UPDATE_GOODS_DELIVERY_TYPE_WITH_ADDRESS,
                    value: method,
                    address: pickUpAddress
                    });
                } else if (method === 'DELIVER') {
                    dispatchTransaction({
                    type: UPDATE_GOODS_DELIVERY_TYPE_WITHOUT_ADDRESS,
                    value: method
                    });
                }
            }}
            onRiceAddressFilled={(address) => {
                setPickUpAddress(address);
                dispatchTransaction({
                    type: UPDATE_PICK_UP_ADDRESS,
                    value: address
                })
            }}
            nextButtonLabel={'lanjutkan ke ulasan >>'}
            onNextButtonClick={nextPage}
        />
    ) 
};

function UpdatePage({transactionId}) {
    const router = useRouter();

    const {data, loading, error} = useQuery(INITIAL_DATA_TRANSAKSI, {variables: { transactionId }})

    
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return [error].map(({ message }, id) => (
        <p key={id}>{message}</p>
        ));
    }

    return(
        <div>
            <ReceiptSummaryForm transactionId={transactionId} data={data} />
        </div>
    )
};

export default function ReceiptSummaryWithData({transactionId}){
    return(
        <div>
            <UpdatePage transactionId={transactionId} />
        </div>
    )
}