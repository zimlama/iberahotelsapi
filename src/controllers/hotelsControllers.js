const { Hotel, Room } = require("../db");
const { Op } = require("sequelize");

//!! GET de Hotels

const getAllHotels = async (req, res) => {
  try {
    const allHotels = await Hotel.findAll({
      include: {
        model: Room,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    res.send(allHotels);
  } catch (e) {
    console.log(e);
  }
};

//!! POST de Hotels

const postNewHotel = async (req, res) => {
  try {
    let { name, address, city, description, image, stars, status } = req.body;

    let hotel = { name, address, city, description, image, stars, status };
    let createHotel = await Hotel.findOrCreate({ where: hotel });
    res.status(200).json("Your Hotel was created successfully");
  } catch (error) {
    res.status(404).json("Your Hotel was not created sucessfully");
  }
};

//! get Id Detail

const getHotelId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findOne({
      where: { idHotels: id },
    });
    res.send(hotel);
  } catch (error) {
    next(error);
  }
};

//hola pude!!!

//!!!
module.exports = {
  getAllHotels,
  postNewHotel,
  getHotelId,
};
