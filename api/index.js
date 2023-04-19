const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const routeUrIs = require("./routes/routes");
const cors = require("cors");
const cookerParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const jwtSecret = "jdfshruioihoiahifdg";
const UserCopy = require("./models/user");
const download = require("image-downloader");

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
app.use(cookerParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Update with the origin of your client-side application
    credentials: true, // Allow credentials (e.g., cookies, HTTP authentication)
  })
);

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const { name, email, _id } = await UserCopy.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(__dirname + "/uploads/" + newName);
});

app.use("/test", routeUrIs);
app.listen(8000, () => console.log("server is up and running"));
