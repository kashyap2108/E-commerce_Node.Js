const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const admin_passport = require("passport");

//Load validation
const validateCollectionsInput = require("../../validations/collections");

// Load Collections model
const Collections = require("../../models/Collections");

// @route GET/admin/etst/
// @desc Tests admin Collections route
// @access Private

router.get("/test", (req, res) => {
  res.json({ msg: "Collections working successfully!!" });
});

// @route GET/admin/collections/
// @desc Get the list of all collections
// @access Private

router.get("/", (req, res) => {
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
});

// @route POST/admin/auth/collections/add_collection
// @desc Add a collection object
// @access Private

router.post(
  "/add_collection",
  admin_passport.authenticate("admin-passport", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCollectionsInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    collection_name = req.body.collection_name ? req.body.collection_name : "";
    collection_description = req.body.collection_description
      ? req.body.collection_description
      : "";

    Collections.findOne({ collection_name: collection_name }).then(
      collection => {
        if (collection) {
          errors.collection = "Collection Already exists!!";
          return res.status(400).json(errors);
        } else {
          const newCollection = new Collections({
            collection_name: collection_name,
            collection_description: collection_description
          });

          newCollection
            .save()
            .then(collection => res.json(collection))
            .catch(err => console.log(err));


        }
      }
    );
  }
);

module.exports = router;
