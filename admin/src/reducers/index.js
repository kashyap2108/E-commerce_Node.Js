import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productsReducer from "./productsReducer";
import collectionsReducer from "./collectionsReducer";
import subcollectionsReducer from "./subcollectionsReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  products: productsReducer,
  collections: collectionsReducer,
  subcollections: subcollectionsReducer
});
