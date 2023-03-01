const {Router} = require('express');
const {getAllUsers,postNewUser, DisableUser, ModifyUser } = require('../controllers/userControllers.js')


const router = Router();

router.get('/', getAllUsers);

router.put("/disable", DisableUser)
router.put("/modify/:email", ModifyUser)
router.put("/disable", DisableUser)
router.put("/modify/:email", ModifyUser)

module.exports = router;
