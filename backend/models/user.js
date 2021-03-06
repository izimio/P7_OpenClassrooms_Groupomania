const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
    user.associate = models => {
        models.User.hasMany(models.Post, { 
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            hooks: true
          }), //associationg users and posts
          models.User.hasMany(models.Comment, { 
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            hooks: true
          })
    }
    return user;
};