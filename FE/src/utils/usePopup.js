import React, { useEffect } from "react";

const usePopup = (setShowPopup, setInfo) => {
  useEffect((title, message, expired, type, func) => {
    setInfo({ title, message, expired, type });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      if (typeof func === "function") {
        func();
      }
    }, expired * 1.5);
    return () => {
      clearTimeout();
    };
  });

  return usePopup;
};

export default usePopup;
