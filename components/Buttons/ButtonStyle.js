import React from 'react';

const ButtonStyle = () => (
    <style jsx>{`
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
        .danger{
            background: #EB4E2C;
            border-radius: 4px;
            border:1px solid #EB4E2C;
        }
    `}</style>
)

export default ButtonStyle;
