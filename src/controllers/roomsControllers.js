const { Room, Inventory, Typeofroom, Hotel } = require("../db");
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

  let { name, bed_quantity, description, price, idHotels } = req.body;

  try {

    await Room.create({
      idHotels: idHotels,
      name: name,
      bed_quantity: bed_quantity,
      description: description,
      price: price
    });

    res.send("room created")

  } catch (error) {
    console.log(error)
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
//!--------------

//! Init Cambios @Felipe y @Leo --------------
//!-------------- Delete Room ----------------------

const deleteRoom = async (req, res) => {

  try {
    let { idRooms } = req.params;
    console.log('esto es idRooms: ', idRooms);
    Room.destroy({
      where: {
        idRooms: idRooms
      }
    })
    res.status(201).json({ message: "Room deleted" });
  } catch (err) {
    res.status(401).json({ message: err });
  };

};

//------------------Disable Rooom ------------------------

async function DisableRoom(req, res) {
  try {
    let { idRooms } = req.params;
    const room = await Room.findOne({
      where: {
        idRooms: idRooms
      }
    });
    if (room.status === true) {
      room.update({ status: false });
    } else if (room.status === false) {
      room.update({ status: true });
    }
    res.status(201).json(room);
    //res.send(room);
  } catch (err) {
    res.status(401).json({ message: err });
  };
};

//------------------Modify Rooom ------------------------

async function ModifyRoom(req, res) {
  try {
    let { idRooms } = req.params;
    let { name, bed_quantity, price, description } = req.body;
    const room = await Room.findOne({
      where: {
        idRooms: idRooms
      }
    });
    if (room) {
      room.update({
        name: name,
        bed_quantity: bed_quantity,
        price: price,
        description: description
      });
      res.status(201).json(room);
      //res.send(room);
    } else {

      res.send("Room not found");

    }
  } catch (err) {
    res.status(401).json({ message: err });
  };
};
//! End Cambios @Felipe y @Leo --------------

//!!!!
module.exports = {
  getAllRooms,
  postNewRoom,
  postCreateRoomInventory,
  postReserveRoomInventory,
  deleteRoom,
  DisableRoom,
  ModifyRoom
};
