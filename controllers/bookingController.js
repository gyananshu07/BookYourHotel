const RoomModel = require("../models/roomsModel");
const userModel = require("../models/userModel");

let SK =
  "sk_test_51LXlTISBILI6Yj169m5Z6Eyn8xf84DoPCx1AEFJU5i16mxCGUUffSTzMLTZGF7rzjiGQon4qAAV1IsOR9rAbFOcK00erS5g6eH";
const stripe = require("stripe")(SK);

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let roomId = req.params.id;

    const user = await userModel.findById(userId);
    const room = await RoomModel.findById(roomId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: room.id,
      line_items: [
        {
          name: room.name,
          description: room.description,
          amount: room.price,
          currency: "inr",
          quantity: 1,
        },
      ],
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};
