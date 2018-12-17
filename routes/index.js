const express = require("express");
const router = express.Router();
const users = require("./Users");
const admin = require("./Admin");
const forgotpassword = require("./Users/forgotPassword");
const products = require("./Products");

router.get("/users").use("/users", users);
// router.get("/").use("/forgotpassword", forgotpassword);
router.get("/admin").use("/admin", admin);
router.get("/").use("/", products);
module.exports = router;
