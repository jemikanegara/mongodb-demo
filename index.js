require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MONGODB CONFIG
const mongoose = require("mongoose");
const MONGODB_URL = "mongodb://localhost:27017/company";
mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true
  }
);

// MONGODB MODEL
const Schema = mongoose.Schema;
const Customer = mongoose.model(
  "customers",
  new Schema({
    first_name: String,
    last_name: String,
    age: Number,
    address: {
      street: String,
      city: String,
      zip_code: String,
      province: String
    }
  })
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`App Running on Port ${PORT}`));
