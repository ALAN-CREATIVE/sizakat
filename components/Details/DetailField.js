import React from 'react';
import { DetailStyle } from './DetailStyle';

export default function DetailField({ props: { title, description}}) {
 
  return (
      <div>
        <DetailStyle />
    <h1>
      { title }
    </h1>
    <h2>
        { description }
    </h2>
    </div>
  );
}
