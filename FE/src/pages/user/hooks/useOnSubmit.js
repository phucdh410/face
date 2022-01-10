import React from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContext";
import handleTogglePopup from "../../../utils/handleTogglePopup";
import usePopup from "../../../utils/Hooks/usePopup";
const useOnSubmit = (source, action, errors) => {
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePopup = usePopup();
  const onSubmit = useCallback(
    async (values) => {
      const params = {
        ...values,
        fullname: values.fullname.toUpperCase(),
      };

      handleTogglePopup(
        source,
        action,
        params,
        errors,
        "người dùng",
        dispatch,
        history,
        setLoading,
        handlePopup
      );
    },
    [dispatch, history]
  );
  return onSubmit;
};

export default useOnSubmit;
