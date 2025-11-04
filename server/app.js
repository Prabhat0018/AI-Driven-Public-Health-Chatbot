// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json());

// // test route
// app.get("/", (req, res) => {
//   res.send("✅ Backend is running!");
// });

// module.exports = app;

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// import routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

module.exports = app;
