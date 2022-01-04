import React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getCameras } from "../actions/camera.actions";
import axios from "axios";

const useHandleRequest = (props) => {
  console.log(props.a);
  let { source, searchStore, history } = props;

  const dispatch = useDispatch();

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
