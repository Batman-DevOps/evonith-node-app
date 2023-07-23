const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const contractService = require('./contract.service');

// route functions
async function getAll(req, res, next) {
    contractService.getAll()
        .then(contracts => res.json({ error: false, success: true, message: "Contracts fetched successfully", data: contracts }))
        .catch(next);
}

async function getById(req, res, next) {
    contractService.getById(req.params.id)
        .then(contract => res.json({ error: false, success: true, message: "Contract fetched successfully", data: contract }))
        .catch(next);
}

async function create(req, res, next) {
    contractService.create(req.body)
        .then(contract => res.json({ error: false, success: true, message: "Contract created successfully", data: contract }))
        .catch(next);
}

async function update(req, res, next) {
    contractService.update(req.body)
        .then(contract => res.json({ error: false, success: true, message: "Contract updated successfully", data: contract }))
        .catch(next);
}

async function _delete(req, res, next) {
    contractService.delete(req.params.id)
        .then(contract => res.json({ error: false, success: true, message: "Contract deleted successfully", data: contract }))
        .catch(next);
}

// schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.Contract).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).required(),
//         confirmPassword: Joi.string().valid(Joi.ref('password')).required()
//     });
//     validateRequest(req, next, schema);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().empty(''),
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         role: Joi.string().valid(Role.Admin, Role.Contract).empty(''),
//         email: Joi.string().email().empty(''),
//         password: Joi.string().min(6).empty(''),
//         confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
//     }).with('password', 'confirmPassword');
//     validateRequest(req, next, schema);
// }

module.exports = {
    create,
    getAll,
    getById,
    update,
    _delete
};
