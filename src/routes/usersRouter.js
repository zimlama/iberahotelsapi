const { Router } = require('express');
const { getAllUsers, postNewUser, signIn, DisableUser } = require('../controllers/userControllers.js')

const router = Router();

router.get('/', getAllUsers);
router.post('/create', postNewUser)

router.post('/sigin', signIn)

router.put("/disable", DisableUser)

module.exports = router;