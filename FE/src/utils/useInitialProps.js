import { useCallback } from "react";
import { getStoresList } from "../actions/store.actions";
import { getRolesList } from "../actions/role.actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

let source = axios.CancelToken.source();
function useInitialProps() {
  const dispatch = useDispatch();
  const history = useHistory();
  const getInitialProps = useCallback(() => {
    source = axios.CancelToken.source();

    dispatch(getStoresList(source.token, history));
    dispatch(getRolesList(source.token, history));
  }, [dispatch, history]);
  return getInitialProps;
}

export default useInitialProps;
