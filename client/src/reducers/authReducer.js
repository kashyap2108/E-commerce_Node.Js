import {
  SET_CURRENT_USER,
  PASSWORD_RESET_FORM_HIDDEN_FIELDS
} from "../actions/types";
import isEmpty from "../validations/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  password_reset_form_hidden_fields: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case PASSWORD_RESET_FORM_HIDDEN_FIELDS:
      return {
        ...state,
        password_reset_form_hidden_fields: action.payload
      };
    default:
      return state;
  }
}
