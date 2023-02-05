const {Router} = require('express');
 const {getAllServices} = require('../controllers/servicesControllers.js');


const router = Router();


router.get('/', getAllServices);


module.exports = router;