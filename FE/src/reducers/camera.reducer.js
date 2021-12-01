import {
  CONNECT_CAMERA,
  DISCONNECT_CAMERA,
  GET_CAMERAS,
  GET_CAMERA,
  ADD_CAMERA,
  EDIT_CAMERA,
  DELETE_CAMERA,
  SET_CAMERAS,
} from "../actions/types";

const initialState = {
  cameras: [],
  camera: null,
  page: 0,
  pages: 0,
  success: false,
  search_store_id: 0,
};

let cameras = [];

export default function cameraReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAMERAS:
      return {
        ...state,
        cameras: action.payload,
        pages: action.pages,
        page: action.page,
        search_store_id: action.store_id,
      };
    case GET_CAMERA:
      return {
        ...state,
        camera: action.payload,
        success: false,
      };
    case CONNECT_CAMERA:
      if (action.payload.status) {
        state.cameras.map((camera) => {
          if (camera.id === action.payload._id) {
            camera.status = 1;
          }

          return camera;
        });
      }

      return {
        ...state,
      };
    case DISCONNECT_CAMERA:
      cameras = state.camera;

      if (action.payload.status) {
        cameras = state.cameras.map((camera) => {
          if (camera.id === action.payload._id) {
            camera.status = 0;
          }

          return camera;
        });
      }

      return {
        ...state,
        cameras,
      };
    case ADD_CAMERA:
      return {
        ...state,
        success: action.payload,
      };
    case EDIT_CAMERA:
      return {
        ...state,
        success: action.payload,
      };
    case DELETE_CAMERA:
      return {
        ...state,
        success: action.payload,
      };
    case SET_CAMERAS:
      return {
        ...state,
        cameras: action.payload,
      };
    default:
      return state;
  }
}
