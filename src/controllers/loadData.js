const{Hotel, Room, Amenities,User, Services} = require('../db');

const loadhotels = require('../data/hotels.json');
const loadRooms = require('../data/rooms.json');
const loadAmenities = require('../data/amenities.json');
const loadUsers = require('../data/users.json');
const loadServices = require('../data/service.json');

async function loadAllModelsInDB() {
  await Hotel.bulkCreate(loadhotels);
  console.log("Hotels loaded ok to DB");

  
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

}

module.exports = {
    loadAllModelsInDB
  }
