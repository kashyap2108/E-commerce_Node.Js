import React, { Component } from "react";
import "../css/collections/Collections.css";

export default class CollectionItem extends Component {
  state = {
    display: false
  };

  handleOnClick = e => {
    console.log("hello", this.props);
    this.props.handleClick(this.props.id);
  };
  render() {
    console.log("fucker", this.props);
    if (!this.props.display) {
      return (
        <div>
          <div className="dropdown">
            <button className="dropdown-btn" onClick={this.handleOnClick}>
              {this.props.title}
              <i className="fas fa-caret-down" />
            </button>
            <hr />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="dropdown">
            <button className="dropdown-btn" onClick={this.handleOnClick}>
              {this.props.title}
              <i className="fas fa-caret-down" />
            </button>
            <div className="dropdown-container">
              <ul>
                <li>
                  <a href="#">Link 1</a>
                </li>
                <li>
                  <a href="#">Link 1</a>
                </li>
                <li>
                  <a href="#">Link 1</a>
                </li>
              </ul>
            </div>

            <hr />
          </div>
        </div>
      );
    }
  }
}
