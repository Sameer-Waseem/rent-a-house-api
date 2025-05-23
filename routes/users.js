const express = require("express");

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Hello world" });
  } catch (error) {}
});

module.exports = app;
