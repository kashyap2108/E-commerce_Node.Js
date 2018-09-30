const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function forgotPasswordInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid!!";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
