import React, { useState } from 'react';
import { InputStyle } from './InputStyle';

export default function TextField({ label, placeholder, required, error, onChange, disabled }) {
  const [value, setValue ] = useState(null);
  const onInputChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }
  return (
    <div>
      <InputStyle />
      <label className={required ? 'required' : null}> { label } </label>
      <input
        type="text"
        name={label}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onInputChange}
        disabled={disabled}
      />
      { error && <span className="error">{ error }</span> }
    </div>
  );
}
