const mongoose = require("mongoose");
const Joi = require("joi");

const houseDetailsSchema = new mongoose.Schema({
  area: {
    type: Number,
    min: 1,
    max: 99999,
    required: true,
  },
  type: {
    type: String,
    enum: ["appartement", "plot"],
    required: true,
  },
  rent: {
    type: Number,
    min: 1,
    max: 999999,
    required: true,
  },
  highlights: {
    type: String,
    minlength: 3,
    maxlength: 55,
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 1055,
  },
  rooms: {
    type: Number,
    min: 1,
    max: 255,
    required: true,
  },
  bathrooms: {
    type: Number,
    min: 1,
    max: 255,
    required: true,
  },
  water_supply: {
    type: Boolean,
    default: false,
  },
  gas_supply: {
    type: Boolean,
    default: false,
  },
  electricity_supply: {
    type: Boolean,
    default: false,
  },
});

const HouseDetails = mongoose.model("HouseDetails", houseDetailsSchema);

function validatePost(body) {
  const schema = Joi.object({
    area: Joi.number().integer().min(1).max(99999).required(),
    type: Joi.string().valid("appartement", "plot").required(),
    rent: Joi.number().integer().min(1).max(999999).required(),
    highlights: Joi.string().min(3).max(55).required(),
    description: Joi.string().min(10).max(1055),
    rooms: Joi.number().integer().min(1).max(255).required(),
    bathrooms: Joi.number().integer().min(1).max(255).required(),
    water_supply: Joi.boolean().default(false),
    gas_supply: Joi.boolean().default(false),
    electricity_supply: Joi.boolean().default(false),
  });

  return schema.validate(body);
}

function validateUpdate(body) {
  const schema = Joi.object({
    area: Joi.number().integer().min(1).max(99999),
    type: Joi.string().valid("appartement", "plot"),
    rent: Joi.number().integer().min(1).max(999999),
    highlights: Joi.string().min(3).max(55),
    description: Joi.string().min(10).max(1055),
    rooms: Joi.number().integer().min(1).max(255),
    bathrooms: Joi.number().integer().min(1).max(255),
    water_supply: Joi.boolean().default(false),
    gas_supply: Joi.boolean().default(false),
    electricity_supply: Joi.boolean().default(false),
  });

  return schema.validate(body);
}

module.exports.HouseDetails = HouseDetails;
module.exports.validatePost = validatePost;
module.exports.validateUpdate = validateUpdate;
