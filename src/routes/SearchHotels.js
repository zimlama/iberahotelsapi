const {Router} = require('express');
const {getSearchHotels} = require('../controllers/searchControllers.js');


const router = Router();


router.get('/', getSearchHotels);
