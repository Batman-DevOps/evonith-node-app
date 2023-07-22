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
    db.ShippingLine = require('../modules/shipping-line/shipping-line.model')(sequelize);
    db.LoadPort = require('../modules/load-port/load-port.model')(sequelize);
    db.LoadPortOrigin = require('../modules/load-port-origin/load-port-origin.model')(sequelize);
    db.ScrapType = require('../modules/scrap-type/scrap-type.model')(sequelize);
    db.Vendor = require('../modules/vendor/vendor.model')(sequelize);
    db.POStatus = require('../modules/po-status/po-status.model')(sequelize);
    db.GoodsStatus = require('../modules/goods-status/goods-status.model')(sequelize);
    db.DocumentType = require('../modules/document-type/document-type.model')(sequelize);
    db.DeliveryTerm = require('../modules/delivery-term/delivery-term.model')(sequelize);
    db.SourceMaster = require('../modules/source-master/source-master.model')(sequelize);
    db.ModeOfPayment = require('../modules/mode-of-payment/mode-of-payment.model')(sequelize);
    db.Bank = require('../modules/bank/bank.model')(sequelize);
    db.ICD = require('../modules/icd/icd.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
    // await sequelize.sync({ alter: true });
}

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
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