const userModel = require("../models/userModel");

module.exports.createUser = async (req, res) => {
  const data = req.body;
  const newUser = new userModel(data);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    let uid = req.params.id;
    const updatedUser = await userModel.findByIdAndUpdate(
      uid,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    let uid = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(uid);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    let uid = req.params.id;
    const User = await userModel.findById(uid);
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const Users = await userModel.find();
    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};
