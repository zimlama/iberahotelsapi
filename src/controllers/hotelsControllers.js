 const{Hotel, Room} = require('../db');
 const { Op } = require("sequelize");



//!! GET de Hotels

const getAllHotels = async (req, res) =>{
	
		 	

	
		try {
			const allHotels = await Hotel.findAll({
				include: {
					model: Room,
					attributes: ['name'],
					through: { attributes: [] }
				}
			})
			res.send(allHotels)
	
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

	let hotel = {name, address, city, description,image,stars,status};
	let createHotel =  await Hotel.create(hotel)
	res.send(createHotel)

 }
 
 //! get Id Detail
 
 const getHotelId = async (req, res, next) => {
   const { id } = req.params;
   try {
	 const hotel = await Hotel.findOne({
	   where: { idHotels: id },
	 });
	 res.send(hotel);
   } catch (error) {
	 next(error);
   }
 };


//!!!
 module.exports ={
	getAllHotels,
	postNewHotel,
	getHotelId
}
