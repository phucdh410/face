import { useContext, useCallback } from "react";
import { PopupContext } from "../../context/PopupContext";

const usePopup = () => {
  const { setShowPopup, setInfo } = useContext(PopupContext);
  const handlePopup = useCallback((title, message, expired, type, func) => {
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
  }, []);

  return handlePopup;
};

export default usePopup;
