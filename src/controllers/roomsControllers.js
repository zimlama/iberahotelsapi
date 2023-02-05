 const{Room} = require('../db');
 const { Op } = require("sequelize");


//! GET de Rooms
const getAllRooms = async (req, res) =>{
	
	try{
		const allRooms = await Room.findAll({
		})
			//console.log(allRooms)
                return res.status(200).send(allRooms)
		 	
	}catch(e){
		console.log(e)
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

//!!!
 module.exports ={
	getAllRooms,
	postNewRoom,
 }
