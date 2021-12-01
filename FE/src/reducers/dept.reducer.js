import {
  GET_DEPTS,
  GET_DEPT,
  ADD_DEPT,
  EDIT_DEPT,
  DELETE_DEPT,
} from "../actions/types";

const initialState = {
  depts: [],
  dept: null,
  page: 0,
  pages: 0,
  success: false,
  search_input: "",
};

export default function deptReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DEPTS:
      return {
        ...state,
        depts: action.payload,
        pages: action.pages,
        page: action.page,
        search_input: action.input,
      };
    case GET_DEPT:
      return {
        ...state,
        dept: action.payload,
        success: false,
      };
    case ADD_DEPT:
      return {
        ...state,
        success: action.payload,
      };
    case EDIT_DEPT:
      return {
        ...state,
        success: action.payload,
      };
    case DELETE_DEPT:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}
