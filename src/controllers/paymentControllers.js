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
          unit_price: newbill.price, //100,
        },
      ],
      back_urls: {
        success: `${BACK_URL_SUCCESS}`,
      },
     auto_return: "approved",
     binary_mode: true,

      //notificacion_url: `http://localhost:${PORT}/notification`,
      notificacion_url: `http://iberahotelsapi-production.up.railway.app/payment/notification`,
    };
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.status(201).json(response);
      })
      .catch(function (error) {
        res.status(500).json({ error: error });
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function paymentNotification(req, res) {
  const {query} = req
  const topic = query.topic || query.type
  let body;
  switch (topic) {
    case "payment":
      const paymentId = query.id || query['data.id']
      const payment = await mercadopago.payment.findById(paymentId)
      body = await mercadopago.merchant_orders.findById(payment.body.order.id)
      
      break;
  
    case "merchant_orders":
      const orderId = query.id
     body = await mercadopago.merchant_orders.findById(orderId)
      break;
  }
  let paidAmount = 0
  body.payments.forEach(payment => {
    if(payment.status === "approved"){
      paidAmount += payment.transaction_amount;
    }
  })
  if(paidAmount >= body.total_amount){
    
    console.log("El pago se completo")

  } else {
    console.log("El pago No se completo")
  }
 res.send()
}


//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});
//!--------------

//!!!
module.exports = {
  paymentValidation,
  paymentNotification
};
