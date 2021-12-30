import axios from "axios";

import { logoutUser } from "./auth.actions";
import { handleError } from "../utils/handler";

import {
  GET_ERRORS,
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPLOAD_FILE_ERRORS,
} from "./types";

import { ENCODE_EMPTY_STRING, FACE_R_APP_API_ENDPOINT } from "../config";

// Get list of employee
export const getEmployees =
  (params, cancelToken, history) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${FACE_R_APP_API_ENDPOINT}/employees/${params.page}/${params.pages}/${
          params.store_id
        }/${params.input || ENCODE_EMPTY_STRING}`,
        { cancelToken }
      );

      const { payload, pages, page } = res.data;

      dispatch({
        type: GET_EMPLOYEES,
        payload,
        pages,
        page,
        store_id: params.store_id,
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

// Get single employee
export const getEmployee = (id, cancelToken, history) => async (dispatch) => {
  dispatch({
    type: GET_EMPLOYEE,
    payload: null,
  });

  try {
    const res = await axios.get(`${FACE_R_APP_API_ENDPOINT}/employees/${id}`, {
      cancelToken,
    });

    const { payload } = res.data;
    const { employee, faces } = payload;
    employee.faces = faces;

    // console.log("payload: ", res.data);

    dispatch({
      type: GET_EMPLOYEE,
      payload: employee,
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

export const addEmployee =
  (params, cancelToken, history) => async (dispatch) => {
    console.log("Code chạy vào action addEmployee");
    dispatch({
      type: UPLOAD_FILE_ERRORS,
      payload: [],
    });

    try {
      const res = await axios.post(
        `${FACE_R_APP_API_ENDPOINT}/employees`,
        params,
        { cancelToken }
      );

      console.log("Response >>>>", res);
      // console.log("payload: ", res.data);

      const { errors } = res.data;

      if (res.data.status) {
        dispatch({
          type: ADD_EMPLOYEE,
          payload: res.data.status,
        });

        dispatch({
          type: UPLOAD_FILE_ERRORS,
          payload: errors,
        });
      }
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

      dispatch({
        type: UPLOAD_FILE_ERRORS,
        payload: [],
      });
    }
  };

export const editEmployee =
  (id, params, cancelToken, history) => async (dispatch) => {
    dispatch({
      type: UPLOAD_FILE_ERRORS,
      payload: [],
    });

    try {
      const res = await axios.put(
        `${FACE_R_APP_API_ENDPOINT}/employees/${id}`,
        params,
        { cancelToken }
      );

      // console.log("payload: ", res.data);

      const { errors, faces } = res.data;

      if (!res.data.status) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin nhân viên thất bại!" },
        });

        dispatch({
          type: UPLOAD_FILE_ERRORS,
          payload: errors,
        });
      } else {
        dispatch({
          type: EDIT_EMPLOYEE,
          payload: res.data.status,
          faces,
        });
      }
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

export const removeEmployee =
  (id, cancelToken, history) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `${FACE_R_APP_API_ENDPOINT}/employees/${id}`,
        { cancelToken }
      );

      if (!res.data.status) {
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin nhân viên thất bại!" },
        });
      }

      dispatch({
        type: DELETE_EMPLOYEE,
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
