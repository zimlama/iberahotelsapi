const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "inventory",
    {
      //ID : Que lo defina el sistema
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idRoomInventory: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      idUsers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      checkin: {
        type: DataTypes.ARRAY(DataTypes.DATE),
      },
      checkinUNIX: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      checkout: {
        type: DataTypes.ARRAY(DataTypes.DATE),
      },
      checkoutUNIX: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      timestamps: false,
    }
  );
};
