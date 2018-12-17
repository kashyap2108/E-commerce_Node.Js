import { GET_COLLECTIONS, GET_SUB_COLLECTIONS,GET_PRODUCTS } from "../actions/types";

const intialState = {
  collections: null,
  subcollections: null,
  products:null,
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    case GET_SUB_COLLECTIONS:
      return {
        ...state,
        subcollections: action.payload
      };
    case GET_PRODUCTS:
      return{
        ...state,
        products:action.payload
      }
    default:
      return state;
  }
}
