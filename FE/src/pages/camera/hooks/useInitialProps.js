import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getRolesList } from "../../../actions/role.actions";
import { getStoresList } from "../../../actions/store.actions";

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
