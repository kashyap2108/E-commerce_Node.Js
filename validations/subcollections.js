const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.collection_id = !isEmpty(data.collection_id) ? data.collection_id : "";

  data.sub_collection_name = !isEmpty(data.sub_collection_name)
    ? data.sub_collection_name
    : "";

  if (Validator.isEmpty(data.collection_id)) {
    errors.collection_id = "Collection id field is required!!";
  }

  if (Validator.isEmpty(data.sub_collection_name)) {
    errors.sub_collection_name = "Sub Collection name field is required!!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
