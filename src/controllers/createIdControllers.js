// Crear los ID basados el local code de la ONU
const { Unlocode } = require("../db");

async function getCities(req, res){
  try {
    const allCities = await Unlocode.findAll({
    attributes: ['id', 'Name', 'NameWoDiacritics']
    });
    return res.status(200).send(allCities);
  } catch(err){
    res.status(400).json({ error: error});
  }
}

// async function postHotelID(req, res){}
// async function roomlID(){}

module.exports = {
    getCities,
};