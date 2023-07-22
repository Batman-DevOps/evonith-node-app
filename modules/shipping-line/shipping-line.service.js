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
    const shippingLines = await db.ShippingLine.findAll();
    console.log('shippingLines', shippingLines);
    return shippingLines;
}

async function getById(id) {
    return await getShippingLine(id);
}

async function create(params) {
    // validate
    if (await db.ShippingLine.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.ShippingLine(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getShippingLine(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.ShippingLine.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'ShippingLinename "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getShippingLine(id);
    await shippingLine.destroy();
}

// helper functions

async function getShippingLine(id) {
    const shippingLine = await db.ShippingLine.findByPk(id);
    if (!shippingLine) throw 'ShippingLine not found';
    return shippingLine;
}