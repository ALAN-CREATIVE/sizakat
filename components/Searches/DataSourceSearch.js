import React, { useState, useEffect } from 'react';
import { SearchContainer } from './SearchStyle';
import { gql, useLazyQuery } from '@apollo/client'

export function DataSourceSearch({setDataSourceData}) {
    const SEARCH_QUERY = gql`
    query dataSources($nameContains: String) {
        dataSources(nameContains: $nameContains) {
          id
          category
          dataSourceDetail {
            __typename
            ... on DataSourceInstitusiType {
              picName
              name
              village
            }
            ... on DataSourcePekerjaType {
              picName
              profession
              location
            }
            ... on DataSourceWargaType {
              picName
              rt
              rw
              village
            }
          }
        }
      }
    `;
    const [getData, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);
    const onKeyPressed = (event) => {
        console.log(event.key)
        if(event.key === "Enter"){
            console.log(event.target.value)
            getData({variables:{nameContains: event.target.value}})
        }
    }

    useEffect(()=>{
      if(data){
        setDataSourceData(data)
        console.log(data);
      }
    });

    return (
        <SearchContainer>
            <input type="text" placeholder="Cari berdasarkan nama" name="search" onKeyPress={onKeyPressed}/> 
        </SearchContainer>
    );
}

