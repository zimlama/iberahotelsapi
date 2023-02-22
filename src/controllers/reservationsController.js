const { Reservation } = require("../db");

const getAllReservations = async (req, res) => {
  try {
    let reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (e) {
    console.log(e);
  }
};

//! POST de Rooms
const postNewReservation = async (req, res) => {
  const { idHotels, idRooms, check_in, check_out  } = req.body;
  try {
    await Reservation.create({
        idHotels,
        idRooms,
        check_in,
        check_out,
    });
    res.status(200).json({ message: "Reservation created" });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//!!!
module.exports = {
  getAllReservations,
  postNewReservation,
};
