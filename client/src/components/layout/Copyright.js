import React, { Component } from "react";

export default class Copyright extends Component {
  render() {
    return (
      <div>
        <div className="copyright">
          <div className="copyright-issue">
            <p>
              "Copyright @ 2018,"
              <a href="#" title>
                Shopify Shirts
              </a>
              ". "
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.shopify.ca?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore"
              >
                Ecommerce Software by Shopify
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
