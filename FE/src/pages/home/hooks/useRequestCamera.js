import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCameras } from "../../../actions/camera.actions";

const useRequestCamera = (searchStore, source) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        store_id: parseInt(searchStore),
        pages,
        page,
      };
      dispatch(getCameras(params, source.token, history));
    },
    [searchStore]
  );

  return handleRequest;
};

export default useRequestCamera;
