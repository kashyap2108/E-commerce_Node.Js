import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import { addCollection } from "../../../actions/collectionActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddCollection extends Component {
  state = {
    collection_name: "",
    collection_description: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("yes");
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const collectionData = {
      collection_name: this.state.collection_name,
      collection_description: this.state.collection_description
    };
    console.log(collectionData);
    this.props.addCollection(collectionData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    console.log(this.state);
    return (
      <div className="create-collection">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Collection Name"
              type="text"
              name="collection_name"
              value={this.state.collection_name}
              onChange={this.onChange}
              error={errors.collection_name}
            />

            <TextFieldGroup
              placeholder="Collection Description"
              type="text"
              name="collection_description"
              value={this.state.collection_description}
              onChange={this.onChange}
              error={errors.collection_description}
            />

            <div className="login-login-button-container">
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddCollection.propTypes = {
  addCollection: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCollection }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCollection);
