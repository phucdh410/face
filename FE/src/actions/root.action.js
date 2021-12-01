import { SET_CURRENT_CAMERA } from "./types";

const setCurrentCamera = (payload) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_CAMERA,
    payload,
  });
};

export default setCurrentCamera;
