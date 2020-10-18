import Head from 'next/head';
import React, { useState } from 'react';

import { InputStyle } from './InputStyle';

export default function PasswordField({
  label,
  placeholder,
  required,
  error,
  onChange,
}) {
  const [value, setValue] = useState(null);
  const onInputChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  return (
    <div>
      <Head>
        <script
          src="https://kit.fontawesome.com/55168252d6.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <main>
        <InputStyle />
        <label className={required ? 'required' : null}> {label} </label>
        <div>
          <input
            type="password"
            name={label}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={onInputChange}
          />
          {error && <span className="error">{error}</span>}
        </div>
      </main>
    </div>
  );
}
