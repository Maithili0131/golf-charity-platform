const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Firebase API working 🚀");
});

app.get("/charities", (req, res) => {
  res.json([
    { id: 1, name: "Golf Charity Foundation" },
    { id: 2, name: "Kids Sports Fund" }
  ]);
});

exports.api = functions.https.onRequest(app);