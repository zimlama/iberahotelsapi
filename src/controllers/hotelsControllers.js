const { Hotel, Room } = require("../db");
const { Op } = require("sequelize");
const cloudinary = require('cloudinary').v2;

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const postNewHotel = async (req, res) => {
  let { idHotels, name, address, city, description, stars } = req.body;
  try {
    if (Array.isArray(req.body.image)) {
      // Si se proporcionó una URL de imagen, subirla a Cloudinary y obtener la URL de la imagen
      const result = await cloudinary.uploader.upload(req.body.image[0], {
        public_id: name, // Asignar el nombre del hotel como public_id
      }); // Subir solo la primera imagen del array
      image = [result.secure_url]; // Guardar la URL de la imagen en un nuevo array
    }

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
        stars,
      },
    });
    res.status(201).json({ message: "Hotel created" });
  } catch (e) {
    console.log(e)
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


//! Init Cambios @Felipe y @Leo --------------
//!-------------- Delete Hotel ----------------------
const deleteHotel = async (req, res) => {
  try {
    let { idHotels } = req.params;
    Hotel.destroy({
      where: {
        idHotels: idHotels
      }
    })

    res.status(201).json({ message: "Hotel delete" });
  } catch (err) {
    res.status(401).json({ error: err });
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

    res.status(201).json(hotel);
    //res.send(hotel);
  } catch (err) {
    res.status(401).json({ error: err });
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

      res.status(201).json(hotel);
      //res.send(hotel);
    } else {
      res.status(404).json({ msg: "hotel not found" });
      //res.send("hotel not found");
    }
  } catch (err) {
    res.status(401).json({ error: err });
  };

};
//! End Cambios @Felipe y @Leo --------------

module.exports = {
  getAllHotels,
  postNewHotel,
  getHotelById,
  deleteHotel,
  DisableHotel,
  ModifyHotel
};

