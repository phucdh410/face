import axios from "axios";
import jwtDecode from "jwt-decode";

import { GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from "./types";
import { FACE_R_APP_API_ENDPOINT, FACE_R_APP_TOKEN } from "../config";

import { setHttpConfig } from "../utils";
import { handleError } from "../utils/handler";

// Clear current profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
});

// Set logged in user
export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// Login - Get user's token
export const loginUser = (params, cancelToken) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${FACE_R_APP_API_ENDPOINT}/login`, params, { cancelToken },
    );

    console.log("res: ", res.data);

    // Save to localStorage
    const { token } = res.data;

    // Decode token to get user data
    const decoded = jwtDecode(token);

    // Set token to localStorage
    localStorage.setItem(FACE_R_APP_TOKEN, token);

    // Set token to Auth header
    setHttpConfig(token);

    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : { errors: err.message },
    });
  } finally {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }
};

// Logout
export const logoutUser = (history) => async (dispatch) => {
  try {
    await axios.get(`${FACE_R_APP_API_ENDPOINT}/logout`);
  } finally {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });

    // Remove token from localStorage
    localStorage.removeItem(FACE_R_APP_TOKEN);

    // Clear current profile
    dispatch(clearCurrentProfile());

    // Set curent user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

    // Remove auth header for future reuqests
    setHttpConfig(false);
    if (history) history.push("/login");
  }
};

// Change password & redirect to Logout
export const changePassword = (params, cancelToken, history) => async (dispatch) => {
  try {
    await axios.post(
      `${FACE_R_APP_API_ENDPOINT}/change-password`, params, { cancelToken },
    );

    // Logout & redirect to Login screen
    // Remove token from localStorage
    localStorage.removeItem(FACE_R_APP_TOKEN);

    // Clear current profile
    clearCurrentProfile();

    // Remove auth header for future reuqests
    setHttpConfig(false);

    // Set curent user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

    // Redirect to Logout page
    if (history) history.push("/");
  } catch (err) {
    handleError(err, dispatch, logoutUser, GET_ERRORS);
  } finally {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }
};
