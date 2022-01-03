import React, { useCallback } from "react";
import { getStoresList } from "../actions/store.actions";
import { getRolesList } from "../actions/role.actions";
import axios from "axios";
import { useDispatch } from "react-redux";

const useMain = (props) => {
  const dispatch = useDispatch();
  props.dispatch = dispatch;
  const getInitialProps = useCallback(() => {
    props.source = axios.CancelToken.source();

    props.dispatch(getStoresList(props.source.token, props.history));
    props.dispatch(getRolesList(props.source.token, props.history));
  }, [props.dispatch, props.history]);

  return getInitialProps;
};

export default useMain;
