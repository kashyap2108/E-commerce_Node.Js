import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import { addProduct } from "../../../actions/productActions";
import {
  getSubCollections
} from "../../../actions/subCollectionActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddProduct extends Component {
  state = {
    product_name: "",
    product_price:"",
    product_size:"",
    product_color:"",
    product_description: "",
    subcollection_id:"",
    errors: {}
  };

  componentDidMount(){
    console.log('Getsubcollection called!!');
    this.props.getSubCollections();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("yes");
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const productData = {
      product_name: this.state.product_name,
      product_price : this.state.product_price,
      product_size : this.state.product_size,
      product_color : this.state.product_color,
      product_description: this.state.product_description,
      subcollection_id : this.state.subcollection_id
    };
    console.log(productData);
    this.props.addProduct(productData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props);
    const { errors } = this.state;
    //const  subcollections  = this.props.subcollections.subcollections;
    const {subcollections} = this.props.subcollections;
    console.log(subcollections);
    if (subcollections != null){
      const optionItems = subcollections.map(subcollection =>{
        return { label : subcollection.sub_collection_name , value : subcollection._id};
      });

      optionItems.unshift({label:"Select a Subcollection"});
      return (
      <div className="create-product">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <SelectListGroup
                placeholder=""
                name="subcollection_id"
                value={this.state.subcollection_id}
                onChange={this.onChange}
                options={optionItems}
                error={errors.subcollection_id}
              />
            <TextFieldGroup
              placeholder="Product Name"
              type="text"
              name="product_name"
              value={this.state.product_name}
              onChange={this.onChange}
              error={errors.product_name}
            />
            <TextFieldGroup
              placeholder="Product Price"
              type="text"
              name="product_price"
              value={this.state.product_price}
              onChange={this.onChange}
              error={errors.product_price}
            />
            <TextFieldGroup
              placeholder="Product Description"
              type="text"
              name="product_description"
              value={this.state.product_description}
              onChange={this.onChange}
              error={errors.product_description}
            />

            <div className="login-login-button-container">
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </div>
          </form>
        </div>
      </div>
    );
    }
    else{
      return <div />;
    }
    
  }
}

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
  getSubCollections : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    subcollections:state.subcollections,
    errors: state.errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addProduct,getSubCollections }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
