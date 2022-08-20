const hotelModel = require("../models/hotelModel");
const RoomModel = require("../models/roomsModel");

module.exports.createHotel = async (req, res) => {
  let data = req.body;
  const newHotel = new hotelModel(data);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.updateHotel = async (req, res) => {
  try {
    let uid = req.params.id;
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      uid,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.deleteHotel = async (req, res) => {
  try {
    let uid = req.params.id;
    const deletedHotel = await hotelModel.findByIdAndDelete(uid);
    res.status(200).json(deletedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getHotel = async (req, res) => {
  try {
    let uid = req.params.id;
    const hotel = await hotelModel.findById(uid);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await hotelModel
      .find({
        ...others,
        cheapestPrice: { $gte: min || 1000, $lte: max || 99999 },
      })
      .limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

module.exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

module.exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotelModel.countDocuments({
      type: "hotel",
    });
    const apartmentCount = await hotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelModel.countDocuments({ type: "resort" });
    const villaCount = await hotelModel.countDocuments({ type: "villa" });
    const cabinCount = await hotelModel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

module.exports.getRooms = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomModel.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
