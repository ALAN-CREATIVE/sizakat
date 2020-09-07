import React from "react";
import { SuccessContainer } from "./SuccessStyle";

const Success = ({ message, confirmButton = "OK", onConfirm }) => {
  return (
    <SuccessContainer>
      <div className="box">
        <img
          src="/img/success.png"
          alt="success"
          style={{ display: "block", margin: "auto", paddingTop: "57px" }}
        ></img>
        <div className="successText">Sukses!</div>
        <div
          className="desc"
          style={{ marginLeft: "46px", marginRight: "46px", marginTop: "20px" }}
        >
          {message}
        </div>
        <div style={{ width: "50%", margin: "0 auto", cursor: "pointer" }}>
          <div
            className="blueButton"
            style={{ margin: "35px auto 0" }}
            onClick={onConfirm}
          >
            <p className="text">{confirmButton}</p>
          </div>
        </div>
      </div>
    </SuccessContainer>
  );
};

export default Success;
