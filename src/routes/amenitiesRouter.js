const {Router} = require('express');
 const {getAllAmenities} = require('../controllers/amenitiesControllers');
const jsonHotels = require('../data/hotels.json')

const router = Router();


router.get('/', getAllAmenities);

module.exports = router;