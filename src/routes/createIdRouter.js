const {Router} = require('express');
const {getCities} = require('../controllers/createIdControllers');

const router = Router();

router.get('/', getCities);


module.exports = router;