const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('hotel', {
  //ID : Que lo defina el sistema
    idHotels:{
      type: DataTypes.INTEGER,
       allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type : DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull : false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
}; 




