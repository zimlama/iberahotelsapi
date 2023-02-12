require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB
} = process.env;



// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
// la linea 13 se debe dejar en el main para que el railway use la DB de railway 
const sequelize = new Sequelize(`postgresql://postgres:2oNnBI3ZZ2BjWiAMBuhc@containers-us-west-182.railway.app:7595/railway`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { 
      User,
      User_travel,
      About_us,
      Amenities,
      Bills,
      Hotel,
      Partners,
      Room,
      Services,
    } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//relacion entre User y User_travel
User.belongsToMany(User_travel, { through: 'travel_user' });
User_travel.belongsToMany(User, { through: 'travel_user' });
//relacion entre Bills y User_travel
Bills.belongsToMany(User_travel, { through: 'bills_travels' });
User_travel.belongsToMany(Bills, { through: 'bills_travels' });
//relacion entre Services y Room 
Services.belongsToMany(Room, { through: 'room_services' });
Room.belongsToMany(Services, { through: 'room_services' });
//relacion entre Hotel y Room
Hotel.hasMany(Room, { as: "rooms", foreignKey: "idHotels" });
Room.belongsTo(Hotel, { as: "rooms" });
//relacion entre User y Room
User.belongsToMany(Room, { through: 'user_room' });
Room.belongsToMany(User, { through: 'user_room' });
//relacion entre Room y Amenities
Amenities.belongsToMany(Room, { through: 'amenities_room' });
Room.belongsToMany(Amenities, { through: 'amenities_room' });
//relacion entre User y Bills
User.hasMany(Bills);
Bills.belongsTo(User);
//relacion entre User y Partners
User.hasMany(Partners);
Partners.belongsTo(User);
//relacion entre Hotel y About_us
Hotel.hasOne(About_us);
About_us.belongsTo(Hotel);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
