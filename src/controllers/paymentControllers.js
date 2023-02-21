require("dotenv").config();
const { Bills } = require("../db");
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
const { postNewBills } = require("./billsControllers");
const { Op } = require("sequelize");

//! POST /payment/generar --------------
// hacer falta validar los elemento del carrito
// hace falta conectar a la DB para realizar el get(sacar los items y precios) para generar la compra
// adicionar los metodos de pago, cuotas, descripcion
// esta es la forma de realizar la consulta
// {
//   "item": "Mi producto",
//   "quantity": 1,
//   "price":  1000
// }
//adry estuvo aqui
async function paymentValidation(req, res) {
  try {
    const newbill = req.body;
    //console.log("aca esta :", newbill.id);
    let preference = {
      items: [
        // aca hay que colocar los datos que deben venir por un body
        {
          id: newbill.id, //falta probar el tema del id, deberia venir desde bill
          title: newbill.item, //"Mi producto",
          quantity: newbill.quantity, //1,
          unit_price: newbill.price,
          description: "Hotel Iberia",
          currency_id: "ARS",
          //  picture_url: "https://images.pexels.com/photos/5965986/pexels-photo-5965986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" //100,
        },
      ],
      back_urls: {
        success: "https://google.com/",
      },
      auto_return: "approved",
      binary_mode: true,

      //notificacion_url: `http://localhost:${PORT}/notification`,
      notification_url:
        "https://iberahotelsapi-production.up.railway.app/payment/notification",
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
    res.status(500).json({ error: error });
  }
}

//Notificacion de pago de mercadopago, para guardar en la base de datos

async function paymentNotification(req, res) {
  const {query} = req
  // relaizando pureba de req
  console.log("esto es req: ", req);
  const topic = query.topic || query.type
  switch (topic) {
    case "payment":
      const paymentId = query.id || query["data.id"];
      const payment = await mercadopago.payment.findById(paymentId);
      var { body } = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );

      break;

    case "merchant_orders":
      const orderId = query.id;
      var { body } = await mercadopago.merchant_orders.findById(orderId);
      break;
  }
  var paidAmount = 0;
  body.payments.forEach((payment) => {
    if (payment.status === "approved") {
      paidAmount += payment.transaction_amount;
    }
  });
  if (paidAmount >= body.total_amount) {
    console.log(body.items);
    console.log("El pago se completó");
    /*body.items.forEach(item => {
      Bills.create({
        title: item.title,
        quantity: item.quantity,
         date: item.date_created,
        price: item.unit_price,
      })
        .then(bill => {
          console.log("Item guardado en la base de datos:", bill.toJSON());
        })
        .catch(error => {
          console.error("Error al guardar el item en la base de datos:", error);
        });
    });*/
  } else {
    console.log("El pago No se completo");
  }
  res.send();
}

//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});
//!--------------

//!!!
module.exports = {
  paymentValidation,
  paymentNotification,
};
