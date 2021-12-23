import React from "react";
import FlashMessage from "react-flash-message";
import "./Popup.css";
import checkIcon from "./assets/check.svg";
import errorsIcon from "./assets/errors.svg";
import infoIcon from "./assets/info.svg";
import warningIcon from "./assets/warning.svg";

const Popup = (props) => {
  const getStyle = (type) => {
    switch (type) {
      case "success":
        return checkIcon;
      case "errors":
        return errorsIcon;
      case "info":
        return infoIcon;
      case "warning":
        return warningIcon;
      default:
        break;
    }
  };
  return (
    <FlashMessage duration={2000}>
      <div className={`popup ${props.type}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={getStyle(props.type)} alt="" style={{ width: "10%" }} />
          <div style={{ marginLeft: "20px", textAlign: "left" }}>
            <h2>{props.title}</h2>
            <strong>{props.message}</strong>
          </div>
        </div>
      </div>
    </FlashMessage>
  );
};

export default Popup;
