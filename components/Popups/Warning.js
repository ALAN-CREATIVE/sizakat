import React from 'react';
import { WarningStyle } from './WarningStyle';

const Warning = ({ message, confirmButton='Ya', rejectButton='Batal', onConfirm, onReject }) => {

  return (
    <div>
      <WarningStyle />
      <div className="box">
          <img src="/img/warning.png" alt="warning" style={{ display: "block", margin:"auto", paddingTop: "57px" }} ></img>
          <div className="warningText">Perhatian!</div>
          <div className="desc" style={{ marginLeft: "46px", marginRight: "46px", marginTop: "20px" }}>{ message }</div>
          <div style={{ width:"50%", float:"left"}}>
            <div className="redButton" style={{ marginLeft: "59px", marginTop: "49px" }} onClick={onConfirm} >
              <p className="text">{ confirmButton }</p>
            </div>
          </div>
          <div style={{ width:"50%", float:"right"}}>
            <div className="greyButton" style={{ marginLeft: "45px", marginTop: "49px" }} onClick={onReject} >
              <p className="text">{ rejectButton }</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Warning;
