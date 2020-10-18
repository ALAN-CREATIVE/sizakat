import React from 'react';

import ButtonStyle from './ButtonStyle';

export default function Button({ label, type, onClick, action }) {
  return (
    <div>
      <ButtonStyle />
      <button className={type} onClick={onClick} type={action}>
        {label}
      </button>
    </div>
  );
}
