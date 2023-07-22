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
    const loadPortOrigin = await db.LoadPortOrigin.findAll();
    return loadPortOrigin;
}

async function getById(id) {
    return await getLoadPortOrigin(id);
}

async function create(params) {
    // validate
    if (await db.LoadPortOrigin.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.LoadPortOrigin(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getLoadPortOrigin(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.LoadPortOrigin.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'LoadPortOriginname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getLoadPortOrigin(id);
    await shippingLine.destroy();
}

// helper functions

async function getLoadPortOrigin(id) {
    const shippingLine = await db.LoadPortOrigin.findByPk(id);
    if (!shippingLine) throw 'LoadPortOrigin not found';
    return shippingLine;
}