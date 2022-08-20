const express = require("express");
const hotelRoute = express.Router();

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getRooms,
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");

// CREATE
hotelRoute.post("/", verifyAdmin, createHotel);

// UPDATE
hotelRoute.put("/:id", verifyAdmin, updateHotel);

// DELETE
hotelRoute.delete("/:id", verifyAdmin, deleteHotel);

// GET
hotelRoute.get("/:id", getHotel);

// GET ALL
hotelRoute.get("/", getHotels);

// GET COUNT
hotelRoute.get("/find/countByCity", countByCity);
hotelRoute.get("/find/countByType", countByType);

// GET ROOM
hotelRoute.get("/rooms/:id", getRooms);

module.exports = hotelRoute;
