const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/logout", logout);

module.exports = authRoute;
