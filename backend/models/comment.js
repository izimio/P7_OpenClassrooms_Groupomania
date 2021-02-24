const {
    Model
  } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return comment;
};