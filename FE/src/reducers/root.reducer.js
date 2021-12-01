import {
  GET_LIST_OF_CAMERAS_IN_STORE,
  GET_LIST_OF_ROLES,
  GET_LIST_OF_STORES,
  SET_CURRENT_CAMERA,
  UPLOAD_FILE_ERRORS,
} from "../actions/types";

const initialState = {
  cameras: [],
  stores: [],
  roles: [],
  current_camera: null,
  upload_file_errors: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_OF_CAMERAS_IN_STORE:
      return {
        ...state,
        cameras: action.payload,
      };
    case GET_LIST_OF_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case GET_LIST_OF_STORES:
      return {
        ...state,
        stores: action.payload,
      };
    case SET_CURRENT_CAMERA:
      return {
        ...state,
        current_camera: action.payload,
      };
    case UPLOAD_FILE_ERRORS:
      return {
        ...state,
        upload_file_errors: action.payload,
      };
    default:
      return state;
  }
}
