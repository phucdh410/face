import React, { useCallback } from "react";
import { getStoresList } from "../actions/store.actions";
import { getRolesList } from "../actions/role.actions";
import axios from "axios";
import { useDispatch } from "react-redux";

function useInitialProps(source, dispatch, history) {
  const getInitialProps = () => {
    source = axios.CancelToken.source();

    dispatch(getStoresList(source.token, history));
    dispatch(getRolesList(source.token, history));
  };
  return getInitialProps;
}

export default useInitialProps;
