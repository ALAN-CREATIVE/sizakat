import React from 'react';
import PropTypes from 'prop-types';
import { WhiteBoxContainer } from './ReceiptStyle';
import Button from '../Buttons/Button';
import ByCashReceipt from './ByCashReceipt';
import ByRiceReceipt from './ByRiceReceipt';

export default function ReceiptSummary({
  payments,
  cashMethods,
  riceMethods,
  onCashMethodChosen,
  onRiceMethodChosen,
  riceAddressForm,
  nextButtonLabel,
  onRiceAddressFilled,
  onNextButtonClick
}) {
  const cashPayments = payments.filter(payment => payment.type === 'MONEY');
  const ricePayments = payments.filter(payment => payment.type === 'RICE');
  return (
    <WhiteBoxContainer>
      <h1>Ringkasan Transaksi</h1>
      {cashPayments.length > 0 && (
        <section className="margined">
          <ByCashReceipt
            payments={cashPayments}
            methods={cashMethods}
            onMethodChosen={onCashMethodChosen}
          />
        </section>
      )}
      {ricePayments.length > 0 && (
        <section className="margined">
          <ByRiceReceipt
            payments={ricePayments}
            methods={riceMethods}
            onMethodChosen={onRiceMethodChosen}
            addressForm={riceAddressForm}
            onAddressFilled={onRiceAddressFilled}
          />
        </section>
      )}
      <div className="margined">
        <Button
          label={nextButtonLabel.toUpperCase()}
          type={'primary'}
          onClick={onNextButtonClick}
        />
      </div>
    </WhiteBoxContainer>
  );
}

ReceiptSummary.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf([
        'MONEY',
        'RICE',
        'GOLD',
        'CHECK'
      ]).isRequired
    })
  ).isRequired,
  cashMethods: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOf([
        'CASH',
        'TRANSFER'
      ])
    })
  ).isRequired,
  riceMethods: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOf([
        'PICKUP',
        'DELIVER'
      ]).isRequired,
      needAddress: PropTypes.bool,
      note: PropTypes.string
    })
  ),
  riceAddressForm: PropTypes.shape({
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }).isRequired,
  nextButtonLabel: PropTypes.string.isRequired,
  onCashMethodChosen: PropTypes.func.isRequired,
  onRiceMethodChosen: PropTypes.func.isRequired,
  onRiceAddressFilled: PropTypes.func.isRequired,
  onNextButtonClick: PropTypes.func.isRequired
}
