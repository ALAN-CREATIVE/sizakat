import React from 'react';
import Link from 'next/link';
import { Container, DetailButton } from './CardStyle';

const Card = ({ label, desc, path, query }) => {
  return (
    <Container>
      <div>
        <h1 style={{fontSize: '16px', fontWeight: 600, color: '#393F50', margin: 0}}>{ label }</h1>
        <p style={{margin: 0, fontSize: '12px', fontWeight: 600, color: '#EB4E2C'}}>{ desc }</p>
      </div>
      <DetailButton>
        <Link href={`${path}?${query}`}>
          <a style={{cursor: 'pointer'}}>Detail</a>
        </Link>
      </DetailButton>
    </Container>
  )
}

export default Card;
