const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class JobTitle extends Model {
        static associate(models) {
            // JobTitle is stored as a string field in Job, not a foreign key relationship
            // No association needed
        }
    }

    JobTitle.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'JobTitle',
        tableName: 'job_titles',
        timestamps: true
    });

    return JobTitle;
};
