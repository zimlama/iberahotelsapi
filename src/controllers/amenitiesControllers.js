const{Amenities} = require('../db');
const jsonAmenitis = require('../data/amenities.json')

//get de Amenities

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
 module.exports ={
    getAllAmenities
 }