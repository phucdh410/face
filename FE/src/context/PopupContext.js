import React, { createContext } from "react";

export const PopupContext = createContext({
  showPopup: false,
  setShowPopup: () => {},
  info: {},
  setInfo: () => {},
});
