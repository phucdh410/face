import React, { useEffect } from "react";
import { useState } from "react";

const useShowError = (props) => {
  const { title, expired, type, errors } = props;
  const message = errors.message;

  const [info, setInfo] = useState({});
  const [showPopup, setShowpopup] = useState(false);

  const handlePopup = () => {
    setInfo({
      title,
      message,
      expired,
      type,
    });
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        handlePopup(FACE_R_APP_TITLE, errors.message, 4000, "error");
      }
    }
  }, [errors]);

  return <div></div>;
};

export default useShowError;
