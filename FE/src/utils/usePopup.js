import React from "react";
import { useContext } from "react";
import { PopupContext } from "../context/PopupContext";

const usePopup = (title, message, expired, type, func) => {
  const { setShowPopup, setInfo } = useContext(PopupContext);
  setInfo({
    title,
    message,
    expired,
    type,
  });
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
    if (typeof func === "function") {
      func();
    }
  }, expired * 1.5);
  clearTimeout();

  return usePopup;
};

export default usePopup;
