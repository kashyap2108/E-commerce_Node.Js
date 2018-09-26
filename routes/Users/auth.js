const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

// Load Input Validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

// Load User Model
const User = require("../../models/User");

// @route GET/users/auth/
// @desc Tests users Auth route
// @access Public

router.get("/", (req, res) => {
  res.json({ msg: "Auth Route Works!!" });
});

// @route POST/users/login
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
    if (!user) {
      errors.email = "User not found!!";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, username: user.username }; // Create JWT Payload

        // Sign Token
        console.log(payload, "hello");
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

// @route POST/users/register
// @desc  Register User
// @access Public

router.post("/register", (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Form Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists!!";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      // Hash Password..
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET/users/current
// @desc  Return current user
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

// @route GET/users/logout
// @desc  Logout user
// @access Private

router.get("/logout", (req, res) => {
  console.log("Logout successfull!!");
  req.logout();
  console.log(req.user);
  res.redirect("/");
});

module.exports = router;
