const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cat_room_inventory",
    {
      city: {
        type: DataTypes.STRING,
      },
      hotel: {
        type: DataTypes.INTEGER,
      },
      room_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hotel_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cat_room_type_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      room_check_in: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      room_check_out: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }
  );
};
