import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validations/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  console.log("AuthReducer called!", action.type, action.payload);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
