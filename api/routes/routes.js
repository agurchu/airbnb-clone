const express = require("express");
const router = express.Router();
const UserCopy = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "jdfshruioihoiahifdg";

router.post("/register", async (request, response) => {
  const bcryptSalt = await bcrypt.genSalt(10);
  const { name, email, password } = request.body;
  const securePassword = await bcrypt.hash(password, bcryptSalt);

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
        { email: loginUser.email, id: loginUser._id, name: loginUser.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(loginUser);
        }
      );
    } else {
      res.status(422).json("password not ok");
    }
  } else {
    res.json("Not found");
  }
});

module.exports = router;
