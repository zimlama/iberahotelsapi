const {Router} = require('express');
const {getAllUsers,postNewUser } = require('../controllers/userControllers.js')

const router = Router();

router.get('/', getAllUsers);
router.post('/create', postNewUser)


module.exports = router;