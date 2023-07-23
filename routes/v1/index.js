const allRoutes = require('express').Router();
const constants = require('../../constants/constants');

allRoutes.get('/', (req, res) => {
    res.json({
      message: constants.WELCOME_MSG
    });
})

// Master routes
const shippingLineRoutes = require('../../modules/masters/shipping-line/shipping-line.routes');
const loadPortRoutes = require('../../modules/masters/load-port/load-port.routes');
const loadPortOriginRoutes = require('../../modules/masters/load-port-origin/load-port-origin.routes');
const scrapTypeRoutes = require('../../modules/masters/scrap-type/scrap-type.routes');
const vendorRoutes = require('../../modules/masters/vendor/vendor.routes');
const poStatusRoutes = require('../../modules/masters/po-status/po-status.routes');
const goodsStatusRoutes = require('../../modules/masters/goods-status/goods-status.routes');
const documentTypeRoutes = require('../../modules/masters/document-type/document-type.routes');
const deliveryTermRoutes = require('../../modules/masters/delivery-term/delivery-term.routes');
const sourceMasterRoutes = require('../../modules/masters/source-master/source-master.routes');
const modeOfPaymentRoutes = require('../../modules/masters/mode-of-payment/mode-of-payment.routes');
const bankRoutes = require('../../modules/masters/bank/bank.routes');
const icdRoutes = require('../../modules/masters/icd/icd.routes');

// Transaction routes
const contractRoutes = require('../../modules/transactions/contract/contract.routes');

// Master routes
allRoutes.use(shippingLineRoutes);
allRoutes.use(loadPortRoutes);
allRoutes.use(loadPortOriginRoutes);
allRoutes.use(scrapTypeRoutes);
allRoutes.use(vendorRoutes);
allRoutes.use(poStatusRoutes);
allRoutes.use(goodsStatusRoutes);
allRoutes.use(documentTypeRoutes);
allRoutes.use(deliveryTermRoutes);
allRoutes.use(sourceMasterRoutes);
allRoutes.use(modeOfPaymentRoutes);
allRoutes.use(bankRoutes);
allRoutes.use(icdRoutes);

// Transaction routes
allRoutes.use(contractRoutes);

module.exports = allRoutes;