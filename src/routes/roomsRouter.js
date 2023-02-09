const {Router} = require('express');
const {getAllRooms,postNewRoom,getRoomId} = require('../controllers/roomsControllers.js');


const router = Router();


router.get("/", getAllRooms);
router.post("/create", postNewRoom);
router.get("/:id", getRoomId);



module.exports = router;

;



