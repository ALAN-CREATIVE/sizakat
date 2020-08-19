import React from 'react';
import { RadioButtonStyle } from './InputStyle';

const RadioButton = ({ label, options, required, error, onRadioClicked, defaultChecked }) => {
  return (
    <div>
      <label className={`main-label ${ required ? 'required' : '' }`}>{ label }</label>
      <div className="radios" onChange={(e) => onRadioClicked(e.target.value)}>{options.map(option => (
	<div className="radio" key={option}>
	  <input name={label} type="radio" value={defaultChecked ? option.value : option} key={`input-${option}`} checked={defaultChecked ? option.value === defaultChecked : null} />
	  <label key={`label-${option}`}>{ defaultChecked ? option.name : option }</label>
	</div>
      ))}</div>
      { error && <span className="error">{ error }</span> }
      <RadioButtonStyle />
    </div>
  );
}

export default RadioButton;
