const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const invoiceService = require('./invoice.service');
const { sendResponse } = require('_utilities/sendResponse');

// route functions
async function getAll(req, res, next) {
    invoiceService.getAll()
        .then(invoices => res.json({ error: false, success: true, message: "Invoices fetched successfully", data: invoices }))
        .catch(next);
}

async function getById(req, res, next) {
    invoiceService.getById(req.params.id)
        .then(invoice => res.json({ error: false, success: true, message: "Invoice fetched successfully", data: invoice }))
        .catch(next);
}

async function create(req, res, next) {
    invoiceService.create(req.body)
        .then(invoice => res.json({ error: false, success: true, message: "Invoice created successfully", data: invoice }))
        .catch(next);
}

async function update(req, res, next) {
    invoiceService.update(req.body)
        .then(invoice => res.json({ error: false, success: true, message: "Invoice updated successfully", data: invoice }))
        .catch(next);
}

async function revise(req, res, next) {
    invoiceService.revise(req.body)
        .then(invoice => res.json({ error: false, success: true, message: "Invoice revised successfully", data: invoice }))
        .catch(next);
}

async function _delete(req, res, next) {
    invoiceService.delete(req.params.id)
        .then(invoice => res.json({ error: false, success: true, message: "Invoice deleted successfully", data: invoice }))
        .catch(next);
}

// schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.Invoice).required(),
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
//         role: Joi.string().valid(Role.Admin, Role.Invoice).empty(''),
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
    revise,
    _delete
};
