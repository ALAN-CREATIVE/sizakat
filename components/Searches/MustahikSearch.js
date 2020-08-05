import React, { useState } from 'react';
import { SearchStyle } from './SearchStyle';
import { gql, useLazyQuery } from '@apollo/client'

export default function MustahikSearch({onKeyPress}) {
    const [value, setValue ] = useState('');
    const onKeyPressed = (event) => {
        console.log(event.key)
        if(event.key == "Enter"){
            setValue(event.target.value)
            console.log("test")
            onKeyPress(SearchingFunction(value))

        }
    }

    return (
        <div>
            <SearchStyle />
            <input type="text" placeholder="Cari berdasarkan nama" name="search" onKeyPress={onKeyPressed}/> 
        </div>
    );
}

const SEARCH_QUERY = gql`
    query mustahiks($nameContains: String) {
        mustahiks(nameContains: $nameContains) {
          id
          name
          dataSource {
            dataSourceDetail {
              ... on DataSourceWargaType {
                village
                rt
                rw
              }
              ... on DataSourceInstitusiType {
                village
                rt
                rw
              }
              ... on DataSourcePekerjaType {
                profession
                location
              }
            }
          }
        }
      } 
    `;

function SearchingFunction(keyword) {
    const { data, loading, error } = useLazyQuery(SEARCH_QUERY, {variables: {nameContains: keyword }})
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return  error.message;
    }
    
    return data.mustahiks;

}