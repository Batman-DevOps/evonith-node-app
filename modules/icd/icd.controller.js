const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const icdService = require('./icd.service');

// route functions
async function getAll(req, res, next) {
    icdService.getAll()
        .then(icds => res.json({ error: false, success: true, message: "Load ports fetched successfully", data: icds }))
        .catch(next);
}

// function getById(req, res, next) {
//     icdService.getById(req.params.id)
//         .then(icd => res.json(icd))
//         .catch(next);
// }

// function create(req, res, next) {
//     icdService.create(req.body)
//         .then(() => res.json({ message: 'ICD created' }))
//         .catch(next);
// }

// function update(req, res, next) {
//     icdService.update(req.params.id, req.body)
//         .then(() => res.json({ message: 'ICD updated' }))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     icdService.delete(req.params.id)
//         .then(() => res.json({ message: 'ICD deleted' }))
//         .catch(next);
// }

// // schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.ICD).required(),
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
//         role: Joi.string().valid(Role.Admin, Role.ICD).empty(''),
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
