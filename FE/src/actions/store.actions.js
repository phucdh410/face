import axios from "axios";

import { logoutUser } from "./auth.actions";
import { handleError } from "../utils/handler";

import {
  GET_ERRORS,
  GET_STORES,
  GET_STORE,
  GET_LIST_OF_STORES,
  ADD_STORE,
  EDIT_STORE,
  DELETE_STORE,
} from "./types";

import { ENCODE_EMPTY_STRING, FACE_R_APP_API_ENDPOINT } from "../config";

// Get all stores
export const getStoresList = (cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.get(`${FACE_R_APP_API_ENDPOINT}/stores`, {
      cancelToken,
    });

    const { payload } = res.data;

    dispatch({
      type: GET_LIST_OF_STORES,
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

// Get list of store
export const getStores = (params, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${FACE_R_APP_API_ENDPOINT}/stores/${params.page}/${params.pages}/${
        params.input || ENCODE_EMPTY_STRING
      }`,
      { cancelToken }
    );

    const { payload, pages, page } = res.data;

    dispatch({
      type: GET_STORES,
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

// Get single store
export const getStore = (id, cancelToken, history) => async (dispatch) => {
  dispatch({
    type: GET_STORE,
    payload: null,
  });

  try {
    const res = await axios.get(`${FACE_R_APP_API_ENDPOINT}/stores/${id}`, {
      cancelToken,
    });

    const { payload } = res.data;

    dispatch({
      type: GET_STORE,
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

export const addStore = (params, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${FACE_R_APP_API_ENDPOINT}/stores`, params, {
      cancelToken,
    });

    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin cửa hàng thất bại!" },
      });
    }

    dispatch({
      type: ADD_STORE,
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

export const editStore = (params, cancelToken, history) => async (dispatch) => {
  let newSuccess = false;
  try {
    const res = await axios.put(
      `${FACE_R_APP_API_ENDPOINT}/stores/${params.id}`,
      params,
      { cancelToken }
    );
    newSuccess = res.data.status;
    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin cửa hàng thất bại!" },
      });
    }

    dispatch({
      type: EDIT_STORE,
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

export const removeStore = (id, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`${FACE_R_APP_API_ENDPOINT}/stores/${id}`, {
      cancelToken,
    });

    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin cửa hàng thất bại!" },
      });
    }

    dispatch({
      type: DELETE_STORE,
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
