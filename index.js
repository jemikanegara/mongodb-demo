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

// Create
app.post("/customers", (req, res) => {
  Customer.create(req.body, (err, customer) => {
    if (err) return res.send(err);
    res.send(customer);
  });
});

// Search By Name
app.get("/customers/search", (req, res) => {
  Customer.find(
    {
      $or: [
        { first_name: req.query.firstname },
        { last_name: req.query.lastname }
      ]
    },
    (err, customers) => {
      if (err) return res.send(err);
      res.send(customers);
    }
  );
});
// Get All
app.get("/customers", (req, res) => {
  Customer.find({}, (err, customers) => {
    if (err) return res.send(err);

    res.send(customers);
  });
});

// Get One
app.get("/customers/:_id", (req, res) => {
  Customer.findById(req.params._id, (err, customer) => {
    if (err) return res.send(err);

    res.send(customer);
  });
});

// Delete One
app.delete("/customers/:id", (req, res) => {
  Customer.findByIdAndRemove(req.params.id, (err, customers) => {
    if (err) return res.send(err);
    res.send(customers);
  });
});

app.listen(PORT, () => console.log(`App Running on Port ${PORT}`));
