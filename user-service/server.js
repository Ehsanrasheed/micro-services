require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
connectDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);

app.get("/", (req, res) => {
  res.send("User Service is running");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
