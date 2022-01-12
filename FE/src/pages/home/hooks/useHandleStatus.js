import React, { useCallback } from "react";
import { FACE_R_APP_TITLE } from "../../../config";
import usePopup from "../../../utils/Hooks/usePopup";
import useConnection from "./useConnection";

const useHandleStatus = (source) => {
  const { connect, disconnect } = useConnection(source);
  const handlePopup = usePopup();
  const handleStatus = useCallback(
    (_id, active, status) => {
      if (active) {
        if (!status) {
          connect(_id);
        } else {
          disconnect(_id);
        }
      } else {
        handlePopup(
          FACE_R_APP_TITLE.length,
          "This camera has been disabled. Please try contact to admin!",
          2000,
          "warning"
        );
      }
    },
    [connect, disconnect]
  );
  return handleStatus;
};

export default useHandleStatus;
