const{Hotel, Room, Amenities,User, Services, Unlocode} = require('../db');

const loadhotels = require('../data/hotels.json');
const loadRooms = require('../data/rooms.json');
const loadAmenities = require('../data/amenities.json');
const loadUsers = require('../data/users.json');
const loadServices = require('../data/service.json');
const loadUnlocode = require('../data/unlocode.json');

async function loadAllModelsInDB(){
  try{
    await Hotel.bulkCreate(loadhotels);
    console.log('Hotels loaded ok to DB')
    await Room.bulkCreate(loadRooms);
    console.log('Rooms loaded ok to DB')
    await Amenities.bulkCreate(loadAmenities);
    console.log('Amenities loaded ok to DB')
    await User.bulkCreate(loadUsers);
    console.log('Users loaded ok to DB')
    await Services.bulkCreate(loadServices);
    console.log('Services loaded ok to DB')
    await Unlocode.bulkCreate(loadUnlocode);
    console.log('Cities local code  loaded ok to DB')
  } catch(error){
    console.log(error);
  }
  

}

module.exports = {
    loadAllModelsInDB
  }
