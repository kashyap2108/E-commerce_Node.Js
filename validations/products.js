const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.size = !isEmpty(data.size) ? data.size : "";
  

  if (!Validator.isEmail(data.title)) {
    errors.email = "title field is invalid!!";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!!";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required!!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
