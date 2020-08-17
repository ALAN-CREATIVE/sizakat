import React from 'react';

export const SearchStyle = () => (
  <style jsx>{`
    
    input[type=text] {
      width: 100%;
      height: 48px;

      background-image: url('search-icon.png');
      background-size: 20px;
      background-position: 14px 12px;
      background-repeat: no-repeat;

      background-color: #FFFFFF;
      border: 1px solid #393F50;
      box-sizing: border-box;
      border-radius: 8px;

      font-family: Muli;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      padding: 0px 0px 4px 45px;

      color: #393F50;
    }
    form.example input[type=text]::placeholder {
      color: #C2C2C2;
    }
  `}</style>
);
