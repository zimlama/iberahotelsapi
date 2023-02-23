const { Router } = require('express');
const { getAllRooms, postNewRoom, postCreateRoomInventory, postReserveRoomInventory, deleteRoom } = require('../controllers/roomsControllers.js');


const router = Router();


router.get('/', getAllRooms);
router.post('/create', postNewRoom)
router.post('/create/inventory', postCreateRoomInventory)
router.post('/reserve', postReserveRoomInventory)
router.delete("/:idRooms", deleteRoom);


module.exports = router;
