const { Router } = require("express");
const {
  getAllHotels,
  postNewHotel,
  getHotelById,
  getSearchHotels,
} = require("../controllers/hotelsControllers.js");



const router = Router();

router.get("/", getAllHotels);
router.get("/", getSearchHotels)
router.post("/create", postNewHotel);
router.get("/:id", getHotelById);
module.exports = router;
