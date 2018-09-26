// Import Dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const users = require("./routes");
const profile = require("./routes/profile");

// DB CONFIG
const db = require("./config/keys").mogoURI;

// connect to MONGODB
mongoose
  .connect(db)
  .then(() => console.log("Mongodb Connected !!"))
  .catch(err => console.log(err));

//  Middlewares
console.log(users, "hello");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);
// Use Routes

app.use("/users", users);
app.use("/profile", profile);

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port} ...`));
