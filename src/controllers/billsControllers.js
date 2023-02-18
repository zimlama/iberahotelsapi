const { Bills } = require("../db");
const { onlyDateCheck } = require("../helpfuls/regex");
const { Op } = require("sequelize");
//!POST purchase
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
/*const postNewBills = async (req, res) => {
  let { item, quantity, date, price } = req.body;

  try {
    let bill = {
      item,
      quantity,
      date,
      price,
    };
    let findOrCreateBill = await Bills.findOrCreate({ where: bill });

    res.status(200).json("Your Bill was created successfully");
  } catch (error) {
    res.status(404).json("Your Bill was not created sucessfully");
  }
};*/
/*  const purchase = await Bills.create({
      where: {
        item,
        quantity,
        date,
        price,
      },
      defaults: {
        item,
        quantity,
        date,
        price,
      },
    });
    res.status(200).json("Your Purchase was created successfully");
  } catch (error) {
    res.status(404).json("Your Purchase was not created sucessfully");
  }*/
