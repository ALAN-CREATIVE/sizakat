import React from 'react';
import { RadioButtonContainer } from './InputStyle';

const RadioButton = ({ label, options, required, error, onRadioClicked }) => {
  return (
    <RadioButtonContainer>
      <label className={`main-label ${ required ? 'required' : '' }`}>{ label }</label>
      <div className="radios" onChange={(e) => onRadioClicked(e.target.value)}>{options.map(option => (
        <div className="radio" key={option}>
          <input name={label} type="radio" value={option} key={`input-${option}`} />
          <label key={`label-${option}`}>{ option }</label>
        </div>
      ))}</div>
      { error && <span className="error">{ error }</span> }
    </RadioButtonContainer>
  );
}

export default RadioButton;
