import axios from "axios";
import React, { useCallback } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContext";
import handleTogglePopup from "../../../utils/handleTogglePopup";
import usePopup from "../../../utils/Hooks/usePopup";

const useOnSubmit = (source, action, errors) => {
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
        "cửa hàng",
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

export default useOnSubmit;
