const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "unlocode",
    {
      // ID : viene del sistema
      Change: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NameWoDiacritics: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Subdivision: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Function: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      IATA: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      IATA: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Coordinates: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Remarks: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
      );
    };
    
