import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import collectionsReducer from "./collectionsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  collections: collectionsReducer
});
