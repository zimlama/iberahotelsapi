const {Router} = require('express');
 const {postNewBills, getAllBills} = require('../controllers/billsControllers.js');


const router = Router();


router.get('/', getAllBills);
router.post('/create', postNewBills )


module.exports = router;