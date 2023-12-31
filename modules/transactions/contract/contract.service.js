const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const dateFormatter = require('_utilities/date-formatter');

module.exports = {
    getAll,
    getById,
    create,
    update,
    revise,
    delete: _delete
};

async function getAll() {
    let contract = await db.Contract.findAll({
        where: { isActive: 1, status: 'OPEN' },
        include: [
            { model: db.Vendor, as: 'vendor' },
            { model: db.ScrapType, as: 'scrapType' },
            { model: db.DeliveryTerm, as: 'deliveryTerm' }
        ]
    });
    let contractList = [...contract];
    // contractList.forEach(element => {
    //     element.contractDate = dateFormatter(element.contractDate);
    //     element.poDate = dateFormatter(element.poDate);
    // });
    return contractList;
}

async function getById(id) {
    return await getContract(id);
}

function create(requestBody) {
    return new Promise(async (resolve, reject) => {
        try {
            delete requestBody?.id;
            // validate
            if (await db.Contract.findOne({ where: { contractNumber: requestBody.contractNumber } })) {
                throw `Contract Number ${requestBody.contractNumber} is already registered`;
            }
            const contractObj = await db.Contract.create(requestBody);
            resolve(contractObj);
        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
}

async function update(requestBody) {
    const contract = await getContract(requestBody.id);

    // validate
    const contractNumberChanged = requestBody.contractNumber && contract.contractNumber !== requestBody.contractNumber;
    if (contractNumberChanged && await db.Contract.findOne({ where: { contractNumber: requestBody.contractNumber } })) {
        throw `Contract Number ${requestBody.contractNumber} is already taken`;
    }

    // copy requestBody to contract and save
    Object.assign(contract, requestBody);
    await contract.save();
}

async function revise(requestBody) {
    return new Promise(async (resolve, reject) => {
        try {
            const contractId = requestBody.id;
            const quantity = requestBody.quantity;
            const contract = await getContract(contractId);
            contract.status = 'CANCELLED';
            Object.assign(requestBody, contract);
            let contractData = await contract.save();
            console.log('contractData', contractData);

            contractData.dataValues.quantity = quantity;
            contractData.dataValues.status = 'OPEN';
            delete contractData.dataValues.id;
            const contractObj = await db.Contract.create(contractData.dataValues);
            resolve(contractObj);
        } catch (error) {
            console.log('error', error);
            reject(error);
        }
    });
}

async function _delete(id) {
    const contract = await getContract(id);
    await contract.destroy();
}

// helper functions

async function getContract(id) {
    const contract = await db.Contract.findOne({
        where: { id: id, isActive: 1, status: 'OPEN' },
        include: [
            { model: db.Vendor, as: 'vendor' }
        ]
    });
    if (!contract) throw 'Contract not found';
    return contract;
}