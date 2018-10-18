import React, { Component } from "react";

export default class ProductItem extends Component {
  render() {
    return (
      <div className="col-sm-4">
        <img
          src={require("../../static/images/Products/" +
            this.props.productImageUrl +
            ".gif")}
        />
        <span>{this.props.title}</span>
        <span>{this.props.description}</span>
        <hr />
      </div>
    );
  }
}
