const {Router} = require('express');
const {getAllRooms, postNewRoom, postCreateRoomInventory, postReserveRoomInventory} = require('../controllers/roomsControllers.js');


const router = Router();


router.get('/', getAllRooms);
router.post('/create', postNewRoom)
router.post('/create/inventory', postCreateRoomInventory)
router.post('/reserve', postReserveRoomInventory)


module.exports = router;
