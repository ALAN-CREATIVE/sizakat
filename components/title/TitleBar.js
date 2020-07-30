import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Muli;
`

const TitleContainer = styled.div`
  display: flex;
  &:after {
    content: "";
    border: 1px solid #C2C2C2; 
    height: 0px;
    width: 95%;
    align-self: center;
  }
`

const Title = styled.h1`
  font-weight: 800;
  font-size: 24px;
  color: #393F50;
  min-width: max-content;
  padding-right: 20px;
  margin: 0px;
`

const Path = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #C2C2C2;
`

const Current = styled.span`
  color: #00239D;
`

const TitleBar = ({ title, path, current }) => {
  return (
    <Container>
      <TitleContainer><Title>{ title }</Title></TitleContainer>
      <Path>{`${path} `}<Current>{ current }</Current></Path>
    </Container>
  )
}

export default TitleBar;
