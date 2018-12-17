const express = require("express");
const router = express.Router();
const collections = require("./collections");
const subcollections = require("./subcollections");
// const products = require("products");

router.get("/collections").use("/collections", collections);
router.get("/subcollections").use("/subcollections", subcollections);
// router.get("/products").use("/products", products);
module.exports = router;
