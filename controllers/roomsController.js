const RoomModel = require("../models/roomsModel");
const hotelModel = require("../models/hotelModel");

module.exports.createRoom = async (req, res, next) => {
  const hotelID = req.params.hotelId;
  const newRoom = new RoomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotelModel.findByIdAndUpdate(hotelID, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

module.exports.updateRoom = async (req, res, next) => {
  try {
    let uid = req.params.id;
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      uid,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

module.exports.updateRoomAvailability = async (req, res, next) => {
  try {
    await RoomModel.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDate": req.body.dates } }
    );
    res.status(200).json("Room status has been updated.");
  } catch (error) {
    next(error);
  }
};

module.exports.deleteRoom = async (req, res, next) => {
  const hotelID = req.params.hotelId;
  try {
    let uid = req.params.id;
    const deletedRoom = await RoomModel.findByIdAndDelete(uid);
    try {
      await hotelModel.findByIdAndUpdate(hotelID, {
        $pull: { rooms: uid },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(deletedRoom);
  } catch (error) {
    next(error);
  }
};

module.exports.getRoom = async (req, res, next) => {
  try {
    let uid = req.params.id;
    const room = await RoomModel.findById(uid);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
