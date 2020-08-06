import React, { useState } from 'react';
import { SearchStyle } from './SearchStyle';
import { gql, useLazyQuery } from '@apollo/client'

export function MustahikSearch({setMustahikData}) {
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
    const [getData, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);
    const onKeyPressed = (event) => {
        console.log(event.key)
        if(event.key == "Enter"){
            console.log(event.target.value)
            getData({variables:{nameContains: event.target.value}})
            // console.log(data)
        }
    }

    if(data){
        setMustahikData(data)
        // console.log("hasil set")
        // console.log(setMustahikData)
    }

    return (
        <div>
            <SearchStyle />
            <input type="text" placeholder="Cari berdasarkan nama" name="search" onKeyPress={onKeyPressed}/> 
        </div>
    );
}

