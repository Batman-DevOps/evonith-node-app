const allRoutes = require('express').Router();
const constants = require('../../constants/constants');

allRoutes.get('/', (req, res) => {
    res.json({
      message: constants.WELCOME_MSG
    });
})

const shippingLineRoutes = require('../../modules/shipping-line/shipping-line.routes');
const loadPortRoutes = require('../../modules/load-port/load-port.routes');
const loadPortOriginRoutes = require('../../modules/load-port-origin/load-port-origin.routes');
const scrapTypeRoutes = require('../../modules/scrap-type/scrap-type.routes');
const vendorRoutes = require('../../modules/vendor/vendor.routes');
const poStatusRoutes = require('../../modules/po-status/po-status.routes');
const goodsStatusRoutes = require('../../modules/goods-status/goods-status.routes');
const documentTypeRoutes = require('../../modules/document-type/document-type.routes');
const deliveryTermRoutes = require('../../modules/delivery-term/delivery-term.routes');
const sourceMasterRoutes = require('../../modules/source-master/source-master.routes');
const modeOfPaymentRoutes = require('../../modules/mode-of-payment/mode-of-payment.routes');
const bankRoutes = require('../../modules/bank/bank.routes');
const icdRoutes = require('../../modules/icd/icd.routes');

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

module.exports = allRoutes;