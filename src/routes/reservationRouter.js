const { Router } = require("express");
const {
  getAllReservations,
  postNewReservation,
} = require("../controllers/reservationsController");

const router = Router();

router.get("/", getAllReservations)
router.post("/reserve", postNewReservation);

module.exports = router;



