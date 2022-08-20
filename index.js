const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const port = process.env.PORT || 8080;

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const hotelRoute = require("./routes/hotels");
const roomRoute = require("./routes/rooms");
const bookingRouter = require("./routes/booking");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/booking", bookingRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong!";
  res.status(errorStatus).json(errorMessage);
});

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}!`);
});

app.get("/", (req, res) => res.send("Hello World!"));
