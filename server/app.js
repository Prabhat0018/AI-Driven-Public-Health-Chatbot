const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

module.exports = app;
