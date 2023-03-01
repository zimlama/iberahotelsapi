
// const { query } = require("express");
const { Cat_hotel_info, Cat_room_type,  Cat_room_inventory } = require("../db");
const { Op } = require('sequelize');
const diacritics = require('diacritics');
//! GET getSearchHotels user --------------
async function getHotels(req, res){
    try{
        const citySearch = req.query.city;
        if(citySearch){
            const cityDiacritics = diacritics.remove(citySearch).toLowerCase();
            const inventoryCity = await Cat_hotel_info.findAll({
                include: [
                  {
                    model: Cat_room_inventory,
                    include: [
                      { model: Cat_room_type }
                    ],
                    where: {
                      room_check_in: {
                        [Op.eq]: []
                      }
                    }
                  }
                ],
                where: {
                  city: {
                    [Op.like]: '%' + cityDiacritics + '%'
                  },
                }
            });
            res.status(201).json(inventoryCity); 
        } else{
            console.log('esto es search/ ');
            const inventoryAllcities = await Cat_hotel_info.findAll({
                include: [
                    {
                        model: Cat_room_inventory,
                        include: [
                            { model: Cat_room_type }
                        ],
                        where: {
                            room_check_in: {
                                [Op.eq]: []
                            }
                        }
                    }
                ]
            });
            res.status(201).json(inventoryAllcities);
        }
        
        
    } catch(err){
        res.status(401).json({ error: err})

    }
}
//!--------------
 module.exports = {
	getHotels
 }
