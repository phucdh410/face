import axios from "axios";

import { logoutUser } from "./auth.actions";
import { handleError } from "../utils/handler";

import {
  GET_ERRORS,
  CONNECT_CAMERA,
  DISCONNECT_CAMERA,
  GET_LIST_OF_CAMERAS_IN_STORE,
  GET_CAMERAS,
  GET_CAMERA,
  ADD_CAMERA,
  EDIT_CAMERA,
  DELETE_CAMERA,
  SET_CAMERAS,
} from "./types";

import { FACE_R_APP_API_ENDPOINT } from "../config";

// Get list of camera by store
export const getCamerasByStore =
  (params, cancelToken, history) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${FACE_R_APP_API_ENDPOINT}/cameras/${params.store_id}`,
        { cancelToken }
      );

      const { payload } = res.data;

      dispatch({
        type: GET_LIST_OF_CAMERAS_IN_STORE,
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

// Get list of camera
export const getCameras =
  (params, cancelToken, history) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${FACE_R_APP_API_ENDPOINT}/cameras/${params.page}/${params.pages}/${params.store_id}`,
        { cancelToken }
      );
      const { payload, pages, page } = res.data;
      dispatch({
        type: GET_CAMERAS,
        payload,
        pages,
        page,
        store_id: params.store_id,
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

// Get single camera
export const getCamera = (id, cancelToken, history) => async (dispatch) => {
  dispatch({
    type: GET_CAMERA,
    payload: null,
  });
  try {
    const res = await axios.get(`${FACE_R_APP_API_ENDPOINT}/cameras/${id}`, {
      cancelToken,
    });
    const { payload } = res.data;
    dispatch({
      type: GET_CAMERA,
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

export const connectToCamera =
  (_id, cancelToken, history) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${FACE_R_APP_API_ENDPOINT}/cameras/connect/${_id}`,
        { cancelToken }
      );

      const { status } = res.data;

      dispatch({
        type: CONNECT_CAMERA,
        payload: { _id, status },
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

export const disconnectFromCamera =
  (_id, cancelToken, history) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${FACE_R_APP_API_ENDPOINT}/cameras/disconnect/${_id}`,
        { cancelToken }
      );

      console.log("res: ", res);

      const { status } = res.data;

      dispatch({
        type: DISCONNECT_CAMERA,
        payload: { _id, status },
      });
    } catch (err) {
      console.log("err: ", err);
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

export const addCamera = (params, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${FACE_R_APP_API_ENDPOINT}/cameras`, params, {
      cancelToken,
    });

    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin camera thất bại!" },
      });
    }

    dispatch({
      type: ADD_CAMERA,
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

// export const editCamera =
//   (params, cancelToken, history) => async (dispatch) => {
//     try {
//       const res = await axios.put(
//         `${FACE_R_APP_API_ENDPOINT}/cameras/${params.id}`,
//         params,
//         { cancelToken }
//       );
//       if (!res.data.status) {
//         dispatch({
//           type: GET_ERRORS,
//           payload: { message: "Lưu thông tin camera thất bại!" },
//         });
//       }
//       dispatch({
//         type: EDIT_CAMERA,
//         payload: res.data.status,
//       });
//     } catch (err) {
//       const errorResponse = handleError(err, dispatch, GET_ERRORS);
//       if (errorResponse) {
//         if (err.response.status === 401) {
//           dispatch(logoutUser(history));
//         }
//       }
//     } finally {
//       dispatch({
//         type: GET_ERRORS,
//         payload: {},
//       });
//     }
//   };

// SANG FIX ->
export const editCamera =
  (params, cancelToken, history, cb) => async (dispatch) => {
    try {
      const res = await axios.put(
        `${FACE_R_APP_API_ENDPOINT}/cameras/${params.id}`,
        params,
        { cancelToken }
      );

      if (!res.data.status) {
        await dispatch({
          type: GET_ERRORS,
          payload: { message: "Lưu thông tin camera thất bại!" },
        });
      }
      await dispatch({
        type: EDIT_CAMERA,
        payload: res.data.status,
      });

      if (res.data.status) cb(true);
      else cb(false);
    } catch (err) {
      const errorResponse = handleError(err, dispatch, GET_ERRORS);
      if (errorResponse) {
        if (err.response.status === 401) {
          await dispatch(logoutUser(history));
        }
      }
    } finally {
      await dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    }
  };

export const removeCamera = (id, cancelToken, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`${FACE_R_APP_API_ENDPOINT}/cameras/${id}`, {
      cancelToken,
    });

    if (!res.data.status) {
      dispatch({
        type: GET_ERRORS,
        payload: { message: "Lưu thông tin camera thất bại!" },
      });
    }
    dispatch({
      type: DELETE_CAMERA,
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

// Update camera's status
export const setCameras = (cameras) => async (dispatch) => {
  dispatch({
    type: SET_CAMERAS,
    payload: cameras,
  });
};
