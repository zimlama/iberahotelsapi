const { Hotel, Room } = require("../db");
const { Op } = require("sequelize");


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

    cities.length?
    res.status(200).json(cities) :
    res.status(404).json("There are no hotels in this city")
  }else{
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
res.status(404).json({msg: "hotel not found"});
//res.send("hotel not found");
}
} catch (err) {
res.status(401).json({ error: err });
};

};
//! End Cambios @Felipe y @Leo --------------

 





//! End Cambios @Felipe y @Leo --------------


module.exports = {
  getAllHotels,
  postNewHotel,
  getHotelById,
  DisableHotel,
  ModifyHotel,
  deleteHotel,

};
