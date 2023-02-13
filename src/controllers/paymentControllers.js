require("dotenv").config();
const {
  ACCESS_TOKEN,
  FRONT_URL_SUCCESS,
  FRONT_URL_PENDING,
  FRONT_URL_FAILED,
  BACK_URL_SUCCESS,
  BACK_URL_FAILED,
  BACK_URL_PENDING,
} = process.env;

const mercadopago = require("mercadopago");
const { postNewBills } = require("./billsControllers");
const { Op } = require("sequelize");

const paymentValidation = async (req, res) => {
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
    notificacion_url: "http://localhost:3010/notification",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response);
      res.json(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Agrega credenciales
mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
});

//!!!
module.exports = {
  paymentValidation,
};
