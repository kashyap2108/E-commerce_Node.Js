import React, { Component } from "react";
import "../css/auth/Login.css";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { bindActionCreators } from "redux";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
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

    const User = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(User);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login-container">
        <div className="login-box">
          <div>
            <p className="login-title">Login to Myntra</p>
          </div>
          <div className="login-third-party-login">
            <p className="login-button-info-text login-info-text">
              EASILY USING
            </p>
            <div className="login-button-container">
              <button className="facebook-button login-button">
                <i className="fab fa-facebook-f" />
                <p className="login-button-info-text">FACEBOOK</p>
              </button>
              <button className="google-button login-button">
                <i className="fab fa-google" />
                <p className="login-button-info-text">GOOGLE</p>
              </button>
            </div>
          </div>
          <p className="login-info-text">- OR USING EMAIL -</p>
          <form className="login-login-form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Your Email Address"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />

            <TextFieldGroup
              placeholder="Enter Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <div className="login-login-button-container">
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </div>
          </form>

          <div className="login-link-container">
            <a className="login-link" href="/forgotpassword">
              Recover Password
            </a>
            <div className="login-right-links">
              <span className="login-info-text">New to Myntra?</span>
              <a
                className="login-create-account-link login-link"
                href="/register"
              >
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
  return bindActionCreators({ loginUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
