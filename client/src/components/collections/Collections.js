import React, { Component } from "react";
import CollectionItem from "./CollectionItem";
import "../css/collections/Collections.css";

export default class Collections extends Component {
  state = {
    items: [
      {
        id: 1,
        title: "Topwear",
        display: false
      },
      {
        id: 2,
        title: "Bottomwear",
        display: false
      },
      {
        id: 3,
        title: "Innerwear",
        display: false
      },
      {
        id: 4,
        title: "Footwear",
        display: false
      },
      {
        id: 5,
        title: "Sportswear",
        display: false
      },
      {
        id: 6,
        title: "Festivewear",
        display: false
      },
      {
        id: 7,
        title: "Accessories",
        display: false
      }
    ]
  };

  handleClick = id => {
    this.setState({
      items: this.state.items.map(item => {
        if (item.id === id) {
          const value = item.display;
          return {
            id: item.id,
            title: item.title,
            display: !value
          };
        } else {
          return item;
        }
      })
    });

    // if (item.id == id) {
    //   const value = item.display;
    //   return {
    //     id: item.id,
    //     title: item.title,
    //     display: !value
    //   };
    // } else {
    //   return item;
    // }
  };
  render() {
    const collections = this.state.items;
    const CollectionComponent = collections.map(collection => (
      <CollectionItem
        id={collection.id}
        title={collection.title}
        display={collection.display}
        handleClick={this.handleClick}
      />
    ));
    return (
      <div className="collections-menu">
        <h3>Home</h3>
        <hr />
        <div>{CollectionComponent}</div>
      </div>
    );
  }
}
