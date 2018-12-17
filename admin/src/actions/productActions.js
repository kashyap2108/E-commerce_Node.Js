import axios from "axios";
import {
  GET_ERRORS,
  GET_PRODUCTS,
  DELETE_PRODUCT_SUCCESS,
  CLEAR_PRODUCTS
} from "./types";

export const getProducts = () => dispatch => {
  console.log("action called!!");
  axios
    .get("/admin/products")
    .then(res => {
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

export const addProduct = (productData, history) => dispatch => {
  axios
    .post("/admin/products/add_product", productData)
    .then(res => history.push("/admin/dashboard/products"))
    .catch(err => {
      console.log("AddProduct error!!");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteProduct = (product_id, history) => dispatch => {
  axios
    .delete(`/admin/products/delete_product/${product_id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: { product_id: product_id }
      })
    )
    .catch(err => {
      console.log("Product Deleted!!", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearProducts = () => {
  return {
    type: CLEAR_PRODUCTS
  };
};
