const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const sourceMasterService = require('./source-master.service');

// route functions
async function getAll(req, res, next) {
    sourceMasterService.getAll()
        .then(sourceMasters => res.json({ error: false, success: true, message: "Load ports fetched successfully", data: sourceMasters }))
        .catch(next);
}

// function getById(req, res, next) {
//     sourceMasterService.getById(req.params.id)
//         .then(sourceMaster => res.json(sourceMaster))
//         .catch(next);
// }

// function create(req, res, next) {
//     sourceMasterService.create(req.body)
//         .then(() => res.json({ message: 'SourceMaster created' }))
//         .catch(next);
// }

// function update(req, res, next) {
//     sourceMasterService.update(req.params.id, req.body)
//         .then(() => res.json({ message: 'SourceMaster updated' }))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     sourceMasterService.delete(req.params.id)
//         .then(() => res.json({ message: 'SourceMaster deleted' }))
//         .catch(next);
// }

// // schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.SourceMaster).required(),
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
//         role: Joi.string().valid(Role.Admin, Role.SourceMaster).empty(''),
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
