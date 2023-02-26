const {Router} = require('express');
const { getHotels } = require('../controllers/searchControllers');



const router = Router();

router.get('/?city', getHotels);
router.get('/', getHotels);


module.exports = router;