const {Router} = require('express');
const {getAllHotels,postNewHotel} = require('../controllers/hotelsControllers.js');


const router = Router();


router.get('/', getAllHotels);
router.post('/create', postNewHotel)

module.exports = router;