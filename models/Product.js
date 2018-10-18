const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  collection: {
    type: Schema.Types.ObjectId,
    ref: "collections"
  },
  title: {
    type: String,
    required: true,
    max: 40
  },
  price: {
    required: true
  },
  quantity: [
    {
      color: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Product = mongoose.model("product", ProductSchema);
