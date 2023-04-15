const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");

const bcryptSalt = bcrypt.genSaltSync(8);

dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
}

connect();

app.get("/test", (req, res) => {
  res.json("test ok");
});
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.listen(8000, () => console.log("server is sunning"));
