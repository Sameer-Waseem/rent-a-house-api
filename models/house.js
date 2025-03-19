const mongoose = require("mongoose");
const Joi = require("joi");

const houseSchema = new mongoose.Schema({
  area: {
    type: Number,
    min: 1,
    max: 99999,
    required: true,
  },
  type: {
    type: String,
    enum: ["Appartement", "Plot"],
    required: true,
  },
  rent: {
    type: Number,
    min: 1,
    max: 99999,
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

const House = mongoose.model("House", houseSchema);

function validate(body, type) {
  const isPosting = type === "post";

  const schema = Joi.object({
    area: Joi.number()
      .integer()
      .min(1)
      .max(99999)
      .required(isPosting ? true : false),
    type: Joi.string()
      .valid("Appartement", "Plot")
      .required(isPosting ? true : false),
    rent: Joi.number()
      .integer()
      .min(1)
      .max(99999)
      .required(isPosting ? true : false),
    highlights: Joi.string()
      .min(3)
      .max(55)
      .required(isPosting ? true : false),
    description: Joi.string().min(10).max(1055),
    rooms: Joi.number()
      .integer()
      .min(1)
      .max(255)
      .required(isPosting ? true : false),
    bathrooms: Joi.number()
      .integer()
      .min(1)
      .max(255)
      .required(isPosting ? true : false),
    water_supply: Joi.boolean().default(false),
    gas_supply: Joi.boolean().default(false),
    electricity_supply: Joi.boolean().default(false),
  });

  return schema.validate(body);
}

module.exports.House = House;
module.exports.validate = validate;
