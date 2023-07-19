import React from "react";

const Modalbutton = (props) => {
  return props.buttonText ? (
    <button className="buttons" onClick={props.handleAlertClose()}>{props.buttonText}</button>
  ) : (
    <>
      <button className="buttons" onClick={props.handleAlertClose()}>CANCEL</button>
      <button className="buttons" onClick={props.actionIfTrue}>CONFIRM</button>
    </>
  );
};

export default Modalbutton;
