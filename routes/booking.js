const express = require("express");
const { createSession } = require("../controllers/bookingController");

const bookingRouter = express.Router();
const { verifyUser } = require("../utils/verifyToken");
bookingRouter.post("/createSession", verifyUser, createSession);
bookingRouter.get("/createSession", function (req, res) {
  res.redirect("https://buy.stripe.com/test_aEU00Q5JQbq4156144");
});

module.exports = bookingRouter;
