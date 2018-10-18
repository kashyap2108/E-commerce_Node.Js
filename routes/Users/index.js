const express = require("express");
const router = express.Router();
const auth = require("./auth");

//router.get("/").use("./auth", auth);

router.get("/auth").use("/auth", auth);

module.exports = router;
