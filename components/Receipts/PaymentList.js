import React from 'react';
import PropTypes from 'prop-types';
import { ItemList } from './ReceiptStyle';

const PaymentList = ({ payments, total }) => {
  return (
    <ItemList>
      <ul className="name">
        {payments.map(payment => (
          <li key={payment.name}>{ payment.name }</li>
        ))}
        <li className="total">{ total.label }</li>
      </ul>
      <ul className="amount">
        {payments.map(payment => (
          <li key={payment.name}>{ payment.amount }</li>
        ))}
        <li className="total">{ total.amount }</li>
      </ul>
    </ItemList>
  )
}

export default PaymentList;

PaymentList.protoType = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount:PropTypes.string.isRequired
    })
  ).isRequired,
  total: PropTypes.shape({
    label: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
  }).isRequired
}
