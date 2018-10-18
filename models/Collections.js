const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionsSchema = new Schema({
  collection_name: {
    type: String,
    required: true
  },
  collection_description: {
    type: String
  }
});

module.exports = Collections = mongoose.model("collections", CollectionsSchema);
