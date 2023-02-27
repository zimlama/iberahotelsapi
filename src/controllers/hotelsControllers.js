const { Hotel, Room } = require("../db");
const { Op } = require("sequelize");

//!! GET de Hotels

//!! GET de Hotels / byCity

const getAllHotels = async (req, res) => {
  const city = req.query.city
  try {
    const allHotels = await Hotel.findAll({
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
    if (city) {
      let cities = await allHotels.filter(e => e.city.toLowerCase().includes(city.toLowerCase()))
      cities.length ?
        res.status(200).json(cities) :
        res.status(404).json("No Hay hoteles en esta ciudad")
    } else {
      res.status(200).json(allHotels)
    }
  } catch (e) {
    res.status(404).json(e.message);
  }
}
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

//!-------------- disable    ------ enable  

async function DisableHotel(req, res) {

  try {

    let { idHotels } = req.params;

    const hotel = await Hotel.findOne({
      where: {
        idHotels: idHotels
      }
    });

    if (hotel.status === true) {
      hotel.update({ status: false });
    } else if (hotel.status === false) {
      hotel.update({ status: true });
    }

    res.send(hotel);

  } catch (error) {

    console.log(error);

  };

};

//!-------------- Mofify Hotel Data --------------------------  

async function ModifyHotel(req, res) {

  try {

    let { idHotels } = req.params;
    let { name, address, city, description, stars } = req.body;

    const hotel = await Hotel.findOne({
      where: {
        idHotels: idHotels
      }
    });

    if (hotel) {

      hotel.update({
        name: name,
        address: address,
        city: city,
        description: description,
        stars: stars
      });

      res.send(hotel);

    } else {

      res.send("hotel not found");

    }

  } catch (error) {

    console.log(error);

  };

};

module.exports = {
  getAllHotels,
  postNewHotel,
  getHotelById,
  deleteHotel,
  DisableHotel,
  ModifyHotel
};


/*

    "name": "Hotel Arrecifes",
    "address": "Ruta Nac N´8 KM 175.5, Arrecifes, Provincia de Buenos Aires, Argentina",
    "city": "arrecifes",
    "description": "Ubicación Excelente en general para turismo, diversión, comidas y transporte",
    "image": ["https://q-xx.bstatic.com/xdata/images/hotel/max500/252909565.jpg?k=0ca82960b06f3591e6746f80fdbef4fa3550073288b2a36ab476891b1b9c221d&o="],
    "stars": 5, 

    */
