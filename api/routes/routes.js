const express = require("express");
const router = express.Router();
const UserCopy = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "jdfshruioihoiahifdg";

router.post("/register", async (request, response) => {
  const bcryptSalt = await bcrypt.genSalt(10); // Generating a salt for password hashing
  const { name, email, password } = request.body; // Extracting name, email, and password from request body
  const securePassword = await bcrypt.hash(password, bcryptSalt); // Hashing the password with the generated salt

  try {
    const signedUpUser = await UserCopy.create({
      name,
      email,
      password: securePassword,
    });
    signedUpUser
      .save()
      .then((data) => response.json(data))
      .catch((err) => response.json(err));

    response.json(signedUpUser);
  } catch (error) {
    response.status(422).json(error);
  }
});

router.post("/login", async (request, res) => {
  const { email, password } = request.body;
  const loginUser = await UserCopy.findOne({ email });

  if (loginUser) {
    const passOk = bcrypt.compareSync(password, loginUser.password);
    if (passOk) {
      jwt.sign(
        { email: loginUser.email, id: loginUser._id }, // Creating a JWT token with user data
        jwtSecret, // Secret key for signing the token
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(loginUser); // Setting the JWT token as a cookie and sending the user data as JSON response
        }
      );
    } else {
      res.status(422).json("password not ok"); // Sending an error response with status code 422 if password is incorrect
    }
  } else {
    res.json("Not found"); // Sending a "Not found" response if user is not found
  }
});

module.exports = router; // Exporting the router for use in other modules
