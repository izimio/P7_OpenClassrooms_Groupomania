
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
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        media: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return post;
};