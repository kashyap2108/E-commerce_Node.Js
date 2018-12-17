import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <ul className="side-nav">
        <li className="nav-home">
          <a href="#">Home</a>
        </li>
        <li className="side-nav-section" id="first">
          <p>Catalogue</p>
          <ul>
            <Link className="nav-link" to="/admin/dashboard/products">
              Products
            </Link>

            <Link className="nav-link" to="/admin/dashboard/collections">
              Collections
            </Link>
            <Link className="nav-link" to="/admin/dashboard/subcollections">
              Sub-Collections
            </Link>
          </ul>
        </li>

        <li className="side-nav-section" id="first">
          <p>Discounts</p>
          <ul>
            <li className="">
              <a href="#">Sales</a>
            </li>
            <li className="">
              <a href="#">Vouchers</a>
            </li>
            <li className="">
              <a href="#">SubCollections</a>
            </li>
          </ul>
        </li>

        <li className="side-nav-section" id="first">
          <p>Sales</p>
          <ul>
            <li className="">
              <a href="#">Orders</a>
            </li>
            <li className="">
              <a href="#">Customers</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
