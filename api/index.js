require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcryptjs");

const bcryptSalt = bcrypt.genSaltSync(8);

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  })
    .then((user) => res.json(user))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to register user" });
    });
});

app.listen(4000);
