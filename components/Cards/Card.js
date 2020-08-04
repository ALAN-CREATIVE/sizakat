import React from 'react';
import { Container, DetailButton } from './CardStyle';

const Card = ({ label, desc, id, onDetailClicked }) => {
  return (
    <Container>
      <div>
        <h1 style={{fontSize: '16px', fontWeight: 600, color: '#393F50', margin: 0}}>{ label }</h1>
        <p style={{margin: 0, fontSize: '12px', fontWeight: 600, color: '#EB4E2C'}}>{ desc }</p>
      </div>
      <DetailButton>
        <a style={{cursor: 'pointer'}} onClick={() => onDetailClicked(id)}>Detail</a>
      </DetailButton>
    </Container>
  )
}

export default Card;
