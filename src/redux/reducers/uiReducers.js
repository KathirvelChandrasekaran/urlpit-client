import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_INFO } from "../types";

const initialState = {
  loading: false,
  message: {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };

    case SET_INFO:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
}
