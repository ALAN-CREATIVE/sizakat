import styled from "styled-components";

export const FailedContainer = styled.div`
  .box {
    width: 385px;
    height: 374px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    position: fixed;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .failedText {
    font-family: Muli;
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
    text-align: center;

    color: #000000;
  }

  .desc {
    font-family: Muli;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    text-align: center;

    color: #000000;
  }

  div.redButton {
    width: 200px;
    height: 40px;

    background: #eb4e2c;
    border-radius: 8px;
  }

  p.text {
    height: 20px;
    display: block;
    margin: auto;
    padding-top: 10px;

    font-family: Muli;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #ffffff;
  }
`;
