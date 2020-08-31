import React, { useState } from 'react';
import { InputContainer } from './InputStyle';

export default function TextField({ label, placeholder, required, error, onChange, disabled, defaultValue }) {
  const [value, setValue] = useState(null);
  const onInputChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }
  return (
    <InputContainer>
      <label className={required ? 'required' : null}> {label} </label>
      <input
        type="text"
        name={label}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onInputChange}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {error && <span className="error">{error}</span>}
    </InputContainer>
  );
}
