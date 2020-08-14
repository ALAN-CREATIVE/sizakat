import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { MethodsContainer, Note } from './ReceiptStyle';

const PaymentOptions= ({ methods, title, onMethodChosen }) => {
  const [choosenIndex, setChoosenIndex] = useState(null);
  return (
    <MethodsContainer>
      <h1>{ title }:</h1>
      <div className="methods">
        {methods.map((method, index) => (
          <div className="method" key={index} onClick={() => {
            setChoosenIndex(index)
            if (index !== choosenIndex) onMethodChosen(method.value);
          }}>
            <div className={`box ${index === choosenIndex ? 'choosen' : ''}`} />
            <p>{ method.label } {method.note && <Note>{ method.note }</Note>}</p>
          </div>
        ))}
      </div>
    </MethodsContainer>
  );
}

export default PaymentOptions;

PaymentOptions.propTypes = {
  methods: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      note: PropTypes.string
    })
  ),
  title: PropTypes.string.isRequired,
  onMethodChosen: PropTypes.func.isRequired
};
