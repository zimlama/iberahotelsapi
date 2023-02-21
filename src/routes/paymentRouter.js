const { Router } = require("express");
const { paymentValidation,paymentNotification } = require("../controllers/paymentControllers");

const router = Router();

router.get("/", paymentValidation);
router.post("/generar", paymentValidation);
router.post("/notification", paymentNotification)


module.exports = router;
