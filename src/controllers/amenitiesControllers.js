const{Amenities} = require('../db');
const jsonAmenitis = require('../data/amenities.json')

//! get de Amenities

const getAllAmenities = async (req, res) =>{
	// console.log(jsonHotels)
	try{
        if(jsonAmenitis){
            const amenitiesAll = jsonAmenitis.forEach(e=>{
                Amenities.findOrCreate({
                    where:{name: e.name,
                    image: e.image,
                    status: e.status
                    }
                })
            })
            const amenitiesDb = await Amenities.findAll()
                return res.status(200).send(amenitiesDb)
            }
       }catch(e){
           console.log(e)
       }
}



//! POST de Amenities

const postNewAminities = async (req, res) => {
	let{
		name,
        image,
        status,
	} = req.body

	let amenities = {name,image,status}
	let createAmenities =  await Amenities.create(amenities)
	res.send(createUser)

 }



//!!!
 module.exports ={
    getAllAmenities,
    postNewAminities
 }