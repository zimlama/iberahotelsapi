 const{Hotel, Room} = require('../db');
const jsonHotels = require('../data/hotels.json')

//get de hotels

const getAllHotels = async (req, res) =>{
	console.log(jsonHotels)
	try{

		 if(jsonHotels){
		 	return res.status(200).send(jsonHotels)
		 }
		const allHotels = await Hotel.findAll({
			include:{
				model: Room,
				attributes: [],
			}
		})
		res.status(200).send(allHotels)

	}catch(e){
		console.log(e)
	}
}
 module.exports ={
 	getAllHotels
 }