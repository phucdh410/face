import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { convertStringToDate } from "../../../utils";
import { getAttendances } from "../../../actions/attendance.actions";

const useRequestRecognize = (searchFrom, searchTo, selectedStore, source) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        store_id: parseInt(selectedStore),
        search_from: convertStringToDate(searchFrom),
        search_to: convertStringToDate(searchTo),
        pages,
        page,
      };
      dispatch(getAttendances(params, source.token, history));
    },
    [selectedStore, searchFrom, searchTo]
  );

  return handleRequest;
};

export default useRequestRecognize;
