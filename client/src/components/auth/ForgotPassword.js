import React, { Component } from "react";
import "../css/auth/ForgotPassword.css";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { forgotPassword } from "../../actions/authActions";
import { stat } from "fs";

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    console.log("next props");
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  onChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const Useremail = {
      email: this.state.email
    };

    this.props.forgotPassword(Useremail, this.props.history);
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <div>
            <p className="forgot-password-title">Forgot Password?</p>
          </div>
          <p className="forgot-password-subtitle">
            We will send you a link to reset your password.
          </p>
          <p className="forgot-password-subtitle">Enter Email Address</p>
          <form className="forgot-password-form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Your Email Address"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <div className="forgot-password-button-container">
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </div>
          </form>

          <div className="forgot-password-link-container">
            <div className="forgot-password-right-links">
              <a
                className="forgot-password-create-account-link forgot-password-link"
                href="/login"
              >
                Login!
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ forgotPassword }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
