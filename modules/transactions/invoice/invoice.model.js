const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        contractId: { type: DataTypes.INTEGER, allowNull: false },
        documentTypeId: { type: DataTypes.INTEGER, allowNull: false },
        invoiceNumber: { type: DataTypes.STRING, allowNull: false },
        invoiceDate: { type: DataTypes.DATE, allowNull: false },
        invoiceQuantity: { type: DataTypes.STRING, allowNull: false },
        
        loadPortId: { type: DataTypes.INTEGER, allowNull: false },
        numberOfContainers: { type: DataTypes.INTEGER, allowNull: false },
        loadPortOriginId: { type: DataTypes.INTEGER, allowNull: false },

        averageQuantity: { type: DataTypes.STRING, allowNull: false },
        shippingLineId: { type: DataTypes.INTEGER, allowNull: false },
        
        rate: { type: DataTypes.INTEGER, allowNull: false },
        advance: { type: DataTypes.STRING },
        invoiceValue: { type: DataTypes.STRING, allowNull: false },
        netInvoiceValue: { type: DataTypes.STRING, allowNull: false },

        scrapTypeId: { type: DataTypes.INTEGER, allowNull: false },
        billNumber: { type: DataTypes.STRING, allowNull: false },
        billDate: { type: DataTypes.DATE, allowNull: false },

        estimatedDepartureDate: { type: DataTypes.DATE, allowNull: false },
        estimatedArrivalDate: { type: DataTypes.DATE, allowNull: false },
        psicId: { type: DataTypes.INTEGER, allowNull: false },
        goodsStatusId: { type: DataTypes.INTEGER, allowNull: false },

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
        tableName: 'invoice',
        timestamps: true
    };

    return sequelize.define('invoice', attributes, options);
}