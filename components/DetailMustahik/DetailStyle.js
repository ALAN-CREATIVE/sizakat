import React from 'react';

export const DetailStyle = () =>(
    <style jsx>{`
        div {
            padding : 0;
            margin : 0;
        }
        p{
            font-family: Muli;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 18px;
            /* identical to box height */


            color: #393F50;
        }
        
        h4 {
            margin : 2px;
            font-family: Muli; 
        }
        .label{
            font-family: Muli;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
            /* identical to box height */
            
            
            color: #00239D;
        }
        img {
            width: 250px;
            height: 250px;
            background-color: #00239D;
            margin-right: 50px;
            margin-bottom: 50px;
        }
        .sub {
            font-size: small;
            color: #898686;
        }
        .sub .active {
            color: #00239D;
            font-weight: bold;
        }
        a {
            color : #EB4E2C;
        }
    `}
    </style>

);