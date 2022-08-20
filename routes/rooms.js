const express = require("express");
const roomRoute = express.Router();

const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
} = require("../controllers/roomsController");
const { verifyAdmin } = require("../utils/verifyToken");

// CREATE
roomRoute.post("/:hotelId", verifyAdmin, createRoom);

// UPDATE
roomRoute.put("/availability/:id", updateRoomAvailability);
roomRoute.put("/:id", verifyAdmin, updateRoom);

// DELETE
roomRoute.delete("/:hotelId", verifyAdmin, deleteRoom);

// GET
roomRoute.get("/:id", getRoom);

// GET ALL
roomRoute.get("/", getRooms);

module.exports = roomRoute;
