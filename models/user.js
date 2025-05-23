const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  last_name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  phone: {
    type: Number,
    min: 3,
    max: 999999999999,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
