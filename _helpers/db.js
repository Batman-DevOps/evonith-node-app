const tedious = require('tedious');
const { Sequelize } = require('sequelize');

const { dbName, dbConfig } = require('../config/config.json');

module.exports = db = {};

initialize();

async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    // create db if it doesn't already exist
    await ensureDbExists(dbName);

    // connect to db
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    // init models and add them to the exported db object
    // Master tables
    db.ShippingLine = require('../modules/masters/shipping-line/shipping-line.model')(sequelize);
    db.LoadPort = require('../modules/masters/load-port/load-port.model')(sequelize);
    db.LoadPortOrigin = require('../modules/masters/load-port-origin/load-port-origin.model')(sequelize);
    db.ScrapType = require('../modules/masters/scrap-type/scrap-type.model')(sequelize);
    db.Vendor = require('../modules/masters/vendor/vendor.model')(sequelize);
    db.POStatus = require('../modules/masters/po-status/po-status.model')(sequelize);
    db.GoodsStatus = require('../modules/masters/goods-status/goods-status.model')(sequelize);
    db.DocumentType = require('../modules/masters/document-type/document-type.model')(sequelize);
    db.DeliveryTerm = require('../modules/masters/delivery-term/delivery-term.model')(sequelize);
    db.SourceMaster = require('../modules/masters/source-master/source-master.model')(sequelize);
    db.ModeOfPayment = require('../modules/masters/mode-of-payment/mode-of-payment.model')(sequelize);
    db.Bank = require('../modules/masters/bank/bank.model')(sequelize);
    db.ICD = require('../modules/masters/icd/icd.model')(sequelize);
    db.PaymentTerm = require('../modules/masters/payment-term/payment-term.model')(sequelize);

    // Transaction tables
    db.Contract = require('../modules/transactions/contract/contract.model')(sequelize);
    db.Invoice = require('../modules/transactions/invoice/invoice.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
    // await sequelize.sync({ alter: true });

    // Relationships - Contracts
    db.Contract.belongsTo(db.Vendor, { targetKey: 'id', foreignKey: 'vendorId', as: 'vendor' });
    db.Contract.belongsTo(db.ScrapType, { targetKey: 'id', foreignKey: 'scrapTypeId', as: 'scrapType' });
    db.Contract.belongsTo(db.DeliveryTerm, { targetKey: 'id', foreignKey: 'deliveryTermId', as: 'deliveryTerm' });

    // Relationships - Invoice
    db.Contract.hasMany(db.Invoice);
    db.Invoice.belongsTo(db.Contract, { targetKey: 'id', foreignKey: 'contractId', as: 'contract' });

    // db.opportunities.belongsTo(db.users, { targetKey: 'userId', foreignKey: 'createdBy', as: 'createdUser'});
    // db.opportunities.belongsTo(db.users, { targetKey: 'userId', foreignKey: 'updatedBy', as: 'updatedUser'});
    // db.opportunities.belongsTo(db.companies, { targetKey: 'companyId', foreignKey: 'companyId', as: 'companyInfo'});
}

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
            } else {
                console.error('Connection established');
            }

            const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
            const request = new tedious.Request(createDbQuery, (err) => {
                if (err) {
                    console.error('err', err);
                    reject(`Create DB Query Failed: ${err.message}`);
                }

                // query executed successfully
                resolve();
            });

            connection.execSql(request);
        });
    });
}