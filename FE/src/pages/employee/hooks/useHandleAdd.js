import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addEmployee } from "../../../actions/employee.actions";
import { FACE_R_APP_TITLE } from "../../../config";
import { LoadingContext } from "../../../context/LoadingContext";
import { convertStringToDate, isValidDate } from "../../../utils";
import handleTogglePopup from "../../../utils/handleTogglePopup";
import usePopup from "../../../utils/Hooks/usePopup";

const useHandleAdd = (source, errors, photos) => {
  const { setLoading } = useContext(LoadingContext);
  const handlePopup = usePopup();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = useCallback(
    async (values) => {
      const date = convertStringToDate(values.date);
      if (isValidDate(date)) {
        const params = new FormData();
        for (let index = 0; index < photos.length; index++) {
          params.append("file", photos[index]);
        }
        params.append("store_id", parseInt(values.store_id));
        params.append("fullname", values.fullname.toUpperCase());
        params.append("date", date);
        params.append("gender", parseInt(values.gender));
        params.append("mobile", values.mobile);
        params.append("avatar", values.avatar);
        params.append("active", values.active);

        handleTogglePopup(
          source,
          addEmployee,
          params,
          errors,
          "nhân viên",
          dispatch,
          history,
          setLoading,
          handlePopup
        );
      } else {
        handlePopup(
          FACE_R_APP_TITLE,
          "Định dạng ngày sinh không hợp lệ!",
          2000,
          "warning",
          () => {
            setLoading(false);
          }
        );
      }
    },
    [dispatch, history, photos]
  );

  return onSubmit;
};

export default useHandleAdd;
