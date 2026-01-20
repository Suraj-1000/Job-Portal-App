const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Location extends Model {
        static associate(models) {
            // Location is stored as a string field in Job, not a foreign key relationship
            // No association needed
        }
    }

    Location.init({
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
        modelName: 'Location',
        tableName: 'locations',
        timestamps: true
    });

    return Location;
};
