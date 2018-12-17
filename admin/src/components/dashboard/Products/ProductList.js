import React, { Component } from "react";
// import ProductItem from "./ProductItem";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getProducts } from "../../../actions/productActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProductList extends Component {
  state = {
    errors : []
  }
  componentDidMount() {
    console.log("componenet mmount!!");
    this.props.getProducts();
  }

  render() {
    console.log(this.props);
    const { errors }= this.state;
    const { products }= this.props.products;
    console.log("hello", products);

    if (products !== null) {
      const productComponents ={};
      return (
        <div className="container">
          <h3>Hello</h3>
          {productComponents}
        </div>
      );
    } else {
      return (
           <div className="container">
            <Link
              to="/admin/dashboard/add-product"
              className="btn btn-lg btn-info"
            >
              Add Product
            </Link>

            <h4>Sorry!! There are no products to show!!</h4>
            <br />
            <p>Please add a Product </p>
          </div>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    errors: state.errors
  };
}

ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProducts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
