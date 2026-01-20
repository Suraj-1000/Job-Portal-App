'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Job extends Model {
        /**
         * Helper method for defining associations.
         */
        static associate(models) {
            Job.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'category'
            });
        }
    }
    Job.init({
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        companyName: DataTypes.STRING,
        location: DataTypes.STRING,
        salary: DataTypes.STRING,
        type: {
            type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'remote', 'internship'),
            defaultValue: 'full-time'
        },
        status: {
            type: DataTypes.ENUM('active', 'closed', 'draft'),
            defaultValue: 'active'
        },
        categoryId: DataTypes.INTEGER,

        // New Fields
        openings: DataTypes.INTEGER,
        industry: DataTypes.STRING,
        jobLevel: {
            type: DataTypes.ENUM('entry-level', 'mid-level', 'senior-level'),
            defaultValue: 'entry-level'
        },
        education: {
            type: DataTypes.ENUM('see', 'high-school', 'diploma', 'bachelor', 'master', 'phd'),
            defaultValue: 'see'
        },
        experience: DataTypes.STRING,
        expiryDate: DataTypes.DATEONLY,
        skills: DataTypes.TEXT,
        desiredCandidate: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Job',
    });
    return Job;
};
