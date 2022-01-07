import axios from "axios";
import React, { useCallback } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FACE_R_APP_TITLE } from "../../config";
import { LoadingContext } from "../../context/LoadingContext";
import usePopup from "./usePopup";

const useOnSubmitAdd = (source, params, action, errors, pageName) => {
  const { setLoading } = useContext(LoadingContext);
  const history = useHistory();
  const handlePopup = usePopup();
  const onSubmit = useCallback(async (values) => {
    source = axios.CancelToken.source();
  });

  return;
};

export default useOnSubmitAdd;
