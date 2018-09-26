const express = require("express");
const router = express.Router();
const auth = require("./Users/auth");
const forgotpassword = require("./Users/forgotpassword");
console.log("routing success!!");

router.get("/").use("/auth", auth);
router.get("/").use("/forgotpassword", forgotpassword);
module.exports = router;
