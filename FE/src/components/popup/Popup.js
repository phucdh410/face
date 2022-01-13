import "./Popup.css";
import React, { useContext, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import FlashMessage from "react-flash-message";
import { PopupContext } from "../../context/PopupContext";
import checkIcon from "./assets/check.svg";
import errorIcon from "./assets/error.svg";
import infoIcon from "./assets/info.svg";
import warningIcon from "./assets/warning.svg";
import ProgressBar from "./ProgressBar";
const Popup = (props) => {
  const { setShowPopup } = useContext(PopupContext);
  const theme = useTheme();
  let { type } = props;
  let styles = [];
  const getStyle = useCallback(
    (type) => {
      switch (type) {
        case "success":
          return (styles = [checkIcon, theme.palette.success.main]);
        case "error":
          return (styles = [errorIcon, theme.palette.error.main]);
        case "info":
          return (styles = [infoIcon, theme.palette.info.main]);
        case "warning":
          return (styles = [warningIcon, theme.palette.warning.main]);
        default:
          break;
      }
    },
    [type]
  );
  getStyle(type);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <FlashMessage duration={props.expired * 2}>
      <div className={`popup-${type}`} style={{ backgroundColor: styles[1] }}>
        <button type="button" className="close-button" onClick={handleClose}>
          ×
        </button>
        <div className="popup-container">
          <img src={styles[0]} alt="" />
          <div className="popup-content">
            <h3>{props.title}</h3>
            <strong>{props.message}</strong>
          </div>
        </div>
        <ProgressBar />
      </div>
    </FlashMessage>
  );
};

export default Popup;
