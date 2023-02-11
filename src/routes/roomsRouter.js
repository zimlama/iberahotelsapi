const {Router} = require('express');
const {getAllRooms,postNewRoom} = require('../controllers/roomsControllers.js');


const router = Router();


router.get('/', getAllRooms);
router.post('/create', postNewRoom)


module.exports = router;