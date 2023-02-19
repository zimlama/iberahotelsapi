const { Bills, User } = require("../db");
const { onlyDateCheck } = require("../helpfuls/regex");
const { Op } = require("sequelize");
//!POST purchase
const postNewBills = async (req, res) => {
  let { item, quantity, date, price, idUser } = req.body;
  console.log("aca esta el body:", req.body);
  let check = onlyDateCheck(date); // ver si validamos el id usuaruio
  if (!item || !quantity || !date || !price || check !== true) {
    return res.status(412).send({ message: "informacion incompleta" });
  } else {
    try {
      let bill = {
        item,
        quantity,
        date,
        price,
        idUser,
      };
      console.log("aca esta el bill:", bill);
      let CreateBill = await Bills.findOrCreate({
        where: bill,
      });
      res.status(200).json("Your Purchase was created successfully");
    } catch (error) {
      res.status(404).json("Your Purchase was not created");
    }
  }
};

//!GET purchase
const getAllBills = async (req, res) => {
  try {
    const allBills = await Bills.findAll({});
    res.status(200).send(allBills);
  } catch (e) {
    res.status(404).json(e);
  }
};

//!!!
module.exports = {
  postNewBills,
  getAllBills,
};

/*ESTE FUNCIONA!!!
const postNewBills = async (req, res) => {
  let { item, quantity, date, price } = req.body;
  let check = onlyDateCheck(date);
  if (!item || !quantity || !date || !price || check !== true) {
    return res.status(412).send({ message: "informacion incompleta" });
  } else {
    try {
      let bill = {
        item,
        quantity,
        date,
        price,
      };
      let CreateBill = await Bills.findOrCreate({
        where: bill,
      });
      res.status(200).json("Your Purchase was created successfully");
    } catch (error) {
      res.status(404).json("Your Purchase was not created");
    }
  }
};*/
