const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "reservation",
    {
      check_in: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      check_out: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
