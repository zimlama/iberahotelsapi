const { Router } = require("express");
const {
  postNewBills,
  getAllBills,
  paymentNotification,
  desactivaBill, 
  searchBills
} = require("../controllers/billsControllers.js");

const router = Router();

router.get("/", getAllBills);
router.post("/create", postNewBills);
router.post("/payment/notification", paymentNotification);
router.put('/:id', desactivaBill)
router.get('/search', searchBills)

module.exports = router;
