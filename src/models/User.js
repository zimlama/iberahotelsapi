const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    // ID : viene del sistema
    first_name : {
        type :  DataTypes.STRING,
        allowNull: false
    },
    last_name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality:{
        type: DataTypes.STRING,
        allowNull: false
    },
    type_doc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    identification_doc:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_birth : {
        type: DataTypes.DATE,
        allowNull: false
    },
    mobile : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image : {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'disabled'),
        allowNull: false,
        defaultValue: 'active'
    },
    privilige: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Al crearte como usuario por defecto el privilegio es FALSE
    },
    
  });
};

