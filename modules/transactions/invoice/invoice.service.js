const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const dateFormatter = require('_utilities/date-formatter');

module.exports = {
    getAll,
    getById,
    create,
    update,
    revise,
    delete: _delete
};

async function getAll() {
    let contract = await db.Contract.findAll({
        where: { isActive: 1, status: 'OPEN' },
        include: [
            { model: db.Vendor, as: 'vendor' },
            { model: db.ScrapType, as: 'scrapType' },
            { model: db.Invoice }
        ]
    });
    let contractList = JSON.parse(JSON.stringify(contract));
    contractList.forEach(element => {
        element.invoiceQuantity = element.invoices.reduce((ele, {invoiceQuantity}) => Number(ele) + Number(invoiceQuantity), 0)
    })
    return contractList;
}

async function getById(id) {
    return await getInvoice(id);
}

function create(requestBody) {
    return new Promise(async (resolve, reject) => {
        try {
            delete requestBody?.id;
            // validate
            if (await db.Invoice.findOne({ where: { invoiceNumber: requestBody.invoiceNumber } })) {
                throw `Invoice Number ${requestBody.invoiceNumber} is already registered`;
            }
            const invoiceObj = await db.Invoice.create(requestBody);
            resolve(invoiceObj);
        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
}

async function update(requestBody) {
    const invoice = await getInvoice(requestBody.id);

    // validate
    const invoiceNumberChanged = requestBody.invoiceNumber && invoice.invoiceNumber !== requestBody.invoiceNumber;
    if (invoiceNumberChanged && await db.Invoice.findOne({ where: { invoiceNumber: requestBody.invoiceNumber } })) {
        throw `Invoice Number ${requestBody.invoiceNumber} is already taken`;
    }

    // copy requestBody to invoice and save
    Object.assign(invoice, requestBody);
    await invoice.save();
}

async function revise(requestBody) {
    return new Promise(async (resolve, reject) => {
        try {
            const invoiceId = requestBody.id;
            const quantity = requestBody.quantity;
            const invoice = await getInvoice(invoiceId);
            invoice.status = 'CANCELLED';
            Object.assign(requestBody, invoice);
            let invoiceData = await invoice.save();
            console.log('invoiceData', invoiceData);

            invoiceData.dataValues.quantity = quantity;
            invoiceData.dataValues.status = 'OPEN';
            delete invoiceData.dataValues.id;
            const invoiceObj = await db.Invoice.create(invoiceData.dataValues);
            resolve(invoiceObj);
        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
}

async function _delete(id) {
    const invoice = await getInvoice(id);
    await invoice.destroy();
}

// helper functions

async function getInvoice(id) {
    const invoice = await db.Invoice.findByPk(id);
    if (!invoice) throw 'Invoice not found';
    return invoice;
}