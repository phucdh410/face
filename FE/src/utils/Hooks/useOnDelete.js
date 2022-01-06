import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FACE_R_APP_TITLE } from "../../config";
import { LoadingContext } from "../../context/LoadingContext";
import usePopup from "./usePopup";

let source = axios.CancelToken.source();
const useOnDelete = (action, namePage, handleRequest, errors, pages, page) => {
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePopup = usePopup();
  const onDelete = useCallback(
    async (id) => {
      setLoading(true);
      source = axios.CancelToken.source();
      await dispatch(
        action(id, source.token, history, errors, (_success) => {
          if (_success) {
            handlePopup(
              FACE_R_APP_TITLE,
              `Xóa thông tin ${namePage} thành công!`,
              2000,
              "success",
              async () => {
                handleRequest(pages, page);
                setLoading(false);
              }
            );
          } else {
            handlePopup(FACE_R_APP_TITLE, errors.message, 2000, "error", () => {
              setLoading(false);
            });
          }
        })
      );
    },
    [dispatch, handleRequest, history]
  );
  return onDelete;
};

export default useOnDelete;
