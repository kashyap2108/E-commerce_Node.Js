const express = require("express");
const router = express.Router();
const auth = require("./auth");
const collections = require("./collections");
const subcollections = require("./sub_collections");
const products = require("./products");

//router.get("/").use("./auth", auth);

router.get("/auth").use("/auth", auth);
router.get("/collections").use("/collections", collections);
router.get("/sub_collections").use("/sub_collections", subcollections);
router.get("/products").use("/products", products);

module.exports = router;
