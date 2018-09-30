import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "../css/auth/ForgotPassword.css";
import {
  getResetForgotPasswordForm,
  resetForgotPassword
} from "../../actions/authActions";

class PasswordResetForm extends Component {
  state = {
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    console.log("Mount!!");
    console.log(this.props);
    this.props.getResetForgotPasswordForm(
      this.props.match.params.id,
      this.props.match.params.token
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const userPasswordDetails = {
      id: this.props.match.params.id,
      token: this.props.match.params.token,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.resetForgotPassword(userPasswordDetails, this.props.history);
  };
  render() {
    const { errors } = this.state;
    console.log(errors);
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <div>
            <p className="forgot-password-title">Reset Password!!</p>
          </div>
          <p className="forgot-password-subtitle">Please enter your details.</p>

          <form className="forgot-password-form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Enter Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />

            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <div className="forgot-password-button-container">
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

PasswordResetForm.propTypes = {
  getResetForgotPasswordForm: PropTypes.func.isRequired,
  resetForgotPassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { resetForgotPassword, getResetForgotPasswordForm },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetForm);
