const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const admin_passport = require("passport");

//Load validation
const validateSubCollectionsInput = require("../../validations/subcollections");

// Load Collections model
const SubCollections = require("../../models/SubCollections");

// @route GET/admin/sub_collections/test
// @desc Tests admin Collections route
// @access Private

router.get("/test", (req, res) => {
  res.json({ msg: "Sub-Collections working successfully!!" });
});

// @route GET/admin/sub_collections
// @desc Get the list of all collections
// @access Private

router.get(
  "/",
  admin_passport.authenticate("admin-passport", { session: false }),
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

// @route POST/admin/auth/sub_collections/add_sub_collection
// @desc Add a collection object
// @access Private

router.post(
  "/add_sub_collection",
  admin_passport.authenticate("admin-passport", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSubCollectionsInput(req.body);

    console.log(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    collection_id = req.body.collection_id ? req.body.collection_id : "";
    sub_collection_name = req.body.sub_collection_name
      ? req.body.sub_collection_name
      : "";
    sub_collection_description = req.body.sub_collection_description
      ? req.body.sub_collection_description
      : "";

    SubCollections.findOne({ sub_collection_name: sub_collection_name }).then(
      sub_collection => {
        if (sub_collection) {
          errors.sub_collection = "Sub Collection Already exists!!";
          return res.status(400).json(errors);
        } else {
          const newSubCollection = new SubCollections({
            collection_id: collection_id,
            sub_collection_name: sub_collection_name,
            subcollection_description: sub_collection_description
          });

          newSubCollection
            .save()
            .then(sub_collection => res.json(sub_collection))
            .catch(err => console.log(err));
        }
      }
    );
  }
);

module.exports = router;
