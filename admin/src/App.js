import React, { Component } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/common/PrivateRoute";
import CollectionList from "./components/dashboard/Collections/CollectionList";
import AddCollection from "./components/dashboard/Collections/AddCollection";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  console.log("CurrentUser called!!");
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current Profile

    //Redirect to login
    window.location.href = "/admin";
    console.log("Logoutuser!!");
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Dashboard />
        </div>
      </Provider>
    );
  }
}

export default App;
