const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const bankService = require('./bank.service');

// route functions
async function getAll(req, res, next) {
    bankService.getAll()
        .then(banks => res.json({ error: false, success: true, message: "Banks fetched successfully", data: banks }))
        .catch(next);
}

// function getById(req, res, next) {
//     bankService.getById(req.params.id)
//         .then(bank => res.json(bank))
//         .catch(next);
// }

// function create(req, res, next) {
//     bankService.create(req.body)
//         .then(() => res.json({ message: 'Bank created' }))
//         .catch(next);
// }

// function update(req, res, next) {
//     bankService.update(req.params.id, req.body)
//         .then(() => res.json({ message: 'Bank updated' }))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     bankService.delete(req.params.id)
//         .then(() => res.json({ message: 'Bank deleted' }))
//         .catch(next);
// }

// // schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.Bank).required(),
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
//         role: Joi.string().valid(Role.Admin, Role.Bank).empty(''),
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
