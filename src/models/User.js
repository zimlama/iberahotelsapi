const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        nationality: {
            type: DataTypes.STRING,
        },
        type_doc: {
            type: DataTypes.STRING,
        },
        identification_doc: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
        },
        date_birth: {
            type: DataTypes.DATEONLY,
        },
        mobile: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM('active', 'disabled'),
            defaultValue: 'active'
        },
        privilige: {
            type: DataTypes.BOOLEAN,
            defaultValue: false // Al crearte como usuario por defecto el privilegio es FALSE
        },
        user_password: {
            type: DataTypes.STRING,
        }
    },
        {
            timestamps: false,
        }
    );
};
