import axios from "axios";

import { logoutUser } from "./auth.actions";
import { handleError } from "../utils/handler";

import { GET_ERRORS, DELETE_FACE } from "./types";
import { FACE_R_APP_API_ENDPOINT } from "../config";

const removeFace = (id, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${FACE_R_APP_API_ENDPOINT}/faces/${id}`, { cancelToken },
    );

    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin khuôn mặt nhân viên thất bại!" },
      });
    }

    dispatch({
      type: DELETE_FACE,
      payload: res.data.status,
    });
  } catch (err) {
    const errorResponse = handleError(err, dispatch, GET_ERRORS);
    if (errorResponse) {
      if (err.response.status === 401) {
        dispatch(logoutUser(history));
      }
    }
  } finally {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }
};

export default removeFace;
