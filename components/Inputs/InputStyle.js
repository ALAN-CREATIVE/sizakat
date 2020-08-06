import React from './node_modules/react';

export const InputStyle = () => (
  <style jsx>{`
    label {
      font-family: Muli;
      font-weight: 700;
      font-size: 16px;
      color: #393F50;
      line-height: 20px;
    }

    .required:after {
      color: #EB4E2C;
      content: "*";
    }

    input, select {
      border-width: 0px 0px 1px 0px;
      border-color: #00239D;
      display: block;
      width: 99%;
      padding: 12px 5px 12px 5px;
      font-size: 14px;
      font-family: Muli;
      line-height: 16px;
      color: #393F50;
      background-color: #FFFFFF;
    }

    input::placeholder {
      color: #C4C4C4;
    }

    .error {
     font-family: Muli;
     font-style: normal;
     font-weight: 700;
     font-size: 12px;
     line-height: 15px;
     color: #EB4E2C;
    }
  `}</style>
);

export const SelectStyle = () => <style jsx>{`
  .header {
    border-bottom: 1px solid #00239D;
    display: block;
    width: 99%;
    padding: 12px 5px 12px 5px;
    font-size: 14px;
    font-family: Muli;
    line-height: 16px;
    color: #C4C4C4;
  }

  .chosen {
    color: #393F50;
  }

  .options {
    border-radius: 10px 10px 0px 0px;
    list-style: none;
    position: absolute;
    width: -webkit-fill-available;
    background-color: #F5F6F8;
    font-family: Muli;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    max-height: 400px;
    overflow-y: overlay;
    color: #393F50;
    padding: 20px 0px 0px 0px;
  }

  .options:before {
    height: 4px;
    border-radius: 4px;
    background-color: #E5E5E5;
    width: 20%;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 2;
    text-align: center;
    content: "a";
    overflow: hidden;
  }

  .option {
    padding: 15px 20px;
    text-align: center;
  }

  .option:hover {
    background-color: #002398;
    color: #FFFFFF;
  }

  img {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
`}</style>;

export const RadioButtonStyle = () => (
  <style jsx>{`
    label {
      font-family: Muli;
      color: #393F50;
    }

    .main-label {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
    }

    .required:after {
      content: "*";
      color: #EB4E2C;
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
      color: #EB4E2C;
      font-size: 12px;
      font-weight: 700;
      font-family: Muli;
    }
  `}</style>
);
