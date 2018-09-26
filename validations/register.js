const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  console.log(data);
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be betwwen 2 and 30 characters!!";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required!!";
  }

  if (Validator.isEmpty(data.email)) {
    console.log("Hello_fuckers!!");
    console.log(data.email);
    errors.email = "Email field is required!!";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid!!";
  }

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
