const { Bills, User } = require("../db");
const { onlyDateCheck } = require("../helpfuls/regex");
const { Op } = require("sequelize");
require("dotenv").config();
const {
  ACCESS_TOKEN,
  FRONT_URL_SUCCESS,
  FRONT_URL_PENDING,
  FRONT_URL_FAILED,
  BACK_URL_SUCCESS,
  BACK_URL_FAILED,
  BACK_URL_PENDING,
  PORT,
} = process.env;

const mercadopago = require("mercadopago");
//!POST purchase
const postNewBills = async (req, res) => {
  let { item, quantity, date, price, idUser } = req.body;
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
      console.log('esto es bill', bill)
      let newbill = await Bills.create(bill);
      //res.status(200).json(createdBill);
      let preference = {
        items: [
          {
            id: newbill.id,
            title: newbill.item,
            quantity: newbill.quantity,
            unit_price: newbill.price,
            description: "Hotel Iberia",
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://iberahotelsfront-production.up.railway.app",
          failed: "https://iberahotelsfront-production.up.railway.app",
        },
        auto_return: "approved",
        binary_mode: true,
        notification_url:
          "https://iberahotelsapi-production.up.railway.app/bills/payment/notification",
        //"https://ec3b-2800-40-2f-d24-d0d-24ff-9d2d-c5b2.sa.ngrok.io/bills/payment/notification",
      };
      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          res.status(201).send(response.body.init_point);
        })
        .catch(function (error) {
          res.status(500).json({ error: error });
        });
    } catch (error) {
      res.status(404).json("Your Purchase was not created");
    }
  }
};

async function paymentNotification(req, res) {
  const { query } = req;
  const topic = query.topic || query.type;
  //var merchantOrder;
  //var payment;
  switch (topic) {
    case "payment":
      const paymentId = query.id || query["data.id"];
      const payment = await mercadopago.payment.findById(paymentId);
      const idS = payment.body.additional_info.items.map((e) => e.id);
      Bills.update(
        {
          payment_status: payment.body.status,
          date_approved: payment.body.date_approved,
          id_payment: payment.body.id,
          authorization_code: payment.body.authorization_code,
          mp_id_order: payment.body.order.id,
          fee_mp: payment.body.fee_details[0].amount,
        },
        {
          where: { id: idS },
        }
      )
        .then((numRowsAffected) => {
         //console.log(`Se actualizaron ${numRowsAffected} registros`);
        })
        .catch((err) => {
          //console.error("Error al actualizar registros:", err);
        });
  }
  res.send();
}

//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});
//!--------------

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
  paymentNotification,
};
