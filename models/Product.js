const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  subcollection_id: {
    type: Schema.Types.ObjectId,
    ref: "sub_collections"
  },
  title: {
    type: String,
    required: true,
    max: 40
  },
  price: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
