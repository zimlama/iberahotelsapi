const { Router } = require("express");
const {
  postNewBills,
  getAllBills,
  paymentNotification,
} = require("../controllers/billsControllers.js");

const router = Router();

router.get("/", getAllBills);
router.post("/create", postNewBills);
router.post("/payment/notification", paymentNotification);

module.exports = router;
