const mongoose = require("mongoose");
const express = require("express");
const houses = require("./routes/houses");

const app = express();

mongoose
  .connect("mongodb://localhost/rent-a-house")
  .then(() => console.log("Connected to database successfully..."))
  .catch(() => console.log("Could not connected to database..."));

app.use(express.json());
app.use("/api/house", houses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
