const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const transporter = require("./nodemailer");
// Load User Model
const User = require("../../models/User");

// @route GET/users/reset_password/
// @desc  Send the form with email field
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(
      '<form action="/passwordreset" method="POST">' +
        '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
        '<input type="submit" value="Reset Password" />' +
        "</form>"
    );
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateForgotPasswordInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const payload = {
      id: req.user.id,
      email: req.user.email
    };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      const mailOptions = {
        from: "kashyap959821@gmail.com",
        to: "kashyapofficial01@gmail.com",
        subject: "Password Reset",
        text: "hello world",
        html:
          "Please follow this link to reset your password" +
          '<a href="http://localhost:3000/resetpassword/' +
          payload.id +
          "/" +
          token +
          '">Reset password</a>'
      };
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("transporter called!");
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          console.log("Email sent:" + info.res);
          res.json(info);
        }
      });
    });
  }
);

router.get("/resetpassword/:id/:token", (req, res) => {
  const id = req.params.id;
  const token = req.params.token;

  jwt.verify(token, keys.secretOrKey, (err, payload) => {
    if (err) {
      res.json(err);
    }
    // Send the form with link in id and token as url parameters
    res.json({
      id: payload.id,
      token: token
    });
  });
});

router.post("/resetpassword", (req, res) => {
  const id = req.body.id;
  const token = req.body.token;
  const password = req.body.password;
  console.log(id, password);
  jwt.verify(token, keys.secretOrKey, (err, payload) => {
    if (err) {
      res.json(err);
    }

    // Hash Password..and update it

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        User.findOneAndUpdate(
          { id: id },
          { password: hash },
          { new: true },
          updated_user => {
            if (updated_user === null) res.json({ err: "User not found!!" });
            else res.json(updated_user);
          }
        );
      });
    });
  });
});

module.exports = router;
