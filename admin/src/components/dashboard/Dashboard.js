import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import PrivateRoute from "../common/PrivateRoute";
import ProductList from "./Products/ProductList";
import AddProduct from "./Products/AddProduct";
import CollectionList from "./Collections/CollectionList";
import SubCollectionList from "./SubCollections/SubCollectionList";
import AddSubCollection from "./SubCollections/AddSubCollection";
import Login from "../auth/Login";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import { connect } from "react-redux";
import AddCollection from "./Collections/AddCollection";

class Dashboard extends Component {
  componentDidMount() {
    console.log("Dashboarded Loaded!!");
    console.log(this.props);
  }
  render() {
    const { match } = this.props;
    console.log(this.props.auth);
    if (!this.props.auth.isAuthenticated) {
      return (
        <div>
          <Login />
        </div>
      );
    } else {
      return (
        <Router>
          <div>
            <Navbar />
            <h3>Welcome to Dashboard!!</h3>

            <div className="row">
              <div className="col-sm-4">
                <Sidebar />
              </div>
              <div className="col-sm-8">
                <Route
                  path="/admin/dashboard/collections"
                  component={CollectionList}
                />
                <Route
                  path="/admin/dashboard/add-collection"
                  component={AddCollection}
                />
                <Route
                  path="/admin/dashboard/subcollections"
                  component={SubCollectionList}
                />
                <Route
                  path="/admin/dashboard/add-subcollection"
                  component={AddSubCollection}
                />
                 <Route
                  path="/admin/dashboard/products"
                  component={ProductList}
                />
                <Route
                  path="/admin/dashboard/add-product"
                  component={AddProduct}
                />
              </div>
            </div>
          </div>
        </Router>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  null
)(Dashboard);
