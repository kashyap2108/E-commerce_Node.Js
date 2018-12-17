import {
  GET_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  CLEAR_PRODUCTS
} from "../actions/types";

const intialState = {
  products: null
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.collections.filter(
          product => product._id !== action.payload.product_id
        )
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: null
      };
    default:
      return state;
  }
}
