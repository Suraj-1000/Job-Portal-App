'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Inquiry extends Model {
        static associate(models) {
            // No associations needed
        }
    }

    Inquiry.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'responded', 'closed'),
            defaultValue: 'pending'
        }
    }, {
        sequelize,
        modelName: 'Inquiry',
        tableName: 'inquiries',
        timestamps: true
    });

    return Inquiry;
};
