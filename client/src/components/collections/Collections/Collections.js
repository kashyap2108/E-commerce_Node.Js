import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CollectionItem from "./CollectionItem";
import {
  getCollections,
  getSubCollections,
  getProducts
} from "../../../actions/collectionActions";
import "../../css/collections/Collections.css";

class Collections extends Component {
  state = {
    collection_id: null
  };

  componentDidMount() {
    this.props.getCollections();
    this.props.getSubCollections();
  }

  handleClick = id => {
    this.setState({ collection_id: id });
    //console.log(id, this.state.collection_id);
  };

  handleSubCollectionClick = id =>{
    console.log(id);
  }
  render() {
    console.log(this.props);
    const collections = this.props.collections.collections;
    if (collections != null) {
      console.log(this.state);
      const CollectionComponent = collections.map(collection => {
        if (
          this.state.collection_id === null ||
          (this.state.collection_id !== null &&
            this.state.collection_id !== collection._id)
        ) {
          return (
            <button
              className="dropdown-btn"
              onClick={() => this.handleClick(collection._id)}
            >
              {collection.collection_name}
              <i className="fas fa-caret-down" />
            </button>
          );
        } else {
          const subcollections = this.props.collections.subcollections.filter(
            subcollection =>
              subcollection.collection_id == this.state.collection_id
          );

          console.log(subcollections);
          const SubCollectionComponent = subcollections.map(subcollection => (
            <li onClick={() => this.handleSubCollectionClick(2)}>
             
              {subcollection.sub_collection_name}
             
            </li>
          ));
          return (
            <button
              className="dropdown-btn"
              onClick={() => this.handleClick(collection._id)}
            >
              {collection.collection_name}
              <i className="fas fa-caret-down" />

              <div className="dropdown-container">
                <ul>{SubCollectionComponent}</ul>
              </div>
            </button>
          );
        }
      });
      console.log(CollectionComponent);
      return (
        <div className="collections-menu">
          <h3>Home</h3>
          <hr />
          <div>{CollectionComponent}</div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

Collections.propTypes = {
  getCollections: PropTypes.func.isRequired,
  getSubCollections: PropTypes.func.isRequired,
  collections: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    collections: state.collections,
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCollections, getSubCollections }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections);
