import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useRequestEdit = (source, action) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRequest = useCallback(async (id) => {
    source = axios.CancelToken.source();
    await dispatch(action(id, source.token, history));
  }, []);

  return handleRequest;
};

export default useRequestEdit;
