import { useCallback } from "react";
import { useHistory } from "react-router-dom";

const useGoBack = () => {
  const history = useHistory();
  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      history.goBack();
    },
    [history]
  );
  return goBack;
};

export default useGoBack;
