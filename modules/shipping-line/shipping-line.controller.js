const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const shippingLineService = require('./shipping-line.service');

// routes
// router.get('/', getAll);
// router.get('/:id', getById);
// router.post('/', createSchema, create);
// router.put('/:id', updateSchema, update);
// router.delete('/:id', _delete);

// module.exports = router;

// route functions
async function getAll(req, res, next) {
    shippingLineService.getAll()
        .then(shippingLines => res.json({ error: false, success: true, message: "Shipping lines fetched successfully", data: shippingLines }))
        .catch(next);
}

// function getById(req, res, next) {
//     shippingLineService.getById(req.params.id)
//         .then(shippingLine => res.json(shippingLine))
//         .catch(next);
// }

// function create(req, res, next) {
//     shippingLineService.create(req.body)
//         .then(() => res.json({ message: 'ShippingLine created' }))
//         .catch(next);
// }

// function update(req, res, next) {
//     shippingLineService.update(req.params.id, req.body)
//         .then(() => res.json({ message: 'ShippingLine updated' }))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     shippingLineService.delete(req.params.id)
//         .then(() => res.json({ message: 'ShippingLine deleted' }))
//         .catch(next);
// }

// // schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.ShippingLine).required(),
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
//         role: Joi.string().valid(Role.Admin, Role.ShippingLine).empty(''),
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
