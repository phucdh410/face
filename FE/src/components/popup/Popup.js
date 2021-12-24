import React, { useContext } from "react";
import FlashMessage from "react-flash-message";
import "./Popup.css";
import checkIcon from "./assets/check.svg";
import errorIcon from "./assets/error.svg";
import infoIcon from "./assets/info.svg";
import warningIcon from "./assets/warning.svg";
import { useTheme } from "@mui/material/styles";
import { PopupContext } from "../../context/PopupContext";

const Popup = (props) => {
  const { setShowPopup } = useContext(PopupContext);
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

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <FlashMessage duration={props.expired}>
      <div
        className={`popup-${props.type}`}
        style={{ backgroundColor: getStyle(props.type)[1] }}
      >
        <button type="button" className="close-button" onClick={handleClose}>
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
