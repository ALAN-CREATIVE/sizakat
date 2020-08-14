import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { formatMoney } from '../../utils/parser-util';
import PaymentList from './PaymentList';
import PaymentOptions from './PaymentOptions';
import { ReceiptContainer } from './ReceiptStyle';
import TextField from '../Inputs/TextField';

const ByRiceReceipt = ({
  payments,
  methods,
  addressForm,
  onMethodChosen,
  onAddressFilled
}) => {
  const total = payments.reduce(({ amount: accumulated }, { amount: current }) => ({ amount: accumulated + current }));
  const [needAddress, setNeedAddress] = useState(false);
  return (
    <ReceiptContainer>
      <h1>Transaksi Beras</h1>
      <div className='container'>
        <PaymentList
          payments={payments.map(payment => ({
            name: payment.name,
            amount: formatMoney(payment.amount, 1) + ' kilogram'
          }))}
          total={{
            label: 'Total Transaksi Beras',
            amount: formatMoney(total.amount, 1) + ' kilogram'
          }}
        />
      </div>
      <div>
        <PaymentOptions
          title={'Pengiriman'}
          methods={methods}
          onMethodChosen={(value) => {
            if (methods.some(method => method.needAddress && method.value === value)) {
              setNeedAddress(true);
            } else {
              setNeedAddress(false);
            }
            onMethodChosen(value);
          }}
        />
      </div>
      <div className={needAddress ? '' : 'hidden'}>
        <TextField
          label={addressForm.label}
          placeholder={addressForm.placeholder}
          onChange={onAddressFilled}
          required
        />
      </div>
    </ReceiptContainer>
  )
}

export default ByRiceReceipt;

ByRiceReceipt.propTypes = {
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
      note: PropTypes.string,
      needAddress: PropTypes.bool
    })
  ),
  addressForm: PropTypes.shape({
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }),
  onMethodChosen: PropTypes.func.isRequired,
  onAddressFilled: PropTypes.func.isRequired
}
