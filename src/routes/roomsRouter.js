const {Router} = require('express');
const {getAllRooms, postNewRoom, deleteRoom, DisableRoom, ModifyRoom, postCreateRoomInventory} = require('../controllers/roomsControllers.js');


const router = Router();


router.get('/', getAllRooms);
router.post('/create', postNewRoom)
router.post('/create/inventory', postCreateRoomInventory)
// router.post('/reserve', postReserveRoomInventory)
router.delete("/delete/:idRooms", deleteRoom);
router.put("/disable/:idRooms", DisableRoom)
router.put("/modify/:idRooms", ModifyRoom)


module.exports = router;
