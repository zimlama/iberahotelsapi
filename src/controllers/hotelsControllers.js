const { Hotel, Room } = require("../db");
const { Op } = require("sequelize");

//!! GET de Hotels / byCity

const getAllHotels = async (req, res) => {
  const city= req.query.city
  try {
    const allHotels = await Hotel.findAll({
      include: [
        {
          model: Room,
          as: "rooms",
          attributes: [
            "name",
            "image",
            "bed_quantity",
            "price",
            "description",
            "availability",
            "status",
          ],
        },
      ],
    });
    if(city){
      let cities = await allHotels.filter(e => e.city.toLowerCase().includes(city.toLowerCase()))
    cities.length?
    res.status(200).json(cities) :
    res.status(404).json("No Hay hoteles en esta ciudad")
  }else{
    res.status(200).json(allHotels)
  }
  } catch (e) {
    res.status(404).json(e.message);
  }
};

//! POST create hotel -------------- byLAMA
const postNewHotel = async (req, res) => {
  let { idHotels, name, address, city, description, image, stars, status } = req.body;
  try {
    await Hotel.findOrCreate({
      where: {
        idHotels,
      },
      defaults: {
        idHotels,
        name,
        address,
        city,
        description,
        image,
        stars,
        status,
      },
    });
    res.status(201).json({ message: "Hotel created" });
  } catch (e) {
    res.status(500).json(e.message);
  }
};
//!-------------- byLAMA

const getHotelById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findOne({
      where: {
        idHotels: id,
      },
      include: [
        {
          model: Room,
          as: "rooms",
          attributes: [
            "idRooms",
            "name",
            "image",
            "bed_quantity",
            "price",
            "description",
            "availability",
            "status",
          ],
        },
      ],
    });
    res.status(200).json(hotel);
  } catch (err) {
    res.status(404).json("No se encontro el hotel");
  }
};



 





module.exports = {
  getAllHotels,
  postNewHotel,
  getHotelById,
  
  
};
