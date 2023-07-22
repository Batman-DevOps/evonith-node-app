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
    const scrapType = await db.ScrapType.findAll();
    return scrapType;
}

async function getById(id) {
    return await getScrapType(id);
}

async function create(params) {
    // validate
    if (await db.ScrapType.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.ScrapType(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getScrapType(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.ScrapType.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'ScrapTypename "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getScrapType(id);
    await shippingLine.destroy();
}

// helper functions

async function getScrapType(id) {
    const shippingLine = await db.ScrapType.findByPk(id);
    if (!shippingLine) throw 'ScrapType not found';
    return shippingLine;
}