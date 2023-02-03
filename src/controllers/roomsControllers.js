 const{Hotel, Room} = require('../db');
const jsonRooms = require('../data/rooms.json')

//get de hotels

const getAllRooms = async (req, res) =>{
	// console.log(jsonHotels)
	try{

		 if(jsonRooms){
		 	return res.status(200).send(jsonRooms)
		 }

	}catch(e){
		console.log(e)
	}
}
 module.exports ={
 	getAllRooms
 }