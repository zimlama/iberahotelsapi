const { Router } = require("express");
const {
  getAllHotels,
  postNewHotel,
  getHotelById,
  DisableHotel,
  deleteHotel,
  ModifyHotel,
} = require("../controllers/hotelsControllers.js");



const router = Router();

router.get("/", getAllHotels);

// router.get("/", getSearchHotels); se comenta para que no haga crash
router.delete("/delete/:idHotels", deleteHotel);
router.post("/create", postNewHotel);
router.get("/:id", getHotelById);
router.put("/disable/:idHotels", DisableHotel);
router.put("/modify/:idHotels", ModifyHotel);


module.exports = router;
