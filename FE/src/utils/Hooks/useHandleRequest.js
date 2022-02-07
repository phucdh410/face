import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

//depc sẽ là 1 array gồm [searchStore,searchInput]
const useHandleRequest = (depc, action, source) => {
  const [searchStore, searchInput] = depc;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRequest = useCallback((pages, page) => {
    source = axios.CancelToken.source();
    const params = {
      store_id: searchStore,
      input: searchInput,
      pages,
      page,
    };
    dispatch(action(params, source.token, history));
  }, depc);
  return handleRequest;
};
export default useHandleRequest;
