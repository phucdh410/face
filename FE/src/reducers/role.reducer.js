import {
  GET_ROLES,
  GET_ROLE,
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
} from "../actions/types";

const initialState = {
  roles: [],
  role: null,
  page: 0,
  pages: 0,
  success: false,
  search_input: "",
};

export default function roleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        pages: action.pages,
        page: action.page,
        search_input: action.input,
      };
    case GET_ROLE:
      return {
        ...state,
        role: action.payload,
        success: false,
      };
    case ADD_ROLE:
      return {
        ...state,
        success: action.payload,
      };
    case EDIT_ROLE:
      return {
        ...state,
        success: action.payload,
      };
    case DELETE_ROLE:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}
