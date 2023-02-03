 const{Hotel, Room} = require('../db');
const jsonHotels = require('../data/hotels.json')

//get de hotels

const getAllHotels = async (req, res) =>{
	// console.log(jsonHotels)
	try{

		const allHotels = await Hotel.findAll({
			include:{
				model: Room,
				attributes:[],
				through:{
					attributes: [],
				}
			}
		})
		 if(jsonHotels){
			
            const hotelAll = jsonHotels.forEach(e=>{
                Hotel.findOrCreate({
                    where:{name: e.name,
						address: e.address,
						city: e.city,
						description: e.description,
                    image: e.image,
					stars: e.stars,
                    status: e.status
                    }
                })
            })
            const hotelDb = await Hotel.findAll()
                return res.status(200).send(hotelDb)
		 	
		 }
		 // let allHotels =
		 // 	 await Hotel.findAll({
		 // 		include:{
		 // 		model: Room,
		 // 		attributes:['name'],
		 // 		through:{
		 // 			attributes: [],
		 // 		}
		 // 	}
		 // 	})
		 
		// res.status(200).send(allHotels)

	}catch(e){
		console.log(e)
	}
}
 module.exports ={
 	getAllHotels
 }