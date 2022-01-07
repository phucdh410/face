import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

let source = axios.CancelToken.source();
const useHandleRequest = (searchInput, action) => {
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
    [dispatch, history, searchInput]
  );
  useEffect(() => {
    source && source.cancel();
  });
  return handleRequest;
};
export default useHandleRequest;
