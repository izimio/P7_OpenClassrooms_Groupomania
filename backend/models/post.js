const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        media: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    post.associate = models => {
        models.Post.belongsTo(models.User, {
            foreignKey: { 
              allowNull: false
            }
          }),
          models.Post.hasMany(models.Comment, {
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            hooks: true
          })
    }
    return post;
};