const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "inventory",
    {
      //ID : Que lo defina el sistema
      idRoom: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true,
      },
      idUsers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      checkin: {
        type: DataTypes.ARRAY(DataTypes.DATE),
        allowNull: false,
      },
      checkinUNIX: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      checkout: {
        type: DataTypes.ARRAY(DataTypes.DATE),
        allowNull: false,
      },
      checkoutUNIX: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
