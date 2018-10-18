const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCollectionsSchema = new Schema({

  collection_id : {
  	type : Schema.Types.ObjectId,
  	ref : 'collections',
  },	
  sub_collection_name: {
    type: String,
    required: true
  },
  sub_collection_description: {
    type: String
  }
});

module.exports = SubCollections = mongoose.model("sub_collections", SubCollectionsSchema);
