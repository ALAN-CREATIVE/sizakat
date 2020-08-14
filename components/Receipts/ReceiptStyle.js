import styled from 'styled-components';

export const ItemList = styled.div`
  font-family: Muli, sans-serif;
  display: flex;
  justify-content: space-between;

  ul {
    padding: 0px;
  }

  li {
    font-size: 16px;
    list-style-type: none;
    margin: 10px 0px 20px 0px;
    line-height: 20px;
  }

  .total {
    font-weight: 800;
    color: #00239D;
    margin-bottom: 10px;
  }

  .amount .total {
    font-size: 20px;
  }
`

export const MethodsContainer = styled.div`
  font-family: Muli, sans-serif;

  .methods {
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
  }

  .method {
    display: flex;
    align-items: flex-start;
  }

  h1 {
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #393F50;
  }

  .box {
    margin: 0px 10px;
    width: 20px;
    height: 20px;
    border: 1px solid #393F50;
  }

  .choosen {
    background: #00239D;
  }

  p {
    margin: 0;
    color: #393F50;
    line-height: 20px;
  }
`

export const Note = styled.span`
  display: block;
  color: #EB4E2C;
  font-size: 12px;

  :before {
    content: "*";
  }
`

export const ReceiptContainer = styled.div`
  font-family: Muli, sans-serif;
  background: #FFFFFF;
  border: 2px solid #393F50;
  padding: 20px 35px;

  > h1 {
    margin: 0px;
    font-weight: 800;
    font-size: 20px;
    color: #00239D;
  }

  .container {
    margin: 15px 20px 10px 20px;
  }

  .hidden {
    display: none;
  }
`

export const WhiteBoxContainer = styled.div`
  font-family: Muli, sans-serif;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 30px 40px;

  > h1 {
    margin-bottom: 45px;
    color: #00239D;
    font-weight: 800;
    font-size: 20px;
  }

  .margined {
    margin: 35px 40px;
  }

  button {
    width: 100%;
  }
`
