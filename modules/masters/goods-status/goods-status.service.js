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
    const goodsStatus = await db.GoodsStatus.findAll();
    return goodsStatus;
}

async function getById(id) {
    return await getGoodsStatus(id);
}

async function create(params) {
    // validate
    if (await db.GoodsStatus.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.GoodsStatus(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getGoodsStatus(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.GoodsStatus.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'GoodsStatusname "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getGoodsStatus(id);
    await shippingLine.destroy();
}

// helper functions

async function getGoodsStatus(id) {
    const shippingLine = await db.GoodsStatus.findByPk(id);
    if (!shippingLine) throw 'GoodsStatus not found';
    return shippingLine;
}