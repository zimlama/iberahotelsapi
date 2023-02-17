const { Router } = require("express");
const getAllHotels = require("./hotelsRouter");
const getAllRooms = require("./roomsRouter");
const getAllAmenities = require("./amenitiesRouter");
const getAllUsers = require("./usersRouter");
const getAllServices = require("./ServicesRouter");
const getAllPartners = require("./partnersRouter");
const getAllBills = require("./billsRouter");
const paymentValidation = require("./paymentRouter");
const getAllCities = require("./createIdRouter");
const cors = require('cors');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(cors());
router.use("/hotels", getAllHotels);
router.use("/rooms", getAllRooms);
router.use("/amenities", getAllAmenities);
router.use("/users", getAllUsers);
router.use("/services", getAllServices);
router.use("/partners", getAllPartners);
router.use("/bills", getAllBills);
router.use("/payment", paymentValidation);
router.use("/cities", getAllCities);

router.get("/", (req, res, next) => {
  return res.status(200).json(hoteles);
});

module.exports = router;
