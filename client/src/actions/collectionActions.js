import axios from "axios";
import { GET_ERRORS, GET_COLLECTIONS, GET_SUB_COLLECTIONS , GET_PRODUCTS } from "./types";

export const getCollections = () => dispatch => {
  console.log("getcollections action called!!");
  axios
    .get("/collections")
    .then(res => {
      console.log("action", res.data);
      dispatch({
        type: GET_COLLECTIONS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error fucked!!", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getSubCollections = () => dispatch => {
  console.log("getsubcollections called!!");
  axios
    .get("/subcollections")
    .then(res => {
      console.log("subcollection action", res.data);
      dispatch({
        type: GET_SUB_COLLECTIONS,
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

export const getProducts = () => dispatch => {
  console.log("getproducts called!!");
  axios
    .get("/products")
    .then(res => {
      console.log("products action", res.data);
      dispatch({
        type: GET_PRODUCTS,
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
