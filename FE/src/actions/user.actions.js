import axios from "axios";

import { logoutUser } from "./auth.actions";
import { handleError } from "../utils/handler";

import {
  GET_ERRORS,
  GET_USERS,
  GET_USER,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from "./types";

import { ENCODE_EMPTY_STRING, FACE_R_APP_API_ENDPOINT } from "../config";

// Get list of user
export const getUsers = (params, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${FACE_R_APP_API_ENDPOINT}/users/${params.page}/${params.pages}/${
        params.input || ENCODE_EMPTY_STRING
      }`,
      { cancelToken }
    );

    const { payload, pages, page } = res.data;

    dispatch({
      type: GET_USERS,
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

// Get single user
export const getUser = (id, cancelToken, history) => async (dispatch) => {
  dispatch({
    type: GET_USER,
    payload: null,
  });

  try {
    const res = await axios.get(`${FACE_R_APP_API_ENDPOINT}/users/${id}`, {
      cancelToken,
    });

    const { payload } = res.data;

    dispatch({
      type: GET_USER,
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

export const addUser =
  (params, cancelToken, history, cb) => async (dispatch) => {
    try {
      const res = await axios.post(`${FACE_R_APP_API_ENDPOINT}/users`, params, {
        cancelToken,
      });

      res.data.status ? cb(true) : cb(false);

      if (!res.data.status) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin người dùng thất bại!" },
        });
      }

      dispatch({
        type: ADD_USER,
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

export const editUser =
  (params, cancelToken, history, cb) => async (dispatch) => {
    try {
      const res = await axios.put(
        `${FACE_R_APP_API_ENDPOINT}/users/${params.id}`,
        params,
        { cancelToken }
      );

      res.data.status ? cb(true) : cb(false);

      if (!res.data.status) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin người dùng thất bại!" },
        });
      }

      dispatch({
        type: EDIT_USER,
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

export const removeUser =
  (id, cancelToken, history, errors, cb) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `${FACE_R_APP_API_ENDPOINT}/users/delete/${id}`,
        { cancelToken }
      );

      res.data.status ? cb(true) : cb(false);

      if (!res.data.status) {
        errors.message = "Lưu thông tin người dùng thất bại!";
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin người dùng thất bại!" },
        });
      }

      dispatch({
        type: DELETE_USER,
        payload: res.data.status,
      });
    } catch (err) {
      cb(false);
      errors.message = err.message;
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
