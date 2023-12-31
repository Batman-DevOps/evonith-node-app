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
    const bank = await db.Bank.findAll();
    return bank;
}

async function getById(id) {
    return await getBank(id);
}

async function create(params) {
    // validate
    if (await db.Bank.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.Bank(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getBank(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.Bank.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'Bankname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getBank(id);
    await shippingLine.destroy();
}

// helper functions

async function getBank(id) {
    const shippingLine = await db.Bank.findByPk(id);
    if (!shippingLine) throw 'Bank not found';
    return shippingLine;
}