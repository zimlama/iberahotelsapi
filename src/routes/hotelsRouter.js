const { Router } = require("express");
const { getAllHotels, postNewHotel, getHotelId} = require("../controllers/hotelsControllers.js");

const router = Router();

router.get("/", getAllHotels);
router.post("/create", postNewHotel);
router.get("/:id", getHotelId);

module.exports = router;