const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const admin_passport = require("passport");

//Load validation
const validateProductsInput = require("../../validations/products");

// Load Collections model
const Products = require("../../models/Product");

// @route GET/admin/products/test/
// @desc Tests admin Collections route
// @access Private

router.get("/test", (req, res) => {
  res.json({ msg: "Products working successfully!!" });
});

// @route GET/admin/products/
// @desc Get the list of all collections
// @access Private

router.get(
  "/",
  admin_passport.authenticate("admin-passport", { session: false }),
  (req, res) => {
    const errors = {};
    Products.find()
      .then(products => {
        console.log("hello", products);
        if (!products || products.length === 0) {
          errors.products = "There are no Products!!";
          return res.status(400).json(errors);
        }

        res.json(products);
      })
      .catch(err =>
        res.status(404).json({
          products: "There are no Products for given Subcollection!!"
        })
      );
  }
);

// @route POST/admin/auth/products/add_product
// @desc Add a collection object
// @access Private

router.post(
  "/add_product",
  admin_passport.authenticate("admin-passport", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProductsInput(req.body);

    console.log(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    newProduct = {};
    newProduct.subcollection_id = req.body.subcollection_id
      ? req.body.subcollection_id
      : "";
    newProduct.title = req.body.title ? req.body.title : "";

    newProduct.price = req.body.price ? req.body.price : "";

    newProduct.color = req.body.color ? req.body.color : "";
    newProduct.size = req.body.size ? req.body.size : "";
    newProduct.description = req.body.description ? req.body.description : "";

    Products.findOne({ tile: product.title }).then(product => {
      if (product) {
        errors.product = "Product Already exists!!";
        return res.status(400).json(errors);
      } else {
        new Products(newProduct)
          .save()
          .then(product => res.json(product))
          .catch(err => console.log(err));
      }
    });
  }
);

module.exports = router;
