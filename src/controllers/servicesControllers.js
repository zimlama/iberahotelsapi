const{Services} = require('../db');
const jsonService = require('../data/service.json')

//! get de Amenities

const getAllServices = async (req, res) =>{
	// console.log(jsonHotels)
	try{
        if(jsonService){
            const serviceAll = jsonService.forEach(e=>{
                Services.findOrCreate({
                    where:{name: e.name,
                        description: e.description,
                        price: e.price,
                    image: e.image,
                    status: e.status
                    }
                })
            })
            const servicesDb = await Services.findAll()
                return res.status(200).send(servicesDb)
            }
       }catch(e){
           console.log(e)
       }
}

module.exports = {
	getAllServices
 }