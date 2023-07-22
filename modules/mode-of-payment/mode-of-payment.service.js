const bcrypt = require('bcryptjs');

const db = require('../../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const modeOfPayment = await db.ModeOfPayment.findAll();
    return modeOfPayment;
}

async function getById(id) {
    return await getModeOfPayment(id);
}

async function create(params) {
    // validate
    if (await db.ModeOfPayment.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.ModeOfPayment(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getModeOfPayment(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.ModeOfPayment.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'ModeOfPaymentname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getModeOfPayment(id);
    await shippingLine.destroy();
}

// helper functions

async function getModeOfPayment(id) {
    const shippingLine = await db.ModeOfPayment.findByPk(id);
    if (!shippingLine) throw 'ModeOfPayment not found';
    return shippingLine;
}