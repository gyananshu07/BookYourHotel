const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 25,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 25,
      unique: true,
      required: true,
    },
    country: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    city: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
