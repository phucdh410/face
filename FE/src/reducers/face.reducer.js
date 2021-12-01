import { DELETE_FACE } from "../actions/types";

const initialState = {
  success: false,
};

export default function faceReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_FACE:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}
