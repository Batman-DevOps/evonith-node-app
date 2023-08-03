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
    const vendor = await db.Vendor.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
    return vendor;
}

async function getById(id) {
    return await getVendor(id);
}

async function create(params) {
    // validate
    if (await db.Vendor.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.Vendor(params);

    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getVendor(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.Vendor.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'Vendorname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getVendor(id);
    await shippingLine.destroy();
}

// helper functions

async function getVendor(id) {
    const shippingLine = await db.Vendor.findByPk(id);
    if (!shippingLine) throw 'Vendor not found';
    return shippingLine;
}