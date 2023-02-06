const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "partners",
    {
      // ID : viene del sistema
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_doc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identification_doc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.BIGINT, // LE PUSE BIGINT porque de esa forma almacena mas numeros
      },
    },
    {
      timestamps: false,
    }
      );
    };
    
