const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/usermodel.js");

const app = express();
app.use(cors());
app.use(express.json())
app.get("/", welcome);

mongoose.connect(
    "mongodb+srv://akhilk:iamtheadmin@cluster0.k7wfbyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to First Database!");
    startServer();
  })
  .catch((err) => {
    console.error("First Database Connection failed:", err);
  });

app.get("/api/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});
app.post("/api/users", (req, res) => {
  User.create(req.body)
    .then((users) => {
      console.log("User created:", users);
      res.status(201).json(users);
    })
    .catch((error) => {
      console.error("Error creating vehicle:", error);
      res.status(500).json({ message: error.message });
    });
});

function welcome(req, res) {
  res.send("Welcome to my Counter App!");
}

function startServer() {
  var server = app.listen(5000, () => {
    console.log("Server started");
  });
}
