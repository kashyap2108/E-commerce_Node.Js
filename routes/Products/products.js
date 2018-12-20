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
  "/:id",
  //   admin_passport.authenticate("admin-passport", { session: false }),
  (req, res) => {
    console.log(req.params.id);
    const errors = {};
    Products.find({ _id: req.params.id })
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

module.exports = router;
