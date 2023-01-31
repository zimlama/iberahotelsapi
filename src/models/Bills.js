const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('bills', {
    // ID : viene del sistema
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity : {
      type : DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull : false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    // Falta Payment y Transaction ID
  });
};