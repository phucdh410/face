import { convertDateToMiliseconds } from "../utils";

import {
  GET_ATTENDANCES,
  GET_ATTENDANCE,
  SET_ATTENDANCES,
} from "../actions/types";

const from = new Date();
from.setDate(from.getDate() - 1);

const to = new Date();

const initialState = {
  attendances: [],
  attendance: null,
  page: 0,
  pages: 0,
  success: false,
  search_store_id: 0,
  search_from: convertDateToMiliseconds(from),
  search_to: convertDateToMiliseconds(to),
};

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ATTENDANCES:
      return {
        ...state,
        attendances:
          action.page !== 0
            ? state.attendances.concat(action.payload)
            : action.payload,
        pages: action.pages,
        page: action.page,
        search_store_id: action.store_id,
        search_from: action.from,
        search_to: action.to,
      };
    case GET_ATTENDANCE:
      return {
        ...state,
        attendance: action.payload,
      };
    case SET_ATTENDANCES:
      return {
        ...state,
        attendances: action.payload,
      };
    default:
      return state;
  }
}
