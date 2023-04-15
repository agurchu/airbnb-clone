const express = require("express");
const router = express.Router();
const UserCopy = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const bcryptSalt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, bcryptSalt);

  const { name, email } = req.body;
  const signedUpUser = new UserCopy({
    name,
    email,
    password: securePassword,
  });
  await signedUpUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
