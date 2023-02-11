const { Router } = require("express");
const {
  getAllHotels,
  postNewHotel,
  getHotelById,
} = require("../controllers/hotelsControllers.js");

const router = Router();

router.get("/", getAllHotels);
router.post("/create", postNewHotel);
router.get("/:id", getHotelById);

module.exports = router;
