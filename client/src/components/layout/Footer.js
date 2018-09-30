import "../css/layout/Footer.css";

import React, { Component } from "react";
import Copyright from "./Copyright";
export default class Footer extends Component {
  state = {
    email: "",
    errors: {}
  };

  onChange = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    const errors = { errors };
    return (
      <div className="row">
        <div className="footer" className="col-sm-4">
          <div className="links">
            <h3 className="site-footer-section-title">Links</h3>
            <ul className="site-footer-menu">
              <li>
                <a className="link" href="#">
                  Search
                </a>
              </li>
              <li>
                <a className="link" href="#">
                  News
                </a>
              </li>
              <li>
                <a className="link" href="#">
                  Our Story
                </a>
              </li>
              <li>
                <a className="link" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="link" href="#">
                  Return Policy
                </a>
              </li>
              <li>
                <a className="link" href="#">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="subscribe" className="col-sm-2" />
        <div className="subscribe" className="col-sm-6">
          <p className="subscribe-heading">Be in the know</p>
          <p className="subscribe-heading">
            Sign up for the latest news,offers and styles
          </p>
          <form className="subscribe-password-form">
            <fieldset className="subscribe-password-input-container">
              <div className="subscribe-password-input-item">
                <input
                  placeholder="Your Email Address"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  className="subscribe-password-user-input-email subscribe-password-user-input"
                />
              </div>
            </fieldset>
            <fieldset className="subscribe-password-button-container">
              <input type="submit" className="subscribe-password-button" />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
