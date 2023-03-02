const { Router } = require('express');
const { getAllRooms, postNewRoom, deleteRoom, DisableRoom, ModifyRoom, postCreateRoomInventory } = require('../controllers/roomsControllers.js');

const router = Router();

router.get('/', getAllRooms);
router.post('/create/newRoom', postNewRoom)
router.post('/create/inventory', postCreateRoomInventory)
router.delete("/delete/:idRooms", deleteRoom);
router.put("/disable/:idRooms", DisableRoom)
router.put("/modify/:idRooms", ModifyRoom)
// router.post('/reserve', postReserveRoomInventory)

module.exports = router;

