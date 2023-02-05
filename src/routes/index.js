const { Router } = require("express");
const getAllHotels = require("./hotelsRouter");
const getAllRooms = require("./roomsRouter");
const getAllAmenities = require("./amenitiesRouter");
const getAllUsers = require("./usersRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const hoteles = require("../../db_temp/hotel");
const getSearchHotels = require("./SearchHotels");
const getAllServices = require("./servicesRouter");

const router = Router();

router.use("/hotels", getAllHotels);
router.use("/rooms", getAllRooms);
router.use("/amenities", getAllAmenities);
router.use("/users", getAllUsers);
router.use("/hotels", getSearchHotels);
router.use("/services", getAllServices);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req, res, next) => {
  return res.status(200).json(hoteles);
});

module.exports = router;
