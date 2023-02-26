const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "inventory",
    {
      //ID : Que lo defina el sistema
      City: {
        type: DataTypes.STRING,
      },
      Hotel: {
        type: DataTypes.INTEGER,
      },
      RoomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idHotels: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idTypeofrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      checkIN: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      checkOUT: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    }
  );
};
