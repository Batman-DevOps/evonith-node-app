const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        remark: { type: DataTypes.STRING },
        // created_by: { type: DataTypes.INTEGER, allowNull: false },
        // created_at: { type: DataTypes.DATE, allowNull: false },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        createdBy: { type: DataTypes.INTEGER, defaultValue: 1 },
        // updated_by: { type: DataTypes.INTEGER, allowNull: true },
        // updated_at: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updatedBy: { type: DataTypes.INTEGER, defaultValue: 1 },
        isActive: { type: DataTypes.INTEGER, defaultValue: 1 }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        },
        tableName: 'shipping_line'
    };

    return sequelize.define('shipping_line', attributes, options);
}