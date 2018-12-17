import React, { Component } from "react";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import {
  getCollections,
  deleteCollection,
  clearCollections
} from "../../../actions/collectionActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CollectionList extends Component {
  state = {};

  componentDidMount() {
    console.log("componenet mmount!!");
    this.props.getCollections();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("yes");
      this.setState({ errors: nextProps.errors });
    }
  
  }

  onDeleteClick(id) {
    console.log(id, "hello");
    this.props.deleteCollection(id, this.props.history);
  }
  render() {
    console.log(this.props);
    const collections = this.props.collections.collections;
    console.log("hello", collections);

    if (collections !== null && collections.length != 0) {
      const collectionComponents = collections.map(collection => (
        <tr key={collection._id}>
          <td>{collection.collection_name}</td>
          <td>{collection.collection_description}</td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, collection._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
      return (
        <div className="container">
          <Link
            to="/admin/dashboard/add-collection"
            className="btn btn-lg btn-info"
          >
            Add Collection
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Collection</th>
                <th>Description</th>
              </tr>
              {collectionComponents}
            </thead>
          </table>
        </div>
      );
    } else {
      return (
        <div className="container">
          <Link
            to="/admin/dashboard/add-collection"
            className="btn btn-lg btn-info"
          >
            Add Collection
          </Link>
          <h4>Sorry!! There are no collections to show!!</h4>
          <br />
          <p>Please add a collection!!</p>
        </div>
      );
    }
  }
}

CollectionList.propTypes = {
  getCollections: PropTypes.func.isRequired,
  clearCollections: PropTypes.func.isRequired,
  collection: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    collections: state.collections,
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getCollections, deleteCollection, clearCollections },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionList);
