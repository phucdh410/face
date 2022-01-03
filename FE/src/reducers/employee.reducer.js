import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../actions/types";

const initialState = {
  employees: [],
  employee: null,
  page: 0,
  pages: 0,
  success: false,
  search_store_id: 0,
  search_input: "",
};

export default function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        pages: action.pages,
        page: action.page,
        search_store_id: action.store_id,
        search_input: action.input,
      };
    case GET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
        success: false,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        success: action.payload,
      };
    case EDIT_EMPLOYEE:
      console.log("State hiện tại>>>", state);
      console.log("Action hiện tại>>>", action);
      const { faces, payload } = action;
      const { employee } = state;
      employee.faces = faces;
      return {
        ...state,
        employee,
        success: payload,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}
