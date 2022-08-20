const express = require("express");
const {
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");
const userRoute = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/userController");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

// CREATE
userRoute.post("/", createUser);

// UPDATE
userRoute.put("/:id", verifyUser, updateUser);

// DELETE
userRoute.delete("/:id", verifyUser, deleteUser);

// GET
userRoute.get("/:id", verifyUser, getUser);

// GET ALL
userRoute.get("/", verifyAdmin, getUsers);

module.exports = userRoute;
