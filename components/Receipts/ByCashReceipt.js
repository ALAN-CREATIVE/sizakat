import React from 'react';
import PropTypes from 'prop-types';
import { ReceiptContainer } from './ReceiptStyle';
import { formatMoney } from '../../utils/parser-util';
import PaymentList from './PaymentList';
import PaymentOptions from './PaymentOptions';

const ByCashReceipt = ({ payments, methods, onMethodChosen }) => {
  const total = payments.reduce(({ amount: accumulated }, { amount: current }) => ({ amount: accumulated + current }));
  return (
    <ReceiptContainer>
      <h1>Transaksi Uang</h1>
      <div className='container'>
        <PaymentList
          payments={payments.map(payment => ({
            name: payment.name,
            amount: 'Rp ' +formatMoney(payment.amount, 0)
          }))}
          total={{
            label: 'Total Transaksi uang',
            amount: 'Rp ' + formatMoney(total.amount, 0)
          }}
        />
      </div>
      <div>
        <PaymentOptions
          title={'Pengiriman'}
          methods={methods}
          onMethodChosen={onMethodChosen}
        />
      </div>
    </ReceiptContainer>
  );
}

export default ByCashReceipt;

ByCashReceipt.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ),
  methods: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      note: PropTypes.string
    })
  ),
  onMethodChosen: PropTypes.func.isRequired
}
