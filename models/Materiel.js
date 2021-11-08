const mongoose = require("mongoose");

const materielSchema = new mongoose.Schema(
  {
    serie: {
      type: String,
      trim: true,
      required: true,
    },
    detailId: {
      type: String,
      trim: true,
      required: true,
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
