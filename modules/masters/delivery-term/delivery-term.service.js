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
    const deliveryTerm = await db.DeliveryTerm.findAll();
    return deliveryTerm;
}

async function getById(id) {
    return await getDeliveryTerm(id);
}

async function create(params) {
    // validate
    if (await db.DeliveryTerm.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.DeliveryTerm(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getDeliveryTerm(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.DeliveryTerm.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'DeliveryTermname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getDeliveryTerm(id);
    await shippingLine.destroy();
}

// helper functions

async function getDeliveryTerm(id) {
    const shippingLine = await db.DeliveryTerm.findByPk(id);
    if (!shippingLine) throw 'DeliveryTerm not found';
    return shippingLine;
}