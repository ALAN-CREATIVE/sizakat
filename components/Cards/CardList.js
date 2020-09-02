import React from 'react';
import styled from 'styled-components';

import Card from './Card';

const Container = styled.div`
  display: flex;
  background: tranparent;
  flex-direction: column;
`

const CardContainer = styled.div`
  margin: 20px 0px;
`

const CardList = ({ list, path }) => {
  return (
    <Container>
      {list.map(item => (
        <CardContainer key={item.id}>
          <Card { ...item } path={path} query={`id=${item.id}`}/>
        </CardContainer>
      ))}
    </Container>
  );
}

export default CardList;
