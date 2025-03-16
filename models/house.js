const mongoose = require("mongoose");
const Joi = require("joi");

const houseSchema = new mongoose.Schema({
  house_number: {
    type: Number,
    min: 1,
    max: 99999,
    required: true,
  },
  street: {
    type: Number,
    min: 1,
    max: 99999,
    required: true,
  },
  sector: {
    type: Number,
    min: 1,
    max: 255,
    required: false,
  },
  block: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: false,
  },
  area: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  postal_code: {
    type: Number,
    min: 1,
    max: 99999,
    required: true,
  },
  city: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  district: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  country: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
});

const House = mongoose.model("House", houseSchema);

function validatePost(body) {
  const schema = Joi.object({
    house_number: Joi.number().integer().min(1).max(99999).required(),
    street: Joi.number().integer().min(1).max(99999).required(),
    sector: Joi.number().integer().min(1).max(255),
    block: Joi.string().min(1).max(255),
    area: Joi.string().min(3).max(255).required(),
    postal_code: Joi.number().integer().min(1).max(99999).required(),
    city: Joi.string().min(1).max(255).required(),
    district: Joi.string().min(1).max(255).required(),
    country: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(body);
}

function validateUpdate(body) {
  const schema = Joi.object({
    house_number: Joi.number().integer().min(1).max(99999),
    street: Joi.number().integer().min(1).max(99999),
    sector: Joi.number().integer().min(1).max(255),
    block: Joi.string().min(1).max(255),
    area: Joi.string().min(3).max(255),
    postal_code: Joi.number().integer().min(1).max(99999),
    city: Joi.string().min(1).max(255),
    district: Joi.string().min(1).max(255),
    country: Joi.string().min(1).max(255),
  });

  return schema.validate(body);
}

module.exports.House = House;
module.exports.validatePost = validatePost;
module.exports.validateUpdate = validateUpdate;
