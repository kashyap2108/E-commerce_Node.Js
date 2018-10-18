const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Input Validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

// Load User Model
const User = require("../../models/User");

// @route GET/admin/auth/
// @desc Tests admin Auth route
// @access Public

router.get("/", (req, res) => {
  res.json({ msg: "Auth Route Works!!" });
});

// @route POST/admin/login
// @desc Authenticate user details and redirect to respective page
// @access Private

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email

  User.findOne({ email }).then(user => {
    // Check for user

    if (!user || user.accessLevel !== 1) {
      errors.email = "User not found!!";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          username: user.username,
          accessLevel: user.accessLevel
        }; // Create JWT Payload

        // Sign Token
        console.log(payload);
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET/admin/logout
// @desc  Logout user
// @access Private

router.get("/logout", (req, res) => {
  console.log("Logout successfull!!");
  req.logout();
  console.log(req.user);
  res.redirect("/");
});

module.exports = router;
