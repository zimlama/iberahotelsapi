const {Router} = require('express');
 const {getAllAmenities,postNewAminities} = require('../controllers/amenitiesControllers');


const router = Router();


router.get('/', getAllAmenities);
router.post('/create',postNewAminities)

module.exports = router;