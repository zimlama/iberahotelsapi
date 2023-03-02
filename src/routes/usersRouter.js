const { Router } = require("express");
const {getAllUsers,postNewUser, DisableUser, ModifyUser } = require('../controllers/userControllers.js')

const router = Router();

router.get('/', getAllUsers);
router.post('/create', postNewUser)
router.put("/disable", DisableUser)
router.put("/modify/:email", ModifyUser)


module.exports = router;