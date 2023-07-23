const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        vendorId: { type: DataTypes.INTEGER, allowNull: false },
        contractNumber: { type: DataTypes.STRING, allowNull: false },
        contractDate: { type: DataTypes.DATE, allowNull: false },
        poNumber: { type: DataTypes.STRING, allowNull: false },
        poDate: { type: DataTypes.DATE, allowNull: false },
        scrapTypeId: { type: DataTypes.INTEGER, allowNull: false },
        impurity: { type: DataTypes.STRING },
        sourceMasterId: { type: DataTypes.INTEGER, allowNull: false },
        loadPortOriginId: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        tolerance: { type: DataTypes.STRING },
        advance: { type: DataTypes.STRING },
        rate: { type: DataTypes.INTEGER, allowNull: false },
        paymentTermId: { type: DataTypes.INTEGER, allowNull: false },
        contractValue: { type: DataTypes.STRING, allowNull: false },
        contractUnit: { type: DataTypes.STRING, allowNull: false },
        deliveryTermId: { type: DataTypes.INTEGER, allowNull: false },
        dispatchWithinDays: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        remark: { type: DataTypes.STRING },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        createdBy: { type: DataTypes.INTEGER, defaultValue: 1 },
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
            withHash: { attributes: {} }
        },
        tableName: 'contract',
        timestamps: true
    };

    return sequelize.define('contract', attributes, options);
}