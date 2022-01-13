import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getEmployees } from "../../../actions/employee.actions";

const useHandleRequest = (searchStore, searchInput, source) => {
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
    [searchStore, searchInput]
  );
  return handleRequest;
};

export default useHandleRequest;
