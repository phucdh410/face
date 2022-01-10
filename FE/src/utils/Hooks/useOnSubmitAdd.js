import axios from "axios";
import React, { useCallback } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FACE_R_APP_TITLE } from "../../config";
import { LoadingContext } from "../../context/LoadingContext";
import handleTogglePopup from "../handleTogglePopup";
import usePopup from "./usePopup";

const useOnSubmitAdd = (source, action, errors, pageName) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setLoading } = useContext(LoadingContext);
  const handlePopup = usePopup();
  const onSubmitAdd = useCallback(
    async (values) => {
      const params = {
        ...values,
        name: values.name.toUpperCase(),
        agent: values.agent.toUpperCase(),
        address: values.address ? values.address.toUpperCase() : "",
      };
      await handleTogglePopup(
        source,
        action,
        params,
        errors,
        pageName,
        dispatch,
        history,
        setLoading,
        handlePopup
      );
    },
    [dispatch, history]
  );

  return onSubmitAdd;
};

export default useOnSubmitAdd;
