import { useState } from "react";
import { PopupContext } from "../../context/PopupContext";
import Popup from "./Popup";
import React from "react";

const CreatePopupProvider = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [info, setInfo] = useState({});
  const popupValue = { showPopup, setShowPopup, info, setInfo };
  return (
    <PopupContext.Provider value={popupValue}>
      {showPopup && (
        <Popup title={info.title} type={info.type} message={info.message} />
      )}
      {props.children}
    </PopupContext.Provider>
  );
};
export default CreatePopupProvider;
