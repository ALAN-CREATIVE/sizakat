import React from 'react';
import { SearchContainer } from './SearchStyle';

export function DataSourceSearch({setPicNameContains}) {
  const onKeyPressed = (event) => {
    if(event.key === "Enter"){
      setPicNameContains(event.target.value);
    }
  }

  return (
    <SearchContainer>
      <input
        type="text"
        placeholder="Cari berdasarkan nama"
        name="search"
        onKeyPress={onKeyPressed}
      />
    </SearchContainer>
  );
}

