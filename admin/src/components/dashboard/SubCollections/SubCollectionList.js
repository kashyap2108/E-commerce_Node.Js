import React, { Component } from "react";
import SelectListGroup from "../../common/SelectListGroup";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getCollections } from "../../../actions/collectionActions";
import {
  getSubCollections,
  deleteSubCollection
} from "../../../actions/subCollectionActions";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SubCollectionList extends Component {
  state = {
    collection_id: "",
    subcollections: [],
    errors: []
  };

  componentDidMount() {
    this.props.getCollections();

    this.props.getSubCollections();

    // this.setState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.subcollections) {
      this.setState({
        subcollections: nextProps.subcollections.subcollections
      });
    }
  }

  onDeleteClick(id) {
    this.props.deleteSubCollection(id, this.props.history);
  }

  onChange = e => {
    
    this.setState({ [e.target.name]: e.target.value });
    //this.props.filterSubCollections(e.target.value);

    if (e.target.value != 0) {
      const newState = this.props.subcollections.subcollections.filter(
        subcollection => subcollection.collection_id === e.target.value
      );

      this.setState({
        subcollections: newState
      });
    } else {
      this.setState({
        subcollections: this.props.subcollections.subcollections
      });
    }
    //this.state.subcollections = newState;
  };
  render() {
    const { errors } = this.state;
    

    const subcollections = this.state.subcollections;
    const collections = this.props.collections.collections;

    
    if (
      subcollections !== null &&
      collections !== null &&
      subcollections.length != 0
    ) {
      const optionItems = collections.map(collection => {
        return { label: collection.collection_name, value: collection._id };
      });
      optionItems.unshift({ label: "Select a Collection", value: 0 });

      const subCollectionComponents = subcollections.map(subcollection => (
        <tr key={subcollection._id}>
          <td>{subcollection.sub_collection_name}</td>
          <td>{subcollection.sub_collection_description}</td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, subcollection._id)}
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
            to="/admin/dashboard/add-subcollection"
            className="btn btn-lg btn-info"
          >
            Add SubCollection
          </Link>

          <SelectListGroup
            placeholder=""
            name="collection_id"
            value={this.state.collection_id}
            onChange={this.onChange}
            options={optionItems}
            // error={errors.collection_id}
          />

          <table className="table">
            <thead>
              <tr>
                <th>SubCollection</th>
                <th>Description</th>
              </tr>
              {subCollectionComponents}
            </thead>
          </table>
        </div>
      );
    } else {
      if (collections !== null) {
        const optionItems = collections.map(collection => {
          return { label: collection.collection_name, value: collection._id };
        });
        optionItems.unshift({ label: "Select a Collection", value: 0 });
        return (
          <div className="container">
            <Link
              to="/admin/dashboard/add-subcollection"
              className="btn btn-lg btn-info"
            >
              Add SubCollection
            </Link>
            <SelectListGroup
              placeholder=""
              name="collection_id"
              value={this.state.collection_id}
              onChange={this.onChange}
              options={optionItems}
              // error={errors.collection_id}
            />
            <h4>Sorry!! There are no subcollections to show!!</h4>
            <br />
            <p>Please add a subcollection or select another collection!!</p>
          </div>
        );
      } else {
        return (
          <div className="container">
            <Link
              to="/admin/dashboard/add-subcollection"
              className="btn btn-lg btn-info"
            >
              Add SubCollection
            </Link>

            <h4>Sorry!! There are no subcollections to show!!</h4>
            <br />
            <p>Please add a subcollection </p>
          </div>
        );
      }
    }
  }
}

SubCollectionList.propTypes = {
  getSubCollections: PropTypes.func.isRequired,
  deleteSubCollection: PropTypes.func.isRequired,
  getCollections: PropTypes.func.isRequired,
  subcollections: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    subcollections: state.subcollections,
    collections: state.collections,
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getSubCollections, getCollections, deleteSubCollection },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCollectionList);
