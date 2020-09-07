import styled from 'styled-components';

const ButtonContainer = styled.div`
        button{
            font-family: Muli;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            padding: 5px 10px;
            color : white;
        }
        .primary{
            background: #00239D;
            border-radius: 4px;
            border:1px solid #00239D;
        }
        .secondary{
            border-radius: 4px;
            background: #C2C2C2;
            border:1px solid #C2C2C2;
        }
        .tertiary{
            background: white;
            border-radius: 4px;
            border:1px solid #00239D;
            color: #00239D;
        }
        .danger{
            background: #EB4E2C;
            border-radius: 4px;
            border:1px solid #EB4E2C;
        }
        .round{
            background: #00239D;
            border-radius: 50%;
            border:1px solid #00239D;
            font-size: 20px;
        }
    `

export default ButtonContainer;
