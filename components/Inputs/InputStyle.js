import React from 'react';

export const InputStyle = () => (
  <style jsx>{`
    label {
      font-family: Muli;
      font-weight: 700;
      font-size: 16px;
      color: #393f50;
      line-height: 20px;
    }

    .required:after {
      color: #eb4e2c;
      content: '*';
    }

    input,
    select {
      border-width: 0px 0px 1px 0px;
      border-color: #00239d;
      display: block;
      width: 99%;
      padding: 12px 5px 12px 5px;
      font-size: 14px;
      font-family: Muli;
      line-height: 16px;
      color: #393f50;
      background-color: #ffffff;
    }

    input::placeholder {
      color: #c4c4c4;
    }

    .error {
      font-family: Muli;
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: #eb4e2c;
    }
  `}</style>
);

export const SelectStyle = () => (
  <style jsx>{`
    .header {
      border-bottom: 1px solid #00239d;
      display: block;
      width: 99%;
      padding: 12px 5px 12px 5px;
      font-size: 14px;
      font-family: Muli;
      line-height: 16px;
      color: #c4c4c4;
    }

    .chosen {
      color: #393f50;
    }

    .options {
      border-radius: 10px 10px 0px 0px;
      list-style: none;
      position: absolute;
      width: -webkit-fill-available;
      background-color: #f5f6f8;
      font-family: Muli;
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      max-height: 400px;
      overflow-y: overlay;
      color: #393f50;
      padding: 20px 0px 0px 0px;
    }

    .options:before {
      height: 4px;
      border-radius: 4px;
      background-color: #e5e5e5;
      width: 20%;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 2;
      text-align: center;
      content: 'a';
      overflow: hidden;
    }

    .option {
      padding: 15px 20px;
      text-align: center;
    }

    .option:hover {
      background-color: #002398;
      color: #ffffff;
    }

    img {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  `}</style>
);

export const RadioButtonStyle = () => (
  <style jsx>{`
    label {
      font-family: Muli;
      color: #393f50;
    }

    .main-label {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
    }

    .required:after {
      content: '*';
      color: #eb4e2c;
    }

    .radios {
      margin: 10px 5px 5px 5px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .radio {
      display: flex;
      font-size: 14px;
      font-weight: 600;
      width: 150px;
      align-items: center;
    }

    .radio label {
      margin-left: 5px;
    }

    .error {
      color: #eb4e2c;
      font-size: 12px;
      font-weight: 700;
      font-family: Muli;
    }
  `}</style>
);
