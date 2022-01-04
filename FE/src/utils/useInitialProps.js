import React, { useCallback } from "react";
import { getStoresList } from "../actions/store.actions";
import { getRolesList } from "../actions/role.actions";
import axios from "axios";
import { useDispatch } from "react-redux";

const useInitialProps = (props) => {
  let { source, dispatch, history } = props;
  dispatch = useDispatch();

  const getInitialProps = useCallback(() => {
    source = axios.CancelToken.source();

    dispatch(getStoresList(source.token, history));
    dispatch(getRolesList(source.token, history));
  }, [dispatch, history]);

  return getInitialProps;
};

export default useInitialProps;
