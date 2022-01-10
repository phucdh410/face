import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FACE_R_APP_TITLE } from "../config";
import { LoadingContext } from "../context/LoadingContext";
import usePopup from "./Hooks/usePopup";

const handleTogglePopup = (
  source,
  action,
  params,
  errors,
  pageName,
  dispatch,
  history,
  setLoading,
  handlePopup
) => {
  setLoading(true);
  source = axios.CancelToken.source();
  dispatch(
    action(params, source.token, history, errors, (_success) => {
      if (_success) {
        handlePopup(
          FACE_R_APP_TITLE,
          `Lưu thông tin ${pageName} thành công!`,
          2000,
          "success",
          () => {
            history.goBack();
            setLoading(false);
          }
        );
      } else {
        handlePopup(FACE_R_APP_TITLE, errors.message, 2000, "error", () => {
          setLoading(false);
        });
      }
    })
  );
};

export default handleTogglePopup;
