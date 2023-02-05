const {Hotel, Room} = require("../db")


const getSearchHotels = async (req, res) =>{
	const { name } = req.query
 try {
    if(name){
        
        let buscarHotelDb = await Hotel.findAll({
            include: {
                model: Room,
                attributes: ['name'],
                through: {attributes: [] }
             },
            where:{
                name:{
                    [Op.iLike]: "%" + name +"%"
                }
            }, 
            order: [
                ["name", "DESC"]
            ],

        })
        let dbtotal  = buscarHotelDb.map((J) => J.toJSON())
     dbtotal.forEach(e => {
        e.rooms = e.rooms.map((x) => x.name).filter(p => p != null).join(', ')
      })
      let TotalDb = dbtotal.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()));
      let TotalDb1 = TotalDb.sort((a, b) => a.name.localeCompare(b.name))
      res.send(TotalDb.length ? TotalDb1 : 'Hotels no found')
    }
 } catch (error) {
    console.log(error)
 }}

 module.exports = {
	getSearchHotels
 }
