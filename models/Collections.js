const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubCollections = require("./SubCollections");

const CollectionsSchema = new Schema({
  collection_name: {
    type: String,
    required: true
  },
  collection_description: {
    type: String
  }
});

CollectionsSchema.pre("remove", async function(next) {
  console.log("hey fucker!!", this);
  try {
    await SubCollections.remove({
      collection_id: this._id
    });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = Collections = mongoose.model("collections", CollectionsSchema);
