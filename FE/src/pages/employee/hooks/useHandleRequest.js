import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getEmployees } from "../../../actions/employee.actions";

let source = axios.CancelToken.source();
const useHandleRequest = (searchStore, searchInput) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        store_id: searchStore,
        input: searchInput,
        pages,
        page,
      };
      dispatch(getEmployees(params, source.token, history));
    },
    [dispatch, history, searchStore, searchInput]
  );
  return handleRequest;
};

export default useHandleRequest;