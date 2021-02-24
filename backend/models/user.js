const {
    Model
  } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return user;
};