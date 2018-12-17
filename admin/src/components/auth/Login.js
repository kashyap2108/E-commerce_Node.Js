import React, { Component } from "react";
// import "../css/auth/Login.css";
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
      this.props.history.push("/admin/dashboard");
    }
  }

  componentDidMount() {
    console.log("Mounted!!");
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }
  }
  onChange = er => {
    console.log(er.target.value);
    this.setState({ [er.target.name]: er.target.value });
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
            <p className="login-title">Admin Login</p>
          </div>

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
              <input
                type="submit"
                value="submit"
                className="btn btn-info btn-block mt-4"
              />
            </div>
          </form>
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
