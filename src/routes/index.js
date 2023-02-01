const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  hoteles = require("../../db_temp/hotel")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req,res,next)=>{
    return res.status(200).json(hoteles)
})

module.exports = router;
