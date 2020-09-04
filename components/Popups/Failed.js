import React from "react";
import { FailedContainer } from "./FailedStyle";

const Failed = ({ message, confirmButton = "OK", onConfirm }) => {
  return (
    <FailedContainer>
      <div className="box">
        <img
          src="/img/failed.png"
          alt="success"
          width="125px"
          style={{ display: "block", margin: "auto", paddingTop: "57px" }}
        ></img>
        <div className="failedText">Gagal!</div>
        <div
          className="desc"
          style={{ marginLeft: "46px", marginRight: "46px", marginTop: "20px" }}
        >
          {message}
        </div>
        <div style={{ width: "50%", margin: "0 auto", cursor: "pointer" }}>
          <div
            className="redButton"
            style={{ margin: "35px auto 0" }}
            onClick={onConfirm}
          >
            <p className="text">{confirmButton}</p>
          </div>
        </div>
      </div>
    </FailedContainer>
  );
};

export default Failed;
