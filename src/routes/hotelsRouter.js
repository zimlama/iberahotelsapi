const { Router } = require("express");
const {
  getAllHotels,
  postNewHotel,
  getHotelById,
  deleteHotel
} = require("../controllers/hotelsControllers.js");



const router = Router();

router.get("/", getAllHotels);
// router.get("/", getSearchHotels); se comenta para que no haga crash
router.post("/create", postNewHotel);
router.get("/:id", getHotelById);
router.delete("/:idHotels", deleteHotel);

module.exports = router;
