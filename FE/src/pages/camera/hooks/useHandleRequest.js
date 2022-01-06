import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getCameras } from "../../../actions/camera.actions";

let source = axios.CancelToken.source();
const useHandleRequest = (searchStore) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        store_id: searchStore,
        pages,
        page,
      };
      dispatch(getCameras(params, source.token, history));
    },
    [dispatch, history, searchStore]
  );
  return handleRequest;
};

export default useHandleRequest;