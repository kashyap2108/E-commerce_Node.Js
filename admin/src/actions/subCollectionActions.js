import axios from "axios";
import {
  GET_ERRORS,
  GET_SUBCOLLECTIONS,
  DELETE_SUBCOLLECTION_SUCCESS
} from "./types";

export const getSubCollections = () => dispatch => {
  console.log("Subaction called!!");
  axios
    .get("/admin/sub_collections")
    .then(res => {
      console.log("action", res.data);
      dispatch({
        type: GET_SUBCOLLECTIONS,
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

export const addSubCollection = (subcollectionData, history) => dispatch => {
  axios
    .post("/admin/sub_collections/add_sub_collection", subcollectionData)
    .then(res => history.push("/admin/dashboard/subcollections"))
    .catch(err => {
      console.log("AddSubCollection error!!");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteSubCollection = (subcollection_id, history) => dispatch => {
  axios
    .delete(`/admin/sub_collections/delete_sub_collection/${subcollection_id}`)
    .then(res =>
      dispatch({
        type: DELETE_SUBCOLLECTION_SUCCESS,
        payload: { subcollection_id: subcollection_id }
      })
    )
    .catch(err => {
      console.log("Sub Collection Deleted!!", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
