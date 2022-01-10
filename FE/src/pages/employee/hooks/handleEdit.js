import axios from "axios";
import { FACE_R_APP_TITLE } from "../../../config";

const handleEdit = (
  id,
  source,
  action,
  params,
  errors,
  pageName,
  dispatch,
  history,
  setLoading,
  handlePopup
) => {
  setLoading(true);
  source = axios.CancelToken.source();
  dispatch(
    action(id, params, source.token, history, errors, (_success) => {
      if (_success) {
        handlePopup(
          FACE_R_APP_TITLE,
          `Lưu thông tin ${pageName} thành công!`,
          2000,
          "success",
          () => {
            history.goBack();
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
};

export default handleEdit;
