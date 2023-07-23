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
    const poStatus = await db.POStatus.findAll();
    return poStatus;
}

async function getById(id) {
    return await getPOStatus(id);
}

async function create(params) {
    // validate
    if (await db.POStatus.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.POStatus(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getPOStatus(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.POStatus.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'POStatusname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getPOStatus(id);
    await shippingLine.destroy();
}

// helper functions

async function getPOStatus(id) {
    const shippingLine = await db.POStatus.findByPk(id);
    if (!shippingLine) throw 'POStatus not found';
    return shippingLine;
}