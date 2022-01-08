import axios from "axios";
import React, { useCallback } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FACE_R_APP_TITLE } from "../../config";
import { LoadingContext } from "../../context/LoadingContext";
import usePopup from "./usePopup";

const useOnSubmitAdd = (source, addValues, action, errors, pageName) => {
  const { setLoading } = useContext(LoadingContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const handlePopup = usePopup();
  const onSubmitAdd = useCallback(
    async (values) => {
      const params = {
        ...values,
        ...addValues,
      };
      source = axios.CancelToken.source();
      setLoading(true);
      await dispatch(
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
    },
    [dispatch, history]
  );

  return onSubmitAdd;
};

export default useOnSubmitAdd;
