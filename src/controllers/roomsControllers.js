const { Room, Inventory, Typeofroom } = require("../db");
const { Op } = require("sequelize");
const { containLettersCheck, containNumbersCheck, onlyNumbersCheck } = require('../helpfuls/regex');

//! GET de Rooms
const getAllRooms = async (req, res) => {
  try {
    const allRooms = await Room.findAll({});
    return res.status(200).send(allRooms);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

//! POST de Rooms
const postNewRoom = async (req, res) => {
  let {
    idHotels,
    name,
    bed_quantity,
    image,
    description,
    price,
    availability,
    status,
  } = req.body;
  try {
    await Room.create({
      idHotels,
      name,
      bed_quantity,
      image,
      description,
      price,
      availability,
      status,
    });
    res.status(200).json({ message: "Room created" });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//! POST create room inventory --------------
async function postCreateRoomInventory(req, res) {
  try {
    let { idRoomInventory, id } = req.body;
    if (!containLettersCheck(idRoomInventory) && !containNumbersCheck(idRoomInventory) || idRoomInventory.length !== 11) {
      return res.status(412).send({ message: "information required" });
    }
    let roomInventory = { idRoomInventory, id };
    await Inventory.findOrCreate({
      where: roomInventory,
    });
    return res.status(201).send({ message: "Room was created" });
  } catch (err) {
    res.status(500).json({ error: err });
  };
}
//!--------------

//! POST reserve room inventory --------------
async function postReserveRoomInventory(req, res) {
  try {
    let { idUser, id, checkin, checkout } = req.body;
    console.log("esto es idUser: ", idUser);
    console.log("esto es idUser: ", id);
    console.log("esto es checkin: ", checkin);
    console.log("esto es checkout: ", checkout);
    return res.status(201).send({ message: idUser, id });
  } catch (err) {
    res.status(500).json({ error: error });
  }
}

//!-------------- Delete Room ----------------------

const deleteRoom = async (req, res) => {

  try {

    let { idRooms } = req.params;

    Room.destroy({
      where: {
        idRooms: idRooms
      }
    })

    res.status(200).json({ message: "Room deleted" });


  } catch (error) {

    console.log(error);

  };

};


//!!!!
module.exports = {
  getAllRooms,
  postNewRoom,
  postCreateRoomInventory,
  postReserveRoomInventory,
  deleteRoom
};
