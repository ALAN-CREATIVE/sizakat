import React, { useState } from 'react';
import { SearchContainer } from './SearchStyle';

export default function Search({placeholder, onChange}) {
  const [value, setValue] = useState('');
  return (
    <SearchContainer>
      <form className="example">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }} 
        type="text" 
        placeholder={placeholder} 
        name="search"
      />
      </form>
    </SearchContainer>
  );
}
  
