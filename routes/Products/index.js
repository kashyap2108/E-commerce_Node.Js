const express = require("express");
const router = express.Router();
const collections = require("./collections");
const subcollections = require("./subcollections");
const products = require("./products");

router.get("/collections").use("/collections", collections);
router.get("/subcollections").use("/subcollections", subcollections);
// router.get("/products/:id", (req, res) => {
//   console.log("hello!!");
// });
router.get("/products/:id").use("/products/", products);
module.exports = router;
