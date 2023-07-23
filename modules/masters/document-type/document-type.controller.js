const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const documentTypeService = require('./document-type.service');

// route functions
async function getAll(req, res, next) {
    documentTypeService.getAll()
        .then(documentTypes => res.json({ error: false, success: true, message: "Load ports fetched successfully", data: documentTypes }))
        .catch(next);
}

// function getById(req, res, next) {
//     documentTypeService.getById(req.params.id)
//         .then(documentType => res.json(documentType))
//         .catch(next);
// }

// function create(req, res, next) {
//     documentTypeService.create(req.body)
//         .then(() => res.json({ message: 'DocumentType created' }))
//         .catch(next);
// }

// function update(req, res, next) {
//     documentTypeService.update(req.params.id, req.body)
//         .then(() => res.json({ message: 'DocumentType updated' }))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     documentTypeService.delete(req.params.id)
//         .then(() => res.json({ message: 'DocumentType deleted' }))
//         .catch(next);
// }

// // schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.DocumentType).required(),
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
//         role: Joi.string().valid(Role.Admin, Role.DocumentType).empty(''),
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
