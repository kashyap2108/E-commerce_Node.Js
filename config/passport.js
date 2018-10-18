const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/User");
const keys = require("../config/keys");
const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    "user-passport",
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          console.log("User not found!!");
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  passport.use(
    "admin-passport",
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({
        _id: jwt_payload.id,
        accessLevel: jwt_payload.accessLevel
      })
        .then(user => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
};
