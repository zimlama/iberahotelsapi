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

async function paymentValidation(req, res){
  try{
    const newbill = req.body;
    let preference = {
      items: [
        // aca hay que colocar los datos que deben venir por un body
        {
          id: 123, //falta probar el tema del id, deberia venir desde bill
          title: newbill.item, //"Mi producto",
          quantity: newbill.quantity, //1,
          unit_price: newbill.price, //100,
        },
      ],
      back_urls: {
        success: `${BACK_URL_SUCCESS}`,
      },
      notificacion_url: `http://localhost:${PORT}/notification`,
    };
    mercadopago.preferences.create(preference)
    .then(function (response) {
      res.status(201).json(response);
    })
    .catch(function (error) {
      res.status(500).json({ error: error});
    });
  } catch(error){
    res.status(500).json({ error: error});
  }
};
//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});
//!--------------

//!!!
module.exports = {
  paymentValidation,
};
