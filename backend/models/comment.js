const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    comment.associate = models => {
        models.Comment.belongsTo(models.User, { 
            foreignKey: { 
              allowNull: false
            }
          }),
          models.Comment.belongsTo(models.Post, { 
            foreignKey: { 
              allowNull: false
            }
          })
    }
    return comment;
};