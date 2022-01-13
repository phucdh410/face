import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useHandleRequest = (searchInput, action, source) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        input: searchInput,
        pages,
        page,
      };
      dispatch(action(params, source.token, history));
    },
    [searchInput]
  );
  return handleRequest;
};
export default useHandleRequest;
