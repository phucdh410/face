import React, { useCallback } from "react";

const usePopup = (setShowPopup, setInfo) => {
  const handlePopup = useCallback(
    (title, message, expired, type, func) => {
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
    },
    [message]
  );

  return handlePopup;
};

export default usePopup;
