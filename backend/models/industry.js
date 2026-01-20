const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Industry extends Model {
        static associate(models) {
            // Industry is stored as a string field in Job, not a foreign key relationship
            // No association needed
        }
    }

    Industry.init({
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
        modelName: 'Industry',
        tableName: 'industries',
        timestamps: true
    });

    return Industry;
};
