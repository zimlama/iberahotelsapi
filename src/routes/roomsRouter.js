const {Router} = require('express');
const {getAllRooms} = require('../controllers/roomsControllers.js');


const router = Router();


router.get('/', getAllRooms);

module.exports = router;