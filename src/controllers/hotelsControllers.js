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
    res.status(404).sonj("No se encontro el hotel");
  }
};

//! DELETE Hotel -------------- byLAMA

const deleteHotel = async (req, res) => {

  try {

    let { idHotels } = req.params;

    Hotel.destroy({
      where: {
        idHotels: idHotels
      }
    })

    res.status(200).json({ message: "Hotel deleted" });


  } catch (error) {

    console.log(error);

  };

};


module.exports = {
  getAllHotels,
  postNewHotel,
  getHotelById,
  deleteHotel
};
