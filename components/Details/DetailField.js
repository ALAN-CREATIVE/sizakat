import React from 'react';
import { DetailContainer } from './DetailStyle';

export default function DetailField({title, description}) {
  return (
    <DetailContainer>
      <h1>
        { title }
      </h1>
      <h2>
        { description }
      </h2>
    </DetailContainer>
  );
}
