const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  city: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  address: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const hotelModel = mongoose.model("hotelModel", HotelSchema);

module.exports = hotelModel;
