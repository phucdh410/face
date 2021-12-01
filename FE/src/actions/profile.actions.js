import axios from "axios";

import { logoutUser } from "./auth.actions";
import { handleError } from "../utils/handler";

import { GET_PROFILE, GET_ERRORS } from "./types";

import { FACE_R_APP_API_ENDPOINT } from "../config";

// Get current profile
const getCurrentProfile = (cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${FACE_R_APP_API_ENDPOINT}/api/profile`, { cancelToken },
    );

    const { payload } = res.data;

    dispatch({
      type: GET_PROFILE,
      payload,
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

export default getCurrentProfile;
