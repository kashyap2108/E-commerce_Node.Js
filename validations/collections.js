const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.collection_name = !isEmpty(data.collection_name)
    ? data.collection_name
    : "";

  if (Validator.isEmpty(data.collection_name)) {
    errors.collection_name = "Collection name field is required!!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
