'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true }
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('user', 'staff', 'admin', 'superadmin'),
      defaultValue: 'user'
    },
    phone: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Others')
    },
    dateOfBirth: DataTypes.DATEONLY,
    image: DataTypes.STRING,
    lastLogin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};