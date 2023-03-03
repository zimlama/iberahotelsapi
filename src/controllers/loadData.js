const{ Hotel, Room, Amenities,User, Services, Unlocode, Cat_hotel_info, Cat_room_inventory, Cat_room_type } = require('../db');

const loadhotels = require('../data/hotels.json');
const loadRooms = require('../data/rooms.json');
const loadAmenities = require('../data/amenities.json');
const loadUsers = require('../data/users.json');
const loadServices = require('../data/service.json');
const loadUnlocode = require('../data/unlocode.json');
//! search and reservation with cat_inventory -------------
const loadCat_hotel_info = require('../data/cat_hotel_info.json');
const loadCat_room_inventory = require('../data/cat_room_inventory.json');
const loadCat_room_type = require('../data/cat_room_type.json');
//!-------------


async function loadAllModelsInDB(){
  try{
    await Room.bulkCreate(loadRooms);
    console.log('Rooms loaded ok to DB')
    await Hotel.bulkCreate(loadhotels);
    console.log('Hotels loaded ok to DB')
    await Amenities.bulkCreate(loadAmenities);
    console.log('Amenities loaded ok to DB')
    await User.bulkCreate(loadUsers);
    console.log('Users loaded ok to DB')
    await Services.bulkCreate(loadServices);
    console.log('Services loaded ok to DB')
    await Unlocode.bulkCreate(loadUnlocode);
    console.log('Cities local code  loaded ok to DB');
    //! search and reservation with cat_inventory -------------
    await Cat_hotel_info.bulkCreate(loadCat_hotel_info);
    console.log('cat_hotel_info loaded ok to DB')
    await Cat_room_type.bulkCreate(loadCat_room_type);
    console.log('cat_room_type loaded ok to DB');
    await Cat_room_inventory.bulkCreate(loadCat_room_inventory);
    console.log('cat_inventory loaded ok to DB');
    
    //!--------------

  } catch(error){
    console.log(error);
  }
  

}

module.exports = {
    loadAllModelsInDB
  }
