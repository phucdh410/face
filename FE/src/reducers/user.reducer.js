import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  users: [],
  user: null,
  page: 0,
  pages: 0,
  success: false,
  search_input: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        pages: action.pages,
        page: action.page,
        search_input: action.input,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        success: false,
      };
    case ADD_USER:
      return {
        ...state,
        success: action.payload,
      };
    case EDIT_USER:
      return {
        ...state,
        success: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}
