const { Router } = require('express');
const { getAllUsers, postNewUser, signIn, DisableUser, ModifyUser } = require('../controllers/userControllers.js')

const router = Router();

router.get('/', getAllUsers);

router.post('/create', postNewUser)
router.post('/sigin', signIn)

router.put("/disable", DisableUser)
router.put("/modify/:email", ModifyUser)

module.exports = router;