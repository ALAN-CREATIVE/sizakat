import styled from 'styled-components';

const UlasanContainer = styled.div`
    background: white;
    margin: 20px; 
    font-family: Muli, sans-serif;
    .highlight{
        background-color: #F2EDE7;
        padding : 15px
    }
    .num{
        font-weight: bold;
        color: #00239D;
        font-size: x-large;
    }
    .flex-container{
        display: flex;
        justify-content: space-between;
    }
    .info{
        color : red;
    }
    .title{
        font-weight: bold;
        color: #00239D;
    }
    .content{
        margin : 25px;
    }
`
export default UlasanContainer;