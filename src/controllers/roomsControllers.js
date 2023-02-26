const { Room, Inventory,  Typeofroom} = require("../db");
const { Op } = require("sequelize");
const { containLettersCheck, containNumbersCheck, onlyNumbersCheck } = require('../helpfuls/regex');

//! GET de Rooms
const getAllRooms = async (req, res) => {
  try {
    const allRooms = await Room.findAll({});
    return res.status(200).send(allRooms);
  } catch (err) {
    res.status(400).json({ error: err});
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
async function postCreateRoomInventory(req, res){
  try{
      let { RoomNumber, idHotels, idTypeofrooms }  = req.body;
      console.log("esto es RoomNumber.length: ", RoomNumber.toString().length)
      if ( RoomNumber.toString().length !== 4){
          return res.status(412).send({ message: "information required" });
      }
      City = idHotels.slice(0,5);
      Hotel = parseInt(idHotels.slice(5));
      let roomInventory = { City, Hotel, RoomNumber, idHotels, idTypeofrooms };
      await Inventory.findOrCreate({
        where: roomInventory,
      });
      return res.status(201).send({ message: "Room was created" });
  } catch(err){
      res.status(500).json({ error: err});
  };
}
//!--------------

//! POST reserve room inventory --------------
async function postReserveRoomInventory(req, res){
  try{
    let { idUser, id, checkin, checkout } = req.body;
    console.log("esto es idUser: ", idUser);
    console.log("esto es idUser: ", id);
    console.log("esto es checkin: ", checkin);
    console.log("esto es checkout: ", checkout);
    return res.status(201).send({ message: idUser, id });
  } catch(err){
    res.status(500).json({ error: error});
  }
}

//!--------------


//!!!!
module.exports = {
  getAllRooms,
  postNewRoom,
  postCreateRoomInventory,
  postReserveRoomInventory
};
