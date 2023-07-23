const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const paymentTerm = await db.PaymentTerm.findAll();
    return paymentTerm;
}

async function getById(id) {
    return await getPaymentTerm(id);
}

async function create(params) {
    // validate
    if (await db.PaymentTerm.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.PaymentTerm(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getPaymentTerm(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.PaymentTerm.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'PaymentTermname "' + params.shippingLinename + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to shippingLine and save
    Object.assign(shippingLine, params);
    await shippingLine.save();
}

async function _delete(id) {
    const shippingLine = await getPaymentTerm(id);
    await shippingLine.destroy();
}

// helper functions

async function getPaymentTerm(id) {
    const shippingLine = await db.PaymentTerm.findByPk(id);
    if (!shippingLine) throw 'PaymentTerm not found';
    return shippingLine;
}