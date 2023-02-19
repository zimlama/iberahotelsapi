const { Hotel, Room } = require("../db");
const { Op } = require("sequelize");

//!! GET de Hotels

const getAllHotels = async (req, res) => {
  
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
    res.status(200).json(allHotels);
  } catch (e) {
    res.status(404).json(e.message);
  }
};

//!! POST de Hotels



const postNewHotel = async (req, res) => {
  let { idHotels, name, address, city, description, image, stars, status } = req.body;
  try {
    await Hotel.findOrCreate({ 
      where: { name },

    defaults: {
      idHotels,
      name,
      address,
      city,
      description,
      image,
      stars,
      status,
    }})

    res.status(201).json({ message: "Hotel created"})
  } catch (e) {
    res.status(500).json(e.message);
    
  }
};

//!!!  GET By ID

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


//!!!! Hotels by city 




  

module.exports = {
  getAllHotels,
  postNewHotel,
  getHotelById,
  getSearchHotels
};
