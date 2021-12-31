import axios from "axios";

import { logoutUser } from "./auth.actions";
import { handleError } from "../utils/handler";

import {
  GET_ERRORS,
  GET_ROLES,
  GET_ROLE,
  GET_LIST_OF_ROLES,
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
} from "./types";

import { ENCODE_EMPTY_STRING, FACE_R_APP_API_ENDPOINT } from "../config";

// Get all roles
export const getRolesList = (cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.get(`${FACE_R_APP_API_ENDPOINT}/roles`, {
      cancelToken,
    });

    const { payload } = res.data;

    dispatch({
      type: GET_LIST_OF_ROLES,
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

// Get list of role
export const getRoles = (params, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${FACE_R_APP_API_ENDPOINT}/roles/${params.page}/${params.pages}/${
        params.input || ENCODE_EMPTY_STRING
      }`,
      { cancelToken }
    );

    const { payload, pages, page } = res.data;

    dispatch({
      type: GET_ROLES,
      payload,
      pages,
      page,
      input: params.input,
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

// Get single role
export const getRole = (id, cancelToken, history) => async (dispatch) => {
  dispatch({
    type: GET_ROLE,
    payload: null,
  });

  try {
    const res = await axios.get(`${FACE_R_APP_API_ENDPOINT}/roles/${id}`, {
      cancelToken,
    });

    const { payload } = res.data;

    dispatch({
      type: GET_ROLE,
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

export const addRole = (params, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${FACE_R_APP_API_ENDPOINT}/roles`, params, {
      cancelToken,
    });

    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin vai trò thất bại!" },
      });
    }

    dispatch({
      type: ADD_ROLE,
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

export const editRole = (params, cancelToken, history) => async (dispatch) => {
  let newSuccess = false;
  dispatch({
    type: EDIT_ROLE,
    payload: null,
  });

  try {
    const res = await axios.put(
      `${FACE_R_APP_API_ENDPOINT}/roles/${params.id}`,
      params,
      { cancelToken }
    );
    newSuccess = res.data.status;

    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin vai trò thất bại!" },
      });
    }

    dispatch({
      type: EDIT_ROLE,
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
    return newSuccess;
  }
};

export const removeRole = (id, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`${FACE_R_APP_API_ENDPOINT}/roles/${id}`, {
      cancelToken,
    });
    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin vai trò thất bại!" },
      });
    }

    dispatch({
      type: DELETE_ROLE,
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
