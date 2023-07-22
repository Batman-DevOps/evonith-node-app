const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const vendorService = require('./vendor.service');

// route functions
async function getAll(req, res, next) {
    vendorService.getAll()
        .then(vendors => res.json({ error: false, success: true, message: "Load ports fetched successfully", data: vendors }))
        .catch(next);
}

// function getById(req, res, next) {
//     vendorService.getById(req.params.id)
//         .then(vendor => res.json(vendor))
//         .catch(next);
// }

// function create(req, res, next) {
//     vendorService.create(req.body)
//         .then(() => res.json({ message: 'Vendor created' }))
//         .catch(next);
// }

// function update(req, res, next) {
//     vendorService.update(req.params.id, req.body)
//         .then(() => res.json({ message: 'Vendor updated' }))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     vendorService.delete(req.params.id)
//         .then(() => res.json({ message: 'Vendor deleted' }))
//         .catch(next);
// }

// // schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.Vendor).required(),
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
//         role: Joi.string().valid(Role.Admin, Role.Vendor).empty(''),
//         email: Joi.string().email().empty(''),
//         password: Joi.string().min(6).empty(''),
//         confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
//     }).with('password', 'confirmPassword');
//     validateRequest(req, next, schema);
// }

module.exports = {
    // create,
    getAll,
    // getById,
    // update,
    // _delete
};
