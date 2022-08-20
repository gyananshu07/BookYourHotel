const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const createError = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    let data = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    const newUser = new userModel(data);

    sendMail("register", newUser);
    const savedUser = await newUser.save();

    res.status(200).json({
      message: "User SuccessFully Registered",
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    let { username, password: userPassword } = req.body;
    const currentUser = await userModel.findOne({ username });

    if (!currentUser) return next(createError(404, "User Not Found!"));

    const comparedPassword = await bcrypt.compare(
      userPassword,
      currentUser.password
    );

    if (!comparedPassword)
      return next(createError(400, "Wrong Credentials! Please re-try!"));

    const token = jwt.sign(
      { id: currentUser._id, isAdmin: currentUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = currentUser._doc;
    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).redirect("/");
};
