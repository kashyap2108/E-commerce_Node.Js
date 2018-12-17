import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const loginUser = userData => dispatch => {
  axios
    .post("/admin/auth/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decode = jwt_decode(token);
      // Set current user
      console.log("setcurrentuser!!");
      dispatch(setCurrentUser(decode));
    })
    .catch(err => {
      console.log("AuthAction.js called!!");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  console.log("authAcctionss");
  dispatch(setCurrentUser({}));
};

// Forgot Password
