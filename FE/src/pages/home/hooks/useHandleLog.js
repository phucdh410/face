import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import setCurrentCamera from "../../../actions/root.action";
import { FACE_R_APP_TITLE } from "../../../config";
import usePopup from "../../../utils/Hooks/usePopup";

const useHandleLog = (cameras) => {
  const dispatch = useDispatch();
  const handlePopup = usePopup();
  const handleLog = useCallback(
    (active, _name) => {
      if (active) {
        const _id = parseInt(_name.split("_")[0]);
        const camera = cameras.find((item) => item.id === _id);

        if (camera) {
          if (camera.status !== 0) {
            dispatch(setCurrentCamera(_name));
          } else {
            handlePopup(
              FACE_R_APP_TITLE,
              "Camera no signal. Please come back when it's ready",
              2000,
              "warning"
            );
          }
        } else {
          handlePopup(
            FACE_R_APP_TITLE,
            "Camera not found. Please try again!",
            2000,
            "warning"
          );
        }
      } else {
        handlePopup(
          FACE_R_APP_TITLE,
          "This camera has been disabled. Please try contact to admin!",
          2000,
          "warning"
        );
      }
    },
    [cameras, dispatch]
  );

  return handleLog;
};

export default useHandleLog;
