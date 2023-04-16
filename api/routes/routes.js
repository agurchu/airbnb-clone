const express = require("express");
const router = express.Router();
const UserCopy = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (request, response) => {
  const bcryptSalt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, bcryptSalt);

  try {
    const signedUpUser = new UserCopy({
      name: request.body.name,
      email: request.body.email,
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

module.exports = router;
