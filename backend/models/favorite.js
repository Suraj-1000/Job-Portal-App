'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        static associate(models) {
            Favorite.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            Favorite.belongsTo(models.Job, {
                foreignKey: 'jobId',
                as: 'job'
            });
        }
    }

    Favorite.init({
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
        }
    }, {
        sequelize,
        modelName: 'Favorite',
        tableName: 'favorites',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'jobId']
            }
        ]
    });

    return Favorite;
};
