const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const transporter = require("./nodemailer");
const validateForgotPasswordInput = require("../../validations/forgotPassword");
const validataResetForgotPasswordInput = require("../../validations/resetForgotPasswordInput");
const User = require("../../models/User");

// @route GET/users/reset_password/
// @desc  Send the form with email field
// @access Private

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send(
//       '<form action="/passwordreset" method="POST">' +
//         '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
//         '<input type="submit" value="Reset Password" />' +
//         "</form>"
//     );
//   }
// );

router.post("/", (req, res) => {
  const { errors, isValid } = validateForgotPasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  console.log(email);
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found!!";
      return res.status(404).json(errors);
    }

    const payload = {
      id: user.id,
      email: user.email
    };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      const mailOptions = {
        from: "kashyap959821@gmail.com",
        to: email,
        subject: "Password Reset",
        text: "hello world",
        html:
          "Please follow this link to reset your password" +
          '<a href="http://localhost:3000/reset_forgot_password/' +
          payload.id +
          "/" +
          token +
          '">Reset password</a>'
      };
      console.log("transporter!!");
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("transporter called!");
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          console.log(
            "Email sent successfully. Please check your email for the reset link"
          );
          res.json(info);
        }
      });
    });
    res.json({ mail: "sent" });
  });
});

router.get("/resetforgotpassword/:id/:token", (req, res) => {
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

router.post("/resetforgotpassword", (req, res) => {
  const id = req.body.id;
  const token = req.body.token;
  const password = req.body.password;

  console.log(id, token, password);
  console.log("hello");
  const { errors, isValid } = validataResetForgotPasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  jwt.verify(token, keys.secretOrKey, (err, payload) => {
    if (err) {
      res.json(err);
    }

    // Hash Password..and update it

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        console.log(password, hash);
        User.findOneAndUpdate(
          { _id: id },
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
