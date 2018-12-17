import {
  GET_SUBCOLLECTIONS,
  FILTER_SUBCOLLECTION,
  DELETE_SUBCOLLECTION_SUCCESS
} from "../actions/types";

const intialState = {
  subcollections: null
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_SUBCOLLECTIONS:
      return {
        ...state,
        subcollections: action.payload
      };

    case DELETE_SUBCOLLECTION_SUCCESS:
      return {
        ...state,
        subcollections: state.subcollections.filter(
          subcollection => subcollection._id !== action.payload.subcollection_id
        )
      };

    default:
      return state;
  }
}
