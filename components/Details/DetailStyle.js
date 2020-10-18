import React from 'react';

export const DetailStyle = () => (
  <style jsx>{`
    h1 {
      font-family: Muli;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
      /* identical to box height */

      color: #00239d;
    }

    h2 {
      font-family: Muli;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      /* identical to box height */

      color: #393f50;
    }

    .profpic {
      width: 241px;
      height: 226px;

      background: #00239d;
    }

    .background {
      width: 241px;
      height: 53px;
      left: 288px;
      top: 394px;

      background: #f5f6f8;
    }

    .identity {
      font-family: Muli;
      font-style: normal;
      font-weight: 800;
      font-size: 18px;
      text-align: center;
      top: 44.44%;
      bottom: 51.11%;
      padding-top: 8px;
    }

    p {
      font-family: Muli;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;

      /* identical to box height */

      color: #393f50;
      margin-top: -2px;
    }

    .spilt {
      column-count: 2;
    }
  `}</style>
);
