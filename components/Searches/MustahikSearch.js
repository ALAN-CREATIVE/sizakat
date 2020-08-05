import React from 'react';
import { SearchStyle } from './SearchStyle';
import { gql } from '@apollo/client'

export default function MustahikSearch({onKeyPress}) {

    const onKeyPressed = (event) => {
        console.log(event.key)
        if(event.key == "Enter"){
            console.log("test")
            onKeyPress(event.target)
        }
    }

    return (
        <div>
            <SearchStyle />
            <input type="text" placeholder="Cari berdasarkan nama" name="search" onKeyPress={onKeyPressed}/> 
        </div>
    );
}

function SearchingFunction(keyword) {
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
      
    `
}