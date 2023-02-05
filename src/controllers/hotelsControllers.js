 const{Hotel, Room} = require('../db');
 const { Op } = require("sequelize");



//!! GET de Hotels

const getAllHotels = async (req, res) =>{
	
	try{
			const rooms = await Room.findAll();			
			const hotels = await Hotel.findAll();

			for (const hotel of hotels) {
  				for (const room of rooms) {
    			 await hotel.addRoom(room);
  				}
			}
			const allHotels = await Hotel.findAll({
 			 include: [{
    		model: Room
  				}]
			});

                return res.status(200).send(allHotels)
		 	
	}catch(e){
		console.log(e)
	}
}
 


 //!! POST de Hotels

 const postNewHotel = async (req, res) => {
	let{
		name, 
		address, 
		city, 
		description,
		image,
		stars,
		status
	} = req.body

	let hotel = {name, address, city, description,image,stars,status	}
	let createHotel =  await Hotel.create(hotel)
	res.send(createHotel)

 }
 


//!!!
 module.exports ={
	getAllHotels,
	postNewHotel,
}