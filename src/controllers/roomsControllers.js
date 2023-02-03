 const{Room} = require('../db');
const jsonRooms = require('../data/rooms.json')

//get de hotels

const getAllRooms = async (req, res) =>{
	// console.log(jsonHotels)
	try{

		if(jsonRooms){
            const roomsAll = jsonRooms.forEach(e=>{
                Room.findOrCreate({
                    where:{name: e.name,
						bed_quantity: e.bed_quantity,
						description: e.description,
                    image: e.image,
					price: e.price,
					availability: e.availability,
                    status: e.status
                    }
                })
            })
            const roomsDb = await Room.findAll()
                return res.status(200).send(roomsDb)
		 	
		 }
	}catch(e){
		console.log(e)
	}
}
 module.exports ={
 	getAllRooms
 }