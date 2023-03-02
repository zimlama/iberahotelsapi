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
  let { item, quantity, date, price, userId } = req.body;
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
        userId,
      }
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
        //"https://a3a3-37-178-222-102.eu.ngrok.io/bills/payment/notification",
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
          active: true,
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
    const allBills = await Bills.findAll(
      { include: User }
      );
    res.status(200).send(allBills);
  } catch (e) {
    res.status(404).json(e);
  }
};

//!! Desactiva Bills
// De esta manera, cuando un administrador desactiva una factura, 
//se cambia el valor de la columna active a false en lugar 
//de borrar la factura de la base de datos.
const desactivaBill = async (req, res) => {
  const { id } = req.params;
  try {
    const bill = await Bills.findOne({ where: { id } });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    let active = bill.active
    if(active === true){
    await bill.update({ active: false });
    console.log(`Update the bills id: ${id} `);
    }
    if(active === false ){
      await bill.update({ active: true });
    console.log(`Update the bills id: ${id} `);
    }
    return res.status(204).json({ message: `Update the bills ${id} `});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//!!
const searchBills = async (req, res) => {
  try {
    const { email, status, id_payment } = req.query;
    let where = {};
    if (email) {
      where = {
        ...where,
        '$user.email$': {
          [Op.iLike]: `%${email}%`,
        },
      };
    }
    if (status) {
      where = {
        ...where,
        payment_status: status,
      };
    }
    if (id_payment) {
      where = {
        ...where,
        id_payment,
      };
    }
    const bills = await Bills.findAll({
      where,
      include: {
        model: User,
        as: 'user',
        attributes: ['email', 'first_name', 'last_name'],
      },
    });
    res.json({ bills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//!!!
module.exports = {
  postNewBills,
  getAllBills,
  paymentNotification,
  desactivaBill,
  searchBills
};
