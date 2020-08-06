import React from 'react';

export const FilterStyle = () => (
  <style jsx>{`
    .filter {
      font-family: Muli;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
      color: #00239D;
      text-decoration : none;
      }

    .kotakFilter {
      font-weight: 600;
      font-size: 16px;
      color: #393F50;
      position : absolute;
      top: 50%;
      left: 50%;
      width: 500px;
      padding : 40px 10px;
      width: 500px;
      transform: translate(-50%, -50%);
      border: 1px solid #393F50;
      box-sizing: border-box;
      background: #FFFFFF;
    }

    .radio {
      margin: 20px 10px;
    }

    .radio input {
      margin-right: 30px;
    }

    .hide {
      display: none;
    }
  `}</style>
);
