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
    user.associate = models => {
        models.User.hasMany(models.Post, { 
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            hooks: true
          }), //Une association entre nos User et nos Post
          models.User.hasMany(models.Comment, { 
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            hooks: true
          })
    }
    return user;
};