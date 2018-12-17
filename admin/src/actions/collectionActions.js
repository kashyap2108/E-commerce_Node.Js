import axios from "axios";
import {
  GET_ERRORS,
  GET_COLLECTIONS,
  DELETE_COLLECTION_SUCCESS,
  CLEAR_COLLECTIONS
} from "./types";

export const getCollections = () => dispatch => {
  console.log("action called!!");
  axios
    .get("/admin/collections")
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

export const addCollection = (collectionData, history) => dispatch => {
  axios
    .post("/admin/collections/add_collection", collectionData)
    .then(res => history.push("/admin/dashboard/collections"))
    .catch(err => {
      console.log("AddCollection error!!");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteCollection = (collection_id, history) => dispatch => {
  axios
    .delete(`/admin/collections/delete_collection/${collection_id}`)
    .then(res =>
      dispatch({
        type: DELETE_COLLECTION_SUCCESS,
        payload: { collection_id: collection_id }
      })
    )
    .catch(err => {
      console.log("Collection Deleted!!", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearCollections = () => {
  return {
    type: CLEAR_COLLECTIONS
  };
};
