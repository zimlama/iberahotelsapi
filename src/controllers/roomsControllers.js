const { Room, Inventory } = require("../db");
const { Op } = require("sequelize");
const { containLettersCheck, containNumbersCheck } = require('../helpfuls/regex');

//! GET de Rooms
const getAllRooms = async (req, res) => {
  try {
    const allRooms = await Room.findAll({});
    //console.log(allRooms)
    return res.status(200).send(allRooms);
  } catch (e) {
    console.log(e);
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
    console.log("esto es: idHotels: ", idHotels);
    res.status(200).json({ message: "Room created" });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//! POST create room inventory --------------
async function postCreateRoomInventory(req, res){
  try{
      let { idRoomInventory } = req.body;
      if ( !containLettersCheck(idRoomInventory) && !containNumbersCheck(idRoomInventory) || idRoomInventory.length !== 11){
          return res.status(412).send({ message: "information required" });
      }
      let roomInventory = { idRoomInventory };
      await Inventory.findOrCreate({where: roomInventory});
      return res.status(201).send({ message: "Room was created" });
  } catch(err){
      res.status(500).json({ error: error});
  };
}
//!--------------

//! POST reserve room inventory --------------
async function postReserveRoomInventory(req, res){
  try{
    let { idUser, checkin, checkout } = req.body;
    console.log("esto es idUser: ", idUser);
    console.log("esto es checkin: ", checkin);
    console.log("esto es checkout: ", checkout);
    return res.status(201).send({ message: idUser });
  } catch(err){
    res.status(500).json({ error: error});
  }
}

//!--------------
//!!!
module.exports = {
  getAllRooms,
  postNewRoom,
  postCreateRoomInventory,
  postReserveRoomInventory,
};
