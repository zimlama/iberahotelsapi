const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "room",
    {
      // ID : viene del sistema
      idRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idHotels: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bed_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: ["https://media.admagazine.com/photos/618a60d829327ed3de99d538/3:2/w_3498,h_2332,c_limit/86276.jpg",
          "https://media.admagazine.com/photos/618a60d829327ed3de99d538/3:2/w_3498,h_2332,c_limit/86276.jpg",
          "https://media.admagazine.com/photos/618a60d829327ed3de99d538/3:2/w_3498,h_2332,c_limit/86276.jpg",
          "https://media.admagazine.com/photos/618a60d829327ed3de99d538/3:2/w_3498,h_2332,c_limit/86276.jpg"]
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      availability: {
        type: DataTypes.TEXT,
        // type : DataTypes.ARRAY(DataTypes.DATE),
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    },
    {
      timestamps: false,
    }
  );
};
