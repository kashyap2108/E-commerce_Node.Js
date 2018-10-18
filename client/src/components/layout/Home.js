import React, { Component } from "react";
import Collections from "../collections/Collections";
import Products from "../collections/Products";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Collections />
          </div>
          <div className="col-sm-1" />
          <div className="col-sm-8">
            <Products />
          </div>
        </div>
      </div>
    );
  }
}
