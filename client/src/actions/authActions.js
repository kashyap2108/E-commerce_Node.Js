import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  PASSWORD_RESET_FORM_HIDDEN_FIELDS
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("users/auth/register", userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/users/auth/login", userData)
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
  dispatch(setCurrentUser({}));
};

// Forgot Password

export const forgotPassword = (userEmail, history) => dispatch => {
  axios
    .post("users/forgotpassword", userEmail)
    .then(res => {
      history.push("/pswd_reset_link");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getResetForgotPasswordForm = (id, token) => dispatch => {
  axios
    .get(`/users/forgotpassword/resetforgotpassword/${id}/${token}`)
    .then(res => {
      dispatch({
        type: PASSWORD_RESET_FORM_HIDDEN_FIELDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const resetForgotPassword = (userPassword, history) => dispatch => {
  axios
    .post("/users/forgotpassword/resetforgotpassword", userPassword)
    .then(res => {
      console.log();
      history.push("/rst_fgt_pwd_scs");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
