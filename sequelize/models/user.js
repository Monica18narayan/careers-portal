const { DataTypes } = require('sequelize');
const { sequelize } = require('.')


module.exports = (sequelize) => {
    const Users = sequelize.define('Users', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true // or set allowNull to false if age is always required
        }
    });

    return Users;
};
