import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import { addSubCollection } from "../../../actions/subCollectionActions";
import { getCollections } from "../../../actions/collectionActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Collection } from "mongoose";

class AddSubCollection extends Component {
  state = {
    sub_collection_name: "",
    sub_collection_description: "",
    collection_id: "",
    errors: {}
  };

  componentDidMount() {
    console.log("componenet mmount!!");
    this.props.getCollections();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("yes");
      this.setState({ errors: nextProps.errors });
    }
    console.log(nextProps);
  }

  onSubmit = e => {
    e.preventDefault();
    const subcollectionData = {
      collection_id: this.state.collection_id,
      sub_collection_name: this.state.sub_collection_name,
      sub_collection_description: this.state.sub_collection_description
    };
    console.log(subcollectionData);
    this.props.addSubCollection(subcollectionData, this.props.history);
  };

  onChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    const collections = this.props.collections.collections;

    if (collections != null) {
      const optionItems = collections.map(collection => {
        return { label: collection.collection_name, value: collection._id };
      });
      optionItems.unshift({ label: "Select a Collection", value: "0" });
      console.log(typeof collections, optionItems);
      return (
        <div className="create-collection">
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <SelectListGroup
                placeholder=""
                name="collection_id"
                value={this.state.collection_id}
                onChange={this.onChange}
                options={optionItems}
                error={errors.collection_id}
              />
              <TextFieldGroup
                placeholder="SubCollection Name"
                type="text"
                name="sub_collection_name"
                value={this.state.sub_collection_name}
                onChange={this.onChange}
                error={errors.sub_collection_name}
              />

              <TextFieldGroup
                placeholder="SubCollection Description"
                type="text"
                name="sub_collection_description"
                value={this.state.sub_collection_description}
                onChange={this.onChange}
                error={errors.sub_collection_description}
              />

              <div className="login-login-button-container">
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

AddSubCollection.propTypes = {
  addSubCollection: PropTypes.func.isRequired,
  getCollections: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    collections: state.collections,
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSubCollection, getCollections }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubCollection);
