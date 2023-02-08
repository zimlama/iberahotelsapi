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
  let { name, address, city, description, image, stars, status } = req.body;
  try {
    await Hotel.findOrCreate({
      where: {
        name,
      },
      defaults: {
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

//!!!
module.exports = {
  getAllHotels,
  postNewHotel,
};
