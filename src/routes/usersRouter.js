const {Router} = require('express');
const {getAllUsers,postNewUser, signIn } = require('../controllers/userControllers.js')

const router = Router();

router.get('/', getAllUsers);
router.post('/create', postNewUser)

router.post('/sigin', signIn)


module.exports = router;