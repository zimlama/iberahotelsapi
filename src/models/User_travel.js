const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user_travel', {
    // ID : viene del sistema
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_check_in : {
      type : DataTypes.DATE,
      allowNull: false
    },
    date_check_out: {
      type: DataTypes.DATE,
      allowNull : false
    },
  });
};