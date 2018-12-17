const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user_passport = require("passport");

//Load validation

// Load Collections model
const SubCollections = require("../../models/SubCollections");

// @route GET/admin/sub_collections/test
// @desc Tests admin Collections route
// @access Private

router.get("/test", (req, res) => {
  res.json({ msg: "Sub-Collections working successfully!!" });
});

// @route GET/subcollections
// @desc Get the list of all collections
// @access Private

router.get(
  "/",
  // user_passport.authenticate("user-passport", { session: false }),
  (req, res) => {
    const errors = {};
    SubCollections.find()
      .then(subcollections => {
        if (!subcollections || subcollections.length === 0) {
          errors.subcollections = "There are no subcollections!!";
          return res.status(400).json(errors);
        }

        res.json(subcollections);
      })
      .catch(err =>
        res.status(404).json({
          subcollections: "There are no subcollections for given collection!!"
        })
      );
  }
);

module.exports = router;
