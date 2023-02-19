const {Hotel, Room} = require("../db")


// const getSearchHotels = async (req, res) =>{
// 	const { name } = req.query.name
//  try {
//     if(name){
//         let buscarHotelDb = await Hotel.findAll({
//             include: {
//                 model: Room,
//                 attributes: ['name'],
//                 through: {attributes: [] }
//              },
//             where:{
//                 name:{
//                     [Op.iLike]: "%" + name +"%"
//                 }
//             }, 
//             order: [
//                 ["name", "DESC"]
//             ],

//         })
//         let dbtotal  = buscarHotelDb.map((J) => J.toJSON())
//      dbtotal.forEach(e => {
//         e.rooms = e.rooms.map((x) => x.name).filter(p => p != null).join(', ')
//       })
//       let TotalDb = dbtotal.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()));
//       let TotalDb1 = TotalDb.sort((a, b) => a.name.localeCompare(b.name))
//       res.send(TotalDb.length ? TotalDb1 : 'Hotels no found')
//     }
//  } catch (error) {
//     console.log(error)
//  }}


 const getSearchHotels = async (req, res) =>{
    const { city } = req.query.city
    let hotelsTotal = await getAllHotels();
    
        if(city){
            let hotelsName = await hotelsTotal.filter(e => e.city.toLowerCase().includes(city.toLowerCase()))
            hotelsName.length ?
            res.status(200).send( hotelsName) :
            res.status(404).send("No existe el Hotel");
        }
        else{
            res.status(200).send(hotelsTotal)
        }
 }











 module.exports = {
	getSearchHotels
 }
