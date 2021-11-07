const mongoose = require("mongoose");
const { isAlpha } = require("validator");

const materielSchema = new mongoose.Schema(
  {
    marque: {
      type: String,
      trim: true,
      required: true,
      validate: [isAlpha],
    },
    type: {
      type: String,
      trim: true,
      required: true,
      validate: [isAlpha],
    },
    serie: {
      type: String,
      trim: true,
      required: true,
      validate: [isAlpha],
    },
    userId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const materielModel = mongoose.model(
  "materielModel",
  materielSchema,
  "materiel"
);

module.exports = materielModel;
