const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "inventory",
    {
      //ID : Que lo defina el sistema
      idRoomInventory: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true,
      },
      idUsers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      checkin: {
        type: DataTypes.ARRAY(DataTypes.DATE),
      },
      checkinMicrosoft: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      checkout: {
        type: DataTypes.ARRAY(DataTypes.DATE),
      },
      checkoutMicrosoft: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      timestamps: false,
    }
  );
};
