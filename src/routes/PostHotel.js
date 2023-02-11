require("dotenv").config();
const { Router } = require('express');
const {Hotel} = require ("../db")

const router = Router();

router.post("/", async(req, res, next) =>{
    const { name, address, city, description, image, stars, status } = req.body;
    try {
        let hotelCreated = await Hotel.findOrCreate({
            name,
            address,
            city,
            description,
            image,
            stars,
            status
          })
    res.status(201).json('Your hotel was created successfully')
    } catch (error) {
    res.status(400).json("your Hotel was not created successfully")
    }
    
 
})


module.exports = router;

