import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import "../css/auth/Register.css";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  onChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("yes");
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="register-container">
        <div className="register-box">
          <div>
            <p className="register-title">Register to Myntra</p>
          </div>
          <div className="register-third-party-register">
            <p className="register-button-info-text register-info-text">
              EASILY USING
            </p>
            <div className="register-button-container">
              <button className="facebook-button register-button">
                <i className="fab fa-facebook-f" />
                <p className="register-button-info-text">FACEBOOK</p>
              </button>
              <button className="google-button register-button">
                <i className="fab fa-google" />
                <p className="register-button-info-text">GOOGLE</p>
              </button>
            </div>
          </div>
          <p className="register-info-text">- OR USING EMAIL -</p>
          <form className="register-register-form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />

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

            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />

            <fieldset className="register-register-button-container">
              <input type="submit" className="register-register-button" />
            </fieldset>
          </form>

          <div className="register-link-container">
            <div className="register-right-links">
              <span className="register-info-text">
                Already have an account??
              </span>
              <a
                className="register-create-account-link register-link"
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
