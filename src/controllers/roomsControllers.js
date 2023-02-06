 const{Room} = require('../db');
 const { Op } = require("sequelize");


//! GET de Rooms
const getAllRooms = async (req, res) =>{
	
	try{
		const allRooms = await Room.findAll({
		})
                return res.status(200).send(allRooms)		 	
	}catch(e){
		res.status(404).json(e)
	}
}


//! POST de Rooms

 const postNewRoom = async (req, res) => {
	let{
		name, 
		bed_quantity, 
		image,
		description,
		price, 
		availability,
		status
	} = req.body

	let room = {name,bed_quantity,price,description,availability,image,status	}
	let createRoom =  await Room.create(room)
	res.send(createRoom)

 }

 // get Id Detail
 
 const getRoomId = async (req, res, next) => {
   const { id } = req.params;
   try {
	 const room = await Room.findOne({
	   where: { idRooms: id },
	 });
	 res.send(room);
   } catch (error) {
	 next(error);
   }
 };


 
//!!!
 module.exports ={
	getAllRooms,
	postNewRoom,
	getRoomId
 }

