const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validataResetForgotPasswordInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required!!";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters !!";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required!!";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords does not match !";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
