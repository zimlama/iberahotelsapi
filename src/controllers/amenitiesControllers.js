const{Amenities} = require('../db');
const { Op } = require("sequelize");

//! get de Amenities

const getAllAmenities = async (req, res) =>{
	// console.log(jsonHotels)
// 	try{
//         if(jsonAmenitis){
//             const amenitiesAll = jsonAmenitis.forEach(e=>{
//                 Amenities.findOrCreate({
//                     where:{name: e.name,
//                     image: e.image,
//                     status: e.status
//                     }
//                 })
//             })
//             const amenitiesDb = await Amenities.findAll()
//                 return res.status(200).send(amenitiesDb)
//             }
//        }catch(e){
//            console.log(e)
//        }
// }


 

try {
    const allAmenities = await Amenities.findAll({
    })
    console.log(Amenities)
    return res.status(200).send(allAmenities)
} catch (error) {
    console.log(error)
}
};


//! POST de Amenities

const postNewAminities = async (req, res) => {
try {
    let{
		name,
        image,
        status,
	} = req.body

	let amenities = {name,image,status}
	let createAmenities =  await Amenities.findOrCreate({where: amenities})
	res.status(200).json('Your Aminities was created successfully')
} catch (error) {
    res.status(404).json("Your Aminities was not created sucessfully")
    
}

 }



//!!!
 module.exports ={
    getAllAmenities,
    postNewAminities
 }