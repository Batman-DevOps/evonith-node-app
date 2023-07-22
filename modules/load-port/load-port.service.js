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
    const loadPort = await db.LoadPort.findAll();
    return loadPort;
}

async function getById(id) {
    return await getLoadPort(id);
}

async function create(params) {
    // validate
    if (await db.LoadPort.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.LoadPort(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getLoadPort(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.LoadPort.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'LoadPortname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getLoadPort(id);
    await shippingLine.destroy();
}

// helper functions

async function getLoadPort(id) {
    const shippingLine = await db.LoadPort.findByPk(id);
    if (!shippingLine) throw 'LoadPort not found';
    return shippingLine;
}