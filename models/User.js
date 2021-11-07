const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      trim: true,
      required: true,
    },
    prenom: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      validate: [isEmail],
    },
    password: {
      type: String,
      max: 1024,
      minlength: 8,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const check = await bcrypt.compare(password, user.password);
    if (check) {
      return user;
    }
    throw Error("Invalid password");
  }
  throw Error("Unknown user");
};

const userModel = mongoose.model("userModel", userSchema, "user");

module.exports = userModel;
