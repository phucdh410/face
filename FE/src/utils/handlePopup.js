import React, { useContext } from "react";
import { PopupContext } from "../context/PopupContext";

const usePopup = (title, message, expired, type) => {
  const { setShowPopup, setInfo } = useContext(PopupContext);
  setShowPopup(true);
  setInfo({
    title,
    message,
    type,
  });
  setTimeout(() => {
    setShowPopup(false);
  }, expired);
};

export default usePopup;
