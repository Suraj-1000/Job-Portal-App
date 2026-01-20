'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otp.init({
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    otp: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('login', 'forgot-password', 'signup')
    },
    expiresAt: DataTypes.DATE,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};