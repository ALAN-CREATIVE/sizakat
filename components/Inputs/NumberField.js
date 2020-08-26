import React, { useState } from 'react';
import { InputContainer } from './InputStyle';

export default function NumberField( {label, placeholder, required, error, onChange, defaultValue }) {
  const [value, setValue ] = useState(defaultValue);
  const onInputChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }
  return (
    <InputContainer>
      <label className={required ? 'required' : null}> { label } </label>
      <input type="number" name={label} value={value} placeholder={placeholder} required={required} onChange={onInputChange} defaultValue={defaultValue}/>
      { error && <span className="error">{ error }</span> }
    </InputContainer>
  );
}
