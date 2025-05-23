// In Models/Stone.js - using ES Modules syntax

const { mongoose } = require("mongoose");
const stoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Stone = mongoose.model("Stone", stoneSchema);
module.exports = { Stone };
