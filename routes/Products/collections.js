const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user_passport = require("passport");

// Load Collections model
const Collections = require("../../models/Collections");

// @route GET/collections/test
// @desc Tests admin Collections route
// @access Private

router.get("/test", (req, res) => {
  res.json({ msg: "Collections working successfully!!" });
});

// @route GET /collections
// @desc Get the list of all collections
// @access Private

router.get(
  "/",
  // user_passport.authenticate("user-passport", { session: false }),
  (req, res) => {
    console.log("fucks!!");
    const errors = {};
    Collections.find()
      .then(collections => {
        if (!collections || collections.length === 0) {
          errors.collections = "There are no collections!!";
          return res.status(400).json(errors);
        }

        res.json(collections);
      })
      .catch(err =>
        res.status(404).json({ collections: "There are no collections!!" })
      );
  }
);

module.exports = router;
