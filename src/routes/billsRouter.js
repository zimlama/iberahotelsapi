const { Router } = require("express");
const {
  postNewBills,
  getAllBills,
  paymentNotification,
} = require("../controllers/billsControllers.js");

const router = Router();

router.get("/", getAllBills);
//router.get('/search', searchBills)
router.post("/create", postNewBills);
router.post("/payment/notification", paymentNotification);
//router.put('/:id', desactivaBill)

module.exports = router;