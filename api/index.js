const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

const mongoUrl = process.env.MONGO_URL;
// mongoose.connect(process.env.MONGO_URL);
console.log(mongoUrl);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/_register", (req, res) => {
  const { name, email, password } = req.body;

  res.json({ name, email, password });
});

app.listen(4000);
