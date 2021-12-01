import {
  GET_STORES,
  GET_STORE,
  ADD_STORE,
  EDIT_STORE,
  DELETE_STORE,
} from "../actions/types";

const initialState = {
  stores: [],
  store: null,
  page: 0,
  pages: 0,
  success: false,
  search_input: "",
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORES:
      return {
        ...state,
        stores: action.payload,
        pages: action.pages,
        page: action.page,
        search_input: action.input,
      };
    case GET_STORE:
      return {
        ...state,
        store: action.payload,
        success: false,
      };
    case ADD_STORE:
      return {
        ...state,
        success: action.payload,
      };
    case EDIT_STORE:
      return {
        ...state,
        success: action.payload,
      };
    case DELETE_STORE:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}
