import React from "react";
import { useCallback } from "react";
import { getCameras } from "../actions/camera.actions";
import axios from "axios";
import { useDispatch } from "react-redux";

const useHandleRequest = (source, dispatch, searchStore, history) => {
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
