// const { query } = require("express");
const { Inventory, Hotel } = require("../db");
const { Op } = require('sequelize');
const diacritics = require('diacritics');
//! GET getSearchHotels user --------------
async function getHotels(req, res){
    try{
        const citySearch = diacritics.remove(req.query.city).toLowerCase();
        if(citySearch){
            //! filtar los hoteles que hay en la ciudad(tabla Hotel) --------------
            const inventoryCity = await Hotel.findAll({
                where: {
                    city: {
                        [Op.like]: '%' + citySearch + '%'
                    }
                }
            });
            //! limpiar array del get realizado a sequelize (cleanResults)
            const inventoryCityClean = inventoryCity.map(result => result.get({ plain: true }));
            //!--------------
            //! filtar cantidad de habitaciones disponibles(tabla Inventory) --------------
            const hotelList =inventoryCity.map(el => el.idHotels);
            const sumHotelRooms = await Inventory.findAll({
                attributes: ['idHotels', 'idTypeofrooms', [Inventory.sequelize.fn('SUM', Inventory.sequelize.col('idTypeofrooms')), 'total']],
                where: {
                  idHotels: {
                    [Op.in]: hotelList
                  },
                  checkIN: {
                    [Op.eq]: []
                  }
                },
                group: ['idTypeofrooms', 'idHotels']
            });
            //! limpiar array del get realizado a sequelize (cleanResults)
            const sumHotelRoomsClean = sumHotelRooms.map(result => result.get({ plain: true }));
            //!--------------
            //! unir la informacion de (tabla Inventory y Hotel) --------------
            const mergedHotels = inventoryCityClean.map(hotel => {
                const inventoryItem = sumHotelRoomsClean.find(item => item.idHotels === hotel.idHotels);
                return { ...hotel, ...inventoryItem };
            });  
            console.log('esto en if city: ', mergedHotels);
            res.status(201).json(mergedHotels);
            //!--------------
            // const inventoryCity = await Inventory.findAll({
            //     include: {
            //       model: Hotels,
            //       where: {
            //         city: {
            //             [Op.like]: '%' + citySearch + '%'
            //         }
            //       }
            //     }
            // });
            // res.status(201).json(inventoryCity); 
        } else if(!citySearch){
            const inventoryAllcities = await Inventory.findAll({});
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
