const {Router} = require('express');
 const {postNewPartners, getAllPartners} = require('../controllers/partnersControllers.js');


const router = Router();


router.get('/', getAllPartners);
router.post('/create', postNewPartners )

module.exports = router;