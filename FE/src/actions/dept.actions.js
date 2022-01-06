import axios from "axios";

import { logoutUser } from "./auth.actions";
import { handleError } from "../utils/handler";

import {
  GET_ERRORS,
  GET_DEPTS,
  GET_DEPT,
  ADD_DEPT,
  EDIT_DEPT,
  DELETE_DEPT,
} from "./types";

import { ENCODE_EMPTY_STRING, FACE_R_APP_API_ENDPOINT } from "../config";

// Get list of dept
export const getDepts = (params, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${FACE_R_APP_API_ENDPOINT}/depts/${params.page}/${params.pages}/${
        params.input || ENCODE_EMPTY_STRING
      }`,
      { cancelToken }
    );

    const { payload, pages, page } = res.data;

    dispatch({
      type: GET_DEPTS,
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

// Get single dept
export const getDept = (id, cancelToken, history) => async (dispatch) => {
  dispatch({
    type: GET_DEPT,
    payload: null,
  });

  try {
    const res = await axios.get(`${FACE_R_APP_API_ENDPOINT}/depts/${id}`, {
      cancelToken,
    });

    const { payload } = res.data;

    dispatch({
      type: GET_DEPT,
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

export const addDept =
  (params, cancelToken, history, cb) => async (dispatch) => {
    try {
      const res = await axios.post(`${FACE_R_APP_API_ENDPOINT}/depts`, params, {
        cancelToken,
      });

      res.data.status ? cb(true) : cb(false);

      if (!res.data.status) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin phòng ban thất bại!" },
        });
      }

      dispatch({
        type: ADD_DEPT,
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

export const editDept =
  (params, cancelToken, history, cb) => async (dispatch) => {
    try {
      const res = await axios.put(
        `${FACE_R_APP_API_ENDPOINT}/depts/${params.id}`,
        params,
        { cancelToken }
      );

      res.data.status ? cb(true) : cb(false);

      if (!res.data.status) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin phòng ban thất bại!" },
        });
      }

      dispatch({
        type: EDIT_DEPT,
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

export const removeDept =
  (id, cancelToken, history, errors, cb) => async (dispatch) => {
    try {
      const res = await axios.delete(`${FACE_R_APP_API_ENDPOINT}/depts/${id}`, {
        cancelToken,
      });

      res.data.status ? cb(true) : cb(false);

      if (!res.data.status) {
        errors.message = "Lưu thông tin phòng ban thất bại!";
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin phòng ban thất bại!" },
        });
      }

      dispatch({
        type: DELETE_DEPT,
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
