const { Router } = require('express');
const getAllHotels = require('./hotelsRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
//prueba git
//pueba 2 
router.use('/hotels', getAllHotels)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
