const axios = require("axios");
require("dotenv").config();
const { Services } = require("../db");
const jsonServices = require("../data/service.json");

//! get de Services

const getAllServices = async (req, res, next) => {
  try {
    if (jsonServices) {
      const servicesAll = jsonServices.forEach((e) => {
        Services.findOrCreate({
          where: {
            name: e.name,
            description: e.description,
            price: e.price,
            image: e.image,
            status: e.status,
          },
        });
      });
      const servicesDb = await Services.findAll();
      return res.status(200).send(servicesDb);
    }
  } catch (error) {
    next(error);
  }
};

//! POST de Services

const postNewServices = async (req, res, next) => {
  const { name, description, price, image, status } = req.body;
  console.log("aca esta el body: ", req.body);
  if (!name || !description || !price || !image || !status) {
    return res.status(412).send({ message: "informacion incompleta" });
  }
  try {
    await Services.findOrCreate({
      where: {
        name,
        description,
        price,
        image,
        status,
      },
      defaults: {
        name,
        description,
        price,
        image,
        status,
      },
    });
    res.status(201).json({ message: "Servicio creado" });
  } catch (err) {
    next(err);
  }
};
//!!!
module.exports = {
  getAllServices,
  postNewServices,
};