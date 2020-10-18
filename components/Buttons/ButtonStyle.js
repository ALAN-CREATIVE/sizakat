import React from 'react';

const ButtonStyle = () => (
  <style jsx>{`
    button {
      font-family: Muli;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      padding: 5px 10px;
      color: white;
    }
    .primary {
      background: #00239d;
      border-radius: 4px;
      border: 1px solid #00239d;
    }
    .secondary {
      border-radius: 4px;
      background: #c2c2c2;
      border: 1px solid #c2c2c2;
    }
    .danger {
      background: #eb4e2c;
      border-radius: 4px;
      border: 1px solid #eb4e2c;
    }

    .login {
      background: #00239d;
      border-radius: 4px;
      border: 1px solid #00239d;
      width: 100%;
    }
  `}</style>
);

export default ButtonStyle;
