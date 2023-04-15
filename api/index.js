const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const routeUrIs = require("./routes/routes");
const cors = require("cors");

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

app.use(express.json());
app.use(cors());
app.use("/test", routeUrIs);
app.listen(8000, () => console.log("server is up and running"));
