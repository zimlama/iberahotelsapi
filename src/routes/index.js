const { Router } = require('express');
const getAllHotels = require('./hotelsRouter')
const getAllRooms = require('./roomsRouter')
const getAllAmenities = require("./amenitiesRouter")
const getAllUsers = require('./usersRouter')
const getAllServices = require ("./ServicesRouter")







const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/hotels', getAllHotels)
router.use('/rooms', getAllRooms)
router.use('/amenities', getAllAmenities)
router.use('/users', getAllUsers)
router.use("/services", getAllServices)

router.get("/", (req,res,next)=>{
    return res.status(200).json(hoteles)
})

module.exports = router;
