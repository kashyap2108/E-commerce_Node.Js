import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Footer from "./components/layout/Footer";
import Copyright from "./components/layout/Copyright";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordResetLinkSent from "./components/auth/ForgotPasswordResetLinkSent";
import PasswordResetForm from "./components/auth/PasswordResetForm";
import ForgotPasswordResetSuccess from "./components/auth/ForgotPasswordResetSuccess";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
//import { clearCurrentProfile } from "./actions/profileActions";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    //store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <hr />
            <div className="container">
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route
                exact
                path="/pswd_reset_link"
                component={ForgotPasswordResetLinkSent}
              />
              <Route
                exact
                path="/reset_forgot_password/:id/:token"
                component={PasswordResetForm}
              />
              <Route
                exact
                path="/rst_fgt_pwd_scs"
                component={ForgotPasswordResetSuccess}
              />
            </div>

            <hr />
            <div className="container">
              <Footer />
            </div>
            <hr />
            <div className="container">
              <Copyright />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
