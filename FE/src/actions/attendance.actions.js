import axios from "axios";

import { logoutUser } from "./auth.actions";
import { convertDateToMiliseconds } from "../utils";
import { handleError } from "../utils/handler";

import {
  GET_ERRORS,
  GET_ATTENDANCES,
  GET_ATTENDANCE,
  SET_ATTENDANCES,
} from "./types";
import { FACE_R_APP_API_ENDPOINT } from "../config";

// Get list of attendance
export const getAttendances = (params, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${FACE_R_APP_API_ENDPOINT}/attendances`, params, { cancelToken },
    );

    const { payload, pages, page } = res.data;

    // console.log("payload: ", JSON.stringify(payload));

    dispatch({
      type: GET_ATTENDANCES,
      payload,
      pages,
      page,
      store_id: params.store_id,
      from: convertDateToMiliseconds(new Date(params.search_from)),
      to: convertDateToMiliseconds(new Date(params.search_to)),
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

// Get single attendance
export const getAttendance = (id, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${FACE_R_APP_API_ENDPOINT}/attendances/${id}`, { cancelToken },
    );

    const { payload } = res.data;

    dispatch({
      type: GET_ATTENDANCE,
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

// Push new item to attendances
export const setAttendaces = (attendances) => async (dispatch) => {
  dispatch({
    type: SET_ATTENDANCES,
    payload: attendances,
  });
};
