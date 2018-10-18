import React, { Component } from "react";
import ProductItem from "./ProductItem";
import Pagination from "react-js-pagination";

export default class Items extends Component {
  state = {
    products: [
      {
        id: 1,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd1"
      },
      {
        id: 2,
        title: "Loom for Desktop",
        description: "Powerful video recorder .",
        productImageUrl: "pd2"
      },
      {
        id: 3,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd3"
      },
      {
        id: 4,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd4"
      },
      {
        id: 1,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd1"
      },
      {
        id: 2,
        title: "Loom for Desktop",
        description: "Powerful video recorder .",
        productImageUrl: "pd2"
      },
      {
        id: 3,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd3"
      },
      {
        id: 4,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd4"
      },

      {
        id: 1,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd1"
      },
      {
        id: 2,
        title: "Loom for Desktop",
        description: "Powerful video recorder .",
        productImageUrl: "pd2"
      },
      {
        id: 3,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd3"
      },
      {
        id: 4,
        title: "Loom for Desktop",
        description: "Powerful video recorder ",
        productImageUrl: "pd4"
      }
    ],
    activePage: 4
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    const productitems = this.state.products.map(product => (
      <ProductItem
        id={product.id}
        title={product.title}
        description={product.description}
        productImageUrl={product.productImageUrl}
      />
    ));
    return (
      <div>
        <div className="row">
          {productitems}
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={30}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
