'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Application extends Model {
        static associate(models) {
            Application.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            Application.belongsTo(models.Job, {
                foreignKey: 'jobId',
                as: 'job'
            });
        }
    }

    Application.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Jobs',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'withdrawn'),
            defaultValue: 'pending'
        },
        appliedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Path to uploaded resume file'
        },
        coverLetter: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Application',
        tableName: 'applications',
        timestamps: true
    });

    return Application;
};
