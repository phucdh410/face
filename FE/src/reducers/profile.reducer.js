import { GET_PROFILE, CLEAR_CURRENT_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  loading: false,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: {},
      };
    default:
      return state;
  }
}
