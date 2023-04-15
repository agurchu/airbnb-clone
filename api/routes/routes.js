const express = require("express");
const router = express.Router();
const UserCopy = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", (request, response) => {
  //   const bcryptSalt = await bcrypt.genSalt(10);
  //   const securePassword = await bcrypt.hash(req.body.password, bcryptSalt);

  const signedUpUser = new UserCopy({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
  });
  signedUpUser
    .save()
    .then((data) => response.json(data))
    .catch((err) => response.json(err));
});

module.exports = router;
