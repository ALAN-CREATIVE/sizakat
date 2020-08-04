import React from 'react';
import { SearchStyle } from './SearchStyle';

export default function Search({props: {placeholder}}) {
 
    return (
        <div>
            <SearchStyle />
            
            <form class="example" action="#">
                <input type="text" placeholder={placeholder} name="search"/>
            </form>
      
        </div>
    );
  }
  