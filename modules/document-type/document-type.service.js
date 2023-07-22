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
    const documentType = await db.DocumentType.findAll();
    return documentType;
}

async function getById(id) {
    return await getDocumentType(id);
}

async function create(params) {
    // validate
    if (await db.DocumentType.findOne({ where: { name: params.name } })) {
        throw 'Email "' + params.name + '" is already registered';
    }

    const shippingLine = new db.DocumentType(params);
    
    // hash password
    // shippingLine.passwordHash = await bcrypt.hash(params.password, 10);

    // save shippingLine
    await shippingLine.save();
}

async function update(id, params) {
    const shippingLine = await getDocumentType(id);

    // validate
    const shippingLinenameChanged = params.shippingLinename && shippingLine.shippingLinename !== params.shippingLinename;
    if (shippingLinenameChanged && await db.DocumentType.findOne({ where: { shippingLinename: params.shippingLinename } })) {
        throw 'DocumentTypename "' + params.shippingLinename + '" is already taken';
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
    const shippingLine = await getDocumentType(id);
    await shippingLine.destroy();
}

// helper functions

async function getDocumentType(id) {
    const shippingLine = await db.DocumentType.findByPk(id);
    if (!shippingLine) throw 'DocumentType not found';
    return shippingLine;
}