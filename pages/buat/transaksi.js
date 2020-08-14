import Head from 'next/head';
import { useRouter } from 'next/router';
import { useReducer } from 'react';
import TitleFlow from '../../components/Titles/TitleFlow';
import {useState, useEffect} from 'react';
import ReceiptSummary from '../../components/Receipts/ReceiptSummary';
import styled from 'styled-components';

const UPDATE_PAYMENT_TYPE = 0,
      UPDATE_GOODS_DELIVERY_TYPE_WITH_ADDRESS = 1,
      UPDATE_GOODS_DELIVERY_TYPE_WITHOUT_ADDRESS = 2,
      UPDATE_PICK_UP_ADDRESS = 3;

const Main = styled.main`
  font-family: Muli, sans-serif;
  padding: 60px 100px;
  background: #F5F6F8;
  min-height: 80vh;

  > h1 {
    font-size: 44px;
    line-height: 55px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 50px;
    color: #393F50;
  }

  section {
    margin: 20px 10px;
  }
`

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

export default function() {

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [zakatTransactions, setZakatTransactions] = useState([]);
  const [transaction, dispatchTransaction] = useReducer(transactionReducer, {});

  useEffect(() => {
    if (router.query.page == undefined) setCurrentPage(0);
    else setCurrentPage(Number.parseInt(router.query.page));
  }, [router]);

  useEffect(() => {
    console.log(transaction);
  }, [transaction])

  return (
    <>
      <Head>
        <title>Membuat Transaksi</title>
      </Head>
      <Main>
        <h1>Transaksi Zakat</h1>
        <section>
          <TitleFlow
            titleList={[
              'Data',
              'Pengiriman',
              'Ulasan',
              'Kwitansi'
            ]}
            currentTitleIndex={currentPage}
          />
        </section>
        {currentPage == 1 && (
          <section>
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
              onNextButtonClick={() => router.push('/buat/transaksi?page=2', undefined, { shallow: true })}
            />
          </section>
        )}
      </Main>
    </>
  )
}
