import styled from 'styled-components';

export const TitleListContainer = styled.div`
  font-family: Muli, sans-serif;
  font-weight: 600;
  color: #393F50;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 28px;
  display: grid;
  grid-template-columns: repeat(${ props => props.size }, 1fr);
`

export const Title = styled.div`
  display: flex;
  width: 80%;
  justify-self: center;
  justify-content: space-between;
  margin: 10px 20px;

  p {
    margin: 0px;
    margin-bottom: 0.3em;
    font-size: 24px;
  }

  .highlight {
    color: #00239D;
  }
`
