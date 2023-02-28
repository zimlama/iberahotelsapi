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


//!------------------Modify Rooom ------------------------

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

      res.send(room);

    } else {

      res.send("Room not found");

    }

  } catch (error) {

    console.log(error);

  };

};

//!------------------Disable Rooom ------------------------

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

    res.send(room);

  } catch (error) {

    console.log(error);

  };

};

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


//!--------------

// const getRoomById = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const rooms = await Room.findOne({
//       where: {
//         idHotels: id,
//       },
//       // include: [
//       //   {
//       //     model: Room,
//       //     as: "rooms",
//       //     attributes: [
//       //       "idRooms",
//       //       "name",
//       //       "image",
//       //       "bed_quantity",
//       //       "price",
//       //       "description",
//       //       "availability",
//       //       "status",
//       //     ],
//       //   },
//       // ],
//     });
//     res.status(200).json(rooms);
//   } catch (err) {
//     res.status(404).json("No se encontro el room");
//   }
// };

//!!!!
module.exports = {
  getAllRooms,
  postNewRoom,
  postCreateRoomInventory,
  postReserveRoomInventory,
  ModifyRoom,
  DisableRoom,
  deleteRoom
};
