const {Router} = require('express');
 const {getAllHotels} = require('../controllers/hotelsControllers.js');
const jsonHotels = require('../data/hotels.json')

const router = Router();


router.get('/', getAllHotels);

module.exports = router;