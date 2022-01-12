import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  connectToCamera,
  disconnectFromCamera,
} from "../../../actions/camera.actions";

const useConnection = (source) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const connect = useCallback(
    (_id) => {
      source = axios.CancelToken.source();
      dispatch(connectToCamera(_id, source.token, history));
    },
    [dispatch, history]
  );

  const disconnect = useCallback(
    (_id) => {
      source = axios.CancelToken.source();
      dispatch(disconnectFromCamera(_id, source.token, history));
    },
    [dispatch, history]
  );

  return { connect, disconnect };
};

export default useConnection;
