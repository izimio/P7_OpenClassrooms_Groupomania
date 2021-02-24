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
            default: 0
        }
    });
    return user;
};