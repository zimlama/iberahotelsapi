const{Hotel, Room} = require('../db');

const loadhotels = require('../data/hotels.json');
const loadRooms = require('../data/rooms.json');

async function loadAllModelsInDB(){

      await Room.bulkCreate(loadRooms);
  console.log('Rooms loaded ok to DB')

    await Hotel.bulkCreate(loadhotels);
  console.log('Hotels loaded ok to DB')

  // await Room.bulkCreate(loadRooms);
  // console.log('Rooms loaded ok to DB')


}





module.exports = {
    loadAllModelsInDB
  }