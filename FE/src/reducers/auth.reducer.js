import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  success: false,
  isAuth: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
