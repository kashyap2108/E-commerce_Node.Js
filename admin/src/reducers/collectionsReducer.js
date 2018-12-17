import {
  GET_COLLECTIONS,
  GET_COLLECTION,
  DELETE_COLLECTION_SUCCESS,
  CLEAR_COLLECTIONS
} from "../actions/types";

const intialState = {
  collections: null
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
        loading: false
      };
    case GET_COLLECTION:
      return {
        ...state,
        collection: action.payload,
        loading: false
      };
    case DELETE_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: state.collections.filter(
          collection => collection._id !== action.payload.collection_id
        )
      };
    case CLEAR_COLLECTIONS:
      return {
        ...state,
        collections: null
      };
    default:
      return state;
  }
}
