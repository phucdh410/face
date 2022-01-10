import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContext";
import handleTogglePopup from "../../../utils/handleTogglePopup";
import usePopup from "../../../utils/Hooks/usePopup";

const useOnSubmit = (source, action, errors) => {
  const { setLoading } = useContext(LoadingContext);
  const handlePopup = usePopup();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = useCallback(
    async (values) => {
      const params = {
        ...values,
        store_id: parseInt(values.store_id),
      };
      handleTogglePopup(
        source,
        action,
        params,
        errors,
        "thiết bị",
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
