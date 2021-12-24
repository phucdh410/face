import React from "react";
import FlashMessage from "react-flash-message";
import "./Popup.css";
import checkIcon from "./assets/check.svg";
import errorIcon from "./assets/error.svg";
import infoIcon from "./assets/info.svg";
import warningIcon from "./assets/warning.svg";
import { useTheme } from "@mui/material/styles";

const Popup = (props) => {
  const theme = useTheme();

  const getStyle = (type) => {
    switch (type) {
      case "success":
        return [checkIcon, theme.palette.success.main];
      case "error":
        return [errorIcon, theme.palette.error.main];
      case "info":
        return [infoIcon, theme.palette.info.main];
      case "warning":
        return [warningIcon, theme.palette.warning.main];
      default:
        break;
    }
  };
  return (
    <FlashMessage duration={2000}>
      <div
        className={`popup-${props.type}`}
        style={{ backgroundColor: getStyle(props.type)[1] }}
      >
        <button type="button" className="close-button">
          ×
        </button>
        <div className="popup-container">
          <img src={getStyle(props.type)[0]} alt="" />
          <div className="popup-content">
            <h3>{props.title}</h3>
            <strong>{props.message}</strong>
          </div>
        </div>
      </div>
    </FlashMessage>
  );
};

export default Popup;
