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
    const icd = await db.ICD.findAll();
    return icd;
}

async function getById(id) {
    return await getICD(id);
}

async function create(params) {
    // validate
    if (await db.ICD.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.ICD(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getICD(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.ICD.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'ICDname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getICD(id);
    await shippingLine.destroy();
}

// helper functions

async function getICD(id) {
    const shippingLine = await db.ICD.findByPk(id);
    if (!shippingLine) throw 'ICD not found';
    return shippingLine;
}